/*
 * Copyright (c) 2015 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';

import Register from '../utils/register.js';
Register.getInstance().app.constant('clientTokenPath', '/');//is necessary for Braintree

/**
 * This class is handling the credit card API
 * @author Ann Shumilova
 */
class CodenvyPayment {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($resource, $braintree) {
    // keep resource
    this.$resource = $resource;
    this.$braintree = $braintree;

    this.creditCardsPerAccount = new Map();
    this.tokensPerAccount = new Map();

    // remote call
    this.remotePaymentAPI = this.$resource('/api/creditcard/:accountId',{}, {
      getToken: {method: 'GET', url: '/api/creditcard/:accountId/token'},
      add: {method: 'POST', url: '/api/creditcard/:accountId'},
      remove: {method: 'DELETE', url: '/api/creditcard/:accountId/:creditCardNumber'}
    });

  }

  /**
   * Gets the user data
   */
  fetchCreditCards(accountId) {
    let promise = this.remotePaymentAPI.query({accountId: accountId}).$promise;
    // check if if was OK or not
    let parsedResultPromise = promise.then((data) => {
      this.creditCardsPerAccount.set(accountId, data);
    });
    return parsedResultPromise;
  }

  /**
   * Gets the accounts, where current user is owner
   * @returns {Array}
   */
  getCreditCards(accountId) {
    return this.creditCardsPerAccount.get(accountId);
  }

  getClientToken(accountId) {
    let promise = this.remotePaymentAPI.getToken({accountId: accountId}).$promise;
    // check if if was OK or not
    let parsedResultPromise = promise.then((data) => {
      this.tokensPerAccount.set(accountId, data.token);
    });
    return parsedResultPromise;
  }

  addCreditCard(accountId, creditCard) {
    var client;
    var mainCreditCardInfo = {};
    mainCreditCardInfo.number = creditCard.number;
    mainCreditCardInfo.cardholderName = creditCard.cardholderName;
    mainCreditCardInfo.expirationDate = creditCard.expirationDate.replace(/ /g, '');
    mainCreditCardInfo.cvv = creditCard.cvv;
    mainCreditCardInfo.billingAddress = {postalCode: creditCard.postalCode};

    this.getClientToken(accountId).then(() => {
      client = new this.$braintree.api.Client({
        clientToken: this.tokensPerAccount.get(accountId)
      });

      client.tokenizeCard(mainCreditCardInfo, function (err, nonce) {
        var newCreditCard = {nonce: nonce};
        newCreditCard.state = creditCard.state;
        newCreditCard.country = creditCard.country;
        newCreditCard.streetAddress = creditCard.streetAddress;
        newCreditCard.city = creditCard.city;

        return this.remotePaymentAPI.add({accountId: accountId}, newCreditCard).$promise;
      });
    });
  }

  removeCreditCard(accountId, creditCardNumber) {
    return this.remotePaymentAPI.remove({accountId: accountId, creditCardNumber: creditCardNumber}).$promise;
  }
}

// Register this factory
Register.getInstance().factory('codenvyPayment', CodenvyPayment);
