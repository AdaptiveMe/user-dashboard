angular.module('odeskApp')
    .controller('StatusCtrl', function ($scope, $rootScope, $timeout, $http, $location, $cookies, $window, ProfileService, $interval) {

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
            url: "/api/metrics/user/total",
            method: "GET"
        }).then(function (response) { // success

            $scope.totalUsers = response.data;

        }, function (response) {
            $scope.totalUsers = "...";
        });

        $scope.callMetricFormat1 = function (server, metric, number, callNum) {
            $http({
                url: "/api/metrics/server/" + server + "/" + metric + "/" + number,
                method: "GET"
            }).then(function (response) {  // success

                var o = response.data;
                var arrayFormatDefaultd1 = [];
                var arrayFormatDefaultd2 = [];
                var arrayFormatDefaultd3 = [];
                var counter1 = 0;
                var array4 = [];
                var arrayFormatDefaultd1 = [];

                var arr = Object.keys(o).map(function (k) {

                    var param = (parseInt(o[k]) / 1024 / 1024 / 1024).toFixed(3);
                    //console.log("param: "+param);

                    if (callNum == 1 || callNum == 5 || callNum == 9 || callNum == 13) {
                        param = Math.round(parseFloat(o[k]) * 100);
                        // console.log("/api/metrics/server/" + server + "/" + metric + "/" + number + ", value: " + param);

                    } else {
                        console.log("/api/metrics/server/" + server + "/" + metric + "/" + number + ", value: " + param);
                    }
                    return param;

                });

                for (var i = 0; i < arr.length; i++) {
                    var array12 = [];
                    array12 [0] = i;
                    array12 [1] = arr[i];
                    arrayFormatDefaultd1[20 - i] = array12;
                    arrayFormatDefaultd3 [i] = array12;
                }
                var dataChartFormatY = [
                    {
                        label: "CPU load",
                        data: arrayFormatDefaultd1,
                        lines: {
                            fill: 0.2,
                            lineWidth: 0,
                        },
                        color: ['#0066FF']
                    },
                    {
                        data: arrayFormatDefaultd1,
                        points: {
                            show: true,
                            fill: true,
                            radius: 4,
                            fillColor: "#0066FF",
                            lineWidth: 2
                        },
                        color: '#0066FF',
                        shadowSize: 1
                    },
                    {
                        data: arrayFormatDefaultd1,
                        lines: {
                            show: true,
                            fill: false,
                            lineWidth: 3
                        },
                        color: '#0066FF',
                        shadowSize: 0
                    }
                ];

                switch (callNum) {

                    // data Dashbar

                    case 1:
                        //Old
                        //$scope.dataChartDashbar = dataChartFormatY;
                        //New
                        $scope.dataChartDashbar = o;
                        break;
                    case 2:
                        $scope.dataChartBarDashbar = arrayFormatDefaultd1;
                        break;
                    case 3:
                        $scope.dataChartPieUsageFile1 = arrayFormatDefaultd3;
                        $scope.callMetricFormat1("my.adaptive.me", "disk_available", "1", 4);
                        break;
                    case 4:
                        var arrayPieValues = [];
                        arrayPieValues[0] = $scope.dataChartPieUsageFile1[0][1];
                        arrayPieValues[1] = arrayFormatDefaultd3[0][1];
                        $scope.dataChartPieDashbar = arrayPieValues;
                        break;

                    // data Database

                    case 5:
                        //Old
                        //$scope.dataChartDatabase = dataChartFormatY;
                        //New
                        $scope.dataChartDatabase = o;
                        //$scope.databaseMemoryValues = arr.toString();
                        break;
                    case 6:
                        $scope.databaseFileValues = arr.toString();
                        $scope.dataChartBarDatabase = arrayFormatDefaultd1;
                        break;
                    case 7:
                        $scope.dataChartPieUsageFile3 = arrayFormatDefaultd3;
                        $scope.callMetricFormat1("db.adaptive.me", "disk_available", "1", 8);
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
                        //$scope.infraFileValues = arr.toString();
                        //Old
                        //$scope.dataChartInfra = dataChartFormatY;
                        //New
                        $scope.dataChartInfra = o;
                        break;
                    case 10:
                        $scope.fileCPULoadValues = arr.toString();
                        $scope.dataChartBarInfra = arrayFormatDefaultd1;
                        break;
                    case 11:
                        $scope.dataChartPieUsageInfra7 = arrayFormatDefaultd3;
                        $scope.callMetricFormat1("infra1.adaptive.me", "disk_available", "1", 12);
                        break;
                    case 12:
                        var arrayPieValues = [];
                        arrayPieValues[0] = $scope.dataChartPieUsageInfra7[0][1];
                        arrayPieValues[1] = arrayFormatDefaultd3[0][1];
                        $scope.dataChartPieInfra = arrayPieValues;
                        break;

                    // data File

                    case 13:
                        //$scope.fileFileValues = arr.toString();
                        //Old
                        //$scope.dataChartFile = dataChartFormatY;
                        //New
                        $scope.dataChartFile = o;
                        break;
                    case 14:
                        $scope.fileFileValues = arr.toString();
                        $scope.dataChartBarFile = arrayFormatDefaultd1;
                        break;
                    case 15:
                        $scope.dataChartPieUsageFile5 = arrayFormatDefaultd3;
                        $scope.callMetricFormat1("fd.adaptive.me", "disk_available", "1", 16);
                        break;
                    case 16:
                        var arrayPieValues = [];
                        arrayPieValues[0] = $scope.dataChartPieUsageFile5[0][1];
                        arrayPieValues[1] = arrayFormatDefaultd3[0][1];
                        $scope.dataChartPieFile = arrayPieValues;
                        break;

                }
                return response.data;

            }, function (response) {
                return;
            });

        };

        $scope.callMetrics = function () {

            $scope.callMetricFormat1("my.adaptive.me", "system_cpu_load", "20", 1);
            $scope.callMetricFormat1("my.adaptive.me", "mem_used", "20", 2);
            $scope.callMetricFormat1("my.adaptive.me", "disk_used", "1", 3);

            $scope.callMetricFormat1("db.adaptive.me", "system_cpu_load", "20", 5);
            $scope.callMetricFormat1("db.adaptive.me", "mem_used", "20", 6);
            $scope.callMetricFormat1("db.adaptive.me", "disk_used", "1", 7);

            $scope.callMetricFormat1("infra1.adaptive.me", "system_cpu_load", "20", 9);
            $scope.callMetricFormat1("infra1.adaptive.me", "mem_used", "20", 10);
            $scope.callMetricFormat1("infra1.adaptive.me", "disk_used", "1", 11);

            $scope.callMetricFormat1("fd.adaptive.me", "system_cpu_load", "20", 13);
            $scope.callMetricFormat1("fd.adaptive.me", "mem_used", "20", 14);
            $scope.callMetricFormat1("fd.adaptive.me", "disk_used", "1", 15);

        };

        $interval($scope.callMetrics(), 30000);
        $interval(function () {
            $scope.callMetrics();
        }, 30000);

    });