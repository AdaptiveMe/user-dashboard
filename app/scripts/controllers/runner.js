/*jslint
 browser: true,
 devel:true ,
 node:true,
 nomen: true,
 es5:true
 */

/**
 * @auth Parth Chhaiya
 * @author Oleksii Orel
 * @date 08/12/2014
 * Controller for runners
 */

'use strict';
angular.module('odeskApp')
    .controller('RunnerCtrl', function ($scope, $rootScope, $location, $interval, Workspace, RunnerService, ProjectFactory, $cookies, $timeout) {

        var refreshLocation = "/runner";
        var refreshInterval = null;
        var timeRunningInterval = null;

        $scope.runners = [];
        $scope.projects = [];
        $scope.filter = {};
        $scope.workspaces = [];
        $scope.isHasNew = false;
        $scope.currentWorkspace = null;
        $scope.refreshStatus = null;


        var isRefreshLocation = function () {
            return $location.url() == refreshLocation;
        };

        var setDateFormat = function (startTime) {
            if (typeof startTime == "undefined") {
                return '';
            }

            var sec, min, hour, days;
            var now = new Date();
            var startTimeInMs = new Date(startTime);
            var delta = Math.floor(now.getTime() / 1000 - startTimeInMs.getTime() / 1000);

            sec = delta % 60;
            min = (delta - sec) % 3600 / 60;
            delta -= min * 60 + sec;
            hour = (delta % 86400) / 3600;
            delta -= hour * 3600;
            days = delta / 86400;

            hour = hour <= 9 ? "0" + hour : hour;
            min = min <= 9 ? "0" + min : min;
            sec = sec <= 9 ? "0" + sec : sec;

            if (min == 0 && hour == 0 && days == 0) {
                return "00:00:" + sec;
            } else if (days == 0) {
                return hour + ":" + min + ":" + sec;
            } else {
                return days + " days and " + hour + ":" + min + ":" + sec;
            }
        };

        var updateRunners = function () {
            var runners = [];
            var isHasNew = false;
            var projectsCount = 0;

            if ($scope.projects && $scope.projects.length>0){
                angular.forEach($scope.projects, function (project) {
                    projectsCount++;
                    RunnerService.getProcesses(project.workspaceId, project.path, false)
                        .then(function (runningProcesses) {
                            angular.forEach(runningProcesses, function (runnerProcess) {
                                if ((runnerProcess.status == 'RUNNING' || runnerProcess.status == 'NEW') && (runnerProcess.project == project.path)) {
                                    if (runnerProcess.status == 'NEW') {
                                        isHasNew = true;
                                    }
                                    var runner = [];
                                    runner.ideUrl = project.ideUrl;
                                    runner.projectName = project.name;
                                    runner.startTime = setDateFormat(runnerProcess.startTime);
                                    runner.status = runnerProcess.status;
                                    runner.workspaceName = project.workspaceName;
                                    runner.url = $.map(runnerProcess.links, function (obj) {
                                        if (obj.rel == "web url") return obj.href
                                    })[0];
                                    runner.dockerRecipe = $.map(runnerProcess.links, function (obj) {
                                        if (obj.rel == "runner recipe") return obj.href
                                    })[0];
                                    runner.terminalUrl = $.map(runnerProcess.links, function (obj) {
                                        if (obj.rel == "shell url") return obj.href
                                    })[0];
                                    runner.runnerProcess = runnerProcess;
                                    runners.push(runner);
                                }
                            });
                            if (projectsCount == $scope.projects.length) {
                                if (!angular.equals(runners, $scope.runners)) {
                                    $scope.runners = runners;
                                }
                                $scope.isHasNew = isHasNew;
                            }
                        }, function (error) {
                            $scope.runners = runners;
                        });
                });
            } else {
                $scope.runners = runners;
            }
        };

        var refreshNewProcess = function (repeat) {
            $scope.projects = ProjectFactory.projects;
            ProjectFactory.fetchProjects($scope.workspaces, false).then(function () {
                repeat--;
                if (repeat) {
                    updateRunners();
                    $timeout(function () {
                        if ($scope.isHasNew) {
                            refreshNewProcess(repeat);
                        }
                    }, 5000);
                }
            });
        };

        var updateRefreshInterval = function (time) {
            if (refreshInterval != null) {
                if ($interval.cancel(refreshInterval)) {
                    refreshInterval = null;
                }
            }
            if (time != null && refreshInterval == null) {
                refreshInterval = $interval(function () {
                    if ($cookies.refreshStatus == "ENABLED") {
                        $scope.refresh(false);
                    }
                }, time);
            }
        };

        var updateTimeRunningInterval = function (time) {
            if (timeRunningInterval != null) {
                if ($interval.cancel(timeRunningInterval)) {
                    timeRunningInterval = null;
                }
            }
            if (time != null && timeRunningInterval == null) {
                timeRunningInterval = $interval(function () {
                    if ($scope.runners.length > 0) {
                        angular.forEach($scope.runners, function (runner) {
                            runner.startTime = setDateFormat(runner.runnerProcess.startTime);
                        });
                    }
                }, time);
            }
        };

        var init = function () {
            $scope.workspaces = Workspace.workspaces;
            $scope.currentWorkspace = Workspace.currentWorkspace;
            $scope.projects = ProjectFactory.projects;
            if (!$scope.workspaces.length) {
                Workspace.all(true, false).then(function (workspaces) {
                    $scope.workspaces = $scope.workspaces.concat(_.filter(workspaces, function (workspace) {
                        return !workspace.workspaceReference.temporary;
                    }));
                    Workspace.updateWorkspaceResources(true);
                    if ($scope.projects == null || $scope.projects.length == 0) {
                        ProjectFactory.fetchProjects($scope.workspaces, true).then(function () {
                            updateRunners();
                        });
                    } else {
                        updateRunners();
                    }
                });
            } else {
                Workspace.updateWorkspaceResources(true);
                if ($scope.projects == null || $scope.projects.length == 0) {
                    ProjectFactory.fetchProjects($scope.workspaces, true).then(function () {
                        updateRunners();
                    });
                } else {
                    updateRunners();
                    $timeout(function () {
                        refreshNewProcess(3);
                    }, 5000);
                }
            }

            timeRunningInterval = $interval(function () {
                if ($scope.runners.length > 0) {
                    angular.forEach($scope.runners, function (runner) {
                        runner.startTime = setDateFormat(runner.runnerProcess.startTime);
                    });
                }
            }, 1000);

            updateTimeRunningInterval(1000);

            updateRefreshInterval(90000);// update the runners every 90 seconds

            $scope.refreshStatus = $cookies['refreshStatus'] ? $cookies['refreshStatus'] : "DISABLED";

            $timeout(function () {
                $("[rel=tooltip]").tooltip({ placement: 'bottom' });
                $(document).on("click", ".searchfield", function () {
                    $('.searchfull').show();
                    $('.detail').animate({ opacity: 0 }, 400);
                    $('.searchfull').animate({ width: "100%" }, 400, function () {
                        $(".closeBtn").show();
                    });
                    $('.searchfield').focus();
                });
                $(document).on("click", ".closeBtn", function () {
                    $(".closeBtn").hide();
                    $('.detail').animate({ opacity: 1 }, 400);
                    $('.searchfull').animate({ width: "43px" }, 400, function () {
                        $('.searchfield').val('');
                        $('.searchfull').hide();
                    });
                });
            });
        };
        init();// all code starts here

        $scope.setCurrentWorkspace = function (workspace) {
            if($scope.currentWorkspace && workspace && $scope.currentWorkspace.workspaceReference.name==workspace.workspaceReference.name) {
                return;
            }
            $scope.currentWorkspace = workspace;
            Workspace.currentWorkspace = workspace;
//            $scope.refresh(true);
        };

        $scope.refresh = function (showLoading) {
            Workspace.all(false, false).then(function (workspaces) {
                Workspace.updateWorkspaceResources(showLoading).then(function (workspaces) {
                    if (!angular.equals($scope.workspaces, workspaces)) {
                        $scope.workspaces = workspaces;
                    }
                    ProjectFactory.fetchProjects($scope.workspaces, showLoading)
                        .then(function () {
                            updateRunners();
                        });
                });

            });
            $scope.refreshStatus = $cookies['refreshStatus'];
        };

        $scope.shutdownRunner = function (runner) {
            var processId = runner.runnerProcess.processId;

            RunnerService.stopProcess(runner.runnerProcess, true).then(function (data) {
                if (data.status == "STOPPED") {
                    angular.forEach($scope.runners, function (runner, index) {
                        if (runner.runnerProcess.processId == processId) {
                            $scope.runners.splice(index, 1);
                            return;
                        }
                    });
                    Workspace.updateWorkspaceResources();
                }
            });
        };

        $scope.restartRunner = function (runner) {
            var processId = runner.runnerProcess.processId;

            RunnerService.restartProcess(runner.runnerProcess).then(function (data) {
                angular.forEach($scope.runners, function (runner, index) {
                    if (runner.runnerProcess.processId == processId) {
                        $scope.runners.splice(index, 1);
                        return;
                    }
                });
                updateRefreshInterval(90000);
                $timeout(function () {
                    refreshNewProcess(4);
                }, 5000);
            });
        };

        $scope.refreshStatusCheck = function () {
            if ($cookies.refreshStatus == "DISABLED") {
                $cookies.refreshStatus = "ENABLED";
                updateRefreshInterval(90000);// update the runners every 90 seconds
                $scope.refresh(true);
            } else {
                $cookies.refreshStatus = "DISABLED";
            }
            $scope.refreshStatus = $cookies['refreshStatus'];
        };

        $rootScope.$on('$locationChangeStart', function () {
            if (!isRefreshLocation()) {
                if (refreshInterval != null) {
                    if ($interval.cancel(refreshInterval)) {
                        refreshInterval = null;
                    }
                }
                if (timeRunningInterval != null) {
                    if ($interval.cancel(timeRunningInterval)) {
                        timeRunningInterval = null;
                    }
                }
            }
        });

    }
);