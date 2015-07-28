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
        $scope.errorPasswordEmpty= false;

       //console.log( "cookies.myFavorite: "+ $cookies.myFavorite );

        // document.getElementById("loading-bar-spinner").style.display = 'block';

        $scope.submit = function () {

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
                    $scope.errorPasswordEmpty= false;
                    $scope.errorUserEmpty= false;
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
    });