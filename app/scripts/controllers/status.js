angular.module('odeskApp')
    .controller('StatusCtrl', function ($scope, $rootScope, $timeout, $http, $location, $cookies, $window, ProfileService, $interval) {

        $scope.label_total_users = constants.label_total_users ;
        $scope.label_total_builds = constants.label_total_builds ;
        $scope.label_total_android_builds = constants.label_total_android_builds ;
        $scope.label_total_ios_builds = constants.label_total_ios_builds ;

        $scope.dataMini = "";

        $scope.dashbarCPULoadValues = "";
        $scope.dashbarMemoryValues = "";
        $scope.dashbarFileValues = "";

        $scope.databaseCPULoadValues = "";
        $scope.databaseMemoryValues = "";
        $scope.databaseFileValues = "";

        $scope.fileCPULoadValues = "";
        $scope.fileMemoryValues = "";
        $scope.fileFileValues = "";

        $scope.infraCPULoadValues = "";
        $scope.infraMemoryValues = "";
        $scope.infraFileValues = "";

        $http({
            url: constants.url_user_request,
            method: "GET"
        }).then(function (response) { // success

            $scope.totalUsers = response.data;

        }, function (response) {
            $scope.totalUsers = "...";
        });

        $scope.callMetricFormat1 = function (server, metric, number, callNum) {
            //console.log( server + "/" + metric + number + ", value: " +callNum);
            $http({
                url: server + "/" + metric + number,
                method: "GET"
            }).then(function (response) {  // success

                var o = response.data;
                var arrayFormatDefaultd1 = [];
                var arrayFormatDefaultd2 = [];
                var arrayFormatDefaultd3 = [];
                var counter1 = 0;
                var array4 = [];
                var arrayFormatDefaultd1 = [];
                var metric_total_values = 0;

                var arr = Object.keys(o).map(function (k) {

                    var param = (parseInt(o[k]) / 1024 / 1024 / 1024).toFixed(3);

                    if (callNum == 1 || callNum == 5 || callNum == 9 || callNum == 13) {
                        param = Math.round(parseFloat(o[k]) * 100);

                    } else {
                        //console.log("/api/metrics/server/" + server + "/" + metric + "/" + number + ", value: " + param);
                    }
                    return param;

                });

                for (var i = 0; i < arr.length; i++) {
                    metric_total_values = arr.length ;
                    var array12 = [];
                    array12 [0] = i;
                    array12 [1] = arr[i];
                   // arrayFormatDefaultd1[ parseInt(constants.metric_total_values) - i] = array12;
                    arrayFormatDefaultd1[ metric_total_values] = array12;
                    arrayFormatDefaultd3 [i] = array12;
                }

                switch (callNum) {

                    // data Dashbar

                    case 1:
                        $scope.dataChartDashbar = o;
                        break;
                    case 2:
                        $scope.dataChartBarDashbar = o;
                        break;
                    case 3:
                        $scope.dataChartPieUsageFile1 = arrayFormatDefaultd3;
                        $scope.callMetricFormat1(constants.url_api_request+constants.server_my, constants.metric_disk_available, "/" +"1", 4);
                        break;
                    case 4:
                        var arrayPieValues = [];
                        arrayPieValues[0] = $scope.dataChartPieUsageFile1[0][1];
                        arrayPieValues[1] = arrayFormatDefaultd3[0][1];
                        $scope.dataChartPieDashbar = arrayPieValues;
                        break;

                    // data Database

                    case 5:
                        $scope.dataChartDatabase = o;
                        break;
                    case 6:

                        $scope.dataChartBarDatabase = o;

                        break;
                    case 7:
                        $scope.dataChartPieUsageFile3 = arrayFormatDefaultd3;
                        $scope.callMetricFormat1(constants.url_api_request+ constants.server_db, constants.metric_disk_available,"/" + "1", 8);
                        break;
                    case 8:
                        $scope.infraMemoryValues = arr.toString();
                        var arrayPieValues = [];
                        arrayPieValues[0] = $scope.dataChartPieUsageFile3[0][1];
                        arrayPieValues[1] = arrayFormatDefaultd3[0][1];
                        $scope.dataChartPieDatabase = arrayPieValues;
                        break;

                    // data Infra

                    case 9:

                        $scope.dataChartInfra = o;
                        break;
                    case 10:

                        $scope.dataChartBarInfra = o;
                        break;
                    case 11:
                        $scope.dataChartPieUsageInfra7 = arrayFormatDefaultd3;
                        $scope.callMetricFormat1( constants.url_api_request+constants.server_infra1,constants.metric_disk_available ,"/" + "1", 12);
                        break;
                    case 12:
                        var arrayPieValues = [];
                        arrayPieValues[0] = $scope.dataChartPieUsageInfra7[0][1];
                        arrayPieValues[1] = arrayFormatDefaultd3[0][1];
                        $scope.dataChartPieInfra = arrayPieValues;
                        break;

                    // data File

                    case 13:

                        $scope.dataChartFile = o;
                        break;
                    case 14:

                        $scope.dataChartBarFile = o;

                        break;
                    case 15:
                        $scope.dataChartPieUsageFile5 = arrayFormatDefaultd3;
                        $scope.callMetricFormat1(constants.url_api_request+constants.server_fd ,constants.metric_disk_available, "/" +"1", 16);
                        break;
                    case 16:
                        var arrayPieValues = [];
                        arrayPieValues[0] = $scope.dataChartPieUsageFile5[0][1];
                        arrayPieValues[1] = arrayFormatDefaultd3[0][1];
                        $scope.dataChartPieFile = arrayPieValues;
                        break;
                    case 17:

                        break;
                    case 18:

                        $scope. total_builds  =  o.sum;

                        break;
                    case 19:

                        $scope.total_android_builds =o.sum;

                        break;
                    case 20:

                        $scope. total_ios_builds = o.sum;
                        break;

                }
                return response.data;

            }, function (response) {
                return;
            });

        };

        $scope.callMetrics = function () {

            $scope.callMetricFormat1(constants.url_api_request+constants.server_my, constants.metric_system_cpu_load,"/" +constants.metric_total_values, 1);
            $scope.callMetricFormat1(constants.url_api_request+constants.server_my, constants.metric_mem_used,"/" + constants.metric_total_values, 2);
            $scope.callMetricFormat1(constants.url_api_request+constants.server_my, constants.metric_disk_used,"/" + "1", 3);

            $scope.callMetricFormat1(constants.url_api_request+constants.server_db, constants.metric_system_cpu_load, "/" +constants.metric_total_values, 5);
            $scope.callMetricFormat1(constants.url_api_request+constants.server_db, constants.metric_mem_used,"/" + constants.metric_total_values, 6);
            $scope.callMetricFormat1(constants.url_api_request+constants.server_db, constants.metric_disk_used, "/" +"1", 7);

            $scope.callMetricFormat1(constants.url_api_request+constants.server_infra1, constants.metric_system_cpu_load, "/" +constants.metric_total_values, 9);
            $scope.callMetricFormat1(constants.url_api_request+constants.server_infra1, constants.metric_mem_used,"/" + constants.metric_total_values, 10);
            $scope.callMetricFormat1(constants.url_api_request+constants.server_infra1, constants.metric_disk_used,"/" + "1", 11);

            $scope.callMetricFormat1(constants.url_api_request+constants.server_fd, constants.metric_system_cpu_load, "/" + constants.metric_total_values, 13);
            $scope.callMetricFormat1(constants.url_api_request+constants.server_fd, constants.metric_mem_used, "/" +constants.metric_total_values, 14);
            $scope.callMetricFormat1(constants.url_api_request+constants.server_fd, constants.metric_disk_used, "/" +"1", 15);

            //$scope.callMetricFormat1( ,  , "1", 17);

            $scope.callMetricFormat1( constants.url_api_request_metric_build , constants.metric_total_sum + "/0/1441152000000", "", 18);
            $scope.callMetricFormat1( constants.url_api_request_metric_build , constants.metric_total_sum + "/0/1441152000000?platform=android", "", 19);
            $scope.callMetricFormat1( constants.url_api_request_metric_build , constants.metric_total_sum + "/0/1441152000000?platform=ios", "", 20);

        };

        $interval($scope.callMetrics(), constants.update_metric_values * 1000);
        $interval(function () {
            $scope.callMetrics();
        }, constants.update_metric_values * 1000);

    });