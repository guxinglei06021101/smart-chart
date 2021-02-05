(function (root, factory) {if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'echarts'], factory);
} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('echarts'));
} else {
    // Browser globals
    factory({}, root.echarts);
}
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    var contrastColor = '#aaa';
    var axisCommon = function () {
        return {
            axisLine: {
                lineStyle: {
                    color: contrastColor
                }
            },
            axisTick: {
                lineStyle: {
                    color: contrastColor
                }
            },
            axisLabel: {
                textStyle: {
                    color: contrastColor
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#24214e'
                }
            },
            splitArea: {
                areaStyle: {
                    color: contrastColor
                }
            }
        };
    };

    var colorPalette = [
        "#3b5ede","#6A5ACD","#fea31e","#7cb5ec",
        "#99cc33","#3a8bf9","#4682B4","#30a605",
        "#27a08d"
    ];

    var theme = {
        color: colorPalette,
        backgroundColor: '#040f3c',
        legend: {
            textStyle: {
                color: '#ffffff'
            }
        },
        title: {
            textStyle: {
                fontWeight: 'normal'
            }
        },

        visualMap: {
            color:['#1790cf','#a2d4e6']
        },

        toolbox: {
            iconStyle: {
                normal: {
                    borderColor: '#06467c'
                }
            }
        },

        tooltip: {
            backgroundColor: 'rgba(0,0,0,0.6)',
            textStyle:{
                color:'#ffffff',
            }
        },

        timeAxis: axisCommon(),
        logAxis: axisCommon(),
        valueAxis: axisCommon(),
        categoryAxis: axisCommon(),
        line: {
            symbol: 'circle'
        },
        dataZoom: {
            dataBackgroundColor: '#dedede',
            fillerColor: 'rgba(154,217,247,0.2)',
            handleColor: '#005eaa'
        },

        timeline: {
            lineStyle: {
                color: '#ffffff'
            },
            controlStyle: {
                normal: {
                    color: '#005eaa',
                    borderColor: '#005eaa'
                }
            }
        },

        candlestick: {
            itemStyle: {
                normal: {
                    color: '#c12e34',
                    color0: '#2b821d',
                    lineStyle: {
                        width: 1,
                        color: '#c12e34',
                        color0: '#2b821d'
                    }
                }
            }
        },

        graph: {
            color: colorPalette
        },

        map: {
            label: {
                normal: {
                    textStyle: {
                        color: '#c12e34'
                    }
                },
                emphasis: {
                    textStyle: {
                        color: '#c12e34'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#eee',
                    areaColor: '#ddd'
                },
                emphasis: {
                    areaColor: '#e6b600'
                }
            }
        },
        radar:{
            splitLine: { // (这里是指所有圆环)坐标轴在 grid 区域中的分隔线。
                lineStyle: {
                    color: '#999',
                    // 分隔线颜色
                    width: 1,
                    // 分隔线线宽
                }
            }
        },
        gauge: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: [[0.2, '#2b821d'],[0.8, '#005eaa'],[1, '#c12e34']],
                    width: 5
                }
            },
            axisTick: {
                splitNumber: 10,
                length:8,
                lineStyle: {
                    color: 'auto'
                }
            },
            axisLabel: {
                textStyle: {
                    color: 'auto'
                }
            },
            splitLine: {
                length: 12,
                lineStyle: {
                    color: 'auto'
                }
            },
            pointer: {
                length: '90%',
                width: 3,
                color: 'auto'
            },
            title: {
                textStyle: {
                    color: '#333'
                }
            },
            detail: {
                textStyle: {
                    color: 'auto'
                }
            }
        }
    };
    echarts.registerTheme('blue', theme);
}));