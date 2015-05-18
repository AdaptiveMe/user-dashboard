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

class BillingCtrl {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor (codenvyAPI) {
    this.codenvyAPI = codenvyAPI;

    this.invoices = [];

    if (this.codenvyAPI.getAccount().getAccounts().length > 0) {
      this.fetchInvoices();
    } else {
      this.codenvyAPI.getAccount().fetchAccounts().then(() => {
        this.fetchInvoices();
      });
    }
  }

  fetchInvoices() {
    let currentAccount = this.codenvyAPI.getAccount().getCurrentAccount();
    this.codenvyAPI.getPayment().fetchInvoices(currentAccount.id).then(() => {
      this.invoices = this.codenvyAPI.getPayment().getInvoices(currentAccount.id);
    }, (error) => {
      if (error.status === 304) {
        this.invoices = this.codenvyAPI.getPayment().getInvoices(currentAccount.id);
      } else {
        //TODO
      }
    });
  }
}

export default BillingCtrl;
