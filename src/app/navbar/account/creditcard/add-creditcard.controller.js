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
 * @name account.creditcard.controller:AddCreditcardCtrl
 * @description This class is handling the controller for the adding credit card
 * @author Ann Shumilova
 */
class AddCreditcardCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this.creditCard = {};
  }

  getCard() {
    var card = new Card({
      form: '#creditCardInformationForm',
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
}

export default AddCreditcardCtrl;
