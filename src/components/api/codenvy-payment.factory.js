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

/**
 * This class is handling the credit card API
 * @author Ann Shumilova
 */
class CodenvyPayment {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor ($resource) {
    // keep resource
    this.$resource = $resource;
    this.creditCardsPerAccount = new Map();

    // remote call
    this.remotePaymentAPI = this.$resource('/api/creditcard/:accountId', {
      add: {method: 'POST', url: '/api/creditcard/:accountId'},
      remove: {method: 'DELETE', url: '/api/creditcard/:accountId/:creditCardNumber'}
    });

    // fetch the credit cards
    this.fetchCreditCards();
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

  addCreditCard(accountId, creditCard) {
    //TODO
  }

  removeCreditCard(accountId, creditCardNumber) {
    //TODO
  }
}

// Register this factory
Register.getInstance().factory('codenvyPayment', CodenvyPayment);
