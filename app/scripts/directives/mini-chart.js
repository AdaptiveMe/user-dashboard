angular.module('odeskApp').directive("sparklinechart1", function () {

    return {
        restrict: "E",
        scope: {
            data: "@"
        },
        compile: function (tElement, tAttrs, transclude) {
            tElement.replaceWith("<span>" + tAttrs.data + "</span>");
            return function (scope, element, attrs) {
                attrs.$observe("data", function (newValue) {
                    element.html(newValue);
                    element.sparkline('html', {

                        type: 'bar',
                        width: '100',
                        barWidth: 5,
                        height: '55',
                        barColor: '#35aa47',
                        negBarColor: '#e02222',
                        tooltipFormat: '{{value}} %'

                    });
                });
            };
        }
    };
});

angular.module('odeskApp').directive("sparklinechart2", function () {

    return {
        restrict: "E",
        scope: {
            data: "@"
        },
        compile: function (tElement, tAttrs, transclude) {
            tElement.replaceWith("<span>" + tAttrs.data + "</span>");
            return function (scope, element, attrs) {
                attrs.$observe("data", function (newValue) {
                    element.html(newValue);
                    element.sparkline('html', {

                        type: 'bar',
                        width: '100',
                        barWidth: 5,
                        height: '55',
                        barColor: '#ffb848',
                        negBarColor: '#e02222',
                        tooltipFormat: '{{value}} Gb'

                    });

                });
            };
        }
    };

});

angular.module('odeskApp').directive("sparklinechart3", function () {

    return {
        restrict: "E",
        scope: {
            data: "@"
        },
        compile: function (tElement, tAttrs, transclude) {
            tElement.replaceWith("<span>" + tAttrs.data + "</span>");
            return function (scope, element, attrs) {
                attrs.$observe("data", function (newValue) {
                    element.html(newValue);
                    element.sparkline('html', {

                        type: 'line',
                        width: '100',
                        height: '55',
                        lineColor: '#ffb848',
                        tooltipFormat: "{{y:val}} Gb",
                        tooltipValueLookups: {"val": {"-1": "N/A"}}

                    });
                });
            };
        }
    };
});

angular.module('odeskApp').directive('chart', function () {
    return {

        restrict: 'E',
        link: function (scope, elem, attrs) {

            var chart = null,
                opts = {

                    yaxis: {
                        max: 100,
                        ticks: 5,
                        axisLabel: 'axisLabel',
                        tickDecimals: 0,
                        tickColor: "#eee",
                        font: {
                            lineHeight: 14,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
                        },
                        tickFormatter: function (v, axis) {
                            return v + "%";
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        tickColor: "#eee",
                        borderColor: "#eee",
                        borderWidth: 1
                    }
                };

            var data = scope[attrs.ngModel];

            var array1 = [];

            var array2 = [];

            console.log("attrs.valuechart: " + attrs.valuechart);

            var previousPoint2 = null;

            if (attrs.valuechart.indexOf("dashbar") != -1) {

                scope.$watch('dataChartDashbar', function (v) {

                    // Start Handing the plot hover

                    function showChartTooltip(x, y, xValue, yValue) {
                        $('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
                            position: 'absolute',
                            display: 'none',
                            top: y - 40,
                            left: x - 40,
                            border: '0px solid #ccc',
                            padding: '2px 6px',
                            'background-color': '#fff'
                        }).appendTo("body").fadeIn(200);
                    }

                    elem.bind("plothover", function (event, pos, item) {
                        $("#x").text(pos.x.toFixed(2));
                        $("#y").text(pos.y.toFixed(2));
                        if (item) {
                            if (previousPoint2 != item.dataIndex) {
                                previousPoint2 = item.dataIndex;
                                $("#tooltip").remove();
                                var x = item.datapoint[0].toFixed(2),
                                    y = item.datapoint[1].toFixed(2);
                                showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + '%');
                            }
                        }
                    });

                    elem.bind("mouseleave", function () {
                        $("#tooltip").remove();
                    });

                    // End of Handing the plot hover

                    if (!chart) {
                        var data = [[0, 0]];
                        chart = $.plot(elem, data, opts);
                        elem.show();

                    } else {

                        var opts2 = {
                            xaxis: {

                                tickLength: 0,
                                tickDecimals: 0,
                                mode: "categories",
                                min: 0,
                                axisLabel: 'axisLabel',
                                font: {
                                    lineHeight: 18,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                }
                            },
                            yaxis: {
                                ticks: 5,
                                max: 100,
                                axisLabel: 'axisLabel',
                                tickDecimals: 0,
                                tickColor: "#eee",
                                font: {
                                    lineHeight: 14,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                },
                                tickFormatter: function (v, axis) {
                                    return v + "%";
                                }
                            },
                            grid: {
                                hoverable: true,
                                clickable: true,
                                tickColor: "#eee",
                                borderColor: "#eee",
                                borderWidth: 1
                            }
                        };
                        chart = $.plot(elem, v, opts2);
                        chart.setData(v);
                        chart.setupGrid();
                        chart.draw();
                    }
                });
            }
            else if (attrs.valuechart.indexOf("database") != -1) {
                scope.$watch('dataChartDatabase', function (v) {

                    // Start Handing the plot hover
                    function showChartTooltip(x, y, xValue, yValue) {
                        $('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
                            position: 'absolute',
                            display: 'none',
                            top: y - 40,
                            left: x - 40,
                            border: '0px solid #ccc',
                            padding: '2px 6px',
                            'background-color': '#fff'
                        }).appendTo("body").fadeIn(200);
                    }
                    elem.bind("plothover", function (event, pos, item) {
                        $("#x").text(pos.x.toFixed(2));
                        $("#y").text(pos.y.toFixed(2));
                        if (item) {
                            if (previousPoint2 != item.dataIndex) {
                                previousPoint2 = item.dataIndex;
                                $("#tooltip").remove();
                                var x = item.datapoint[0].toFixed(2),
                                    y = item.datapoint[1].toFixed(2);
                                showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + '%');
                            }
                        }
                    });
                    elem.bind("mouseleave", function () {
                        $("#tooltip").remove();
                    });
                    // End of Handing the plot hover

                    if (!chart) {
                        var data = [[0, 0]];
                        chart = $.plot(elem, data, opts);
                        elem.show();

                    } else {

                        var opts2 = {
                            xaxis: {

                                /*
                                 ticks: [[0,'00'],[1,'01'],[2,'02'],[3,'03'],[4,'04'],[5,'05'],[6,'06'],[7,'07'],[8,'08'],[9,'09'],[10,'09'],[12,'09'],[13,'09'],[14,'09'],[15,'09'],[16,'09'],[17,'09'],[18,'09'],[19,'09'],[20,'09']],
                                 */
                                tickLength: 0,
                                tickDecimals: 0,
                                mode: "categories",
                                min: 0,
                                axisLabel: 'axisLabel',
                                font: {
                                    lineHeight: 18,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                }
                            },
                            yaxis: {
                                ticks: 5,
                                max: 100,
                                axisLabel: 'axisLabel',
                                tickDecimals: 0,
                                tickColor: "#eee",
                                font: {
                                    lineHeight: 14,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                },
                                tickFormatter: function (v, axis) {
                                    return v + "%";
                                }
                            },
                            grid: {
                                hoverable: true,
                                clickable: true,
                                tickColor: "#eee",
                                borderColor: "#eee",
                                borderWidth: 1
                            }

                        };

                        chart = $.plot(elem, v, opts2);
                        chart.setData(v);
                        chart.setupGrid();
                        chart.draw();
                    }
                });
            }
            else if (attrs.valuechart.indexOf("file") != -1) {

                // Start Handing the plot hover
                function showChartTooltip(x, y, xValue, yValue) {
                    $('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
                        position: 'absolute',
                        display: 'none',
                        top: y - 40,
                        left: x - 40,
                        border: '0px solid #ccc',
                        padding: '2px 6px',
                        'background-color': '#fff'
                    }).appendTo("body").fadeIn(200);
                }
                elem.bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x.toFixed(2));
                    $("#y").text(pos.y.toFixed(2));
                    if (item) {
                        if (previousPoint2 != item.dataIndex) {
                            previousPoint2 = item.dataIndex;
                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);
                            showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + '%');
                        }
                    }
                });
                elem.bind("mouseleave", function () {
                    $("#tooltip").remove();
                });
                // End of Handing the plot hover

                scope.$watch('dataChartFile', function (v) {

                    if (!chart) {
                        var data = [[0, 0]];

                        chart = $.plot(elem, data, opts);
                        elem.show();

                    } else {

                        var opts2 = {
                            xaxis: {

                                /*
                                 ticks: [[0,'00'],[1,'01'],[2,'02'],[3,'03'],[4,'04'],[5,'05'],[6,'06'],[7,'07'],[8,'08'],[9,'09'],[10,'09'],[12,'09'],[13,'09'],[14,'09'],[15,'09'],[16,'09'],[17,'09'],[18,'09'],[19,'09'],[20,'09']],
                                 */
                                tickLength: 0,
                                tickDecimals: 0,
                                mode: "categories",
                                min: 0,
                                axisLabel: 'axisLabel',
                                font: {
                                    lineHeight: 18,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                }
                            },
                            yaxis: {
                                ticks: 5,
                                max: 100,
                                axisLabel: 'axisLabel',
                                tickDecimals: 0,
                                tickColor: "#eee",
                                font: {
                                    lineHeight: 14,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                },
                                tickFormatter: function (v, axis) {
                                    return v + "%";
                                }
                            },
                            grid: {
                                hoverable: true,
                                clickable: true,
                                tickColor: "#eee",
                                borderColor: "#eee",
                                borderWidth: 1
                            }

                        };

                        chart = $.plot(elem, v, opts2);
                        chart.setData(v);
                        chart.setupGrid();
                        chart.draw();
                    }
                });
            }

            else if (attrs.valuechart.indexOf("infrastructure") != -1) {

                // Start Handing the plot hover
                function showChartTooltip(x, y, xValue, yValue) {
                    $('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
                        position: 'absolute',
                        display: 'none',
                        top: y - 40,
                        left: x - 40,
                        border: '0px solid #ccc',
                        padding: '2px 6px',
                        'background-color': '#fff'
                    }).appendTo("body").fadeIn(200);
                }
                elem.bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x.toFixed(2));
                    $("#y").text(pos.y.toFixed(2));
                    if (item) {
                        if (previousPoint2 != item.dataIndex) {
                            previousPoint2 = item.dataIndex;
                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);
                            showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + '%');
                        }
                    }
                });
                elem.bind("mouseleave", function () {
                    $("#tooltip").remove();
                });
                // End of Handing the plot hover

                scope.$watch('dataChartInfra', function (v) {

                    if (!chart) {

                        var data = [[0, 0]];

                        chart = $.plot(elem, data, opts);
                        elem.show();

                    } else {
                        var opts2 = {
                            xaxis: {

                                /*
                                 ticks: [[0,'00'],[1,'01'],[2,'02'],[3,'03'],[4,'04'],[5,'05'],[6,'06'],[7,'07'],[8,'08'],[9,'09'],[10,'09'],[12,'09'],[13,'09'],[14,'09'],[15,'09'],[16,'09'],[17,'09'],[18,'09'],[19,'09'],[20,'09']],
                                 */
                                tickLength: 0,
                                tickDecimals: 0,
                                mode: "categories",
                                min: 0,
                                axisLabel: 'axisLabel',
                                font: {
                                    lineHeight: 18,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                }
                            },
                            yaxis: {
                                ticks: 5,
                                max: 100,
                                axisLabel: 'axisLabel',
                                tickDecimals: 0,
                                tickColor: "#eee",
                                font: {
                                    lineHeight: 14,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                },
                                tickFormatter: function (v, axis) {
                                    return v + "%";
                                }
                            },
                            grid: {
                                hoverable: true,
                                clickable: true,
                                tickColor: "#eee",
                                borderColor: "#eee",
                                borderWidth: 1
                            }

                        };
                        chart = $.plot(elem, v, opts2);
                        chart.setData(v);
                        chart.setupGrid();
                        chart.draw();
                    }

                });
            }
        }
    };
});

angular.module('odeskApp').directive('flotchartbar', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {

            var chart = null;
            var data = scope[attrs.ngModel];
            var array1 = [];
            var array2 = [];

            if (attrs.valuechart.indexOf("dashbar") != -1) {

                // Start Handing the plot hover
                var previousPoint2 = null;
                function showChartTooltip(x, y, xValue, yValue) {
                    $('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
                        position: 'absolute',
                        display: 'none',
                        top: y - 40,
                        left: x - 40,
                        border: '0px solid #ccc',
                        padding: '2px 6px',
                        'background-color': '#fff'
                    }).appendTo("body").fadeIn(200);
                }
                elem.bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x.toFixed(2));
                    $("#y").text(pos.y.toFixed(2));
                    if (item) {
                        if (previousPoint2 != item.dataIndex) {
                            previousPoint2 = item.dataIndex;
                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);
                            showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + 'Gb');
                        }
                    }
                });
                elem.bind("mouseleave", function () {
                    $("#tooltip").remove();
                });
                // End of Handing the plot hover

                scope.$watch('dataChartBarDashbar', function (v) {
                    var options = {
                        series: {
                            bars: {
                                show: true
                            },
                            fillColor: '#35aa47'
                        },
                        bars: {
                            align: "center",
                            barWidth: 0.8,
                            fillColor: '#35aa47'
                        },
                        xaxis: {
                            axisLabel: ".....",
                            axisLabelUseCanvas: true,
                            axisLabelFontSizePixels: 12,
                            axisLabelFontFamily: 'Verdana, Arial',
                            axisLabelPadding: 10,
                            font: {
                                lineHeight: 14,
                                style: "normal",
                                variant: "small-caps",
                                color: "#6F7B8A"
                            },

                        },
                        yaxis: {
                            axisLabel: ".....",

                            axisLabelFontSizePixels: 12,
                            axisLabelFontFamily: 'Verdana, Arial',

                            font: {
                                lineHeight: 14,
                                style: "normal",
                                variant: "small-caps",
                                color: "#6F7B8A"
                            },

                            tickFormatter: function (v, axis) {
                                return v.toFixed(3) + "Gb";
                            }
                        },
                        legend: {
                            noColumns: 0,
                            labelBoxBorderColor: "#000000",
                            position: "nw"
                        },
                        grid: {

                            hoverable: true,
                            clickable: true,
                            tickColor: "#eee",
                            borderColor: "#eee",
                            borderWidth: 1
                        }
                    };
                    if (!chart) {
                        var data = [];
                        var dataset = [];
                        var ticks = [];
                        chart = $.plot(elem, dataset, options);
                        elem.show();
                    } else {
                        var data = [[0, 0]];
                        var dataset = [{label: "Memory load", data: v, color: "#35aa47"}];
                        chart = $.plot(elem, dataset, options);
                        chart.setData(dataset);
                        chart.setupGrid();
                        chart.draw();
                    }
                });

            } else if (attrs.valuechart.indexOf("database") != -1) {

                // Start Handing the plot hover
                var previousPoint2 = null;
                function showChartTooltip(x, y, xValue, yValue) {
                    $('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
                        position: 'absolute',
                        display: 'none',
                        top: y - 40,
                        left: x - 40,
                        border: '0px solid #ccc',
                        padding: '2px 6px',
                        'background-color': '#fff'
                    }).appendTo("body").fadeIn(200);
                }
                elem.bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x.toFixed(2));
                    $("#y").text(pos.y.toFixed(2));
                    if (item) {
                        if (previousPoint2 != item.dataIndex) {
                            previousPoint2 = item.dataIndex;
                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);
                            showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + 'Gb');
                        }
                    }
                });
                elem.bind("mouseleave", function () {
                    $("#tooltip").remove();
                });
                // End of Handing the plot hover

                scope.$watch('dataChartBarDatabase', function (v) {
                    var options = {
                        series: {
                            bars: {
                                show: true
                            },
                            fillColor: '#35aa47'
                        },
                        bars: {
                            align: "center",
                            barWidth: 0.8,
                            fillColor: '#35aa47'
                        },
                        xaxis: {
                            axisLabel: ".....",
                            axisLabelUseCanvas: true,
                            axisLabelFontSizePixels: 12,
                            axisLabelFontFamily: 'Verdana, Arial',
                            axisLabelPadding: 10,
                            font: {
                                lineHeight: 14,
                                style: "normal",
                                variant: "small-caps",
                                color: "#6F7B8A"
                            },
                            /* ticks: ticks*/
                        },
                        yaxis: {
                            axisLabel: ".....",
                            axisLabelFontSizePixels: 12,
                            axisLabelFontFamily: 'Verdana, Arial',
                            font: {
                                lineHeight: 14,
                                style: "normal",
                                variant: "small-caps",
                                color: "#6F7B8A"
                            },
                            tickFormatter: function (v, axis) {
                                return v.toFixed(3) + "Gb";
                            }
                        },
                        legend: {
                            noColumns: 0,
                            labelBoxBorderColor: "#000000",
                            position: "nw"
                        },
                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: "#eee",
                            borderColor: "#eee",
                            borderWidth: 1
                        }
                    };
                    if (!chart) {
                        var data = [];
                        var dataset = [];
                        var ticks = [];
                        chart = $.plot(elem, dataset, options);
                        elem.show();
                    } else {
                        var data = [[0, 0]];
                        var dataset = [{label: "Memory load", data: v, color: "#35aa47"}];
                        chart = $.plot(elem, dataset, options);
                        chart.setData(dataset);
                        chart.setupGrid();
                        chart.draw();
                    }
                });
            } else if (attrs.valuechart.indexOf("file") != -1) {

                // Start Handing the plot hover
                var previousPoint2 = null;
                function showChartTooltip(x, y, xValue, yValue) {
                    $('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
                        position: 'absolute',
                        display: 'none',
                        top: y - 40,
                        left: x - 40,
                        border: '0px solid #ccc',
                        padding: '2px 6px',
                        'background-color': '#fff'
                    }).appendTo("body").fadeIn(200);
                }
                elem.bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x.toFixed(2));
                    $("#y").text(pos.y.toFixed(2));
                    if (item) {
                        if (previousPoint2 != item.dataIndex) {
                            previousPoint2 = item.dataIndex;
                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);
                            showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + 'Gb');
                        }
                    }
                });
                elem.bind("mouseleave", function () {
                    $("#tooltip").remove();
                });
                // End of Handing the plot hover

                scope.$watch('dataChartBarFile', function (v) {
                    var options = {
                        series: {
                            bars: {
                                show: true
                            },
                            fillColor: '#35aa47'
                        },
                        bars: {
                            align: "center",
                            barWidth: 0.8,
                            fillColor: '#35aa47'
                        },
                        xaxis: {
                            axisLabel: ".....",
                            axisLabelUseCanvas: true,
                            axisLabelFontSizePixels: 12,
                            axisLabelFontFamily: 'Verdana, Arial',
                            axisLabelPadding: 10,
                            font: {
                                lineHeight: 14,
                                style: "normal",
                                variant: "small-caps",
                                color: "#6F7B8A"
                            },
                            /* ticks: ticks*/
                        },
                        yaxis: {
                            axisLabel: ".....",

                            axisLabelFontSizePixels: 12,
                            axisLabelFontFamily: 'Verdana, Arial',

                            font: {
                                lineHeight: 14,
                                style: "normal",
                                variant: "small-caps",
                                color: "#6F7B8A"
                            },

                            tickFormatter: function (v, axis) {
                                return v.toFixed(3) + "Gb";
                            }
                        },
                        legend: {
                            noColumns: 0,
                            labelBoxBorderColor: "#000000",
                            position: "nw"
                        },
                        grid: {

                            hoverable: true,
                            clickable: true,
                            tickColor: "#eee",
                            borderColor: "#eee",
                            borderWidth: 1
                        }
                    };
                    if (!chart) {
                        var data = [];
                        var dataset = [];
                        var ticks = [];
                        chart = $.plot(elem, dataset, options);
                        elem.show();
                    } else {
                        var data = [[0, 0]];
                        var dataset = [{label: "Memory load", data: v, color: "#35aa47"}];
                        chart = $.plot(elem, dataset, options);
                        chart.setData(dataset);
                        chart.setupGrid();
                        chart.draw();
                    }
                });
            } else if (attrs.valuechart.indexOf("infrastructure") != -1) {

                // Start Handing the plot hover
                var previousPoint2 = null;
                function showChartTooltip(x, y, xValue, yValue) {
                    $('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
                        position: 'absolute',
                        display: 'none',
                        top: y - 40,
                        left: x - 40,
                        border: '0px solid #ccc',
                        padding: '2px 6px',
                        'background-color': '#fff'
                    }).appendTo("body").fadeIn(200);
                }
                elem.bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x.toFixed(2));
                    $("#y").text(pos.y.toFixed(2));
                    if (item) {
                        if (previousPoint2 != item.dataIndex) {
                            previousPoint2 = item.dataIndex;
                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);
                            showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + 'Gb');
                        }
                    }
                });
                elem.bind("mouseleave", function () {
                    $("#tooltip").remove();
                });
                // End of Handing the plot hover

                scope.$watch('dataChartBarInfra', function (v) {
                    var options = {
                        series: {
                            bars: {
                                show: true
                            },
                            fillColor: '#35aa47'
                        },
                        bars: {
                            align: "center",
                            barWidth: 0.8 ,
                            fillColor: '#35aa47'
                        },
                        xaxis: {
                            axisLabel: ".....",
                            axisLabelUseCanvas: true,
                            axisLabelFontSizePixels: 12,
                            axisLabelFontFamily: 'Verdana, Arial',
                            axisLabelPadding: 10,
                            font: {
                                lineHeight: 14,
                                style: "normal",
                                variant: "small-caps",
                                color: "#6F7B8A"
                            },
                            /* ticks: ticks*/
                        },
                        yaxis: {
                            axisLabel: ".....",

                            axisLabelFontSizePixels: 12,

                            axisLabelFontFamily: 'Verdana, Arial',

                            font: {
                                lineHeight: 14,
                                style: "normal",
                                variant: "small-caps",
                                color: "#6F7B8A"
                            },

                            tickFormatter: function (v, axis) {
                                return v.toFixed(3) + "Gb";
                            }
                        },
                        legend: {
                            noColumns: 0,
                            labelBoxBorderColor: "#000000",
                            position: "nw"
                        },
                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: "#eee",
                            borderColor: "#eee",
                            borderWidth: 1
                        }
                    };
                    if (!chart) {
                        var data = [];
                        var dataset = [];
                        var ticks = [];
                        chart = $.plot(elem, dataset, options);
                        elem.show();
                    } else {
                        var data = [[0, 0]];
                        var dataset = [{label: "Memory load", data: v, color: "#35aa47"}];
                        chart = $.plot(elem, dataset, options);
                        chart.setData(dataset);
                        chart.setupGrid();
                        chart.draw();
                    }
                });
            }
        }
    };
});

angular.module('odeskApp').directive('flotchartpie', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            var chart = null;
            var data = scope[attrs.ngModel];
            if (attrs.valuechart.indexOf("dashbar") != -1) {
                scope.$watch('dataChartPieDashbar', function (v) {
                    var options = {
                        series: {
                            pie: {
                                show: true,
                                radius: 1,
                                label: {
                                    show: true,
                                    radius: 2 / 3,
                                    formatter: function (label, series) {
                                        return '<div style="background: rgba(0,0,0,0.3);  font-size:8pt;text-align:center;padding:5px;color:white;">' +
                                            label + ' : ' +
                                            Math.round(series.percent) +
                                            '%</div>';
                                    },
                                    threshold: 0.1
                                },
                                background: {
                                    opacity: 0.8,
                                    color: '#555'
                                }
                            }
                        },
                        legend: {
                            show: false
                        }
                    };

                    if (!chart) {
                        var dataPie = [
                            {label: "", color: "#0000ff"},
                            {label: "", color: "#da00da"}

                        ];
                        chart = $.plot(elem, dataPie, options);
                        elem.show();

                    }
                    else {

                        var dataPie = [
                            {label: "Disk Used", data: v[0], color: "#0000ff"},
                            {label: "Disk Available", data: v[1], color: "#da00da"}

                        ];

                        chart = $.plot(elem, dataPie, options);
                        chart.setData(dataPie);
                        chart.setupGrid();
                        chart.draw();
                    }
                });
            }
            else if (attrs.valuechart.indexOf("database") != -1) {
                scope.$watch('dataChartPieDatabase', function (v) {
                    var options = {
                        series: {
                            pie: {
                                show: true,
                                radius: 1,
                                label: {
                                    show: true,
                                    radius: 2 / 3 ,
                                    formatter: function (label, series) {
                                        return '<div style="background: rgba(0,0,0,0.3);  font-size:8pt;text-align:center;padding:5px;color:white;">' +
                                            label + ' : ' +
                                            Math.round(series.percent) +
                                            '%</div>';
                                    },
                                    threshold: 0.1
                                },
                                background: {
                                    opacity: 0.8,
                                    color: '#000'
                                }
                            }
                        },
                        legend: {
                            show: false
                        }
                    };

                    if (!chart) {
                        var dataPie = [
                            {label: "", color: "#0000ff"},
                            {label: "", color: "#da00da"}

                        ];
                        chart = $.plot(elem, dataPie, options);
                        elem.show();
                    }
                    else {
                        var dataPie = [
                            {label: "Disk Used", data: v[0], color: "#0000ff"},
                            {label: "Disk Available", data: v[1], color: "#da00da"}
                        ];
                        chart = $.plot(elem, dataPie, options);
                        chart.setData(dataPie);
                        chart.setupGrid();
                        chart.draw();
                    }
                });
            }
            else if (attrs.valuechart.indexOf("file") != -1) {
                scope.$watch('dataChartPieFile', function (v) {
                    var options = {
                        series: {
                            pie: {
                                show: true,
                                radius: 1,
                                label: {
                                    show: true,
                                    radius: 2 / 3,
                                    formatter: function (label, series) {
                                        return '<div style="background: rgba(0,0,0,0.3);  font-size:8pt;text-align:center;padding:5px;color:white;">' +
                                            label + ' : ' +
                                            Math.round(series.percent) +
                                            '%</div>';
                                    },
                                    threshold: 0.1
                                },
                                background: {
                                    opacity: 0.8,
                                    color: '#000'
                                }
                            }
                        },
                        legend: {
                            show: false
                        }
                    };

                    if (!chart) {
                        var dataPie = [
                            {label: "", color: "#0000ff"},
                            {label: "", color: "#da00da"}

                        ];
                        chart = $.plot(elem, dataPie, options);
                        elem.show();
                    }

                    else {
                        var dataPie = [
                            {label: "Disk Used", data: v[0], color: "#0000ff"},
                            {label: "Disk Available", data: v[1], color: "#da00da"}
                        ];
                        chart = $.plot(elem, dataPie, options);
                        chart.setData(dataPie);
                        chart.setupGrid();
                        chart.draw();
                    }

                });
            }
            else if (attrs.valuechart.indexOf("infrastructure") != -1) {
                scope.$watch('dataChartPieInfra', function (v) {

                    var options = {
                        series: {
                            pie: {
                                show: true,
                                radius: 1,
                                label: {
                                    show: true,
                                    radius: 2 / 3,
                                    formatter: function (label, series) {
                                        return '<div style="background: rgba(0,0,0,0.3);  font-size:8pt;text-align:center;padding:5px;color:white;">' +
                                            label + ' : ' +
                                            Math.round(series.percent) +
                                            '%</div>';
                                    },
                                    threshold: 0.1
                                },
                                background: {
                                    opacity: 0.8,
                                    color: '#000'
                                }
                            }
                        },
                        legend: {
                            show: false
                        }
                    };


                    if (!chart) {
                        var dataPie = [
                            {label: "", color: "#0000ff"},
                            {label: "", color: "#da00da"}

                        ];
                        chart = $.plot(elem, dataPie, options);
                        elem.show();
                    }
                    else {

                        var dataPie = [
                            {label: "Disk Used", data: v[0], color: "#0000ff"},
                            {label: "Disk Available", data: v[1], color: "#da00da"}
                        ];
                        chart = $.plot(elem, dataPie, options);
                        chart.setData(dataPie);
                        chart.setupGrid();
                        chart.draw();
                    }
                });
            }
        }
    };
});