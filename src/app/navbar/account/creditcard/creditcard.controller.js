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

//import Card from '../../../bower_components/card/lib/js/card.js';

class BillingCtrl {

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
      if (this.creditCards.length == 0) {
        this.getCreditCard();
      }
    })
  }

  getCreditCard() {
    var card = new Card({
      form: document.getElementById('creditCardInformationForm'),
      container: '.card-wrapper',

      formSelectors: {
        numberInput: 'input[name$=cardNumber]', // optional — default input[name="number"]
        expiryInput: 'input[name$=expires]', // optional — default input[name="expiry"]
        cvcInput: 'input[name$=cvv]', // optional — default input[name="cvc"]
        nameInput: 'input[name$=cardholderName]' // optional - defaults input[name="name"]
      },
      formatting: true, // optional - default true
      messages: {
        validDate: 'valid\ndate', // optional - default 'valid\nthru'
        monthYear: 'mm/yyyy' // optional - default 'month/year'
      },
      values: {
        number: '•••• •••• •••• ••••',
        name: 'Full Name',
        expiry: '••/••',
        cvc: '•••'
      },
      debug: true // optional - default false
    });
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

export default BillingCtrl;
