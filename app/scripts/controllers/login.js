/*jslint
 browser: true,
 devel:true ,
 node:true,
 nomen: true,
 es5:true
 */

/**
 * @auth Gaurav Meena
 * @date 03/23/2014
 * Controller for login (used only for dev mode)
 */

/*global angular, $*/
'use strict';

angular.module('odeskApp')
    .controller('LoginCtrl', function ($scope, $rootScope, $routeParams, $timeout, $http, $q, $location, $cookies, $window, ProfileService) {

        $scope.submitLogin = function () {

            $scope.errorSubmit = false;

            if ($("#login-form").valid()) {

                $http({
                    url: "/api/auth/login",
                    method: "POST",
                    data: {
                        "username": $scope.username,
                        "password": $scope.password
                    }
                }).then(function (response) {

                    ProfileService.getProfile().then(function (profile, status) {
                        var fullUserName;
                        if (profile.attributes.firstName && profile.attributes.lastName) {
                            fullUserName = profile.attributes.firstName + ' ' + profile.attributes.lastName;
                        } else {
                            fullUserName = profile.attributes.email;
                        }
                        $rootScope.$broadcast('update_fullUserName', fullUserName);
                    });

                    $cookies.token = response.data.value;
                    $cookies.refreshStatus = "DISABLED";
                    $location.path("/dashbar");

                }, function (response) {

                    $scope.errorSubmit = true;

                });
            }
        };

        $scope.submitRegister = function () {

            if ($("#register-form").valid()) {

                $scope.errorEmailExist = false;
                $scope.errorUsernameExist = false;

                $http({
                    url: "/api/register/validate" + "?email=" + $scope.email,
                    method: "GET"
                }).then(function (response) {

                    $http({
                        url: "/api/register/validate" + "?username=" + $scope.username,
                        method: "GET"
                    }).then(function (response) {

                        $http({
                            url: "/api/register/create",
                            method: 'POST',
                            data: $.param({
                                email: $scope.email,
                                username: $scope.username,
                                password: $scope.password
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).success(function () {

                                $scope.errorEmailExist = false;
                                $scope.errorUsernameExist = false;

                                $location.path("/login");

                            }
                        );

                    }, function (response) {
                        $scope.errorUsernameExist = true;
                    });

                }, function (response) {
                    $scope.errorEmailExist = true;
                });
            }
        };

        $scope.submitForgotPassword = function () {

            if ($("#forget-form").valid()) {

                $http({
                    url: "/api/register/forgot?email=" + $scope.email,
                    method: "GET"
                }).then(function (response) {

                    $location.path("/login");

                }, function (response) {
                    $scope.errorUserNotFound = true;
                });
            }
        };

        $scope.submitResetPassword = function () {

            if ($("#reset-form").valid()) {

                $http({
                    url: "/api/register/validateForgotToken?forgotToken=" + $routeParams.forgotToken,
                    method: "GET"
                }).then(function (response) {

                    $cookies.token = response.data.value;

                    var deferred = $q.defer();

                    $http({
                        url: "/api/user/password",
                        method: "POST",
                        data: $.param({
                            password: $scope.password
                        }),
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    }).then(function (response) {

                        $location.path("/dashbar");

                    }, function (response) {

                        if (response.status === 409) {
                            $scope.invalidPassword = true;
                        } else if (response.status === 404) {
                            $scope.errorUserNotFound = true;
                        } else {
                            $scope.errorServer = true;
                        }
                    });

                    return deferred.promise;

                }, function (response) {

                    if (response.status === 409) {
                        $scope.errorExpired = true;
                    } else if (response.status === 404) {
                        $scope.errorUserNotFound = true;
                    } else {
                        $scope.errorServer = true;
                    }
                });
            }
        };

        $scope.showLogin = function () {
            $location.path("/login");
        };

        $scope.showForgot = function () {
            $location.path("/forgotPassword");
        };

        $scope.showRegister = function () {
            $location.path("/register");
        };

        $scope.showTermsService = function () {
            $location.path("/terms-of-service");
        };
        $scope.showPrivacy = function () {
            $location.path("/privacy");
        };

    });