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
    constructor (codenvyAPI) {
    this.codenvyAPI = codenvyAPI;
    this.creditCards = [];

 /*   if (this.codenvyAPI.getAccount().getAccounts().length > 0) {
      this.fetchSubscriptions();
    } else {
      this.codenvyAPI.getAccount().fetchAccounts().then(() => {
        this.fetchSubscriptions();
      });
    }*/
   // this.getCreditCard();
  }

  getCreditCard() {
    /*var card = new Card({
      // a selector or DOM element for the form where users will
      // be entering their information
      form: 'form', // *required*
      // a selector or DOM element for the container
      // where you want the card to appear
      container: '.card-wrapper', // *required*

      formSelectors: {
        numberInput: 'input#number', // optional — default input[name="number"]
        expiryInput: 'input#expiry', // optional — default input[name="expiry"]
        cvcInput: 'input#cvc', // optional — default input[name="cvc"]
        nameInput: 'input#name' // optional - defaults input[name="name"]
      },

      width: 200, // optional — default 350px
      formatting: true, // optional - default true

      // Strings for translation - optional
      messages: {
        validDate: 'valid\ndate', // optional - default 'valid\nthru'
        monthYear: 'mm/yyyy', // optional - default 'month/year'
      },

      // Default values for rendered fields - optional
      values: {
        number: '•••• •••• •••• ••••',
        name: 'Full Name',
        expiry: '••/••',
        cvc: '•••'
      },

      // if true, will log helpful messages for setting up Card
      debug: false // optional - default false
    });*/
  }
}

export default BillingCtrl;
