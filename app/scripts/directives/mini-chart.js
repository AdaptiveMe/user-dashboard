/**
 * Custom directive for flot JQuery library:
 * chart points and line model
 * this directive can plot 4 charts for each data of DOM element -> dashbar, database, file, infrastructure
 *
 * */

angular.module('odeskApp').directive('chart', function () {
    return {

        restrict: 'E',
        link: function (scope, elem, attrs) {

            var chart = null,
                opts = {

                    yaxis: {

                        max: constants.cpu_load_yaxis_max,
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

                    xaxis: {
                        tickFormatter: function (v, axis) {
                            return "";
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

            var previousPoint2 = null;

            if (attrs.valuechart.indexOf("dashbar") != -1) {

                scope.$watch('dataChartDashbar', function (o) {

                    if (!chart) {

                        var data = [[0, 0]];
                        chart = $.plot(elem, data, opts);
                        elem.show();

                    } else {

                        var arrayFormatDefaultd1 = [];
                        var arrayFormatDefaultd2 = [];
                        var arrayFormatDefaultd3 = [];
                        var counter1 = 0;
                        var array4 = [];
                        var arrayFormatDefaultd1 = [];

                        var arr = Object.keys(o).map(function (k) {

                            var param = (parseInt(o[k]) / 1024 / 1024 / 1024).toFixed(3);
                            //console.log("param: "+param);

                            if(true){

                            /*if (callNum == 1 || callNum == 5 || callNum == 9 || callNum == 13) {*/
                                param = Math.round(parseFloat(o[k]) * 100);
                                // console.log("/api/metrics/server/" + server + "/" + metric + "/" + number + ", value: " + param);

                            } else {
                                //console.log("/api/metrics/server/" + server + "/" + metric + "/" + number + ", value: " + param);
                            }

                            return param;

                        });

                        for (var i = 0; i < arr.length; i++) {
                            var array12 = [];
                            array12 [0] = i;
                            array12 [1] = arr[i];
                            arrayFormatDefaultd1[parseInt(constants.metric_total_values) - i] = array12;
                            arrayFormatDefaultd3 [i] = array12;
                        }

                        var dataChartFormatY = [
                            {
                                label: constants.label_cpu_load,
                                data: arrayFormatDefaultd1,
                                lines: {
                                    fill: 0.2,
                                    lineWidth: 0,
                                },
                                color: [constants.chart_color_cpu_load]
                            },
                            {
                                data: arrayFormatDefaultd1,
                                points: {
                                    show: true,
                                    fill: true,
                                    radius: 4,
                                    fillColor: constants.chart_color_cpu_load,
                                    lineWidth: 2
                                },
                                color: constants.chart_color_cpu_load,
                                shadowSize: 1
                            },
                            {
                                data: arrayFormatDefaultd1,
                                lines: {
                                    show: true,
                                    fill: false,
                                    lineWidth: 3
                                },
                                color: constants.chart_color_cpu_load,
                                shadowSize: 0
                            }
                        ];

                        var opts2 = {

                            xaxis: {
                                tickFormatter: function (dataChartFormatY, axis) {
                                    return "";
                                }
                                ,
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
                                ticks: constants.ticks_cpu_load_chart,
                                max: constants.cpu_load_yaxis_max,
                                axisLabel: 'axisLabel',
                                tickDecimals: 0,
                                tickColor: "#eee",
                                font: {
                                    lineHeight: 14,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                },
                                tickFormatter: function (dataChartFormatY, axis) {
                                    return dataChartFormatY + constants.text_averange;
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
                        function showChartTooltip(x,y, xValue, yValue) {
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

                                    showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + '% ,' + Object.keys(o) [ item.dataIndex - 1 ]);

                                }
                            }
                        });
                        elem.bind("mouseleave", function () {
                            $("#tooltip").remove();
                        });

                        // End of Handing the plot hover

                        chart = $.plot(elem, dataChartFormatY, opts2);
                        chart.setData(dataChartFormatY);
                        chart.setupGrid();
                        chart.draw();

                    }
                });
            }

            else if (attrs.valuechart.indexOf("database") != -1) {

                scope.$watch('dataChartDatabase', function (o) {


                    var arrayFormatDefaultd1 = [];
                    var arrayFormatDefaultd2 = [];
                    var arrayFormatDefaultd3 = [];
                    var counter1 = 0;
                    var array4 = [];
                    var arrayFormatDefaultd1 = [];

                    if (o === undefined) {

                    }else{

                        var arr = Object.keys(o).map(function (k) {

                            var param = (parseInt(o[k]) / 1024 / 1024 / 1024).toFixed(3);

                            if(true){

                                param = Math.round(parseFloat(o[k]) * 100);

                            } else {
                            }

                            return param;

                        });

                        for (var i = 0; i < arr.length; i++) {
                            var array12 = [];
                            array12 [0] = i;
                            array12 [1] = arr[i];
                            arrayFormatDefaultd1[parseInt(constants.metric_total_values) - i] = array12;
                            arrayFormatDefaultd3 [i] = array12;
                        }

                        var dataChartFormatY = [
                            {
                                label: constants.label_cpu_load,
                                data: arrayFormatDefaultd1,
                                lines: {
                                    fill: 0.2,
                                    lineWidth: 0,
                                },
                                color: [constants.chart_color_cpu_load]
                            },
                            {
                                data: arrayFormatDefaultd1,
                                points: {
                                    show: true,
                                    fill: true,
                                    radius: 4,
                                    fillColor: constants.chart_color_cpu_load,
                                    lineWidth: 2
                                },
                                color: constants.chart_color_cpu_load,
                                shadowSize: 1
                            },
                            {
                                data: arrayFormatDefaultd1,
                                lines: {
                                    show: true,
                                    fill: false,
                                    lineWidth: 3
                                },
                                color: constants.chart_color_cpu_load,
                                shadowSize: 0
                            }
                        ];

                        var opts2 = {

                            xaxis: {
                                tickFormatter: function (dataChartFormatY, axis) {
                                    return "";
                                }
                                ,
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
                                ticks: constants.ticks_cpu_load_chart,
                                max: constants.cpu_load_yaxis_max,
                                axisLabel: 'axisLabel',
                                tickDecimals: 0,
                                tickColor: "#eee",
                                font: {
                                    lineHeight: 14,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                },
                                tickFormatter: function (dataChartFormatY, axis) {
                                    return dataChartFormatY +constants.text_averange;
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

                        function showChartTooltip(x,y, xValue, yValue) {
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

                                    showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + '% ,' + Object.keys(o)[item.dataIndex - 1]);

                                }
                            }
                        });

                        elem.bind("mouseleave", function () {
                            $("#tooltip").remove();
                        });

                        chart = $.plot(elem, dataChartFormatY, opts2);
                        chart.setData(dataChartFormatY);
                        chart.setupGrid();
                        chart.draw();
                    }



                });
            }
            else if (attrs.valuechart.indexOf("file") != -1) {

                scope.$watch('dataChartFile', function (o) {

                    var arrayFormatDefaultd1 = [];
                    var arrayFormatDefaultd2 = [];
                    var arrayFormatDefaultd3 = [];
                    var counter1 = 0;
                    var array4 = [];
                    var arrayFormatDefaultd1 = [];

                    if (o === undefined) {

                    }else {

                        var arr = Object.keys(o).map(function (k) {

                            var param = (parseInt(o[k]) / 1024 / 1024 / 1024).toFixed(3);
                            //console.log("param: "+param);

                            if (true) {

                                /*if (callNum == 1 || callNum == 5 || callNum == 9 || callNum == 13) {*/
                                param = Math.round(parseFloat(o[k]) * 100);
                                // console.log("/api/metrics/server/" + server + "/" + metric + "/" + number + ", value: " + param);

                            } else {
                                //console.log("/api/metrics/server/" + server + "/" + metric + "/" + number + ", value: " + param);
                            }

                            return param;

                        });

                        for (var i = 0; i < arr.length; i++) {
                            var array12 = [];
                            array12 [0] = i;
                            array12 [1] = arr[i];
                            arrayFormatDefaultd1[parseInt(constants.metric_total_values) - i] = array12;
                            arrayFormatDefaultd3 [i] = array12;
                        }

                        var dataChartFormatY = [
                            {
                                label: constants.label_cpu_load,
                                data: arrayFormatDefaultd1,
                                lines: {
                                    fill: 0.2,
                                    lineWidth: 0,
                                },
                                color: [constants.chart_color_cpu_load]
                            },
                            {
                                data: arrayFormatDefaultd1,
                                points: {
                                    show: true,
                                    fill: true,
                                    radius: 4,
                                    fillColor: constants.chart_color_cpu_load,
                                    lineWidth: 2
                                },
                                color: constants.chart_color_cpu_load,
                                shadowSize: 1
                            },
                            {
                                data: arrayFormatDefaultd1,
                                lines: {
                                    show: true,
                                    fill: false,
                                    lineWidth: 3
                                },
                                color: constants.chart_color_cpu_load,
                                shadowSize: 0
                            }
                        ];

                        var opts2 = {

                            xaxis: {
                                tickFormatter: function (dataChartFormatY, axis) {
                                    return "";
                                }
                                ,
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
                                ticks: constants.ticks_cpu_load_chart,
                                max: constants.cpu_load_yaxis_max,
                                axisLabel: 'axisLabel',
                                tickDecimals: 0,
                                tickColor: "#eee",
                                font: {
                                    lineHeight: 14,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                },
                                tickFormatter: function (dataChartFormatY, axis) {
                                    return dataChartFormatY + constants.text_averange;
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

                                    showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + constants.text_averange + ' ,' + Object.keys(o)[item.dataIndex - 1]);

                                }
                            }
                        });

                        elem.bind("mouseleave", function () {
                            $("#tooltip").remove();
                        });

                        chart = $.plot(elem, dataChartFormatY, opts2);
                        chart.setData(dataChartFormatY);
                        chart.setupGrid();
                        chart.draw();
                    }
                });
            }
            else if (attrs.valuechart.indexOf("infrastructure") != -1) {

                scope.$watch('dataChartInfra', function (o) {

                    var arrayFormatDefaultd1 = [];
                    var arrayFormatDefaultd2 = [];
                    var arrayFormatDefaultd3 = [];
                    var counter1 = 0;
                    var array4 = [];
                    var arrayFormatDefaultd1 = [];

                    if (o === undefined) {

                    }else {

                        var arr = Object.keys(o).map(function (k) {

                            var param = (parseInt(o[k]) / 1024 / 1024 / 1024).toFixed(3);

                            if (true) {

                                param = Math.round(parseFloat(o[k]) * 100);

                            } else {
                                //console.log("/api/metrics/server/" + server + "/" + metric + "/" + number + ", value: " + param);
                            }

                            return param;

                        });

                        for (var i = 0; i < arr.length; i++) {
                            var array12 = [];
                            array12 [0] = i;
                            array12 [1] = arr[i];
                            arrayFormatDefaultd1[parseInt(constants.metric_total_values) - i] = array12;
                            arrayFormatDefaultd3 [i] = array12;
                        }

                        var dataChartFormatY = [
                            {
                                label: constants.label_cpu_load,
                                data: arrayFormatDefaultd1,
                                lines: {
                                    fill: 0.2,
                                    lineWidth: 0,
                                },
                                color: [constants.chart_color_cpu_load]
                            },
                            {
                                data: arrayFormatDefaultd1,
                                points: {
                                    show: true,
                                    fill: true,
                                    radius: 4,
                                    fillColor: constants.chart_color_cpu_load,
                                    lineWidth: 2
                                },
                                color: constants.chart_color_cpu_load,
                                shadowSize: 1
                            },
                            {
                                data: arrayFormatDefaultd1,
                                lines: {
                                    show: true,
                                    fill: false,
                                    lineWidth: 3
                                },
                                color: constants.chart_color_cpu_load,
                                shadowSize: 0
                            }
                        ];


                        var opts2 = {

                            xaxis: {
                                tickFormatter: function (dataChartFormatY, axis) {
                                    return "";
                                }
                                ,
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
                                ticks: constants.ticks_cpu_load_chart,
                                max: constants.cpu_load_yaxis_max,
                                axisLabel: 'axisLabel',
                                tickDecimals: 0,
                                tickColor: "#eee",
                                font: {
                                    lineHeight: 14,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                },
                                tickFormatter: function (dataChartFormatY, axis) {
                                    return dataChartFormatY + constants.text_averange;
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
                                    showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + constants.text_averange + ' ,' + Object.keys(o)[item.dataIndex - 1]);

                                }
                            }
                        });

                        elem.bind("mouseleave", function () {
                            $("#tooltip").remove();
                        });

                        chart = $.plot(elem, dataChartFormatY, opts2);
                        chart.setData(dataChartFormatY);
                        chart.setupGrid();
                        chart.draw();

                    }

                });
            }

        }
    };
});

/**
 * Custom directive for flot JQuery library:
 * chart bar model
 * this directive can plot 4 charts for each data of DOM element -> dashbar, database, file, infrastructure
 *
 * */

angular.module('odeskApp').directive('flotchartbar', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {

            var chart = null;
            var data = scope[attrs.ngModel];
            var array1 = [];
            var array2 = [];

            if (attrs.valuechart.indexOf("dashbar") != -1) {

                var previousPoint2 = null;
                scope.$watch('dataChartBarDashbar', function (v) {

                    if (!chart) {

                        var options = {
                            series: {
                                bars: {
                                    show: true
                                },
                                fillColor: constants.bar
                            },
                            bars: {
                                align: "center",
                                barWidth: constants.bar_width,
                                fillColor: constants.bar_color
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
                                max: constants.memory_load_yaxis_max,
                                axisLabel: ".....",

                                axisLabelFontSizePixels: 12,
                                axisLabelFontFamily: 'Verdana, Arial',

                                font: {
                                    lineHeight: 14,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
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

                        var data = [];
                        var dataset = [];
                        var ticks = [];
                        chart = $.plot(elem, dataset, options);
                        elem.show();
                    } else {

                        var arrayFormatDefaultd1 = [];
                        var arrayFormatDefaultd2 = [];
                        var arrayFormatDefaultd3 = [];
                        var counter1 = 0;
                        var array4 = [];

                        var arr = Object.keys(v).map(function (k) {

                            var param = (parseInt(v[k]) / 1024 / 1024 / 1024).toFixed(3);
                            return param;

                        });

                        for (var i = 0; i < arr.length; i++) {
                            var array12 = [];
                            array12 [0] = i;
                            array12 [1] = arr[i];
                            arrayFormatDefaultd1[parseInt(constants.metric_total_values) - i] = array12;
                            arrayFormatDefaultd3 [i] = array12;
                        }

                        // Start Handing the plot hover

                        function showChartTooltip(x,y, xValue, yValue) {
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

                                    showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + 'Gb ,' + Object.keys(v) [ item.dataIndex - 1 ]);

                                }
                            }
                        });
                        elem.bind("mouseleave", function () {
                            $("#tooltip").remove();
                        });

                        var options = {
                            series: {
                                bars: {
                                    show: true
                                },
                                fillColor: constants.bar_color
                            },
                            bars: {
                                align: "center",
                                barWidth: constants.bar_width,
                                fillColor: constants.bar_color
                            },
                            xaxis: {
                                tickFormatter: function (arrayFormatDefaultd1, axis) {
                                    return "";
                                }
                                ,
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
                                max: constants.memory_load_yaxis_max,
                                axisLabel: ".....",

                                axisLabelFontSizePixels: 12,
                                axisLabelFontFamily: 'Verdana, Arial',

                                font: {
                                    lineHeight: 14,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                },

                                tickFormatter: function (arrayFormatDefaultd1, axis) {
                                    return arrayFormatDefaultd1.toFixed(2) + "Gb";
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

                        var data = [[0, 0]];
                        var dataset = [{label: constants.label_memory_load, data: arrayFormatDefaultd1, color: constants.bar_color}];
                        chart = $.plot(elem, dataset, options);
                        chart.setData(dataset);
                        chart.setupGrid();
                        chart.draw();
                    }
                });

            } else if (attrs.valuechart.indexOf("database") != -1) {

                // Start Handing the plot hover
                var previousPoint2 = null;

                scope.$watch('dataChartBarDatabase', function (v) {
                    var options = {
                        series: {
                            bars: {
                                show: true
                            },
                            fillColor: constants.bar_color
                        },
                        bars: {
                            align: "center",
                            barWidth: constants.bar_width,
                            fillColor: constants.bar_color
                        },
                        xaxis: {
                            tickFormatter: function (v, axis) {
                                return "";
                            }
                            ,
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
                            max: 1,
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
                                return v.toFixed(2) + constants.text_gb;
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

                        //////////

                        var arrayFormatDefaultd1 = [];
                        var arrayFormatDefaultd2 = [];
                        var arrayFormatDefaultd3 = [];
                        var counter1 = 0;
                        var array4 = [];

                        var arr = Object.keys(v).map(function (k) {

                            var param = (parseInt(v[k]) / 1024 / 1024 / 1024).toFixed(3);
                            return param;

                        });

                        for (var i = 0; i < arr.length; i++) {
                            var array12 = [];
                            array12 [0] = i;
                            array12 [1] = arr[i];
                            arrayFormatDefaultd1[parseInt(constants.metric_total_values) - i] = array12;
                            arrayFormatDefaultd3 [i] = array12;
                        }

                        // Start Handing the plot hover

                        function showChartTooltip(x,y, xValue, yValue) {
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

                                    showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + 'Gb ,' + Object.keys(v) [ item.dataIndex - 1 ]);

                                }
                            }
                        });
                        elem.bind("mouseleave", function () {
                            $("#tooltip").remove();
                        });
                        ///////

                        var options = {
                            series: {
                                bars: {
                                    show: true
                                },
                                fillColor: constants.bar_color
                            },
                            bars: {
                                align: "center",
                                barWidth: constants.bar_width,
                                fillColor: constants.bar_color
                            },
                            xaxis: {
                                tickFormatter: function (arrayFormatDefaultd1, axis) {
                                    return "";
                                }
                                ,
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
                                max: constants.memory_load_yaxis_max,
                                axisLabel: ".....",

                                axisLabelFontSizePixels: 12,
                                axisLabelFontFamily: 'Verdana, Arial',

                                font: {
                                    lineHeight: 14,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                },

                                tickFormatter: function (arrayFormatDefaultd1, axis) {
                                    return arrayFormatDefaultd1.toFixed(2) + "Gb";
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

                        var data = [[0, 0]];
                        var dataset = [{label: constants.label_memory_load, data: arrayFormatDefaultd1, color: constants.bar_color}];

                        chart = $.plot(elem, dataset, options);
                        chart.setData(dataset);
                        chart.setupGrid();
                        chart.draw();
                    }
                });

            } else if (attrs.valuechart.indexOf("file") != -1) {

                // Start Handing the plot hover
                var previousPoint2 = null;

                scope.$watch('dataChartBarFile', function (v) {
                    var options = {
                        series: {
                            bars: {
                                show: true
                            },
                            fillColor: constants.bar_color
                        },
                        bars: {
                            align: "center",
                            barWidth: constants.bar_width,
                            fillColor: constants.bar_color
                        },
                        xaxis: {
                            tickFormatter: function (v, axis) {
                                return "";
                            }
                            ,
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
                            max: constants.memory_load_yaxis_max,
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
                                return v.toFixed(2) + constants.text_gb;
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
                        var arrayFormatDefaultd1 = [];
                        var arrayFormatDefaultd2 = [];
                        var arrayFormatDefaultd3 = [];
                        var counter1 = 0;
                        var array4 = [];

                        var arr = Object.keys(v).map(function (k) {

                            var param = (parseInt(v[k]) / 1024 / 1024 / 1024).toFixed(3);
                            return param;

                        });

                        for (var i = 0; i < arr.length; i++) {
                            var array12 = [];
                            array12 [0] = i;
                            array12 [1] = arr[i];
                            arrayFormatDefaultd1[parseInt(constants.metric_total_values) - i] = array12;
                            arrayFormatDefaultd3 [i] = array12;
                        }

                        function showChartTooltip(x,y, xValue, yValue) {
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

                                    showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + constants.text_gb+' ,' + Object.keys(v) [ item.dataIndex - 1 ]);

                                }
                            }
                        });
                        elem.bind("mouseleave", function () {
                            $("#tooltip").remove();
                        });
                        ///////

                        var options = {
                            series: {
                                bars: {
                                    show: true
                                },
                                fillColor: constants.bar_color
                            },
                            bars: {
                                align: "center",
                                barWidth: constants.bar_width,
                                fillColor: constants.bar_color
                            },
                            xaxis: {
                                tickFormatter: function (arrayFormatDefaultd1, axis) {
                                    return "";
                                }
                                ,
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
                                max: constants.memory_load_yaxis_max,
                                axisLabel: ".....",

                                axisLabelFontSizePixels: 12,
                                axisLabelFontFamily: 'Verdana, Arial',

                                font: {
                                    lineHeight: 14,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                },

                                tickFormatter: function (arrayFormatDefaultd1, axis) {
                                    return arrayFormatDefaultd1.toFixed(2) + constants.text_gb;
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

                        var data = [[0, 0]];
                        var dataset = [{label: constants.label_memory_load, data: arrayFormatDefaultd1, color: constants.bar_color}];

                        chart = $.plot(elem, dataset, options);
                        chart.setData(dataset);
                        chart.setupGrid();
                        chart.draw();
                    }
                });

            } else if (attrs.valuechart.indexOf("infrastructure") != -1) {

                // Start Handing the plot hover
                var previousPoint2 = null;

                scope.$watch('dataChartBarInfra', function (v) {

                    if (!chart) {
                        var options = {
                            series: {
                                bars: {
                                    show: true
                                },
                                fillColor: constants.bar_color
                            },
                            bars: {
                                align: "center",
                                barWidth: constants.bar_width,
                                fillColor: constants.bar_color
                            },
                            xaxis: {
                                tickFormatter: function (v, axis) {
                                    return "";
                                }
                                ,
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
                                    return v.toFixed(2) + constants.text_gb;
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
                        var data = [];
                        var dataset = [];
                        var ticks = [];
                        chart = $.plot(elem, dataset, options);
                        elem.show();
                    } else {

                        var arrayFormatDefaultd1 = [];
                        var arrayFormatDefaultd2 = [];
                        var arrayFormatDefaultd3 = [];
                        var counter1 = 0;
                        var array4 = [];

                        var arr = Object.keys(v).map(function (k) {

                            var param = (parseInt(v[k]) / 1024 / 1024 / 1024).toFixed(3);
                            return param;

                        });

                        for (var i = 0; i < arr.length; i++) {
                            var array12 = [];
                            array12 [0] = i;
                            array12 [1] = arr[i];
                            arrayFormatDefaultd1[parseInt(constants.metric_total_values) - i] = array12;
                            arrayFormatDefaultd3 [i] = array12;
                        }

                        function showChartTooltip(x,y, xValue, yValue) {
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

                                    showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + constants.text_gb+' ,' + Object.keys(v) [ item.dataIndex - 1 ]);

                                }
                            }
                        });
                        elem.bind("mouseleave", function () {
                            $("#tooltip").remove();
                        });

                        var options = {
                            series: {
                                bars: {
                                    show: true
                                },
                                fillColor:constants.bar_color
                            },
                            bars: {
                                align: "center",
                                barWidth: constants.bar_width,
                                fillColor: constants.bar_color
                            },
                            xaxis: {
                                tickFormatter: function (arrayFormatDefaultd1, axis) {
                                    return "";
                                }
                                ,
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

                                tickFormatter: function (arrayFormatDefaultd1, axis) {
                                    return arrayFormatDefaultd1.toFixed(2) + constants.text_gb;
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

                        var data = [[0, 0]];
                        var dataset = [{label: constants.label_memory_load, data: arrayFormatDefaultd1, color:constants.bar_color}];

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

/**
 * Custom directive for Flotpie JQuery library:  chart pie model, this directive can
 plot 4 charts for each data of DOM element -> dashbar, database, file, infrastructure
 *
 * */

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
                                    radius: 1 / 3,
                                    formatter: function (label, series) {
                                        return '<div style="background: rgba(0,0,0,0.3);  font-size:8pt;text-align:center;padding:5px;color:white;">' +
                                            label + ' : ' +
                                            Math.round(series.percent) +
                                            '%</div>';
                                    },
                                    threshold: 0.1
                                },
                                background: {
                                    opacity: constants.bar_width,
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
                            {label: "", color: constants.piechart_color_disk_used},
                            {label: "", color: constants.piechart_color_disk_available}

                        ];
                        chart = $.plot(elem, dataPie, options);
                        elem.show();

                    }
                    else {

                        var dataPie = [
                            {label: constants.label_disk_used, data: v[0], color: constants.piechart_color_disk_used},
                            {label: constants.label_disk_available, data: v[1], color: constants.piechart_color_disk_available}
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
                                    radius: 1.5 / 3,
                                    formatter: function (label, series) {
                                        return '<div style="background: rgba(0,0,0,0.3);  font-size:8pt;text-align:center;padding:5px;color:white;">' +
                                            label + ' : ' +
                                            Math.round(series.percent) +
                                            constants.text_averange+'</div>';
                                    },
                                    threshold: 0.1
                                },
                                background: {
                                    opacity: constants.bar_width,
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
                            {label: "", color: constants.piechart_color_disk_used},
                            {label: "", color: constants.piechart_color_disk_available}

                        ];
                        chart = $.plot(elem, dataPie, options);
                        elem.show();
                    }
                    else {
                        var dataPie = [
                            {label: constants.label_disk_used, data: v[0], color: constants.piechart_color_disk_used},
                            {label: constants.label_disk_available, data: v[1], color:constants.piechart_color_disk_available}
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
                                    radius: 1.5 / 3,
                                    formatter: function (label, series) {
                                        return '<div style="background: rgba(0,0,0,0.3);  font-size:8pt;text-align:center;padding:5px;color:white;">' +
                                            label + ' : ' +
                                            Math.round(series.percent) +
                                            constants.text_averange+'</div>';
                                    },
                                    threshold: 0.1
                                },
                                background: {
                                    opacity: constants.bar_width,
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
                            {label: "", color: constants.piechart_color_disk_used},
                            {label: "", color: constants.piechart_color_disk_available}

                        ];
                        chart = $.plot(elem, dataPie, options);
                        elem.show();
                    }

                    else {
                        var dataPie = [
                            {label: constants.label_disk_used, data: v[0], color: constants.piechart_color_disk_used},
                            {label: constants.label_disk_available, data: v[1], color: constants.piechart_color_disk_available}
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
                                    radius: 1.5 / 3,
                                    formatter: function (label, series) {
                                        return '<div style="background: rgba(0,0,0,0.3);  font-size:8pt;text-align:center;padding:5px;color:white;">' +
                                            label + ' : ' +
                                            Math.round(series.percent) +
                                            constants.text_averange+'</div>';
                                    },
                                    threshold: 0.1
                                },
                                background: {
                                    opacity: constants.bar_width,
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
                            {label: "", color: constants.piechart_color_disk_used},
                            {label: "", color: constants.piechart_color_disk_available}

                        ];
                        chart = $.plot(elem, dataPie, options);
                        elem.show();
                    }
                    else {

                        var dataPie = [
                            {label: constants.label_disk_used, data: v[0], color: constants.piechart_color_disk_used},
                            {label: constants.label_disk_available, data: v[1], color:constants.piechart_color_disk_available}
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


/*angular.module('odeskApp').directive("sparklinechart1", function () {

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
 });*/