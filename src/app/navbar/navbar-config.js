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

import NavBarCtrl from '../navbar/navbar.controller';
import NavBar from '../navbar/navbar.directive.js';

import AccountProfileCtrl from './account/profile/account-profile.controller';
import AccountProfile from './account/profile/account-profile.directive';
import AccountCtrl from '../navbar/account/account.controller';

class NavbarConfig {

  constructor(register) {
    register.directive('cdvyNavBar', NavBar);
    register.directive('accountProfile', AccountProfile);

    register.controller('AccountProfileCtrl', AccountProfileCtrl);
    register.controller('NavbarCtrl', NavBarCtrl);
    register.controller('AccountCtrl', AccountCtrl);

    // config routes
    register.app.config(function ($routeProvider) {
      $routeProvider.when('/account', {
        templateUrl: 'app/navbar/account/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'accountCtrl'
      });
    });

  }
}


export default NavbarConfig;
