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
    .controller('LoginCtrl', function ($scope, $rootScope, $timeout, $http, $location, $cookies, $window, ProfileService) {

        $scope.username = '';
        $scope.password = '';

        $scope.errorSubmit = false;
        $scope.errorUsernameEmpty = false;
        $scope.errorPasswordEmpty = false;

        //console.log( "cookies.myFavorite: "+ $cookies.myFavorite );

        // document.getElementById("loading-bar-spinner").style.display = 'block';

        var isValidatedMail = false;
        var isValidatedUsername = false;
        var isValidatedPassword = false;
        var currentValidatedMail = "";
        var currentValidatedUsername = "";
        var currentValidatedPassword = "";

        $scope.submit = function (

        ) {

            // document.getElementById("loading-bar-spinner").style.display = 'block';

            //console.log("$scope.username: "+$scope.username );
            //console.log("$scope.password: "+$scope.password );

            if ($scope.username.length == 0 || $scope.password.length == 0) {
                $scope.errorUsernameEmpty = true;
                $scope.errorSubmit = false;
                //document.getElementById("loading-bar-spinner").style.display = 'none';
            }
            else {
                $scope.errorUsernameEmpty = false;

                /* if( $scope.password.indexOf("")!== -1) {
                 $scope.errorPasswordEmpty = true;
                 $scope.errorSubmit = false;

                 }else {
                 $scope.errorPasswordEmpty = false;
                 }*/
                $http({
                    url: "/api/auth/login",
                    method: "POST",
                    data: {"username": $scope.username, "password": $scope.password}
                }).then(function (response) { // success

                    //document.getElementById("loading-bar-spinner").style.display = 'none';
                    $scope.errorSubmit = false;

                    ProfileService.getProfile().then(function (profile, status) {
                        //console.log("status : "+status);
                        var fullUserName;
                        if (profile.attributes.firstName && profile.attributes.lastName) {
                            fullUserName = profile.attributes.firstName + ' ' + profile.attributes.lastName;
                        } else {
                            fullUserName = profile.attributes.email;
                        }
                        $rootScope.$broadcast('update_fullUserName', fullUserName);// update User name at top
                    });

                    $cookies.token = response.data.value;
                    $cookies.refreshStatus = "DISABLED";
                    /* $location.path("/dashboard");*/
                    $location.path("/dashbar");

                }, function (response) { // optional
                    //console.log(response);
                    //console.log("error on login: "+response);

                    //loading-bar-spinner

                    //document.getElementById("loading-bar-spinner").style.display = 'none';

                    //$('#loading-bar-spinner').remove();

                    $scope.errorSubmit = true;
                    $scope.errorPasswordEmpty = false;
                    $scope.errorUserEmpty = false;
                    //console.log("error on login: "+error);
                    //alert('error');

                    /*if(response.status === 400) {
                     $scope.errorUsernameEmpty = true;
                     }else
                     $scope.errorUsernameEmpty = false;

                     if (response.status === 404){
                     $scope.errorSubmit = true;
                     }else
                     $scope.errorSubmit = false;

                     if (response.status === 401){

                     }*/

                    // console.log(response);
                });

            }
            return false;
        };

        $scope.submitRegister = function () {

             console.log("Submit register, email: "+$scope.newEmail);
             //Validate the email, http://my.adaptive.me/api/register/validate?email=asdf
             $http({
                 url: "/api/register/validate"+"?email="+$scope.newEmail,
                 method: "GET"
             }).then(function (response) { // success
                console.log("register validate email then response: "+response);

                 $http({
                     url: "/api/register/validate"+"?username="+$scope.newUsername,
                     method: "GET"
                 }).then(function (response) { // success
                     console.log("register validate username then response: "+response);

                      var uploadUrl = "/api/register/create";
                      $http({
                          method: 'POST',
                          url: uploadUrl,
                          data: $.param({email: $scope.newEmail, username: $scope.newUsername, password: $scope.newPassword}),
                          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                      }).success( function(){
                              console.log("success register request");

                              $location.path("/login");
                          }
                      ).error(  function() {
                              console.log("error register request");
                          }
                      );

                 }, function (response) {
                     console.log("register validate username error response: "+response);

                 });

             }, function (response) {
                console.log("register validate email error response: "+response);

             });

        };

        var requestRegister = function (){

        };

        $scope.registerForm = function () {

            console.log("Register Form");

            if (!isValidatedMail) {

                isValidatedMail = true;

            }

            else if (!isValidatedUsername) {

                isValidatedUsername = true;

            }

            else {

                /* isValidatedPassword = true;
                $scope.errorUsernameEmpty = false;
                var uploadUrl = "/api/register/create";
                $http({
                    method: 'POST',
                    url: uploadUrl,
                    data: $.param({email: $scope.newEmail, username: $scope.newUsername, password: $scope.newPassword}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(
                ).error(
                );*/

                /* $http({

                 url: "/api/register/create",
                 method: "POST",
                 transformRequest: angular.identity,
                 /!* data: {email: $scope.newEmail,  username: $scope.newUsername, password: $scope.newPassword},*!/
                 /!* headers: {'Content-Type': 'multipart/form-data'}*!/
                 headers: { 'Content-Type': undefined }

                 }).then(function (response) { // success

                 console.log("register create then response: "+response);

                 }, function (response) {

                 console.log("register create normal response: "+response);

                 }); */

            }

            return false;

        };
    });