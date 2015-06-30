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
    .controller('MainCtrl', function ($scope, $location  ) {
        $scope.isLoginPage =true;
        $scope.$on('$locationChangeStart', function (angularEvent, next, location) {
            if (location) {
                var newLocation = next;
                if (newLocation.indexOf("login") !== -1) {
                    $scope.isLoginPage = true;
                } else if ( newLocation.indexOf ("dashboard") !== -1) {
                    $scope.isLoginPage = false;
                } else {
                    $scope.isLoginPage = false;
                }
            }
        });
    });
