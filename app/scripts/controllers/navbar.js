/*jslint
    browser: true,
    devel:true ,
    node:true,
    nomen: true,
    es5:true
*/

/**
 * @auth Gaurav Meena
 * @date 01/16/2014
 * Controller for navbar will automatically check for active view to set class active
 */

/*global angular*/

'use strict';

angular.module('odeskApp')
    .controller('NavbarCtrl', function ($scope, $location, $http, $cookies, $window) {
      
        $scope.menu = [
            /*{
            //    'title': 'Admin',
            //    'link': '#/admin'
            //},*/
            {
                'title': 'Projects',
                'link': '#/dashboard'
            },
            {
                'title': 'Factories',
                'link': '#/factories'
            },
            {
                'title': 'Stats',
                'link': '#/stats'
            },
            {
                'title': 'Account',
                'link': '#/account'
            },
            {
                'title': 'Runners',
                'link': '#/runner'
            }
            /*,
            {
                'title': 'Subscriptions',
                'link': '#/subscriptions'
            }*/
            /*,
            {
                'title': 'Organizations',
                'link': '#/organizations'
            }*/
        ];

        $scope.helpMenu= [
            {
                'title': 'Codenvy Help',
                'link': 'http://docs.codenvy-next.com'
            },
            {
                'title': 'Forum',
                'link': 'https://helpdesk.codenvy.com/'
            },
            {
                'title': 'Feedback',
                'link': 'https://codenvy.uservoice.com/'
            },
            {
                'title': 'Create Support Tickets',
                'link': 'mailto:support@codenvy.com'
            }
            ];
    
        $scope.isActive = function (route) {
            //return route === '#' + $location.path(); //here # is added because of location html5 mode        
            var str = '#' + $location.path(),
                str2 = route;
            
            if (str.indexOf(str2) > -1) {
                return true;
            } else {
                return false;
            }
        };
        
        $http({method: 'GET', url: '/api/profile'}).success(function (profile, status) {
          $scope.fullUserName = profile.attributes['firstName'] + ' ' + profile.attributes['lastName'];
        });
        $scope.logout = function () {
            $http({
                url: "/api/auth/logout",
                method: "POST",
                data: { "token": $cookies['session-access-key']}
            }).success(function (data, status) {
                $window.location.href = '/site/login';
            });
        };
    });
