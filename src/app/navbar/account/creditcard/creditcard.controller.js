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

/**
 * @ngdoc controller
 * @name account.creditcard.controller:CreditcardCtrl
 * @description This class is handling the controller for managing credit cards (list, add, remove)
 * @author Ann Shumilova
 */
class CreditcardCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */

    constructor(codenvyAPI, $mdDialog) {
    this.codenvyAPI = codenvyAPI;
    this.$mdDialog = $mdDialog;

    this.creditCards = [];
    this.loadedCreditCards = false;


    if (this.codenvyAPI.getAccount().getAccounts().length > 0) {
      this.fetchCreditCards();
    } else {
      this.codenvyAPI.getAccount().fetchAccounts().then(() => {
        this.fetchCreditCards();
      });
    }

  }

  fetchCreditCards() {
    let currentAccount = this.codenvyAPI.getAccount().getCurrentAccount();

    this.codenvyAPI.getPayment().fetchCreditCards(currentAccount.id).then(() => {
      this.loadedCreditCards = true;
      this.creditCards = this.codenvyAPI.getPayment().getCreditCards(currentAccount.id);
    });
  }

  addCreditCard(card) {
    console.log(card);
  }

  setCreditCard(card) {
    console.log(card);
  }

  removeCreditCard(card, event) {
    var confirm = this.$mdDialog.confirm()
      .title('Would you like to remove credit card ' + card.number)
      .content('Please confirm for the credit card removal.')
      .ariaLabel('Remove credit card')
      .ok('Ok')
      .cancel('Cancel')
      .targetEvent(event);
    this.$mdDialog.show(confirm).then(() => {
      // remove it !
      let promise = this.codenvyAPI.getPayment().removeCreditCard(card.accountId, card.number);
      promise.then(() => {
        this.fetchCreditCards(card.accountId);
      }, (error) => {
        console.log('error', error);
      });
    });
  }
}

export default CreditcardCtrl;

