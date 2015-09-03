/**
 * Created by hrrl on 30/06/2015.
 */

/*jslint
 browser: true,
 devel:true ,
 node:true,
 nomen: true,
 es5:true
 */

/*global angular, $*/
'use strict';

angular.module('odeskApp')
    .controller('MainCtrl', function ($scope, $rootScope, $location, $http, $cookies, $window, OrgAddon, ProfileService ) {
        $scope.isLoginPage =true;

        $scope.$on('$locationChangeStart', function (angularEvent, next, location) {

            if (location) {
                var newLocation = next;
                if (newLocation.indexOf("login") !== -1 || newLocation.indexOf("service-terms") !== -1 || newLocation.indexOf("policy-terms") !== -1 ) {
                    $scope.isLoginPage = true;
                } else if ( newLocation.indexOf ("dashboard") !== -1) {
                    $scope.isLoginPage = false;
                }
                else if ( newLocation.indexOf ("register") !== -1 ||  newLocation.indexOf ("forgotPassword") !== -1 || newLocation.indexOf ("terms-of-service") !== -1 || newLocation.indexOf ("privacy") !== -1) {
                    $scope.isLoginPage = true;
                }
               /* else if ( newLocation.indexOf ("forgotPassword") !== -1) {
                    $scope.isLoginPage = true;
                }*/

                else {
                    $scope.isLoginPage = false;
                }
            }
        });


        $scope.menu = [
            {
                'title': 'Projects',
                'link': '#/projects'
            },
            {
                'title': 'Runners',
                'link': '#/runner'
            },
            {
                'title': 'Factories',
                'link': '#/factories'
            },
            {
                'title': 'Workspaces',
                'link': '#/organizations'
            },
            {
                'title': 'Account',
                'link': '#/account'
            }
        ];

        $scope.helpMenu = [
            {
                'title': 'Codenvy Help',
                'link': 'http://docs.codenvy.com'
            },
            {
                'title': 'Forum',
                'link': 'http://helpdesk.codenvy.com/'
            },
            {
                'title': 'Feedback and Feature Vote',
                'link': 'https://codenvy.uservoice.com/'
            },
            {
                'title': 'Create Support Ticket',
                'link': 'https://codenvy.uservoice.com/'
            }
        ];

        $rootScope.$on('update_fullUserName', function(event, fullUserName){
            $scope.fullUserName = fullUserName;
        });

        ProfileService.getProfile().then(function (profile) {
            var fullUserName;

            //console.log("get firstname: "+profile.attributes.firstName);

            if (profile.attributes.firstName && profile.attributes.lastName) {
                fullUserName = profile.attributes.firstName + ' ' + profile.attributes.lastName;
            } else {
                fullUserName = profile.attributes.email;
            }
            $rootScope.$broadcast('update_fullUserName', fullUserName);// update User name at top
        });

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

        $scope.logout = function () {

            $http({
                url: "/api/auth/logout",
                method: "POST",
                //data: { "token": $cookies['session-access-key']}
                data: { "token": $cookies.token}
            }).success(function (data, status) {

                $location.path("/login");

            });
        };

        $("#navbar-collapse").click(function(){
            $(".navbar-collapse").toggle();
        });
        $("#navbar-collapse-btn").click(function(){
            $(".navbar-collapse").toggle();
        });

        OrgAddon.getOrgAccounts();


        $scope.go = function (path){
            $location.path(path);
        }
    });
