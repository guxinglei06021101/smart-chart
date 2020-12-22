$(function(){
	progress1char();
		linchar();
    lincharQuitType();
    lincharQuitDay();
    pienestcharQuitTotal();
    radarchar();

});
window.onresize = function(){
    linchart.resize();
    linchartQuitType.resize();
    linchartQuitDay.resize();
    pienestchartQuitTotal.resize();
    //barschart.resize();
    progress1chart.resize();
	 //progress2chart.resize()
    radarchart.resize();
}

function ajax_get(url,successfunction){
    $.ajax({
                    //请求方式
                    type : "GET",
                    //请求的媒体类型
                    //contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    //请求地址
                    url : url,
                    async: true,
                    //数据，json字符串
                    //data : JSON.stringify(list),
                    //请求成功
                    success : function(result) {
                        console.log(result);
                       	successfunction(result);
                    },
                    //请求失败，包含具体的错误信息
                    error : function(e){
                        console.log(e.status);
                        console.log(e.responseText);
                    }
                });
}


var pienestchartQuitTotal="";
function pienestcharQuitTotal(){

    var url = "/personnel/queryQuitTotalRate";
    ajax_get(url,function(result){

        var lowData = [
            {value: result.lessMonthCount,name: '不满1个月'},
            {value: result.threeMonthCount,name: '1~3个月'},
            {value: result.sixMonthCount,name: '3~6个月'},
            {value: result.yearCount,name: '6~12个月'},
            {value: result.manyYearCount,name: '1年及以上'},
        ];

        var bigData= [
            {value: result.weekCount,name: '不满7天'},
            {value: result.twoWeekCount,name: '7天以上'},
            {value: result.monthCount,name: '15天以上'},
            {value: result.threeMonthCount,name: '1~3个月'},
            {value: result.sixMonthCount,name: '3~6个月'},
            {value: result.yearCount,name: '6~12个月'},
            {value: result.manyYearCount,name: '1年及以上'}
        ];

        var option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color: ["#24998d","#fea31e","#5d29f7","#7cb5ec","#957bde","#99cc33","#4682B4","#4f8bf9"],
            legend: { //图例组件，颜色和名字
                left: '1%',
                top: '95',
                orient: 'vertical',
                itemGap: 12, //图例每项之间的间隔
                itemWidth: 16,
                itemHeight: 12,
                icon: 'rect',
                data: ['不满7天', '7天以上', '15天以上','不满1个月', '1~3个月','3~6个月','6~12个月','1年及以上'],
                textStyle: {
                    color: [],
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            series: [{
                name: '在职天数',
                type: 'pie',
                clockwise: false, //饼图的扇区是否是顺时针排布
                minAngle: 20, //最小的扇区角度（0 ~ 360）
                center: ['60%', '60%'], //饼图的中心（圆心）坐标
                radius: [70, 100], //饼图的半径
                avoidLabelOverlap: true, ////是否启用防止标签重叠
                itemStyle: { //图形样式
                    normal: {
                        borderColor: '#1e2239',
                        borderWidth: 1.5
                    },
                },

                label: { //标签的位置
                    normal: {
                        show: true,
                        position: 'inside', //标签的位置
                        formatter: "{d}%",
                        textStyle: {
                            color: '#fff',
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontWeight: 'bold'
                        }
                    }
                },
                data: bigData
            }, {
                name:'在职天数',
                type: 'pie',
                clockwise: false,
                //silent: true,
                minAngle: 20, //最小的扇区角度（0 ~ 360）
                center: ['60%', '60%'], //饼图的中心（圆心）坐标
                radius: [0, 50], //饼图的半径
                itemStyle: { //图形样式
                    normal: {
                        borderColor: '#1e2239',
                        borderWidth: 1.5,
                        opacity: 0.5,
                    }
                },
                label: { //标签的位置
                    normal: {
                        show: false,
                    }
                },
                data: lowData
            }]
        };

        pienestchartQuitTotal= echarts.init(document.getElementById("pie-nestchar"));
        pienestchartQuitTotal.setOption(option);

    });
}

//折线图
var linchart="";
function linchar(){
        var url = "/personnel/queryQuitRate";
        linchart= echarts.init(document.getElementById("line-chart"));
         ajax_get(url,function(result){
            var yearArr = [];
            var rateArr = [];
             result.forEach(function(item){
                 yearArr.push(item.year);
                 rateArr.push(item.rateList);
             });
            option = {
                tooltip: {//鼠标指上时的标线
                    trigger: 'axis',
                    formatter: '{b}<br/> {a0}: {c0}%<br/>{a1}: {c1}%<br/>{a2}: {c2}%<br/>{a3}: {c3}%',
                    axisPointer: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                legend: {
                    icon: 'rect',
                    itemWidth: 14,
                    itemHeight: 5,
                    itemGap: 13,
                    data: yearArr,
                    right: '5px',
                    top: '10px',
                    textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                },
                grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '5%',
                        top: '18%',
                        containLabel: true,
                        z: 22
                    },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color:'#fff',
                        },
                    },
                    data: ['1月', '2月', '3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }],
                yAxis: [{
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#57617B',

                        }
                    },
                    axisLabel: {
                        margin: 10,
                        formatter: '{value}%',
                        textStyle: {
                            fontSize: 14
                        },
                        textStyle: {
                            color:'#fff',
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.2)',
                            type:'dotted',
                        }
                    }
                }],
                series: [{
                    name: yearArr[0],
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(137, 189, 27, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(137, 189, 27, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(137,189,27)'
                        }
                    },
                    data: rateArr[0]
                }, {
                    name: yearArr[1],
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 136, 212, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 136, 212, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(0,136,212)'
                        }
                    },
                    data: rateArr[1]
                }, {
                    name: yearArr[2],
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(219, 50, 51, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(219, 50, 51, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(219,50,51)'
                        }
                    },
                    data: rateArr[2]
                },
                 {
                 name: yearArr[3],
                 type: 'line',
                 smooth: true,
                 lineStyle: {
                     normal: {
                         width: 2
                     }
                 },
                 areaStyle: {
                     normal: {
                         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                             offset: 0,
                             color: 'rgba(255,154,0, 0.3)'
                         }, {
                             offset: 0.8,
                             color: 'rgba(255,154,0, 0)'
                         }], false),
                         shadowColor: 'rgba(0, 0, 0, 0.1)',
                         shadowBlur: 10
                     }
                 },
                 itemStyle: {
                     normal: {
                         color: 'rgba(255,154,0)'
                     }
                 },
                 data: rateArr[3]
             },]
            };
            linchart.setOption(option);
        })
}


//折线图
var linchartQuitType="";
function lincharQuitType(){
    /*var url = "/personnel/queryQuitTypeRate";
    ajax_get(url,function(result){
        var yearArr = [];
        result.forEach(function(item){
            yearArr.push(item.year+"");
        });

    })*/

    option = {
        tooltip: {//鼠标指上时的标线
            trigger: 'axis',
            formatter: '{b}<br/> {a0}: {c0}%<br/>{a1}: {c1}%<br/>{a2}: {c2}%<br/>{a3}: {c3}%',
            axisPointer: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['2020','2019','2018','2017'],
            right: '5px',
            top: '10px',
            textStyle: {
                fontSize: 12,
                color: '#fff'
            }
        },
        grid: {
            left: '3%',
            right: '3%',
            bottom: '5%',
            top: '18%',
            containLabel: true,
            z: 22
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            axisLabel: {
                textStyle: {
                    color:'#fff',
                },
            },
            data: ['高管','管理层','文员','操作','司机','后勤']
        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#57617B',

                }
            },
            axisLabel: {
                margin: 10,
                formatter: '{value}%',
                textStyle: {
                    fontSize: 14
                },
                textStyle: {
                    color:'#fff',
                },
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.2)',
                    type:'dotted',
                }
            }
        }],
        series: [{
            name: '2020',
            type: 'line',
            smooth: true,
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(137, 189, 27, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(137, 189, 27, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(137,189,27)'
                }
            },
            //data: [result[1].seniorRate,result[1].managementRate,result[1].officeRate,result[1].operationRate,result[1].driverRate,result[1].logisticsRate]
            data: [0,1.27,3.74,14.52,3.89,5.44]
        }, {
            name: '2019',
            type: 'line',
            smooth: true,
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0, 136, 212, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(0, 136, 212, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(0,136,212)'
                }
            },
            data: [0.14,1.72,4.82,16.63,5.11,7.78]
        }, {
            name: '2018',
            type: 'line',
            smooth: true,
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(219, 50, 51, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(219, 50, 51, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(219,50,51)'
                }
            },
            data: [0.94,1.82,5.02,16.54,4.84,7.52]
        },
            {
                name: '2017',
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255,154,0, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(255,154,0, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(255,154,0)'
                    }
                },
                data: [0.69,2.90,6.22,15.82,5.94,7.17]
            },]
    };
    linchartQuitType= echarts.init(document.getElementById("line-chart-quit"));
    linchartQuitType.setOption(option);
}


//折线图
var linchartQuitDay="";
function lincharQuitDay(){
    var url = "/personnel/queryQuitDayRate";
    linchartQuitDay= echarts.init(document.getElementById("line-chart-quit-day"));
    ajax_get(url,function(result){
        var yearArr = [];
        var rateArr = [];
        result.forEach(function(item){
            yearArr.push(item.year);
            rateArr.push(item.rateList);
        });
        option = {
            tooltip: {//鼠标指上时的标线
                trigger: 'axis',
                formatter: '{b}<br/> {a0}: {c0}%<br/>{a1}: {c1}%<br/>{a2}: {c2}%<br/>{a3}: {c3}%',
                axisPointer: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            legend: {
                icon: 'rect',
                itemWidth: 14,
                itemHeight: 5,
                itemGap: 13,
                data: yearArr,
                right: '5px',
                top: '10px',
                textStyle: {
                    fontSize: 12,
                    color: '#fff'
                }
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '5%',
                top: '18%',
                containLabel: true,
                z: 22
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color:'#fff',
                    },
                },
                data: ['不满7天','7天以上','15天以上','1~3个月','3~6个月','6~12个月','1年及以上']
            }],
            yAxis: [{
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B',

                    }
                },
                axisLabel: {
                    margin: 10,
                    formatter: '{value}%',
                    textStyle: {
                        fontSize: 14
                    },
                    textStyle: {
                        color:'#fff',
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.2)',
                        type:'dotted',
                    }
                }
            }],
            series: [{
                name: yearArr[0],
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(137, 189, 27, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(137, 189, 27, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(137,189,27)'
                    }
                },
                data: rateArr[0]
            }, {
                name: yearArr[1],
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 136, 212, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 136, 212, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(0,136,212)'
                    }
                },
                data: rateArr[1]
            }, {
                name: yearArr[2],
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(219, 50, 51, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(219, 50, 51, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(219,50,51)'
                    }
                },
                data: rateArr[2]
            },
                {
                    name: yearArr[3],
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(255,154,0, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(255,154,0, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,154,0)'
                        }
                    },
                    data: rateArr[3]
                },]
        };
        linchartQuitDay.setOption(option);
    })
}

//横向柱状图
var progress1chart="";
function progress1char(){
    var url ="/personnel/queryEduTypeGroup/1";
    progress1chart = echarts.init(document.getElementById("progress1-chart"));
    ajax_get(url,function(result){

        option = {//"","#4682B4","","#4f8bf9","#959595","#6A5ACD","#fea31e","#7cb5ec"
                 	color:["#7cb5ec","#fd8f1e","#4280f1","#957bde","#99cc33","#24998d","#959595"],
            	    tooltip: {
            	        trigger: 'axis',
            	        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            	            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            	        }
            	    },
               		grid: {
            	        left: '3%',
            	        right: '10%',
            	        bottom: '20%',
            	        top: '20%',
            	        containLabel: true,
            	        z: 22
            	    },

            	    legend: {
            	        data: ['硕士', '本科', '大专', '中专','高中','初中','小学'],
            	        textStyle: {
            	            fontSize: 12,
            	            color:"#fff"
            	        },
            	        icon:"rect",
            	        itemWidth:10,
            	        itemHeight:10,
            	        bottom:"9%"
            	    },

            	    xAxis: {
            	    	name:'人数',
            	    	nameTextStyle:{
            	    		color:"#fff"
            	    	},
            	        axisLabel:{
            	            textStyle: {
            	                color:'#fff',
            	                 fontSize:8,
            	            }
            	        },
            	        splitLine: {
            	            lineStyle: {
            	                color: "#24214e",
            	            }
            	        },
            			 axisLine: {
            	            lineStyle: {
            	                type: 'solid',
            	                color:'#24214e',
            	                width:'1  ',                                                //坐标线的宽度
            	            }
            	        }
            	    },
            	    yAxis: {
            	        data: ['高管', '管理层', '文员', '操作工','司机', '后勤'],
            	        axisLabel: {
            		            textStyle: {
            		                color: '#fff',
            		                 fontSize:12,//坐标值得具体的颜色
            		            }
            		        },
            		        axisLine: {
            		             lineStyle: {
            		                type: 'solid',
            		                color:'#24214e',
            		                width:'1  ',                                                //坐标线的宽度

            		            }
            		        },
            	    },
            	    series: [{
            	            name: '硕士',
            	            type: 'bar',
            	            stack: '总量',
            	            barWidth:20,
            	            label: {
            	                normal: {
            	                    show: false,
            	                    position: 'insideRight'
            	                }
            	            },
            	            data: [result.senior.master, result.management.master, result.office.master,
                                 result.operation.master, result.driver.master,result.logistics.master]
            	        }, {
            	            name: '本科',
            	            type: 'bar',
            	            barWidth:20,
            	            stack: '总量',
            	            label: {
            	                normal: {
            	                    show: false,
            	                    position: 'insideRight'
            	                }
            	            },
            	            data: [result.senior.undergraduate, result.management.undergraduate, result.office.undergraduate,
                                   result.operation.undergraduate, result.driver.undergraduate,result.logistics.undergraduate]
            	        }, {
            	            name: '大专',
            	            type: 'bar',
            	            stack: '总量',
            	            barWidth:20,
            	            label: {
            	                normal: {
            	                    show: false,
            	                    position: 'insideRight'
            	                }
            	            },
            	            data: [result.senior.juniorCollege, result.management.juniorCollege, result.office.juniorCollege,
                                   result.operation.juniorCollege, result.driver.juniorCollege,result.logistics.juniorCollege]
            	        }, {
            	            name: '中专',
            	            type: 'bar',
            	            stack: '总量',
            	            barWidth:20,
            	            label: {
            	                normal: {
            	                    show: false,
            	                    position: 'insideRight'
            	                }
            	            },
            	            data: [result.senior.secondarySpecialized, result.management.secondarySpecialized, result.office.secondarySpecialized,
                                    result.operation.secondarySpecialized, result.driver.secondarySpecialized,result.logistics.secondarySpecialized]
            	        },
            	        {
                            name: '高中',
                            type: 'bar',
                            stack: '总量',
                            barWidth:20,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: [result.senior.highSchool, result.management.highSchool, result.office.highSchool,
                                    result.operation.highSchool, result.driver.highSchool,result.logistics.highSchool]
                        },
                        {
                            name: '初中',
                            type: 'bar',
                            stack: '总量',
                            barWidth:20,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: [result.senior.middleSchool, result.management.middleSchool, result.office.middleSchool,
                                    result.operation.middleSchool, result.driver.middleSchool,result.logistics.middleSchool]
                        },
                        {
                            name: '小学',
                            type: 'bar',
                            stack: '总量',
                            barWidth:20,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: [result.senior.primary, result.management.primary, result.office.primary,
                                    result.operation.primary, result.driver.primary,result.logistics.primary]
                        },
            	    ]

            	};

        	progress1chart.setOption(option);
    });
}

//雷达图
var radarchart="";
function radarchar(){
    var url = "/personnel/queryProvinceGroup/1";
    ajax_get(url,function(result){
        var indicator  = [];
        var data = [];
        result.forEach(function(item){
            indicator.push({text: item.type,max: 5000});
            data.push(item.count);
        });
        option = {
            color: ['#623ad1', '#3383fc'],
            tooltip: {},
            radar: [{
                indicator: indicator,
                center: ['50%', '52%'],
                radius: '60%',
                startAngle: 90,
                name: {
                    formatter: '{value}',
                    textStyle: {
                        fontSize: 12, //外圈标签字体大小
                        color: '#FFF' //外圈标签字体颜色
                    }
                },
                splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                    show: true,
                    areaStyle: { // 分隔区域的样式设置。
                        color: [], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
                    }
                },
                axisLine: { //指向外圈文本的分隔线样式
                    lineStyle: {
                        color: '#24214e'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#24214e', // 分隔线颜色
                        width: 1, // 分隔线线宽
                    }
                }
            }, ],
            series: [{
                name: '雷达图',
                type: 'radar',
                data: [
                    {
                        name: '籍贯',
                        value: data,
                        symbolSize:5,
                        areaStyle: {
                            normal: { // 单项区域填充样式
                                color: {
                                    type: 'linear',
                                    x: 0, //右
                                    y: 0, //下
                                    x2: 1, //左
                                    y2: 1, //上
                                    colorStops: [{
                                        offset: 0,
                                        color: '#3cd2f3'
                                    },
                                        {
                                            offset: 1,
                                            color: '#306eff'
                                        }],
                                    globalCoord: false
                                },
                                opacity: 0.3 // 区域透明度

                            }
                        },
                    }]
            }]
        };
        radarchart = echarts.init(document.getElementById("radar-chart"));
        radarchart.setOption(option);
    });
}
//点击切换数据
function DataSwitch(obj,num){
	$(obj).removeClass("Datasame");
	$(obj).siblings().addClass("Datasame")
	if(num==1){
		$(obj).parent().prev().addClass("Defaultgray");
		$(obj).parent().next().removeClass("Defaultgray");
		
		barChar([100,20,60,81])
		
		
	}else{
		barChar()
		$(obj).parent().prev().removeClass("Defaultgray");
		$(obj).parent().next().addClass("Defaultgray");
		barChar([10,20,50,81])
	}
		
	
}
