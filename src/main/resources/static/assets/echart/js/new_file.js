$(function(){
	pieChar();
	barChar();
	linchar();
	//barschar();
	radarchar();
	progress1char();
	//progress2char();
	mapchar();
    pieCharJobAge();
    lineChartCross();
    bieChartEduGroup();
    personnelGrowthRate();
    pieCharJobAgeGroup();
    barchartJobAgeTypeGroup();
});
window.onresize = function(){
    pieChart.resize();
    barChart.resize();    //若有多个图表变动，可多写
    linchart.resize();
    //barschart.resize();
    radarchart.resize();
    progress1chart.resize();
	 //progress2chart.resize();
	 mapchart.resize();
    pieChartJobAge.resize();
    lineCharCross.resize();
    bieCharEduGroup.resize();
    personnelGrowthRateChart.resize();
    pieChartJobAgeGroup.resize();
    barcharJobAgeTypeGroup.resize();

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


var barcharJobAgeTypeGroup="";
function barchartJobAgeTypeGroup() {

    var url = "/personnel/queryJobAgeTypeGroup";
    ajax_get(url,function(result){
        var typeArr = [];
        var countArr = [];
        result.forEach(function (item) {
            typeArr.push(item.type);
            countArr.push(item.personnelVo)
        })
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#fff'
                    }
                }
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                top: '20%',

                containLabel: true,
                z: 22
            },
            legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: typeArr,
            right: '5px',
            top: '10px',
            textStyle: {
                fontSize: 12,
                color: '#fff'
                }
            },
            xAxis: [
                {
                    data: ['20岁以下', '20~25岁', '25~30岁', '30~35岁', '35~40岁', '40~45岁', '45~50岁', '50岁以上'],
                    axisLabel:{
                        textStyle: {
                            color:'#fff',
                            fontSize:12,
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color:'#24214e',
                            width:'1  ',                                                //坐标线的宽度
                        }
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '',
                    nameLocation:"center",
                    nameGap:40,
                    nameRotate:-270,
                    nameTextStyle:{
                        color:"#fff",
                        fontSize:12,//坐标值得具体的颜色，
                    },

                    min: 0,
                    max: 1500,
                    interval: 250,
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize:10,//坐标值得具体的颜色
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color:'#24214e',
                            width:'1  ',                                                //坐标线的宽度

                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#24214e",
                        }
                    }
                },
                {
                    type: 'value',
                    name: '',
                    nameLocation:"center",
                    nameGap:40,
                    nameRotate:-270,
                    nameTextStyle:{
                        color:"#fff",
                        fontSize:12,//坐标值得具体的颜色，
                    },
                    min: 0,
                    max: 3000,
                    interval: 500,
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize:10,//坐标值得具体的颜色
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color:'#24214e',
                            width:'1  ',                                                //坐标线的宽度

                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#24214e",
                        }
                    }
                }
            ],
            series: [
                {
                    name: typeArr[0],
                    type: 'bar',
                    data: [countArr[0].under20,countArr[0].age2025,countArr[0].age2530,
                        countArr[0].age3035,countArr[0].age3540,countArr[0].age4045,
                        countArr[0].age4550,countArr[0].greater50
                    ]
                },
                {
                    name: typeArr[1],
                    type: 'bar',
                    data: [countArr[1].under20,countArr[1].age2025,countArr[1].age2530,
                        countArr[1].age3035,countArr[1].age3540,countArr[1].age4045,
                        countArr[1].age4550,countArr[1].greater50
                    ]
                },
                {
                    name: typeArr[2],
                    type: 'bar',
                    data: [countArr[2].under20,countArr[2].age2025,countArr[2].age2530,
                        countArr[2].age3035,countArr[2].age3540,countArr[2].age4045,
                        countArr[2].age4550,countArr[2].greater50
                    ]
                },
                {
                    name: typeArr[3],
                    type: 'bar',
                    data: [countArr[3].under20,countArr[3].age2025,countArr[3].age2530,
                        countArr[3].age3035,countArr[3].age3540,countArr[3].age4045,
                        countArr[3].age4550,countArr[3].greater50
                    ]
                },
                {
                    name: typeArr[4],
                    type: 'bar',
                    data: [countArr[4].under20,countArr[4].age2025,countArr[4].age2530,
                        countArr[4].age3035,countArr[4].age3540,countArr[4].age4045,
                        countArr[4].age4550,countArr[4].greater50
                    ]
                },
                {
                    name: typeArr[5],
                    type: 'bar',
                    data: [countArr[5].under20,countArr[5].age2025,countArr[5].age2530,
                        countArr[5].age3035,countArr[5].age3540,countArr[5].age4045,
                        countArr[5].age4550,countArr[5].greater50
                    ]
                },
                {
                    name: typeArr[6],
                    type: 'line',
                    yAxisIndex: 1,
                    data: [countArr[6].under20,countArr[6].age2025,countArr[6].age2530,
                        countArr[6].age3035,countArr[6].age3540,countArr[6].age4045,
                        countArr[6].age4550,countArr[6].greater50
                    ]
                }
            ]
        };

        barcharJobAgeTypeGroup= echarts.init(document.getElementById("bar-chart-JobAgeTypeGroup"));
        barcharJobAgeTypeGroup.setOption(option);
    });
}

//饼状图
var pieChart="";
function pieChar(){
        var url = "/personnel/queryAgeGroup/0";
        ajax_get(url,function(result){
            var option = {
                        color:["#24998d","#4682B4","#99cc33","#4f8bf9","#959595","#6A5ACD","#fea31e","#7cb5ec"],
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        /*toolbox: {
                            feature: {
                                dataView: {show: true, readOnly: false},
                                magicType: {show: false, type: ['line', 'bar']},
                                restore: {show: false},
                                saveAsImage: {show: true}
                            }
                        },*/
                        series: [
                            {
                                name:'员工年龄分布',
                                type:'pie',
                                selectedMode: 'single',
                                radius: [0, '50%'],
                                center:["50%","48%"],
                               label: {
                                    normal: {
                                        position: 'outside',
                                        formatter: "{b}:{d}%"
                                    }
                                },
                                data:[
                                    {value:result.under20, name:'20岁以下'},
                                    {value:result.age2025, name:'20~25岁'},
                                    {value:result.age2530, name:'25~30岁'},
                                    {value:result.age3035, name:'30~35岁'},
                                    {value:result.age3540, name:'35~40岁'},
                                    {value:result.age4045, name:'40~45岁'},
                                    {value:result.age4550, name:'45~50岁'},
                                    {value:result.greater50, name:'50岁及以上'},
                                ]
                            }
                        ]
                    };
                    pieChart= echarts.init(document.getElementById("pie-chart"));
                    pieChart.setOption(option);
        });
}

//折线图
var pieChartJobAgeGroup="";
function pieCharJobAgeGroup(){
    var url = "/personnel/qurtyJobAgeGroup";
    ajax_get(url,function(result){
        var data = [];
        result.forEach(function (item) {
            data.push(item.rate);
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
                right: '5%',
                bottom: '3%',
                top: '15%',
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
                data: ['其他', '75后', '80后','90后','95后','00后']
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
                    formatter: '{value}%',
                    margin: 10,
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
            series: [ {
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
                data: [13.5,15.79,36.60,18.38,14.64,1.09]
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
                data: [14.16,15.71,36.48,19.29,13.90,0.46]
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
                    data: [13.70,15.43,39.07,20.79,11.01,0.00]
                },{
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
                    data: data,
                },]
        };
        pieChartJobAgeGroup= echarts.init(document.getElementById("pie-chart-jobAgeGroup"));
        pieChartJobAgeGroup.setOption(option);
    });
}

//柱状图
var barChart="";
function barChar(){
        var url = "/personnel/queryTypeGroup/0";
        ajax_get(url,function(result){
            var typeArr = [];
            var typeCountArr = []
            result.forEach(function(item){
                typeArr.push(item.type);
                typeCountArr.push(item.count);
            });
            console.log(typeArr);
            option = {
                    tooltip: {
                        formatter:'{b}:{c}'
                    },
                    grid: {
                        left: '6%',
                        right: '3%',
                        bottom: '6%',
                        top: '20%',

                        containLabel: true,
                        z: 22
                    },
                    xAxis: {
                        data: typeArr,       //横坐标
                        axisLabel:{
                            textStyle: {
                                color:'#fff',
                                 fontSize:12,
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
                    yAxis: {
                        name: "（人数）",
                        nameTextStyle:{
                            color:"#fff",
                            fontSize:12,//坐标值得具体的颜色，
                        },
                        nameLocation:"center",
                        nameGap:40,
                        nameRotate:-270,
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                                 fontSize:10,//坐标值得具体的颜色
                            }
                        },
                        axisLine: {
                             lineStyle: {
                                type: 'solid',
                                color:'#24214e',
                                width:'1  ',                                                //坐标线的宽度

                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#24214e",
                            }
                        }
                    },
                    series: [{
                        type: 'bar',
                        barWidth:20,
                        data:typeCountArr,
                        label: {
                            normal: {
                                show: true,
                                position: "top",
                                textStyle: {
                                    color: "#fffff",
                                    fontSize: 12
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#4f92fa'},                   //柱图渐变色
                                        {offset: 0.5, color: '#565cf8'},                 //柱图渐变色
                                        {offset: 1, color: '#5d29f7'},                   //柱图渐变色
                                    ]
                                )
                            }
                        },
                    }]
                };
                barChart= echarts.init(document.getElementById("bar-chart"));
                barChart.setOption(option);
        });
}
//折线图
var linchart="";
function linchar(){
        var url = "/personnel/queryMonthRateGroup/0";
        linchart= echarts.init(document.getElementById("line-chart"));
         ajax_get(url,function(result){
             var count = result.under3+result.month3_6+result.month6_12+result.month12_24+result.month24_36+result.greater36;
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
                        right: '5%',
                        bottom: '10%',
                        top: '15%',
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
                    data: ['0~3月', '3~6月', '6~12月','1~2年','2~3年','3年以上']
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
                        formatter: '{value}%',
                        margin: 10,
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
                    name: result.year,
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
                    data: [toFixed(result.under3*100/count),
                        toFixed(result.month3_6*100/count),
                        toFixed(result.month6_12*100/count),
                        toFixed(result.month12_24*100/count),
                        toFixed(result.month24_36*100/count),
                        toFixed(result.greater36*100/count)]
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
                    data: [16.49,19.26,21.79,24.96,12.58,4.91]
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
                    data: [27.91,21.67,17.45,24.44,8.52,0]
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
                 data: [23.74,23.62,31.02,21.62,0,0]
            },]
            };
            linchart.setOption(option);
        })
}
//饼图-在职人员工龄分布
var pieChartJobAge="";
function pieCharJobAge(){
    var url = "/personnel/queryMonthRateGroup/0";
    ajax_get(url,function(result){
        var option = {
            color:["#20998d","#99cc33","#4f8bf9","#6A5ACD","#fea31e","#7cb5ec"],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name:'员工工龄分布',
                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '50%'],
                    center:["50%","48%"],
                    label: {
                        normal: {
                            position: 'outside',
                            formatter: "{b}:{d}%"
                        }
                    },
                    data:[
                        {value:result.under3, name:'0~3个月'},
                        {value:result.month3_6, name:'3~6个月'},
                        {value:result.month6_12, name:'6~12月'},
                        {value:result.month12_24, name:'1~2年'},
                        {value:result.month24_36, name:'2~3年'},
                        {value:result.greater36, name:'3年及以上'},
                    ]
                }
            ]
        };
        pieChartJobAge= echarts.init(document.getElementById("pie-chart-jobAge"));
        pieChartJobAge.setOption(option);
    });
}

//雷达图
var radarchart="";
function radarchar(){
	var url = "/personnel/queryProvinceGroup/0";
	ajax_get(url,function(result){
	    var indicator  = [];
	    var data = [];
	    result.forEach(function(item){
	        indicator.push({text: item.type,max: 1500});
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
//横向柱状图
var progress1chart="";
function progress1char(){
    var url ="/personnel/queryEduTypeGroup/0";
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
            	        left: '2%',
            	        right: '4%',
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
            	    	name:'',
            	    	nameTextStyle:{
            	    		color:"#fff"
            	    	},
            	        axisLabel:{
            	            textStyle: {
            	                color:'#fff',
            	                 fontSize:12,
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
            	        data: ['高管', '管理层', '文员', '操作','司机', '后勤'],
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

function toFixed(num) {
    return num.toFixed(2);
}

var lineCharCross = "";
function lineChartCross(){

    var url = "/personnel/queryJobNum";
    ajax_get(url,function(result) {
        var monthArr = [];
        var jobNumArr = [];
        var jobRateArr = [];
        result.forEach(function (item) {
            monthArr.push(item.month);
            jobNumArr.push(item.jobNum);
            jobRateArr.push(item.jobRate);
        });
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                formatter: function (params) {
                    let html=params[0].name+"<br>";
                    for(let i=0;i<params.length;i++){
                        html+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+params[i].color+';"></span>'
                        if(params[i].seriesName=="月度人员增长率"){
                            html+=params[i].seriesName+"："+params[i].value+"%<br>";
                        }
                        if(params[i].seriesName=="人数"){
                            html+=params[i].seriesName+"："+params[i].value+"人<br>";
                        }
                    }
                    return html;
                }
            },
            calculable : false,
            legend: {
                icon: 'rect',
                itemWidth: 14,
                itemHeight: 5,
                itemGap: 13,
                data : [ {name : '人数',icon:'rect'}, {name : '月度人员增长率',icon:'rect'} ],
                right: '5px',
                top: '10px',
                textStyle: {
                    fontSize: 12,
                    color: '#fff'
                }
            },
            grid: {
                left: '3%',
                right: '5%',
                bottom: '7%',
                top: '15%',
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
                data: monthArr
            }],
            yAxis : [
                {
                    type: 'value',
                    name:"人\n数\n︵\n人\n︶",
                    nameLocation:"center",
                    nameGap:50,
                    nameRotate:0,
                    nameTextStyle:{
                        fontSize: 12,
                        color:'#fff',
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.2)',
                            type:'dotted',
                        }
                    },
                    //默认以千分位显示，不想用的可以在这加一段
                    axisLabel : {   //调整左侧Y轴刻度， 直接按对应数据显示
                        show:true,
                        showMinLabel:true,
                        showMaxLabel:true,
                        textStyle: {
                            color:'#fff',
                        },
                        formatter: function (value) {
                            return value;
                        }
                    }
                },
                {
                    type: 'value',
                    name:"月\n度\n人\n员\n增\n长\n率\n︵\n%\n︶",
                    nameLocation:"center",
                    nameGap:35,
                    nameRotate:0,
                    nameTextStyle:{
                        fontSize: 12,
                        color:'#fff',
                    },
                    min: -10,
                    max: 50,
                    interval: 10,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,.2)',
                            type:'dotted',
                        }
                    },
                    //默认以千分位显示，不想用的可以在这加一段
                    axisLabel : {   //调整左侧Y轴刻度， 直接按对应数据显示
                        show:true,
                        showMinLabel:true,
                        showMaxLabel:true,
                        textStyle: {
                            color:'#fff',
                        },
                        formatter: '{value}%',
                    }
                }
            ],
            series : [
                {
                    name:'人数',
                    type:'line',
                    yAxisIndex: 0,
                    smooth: true,
                    areaStyle: {},
                    symbol: "none",
                    itemStyle: {
                        normal: {
                            color: "#058B22",//折线点的颜色
                            lineStyle: {
                                color: "#058B22"//折线的颜色
                            }
                        }
                    },
                    areaStyle: { // 该属性设置可以使这下图区域颜色达到渐变的效果
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0.8,
                            color: '#0C4D1A'
                        }, {
                            offset: 0.5,
                            color: '#058B22'
                        }])
                    },
                    data:jobNumArr,
                },
                {
                    name:'月度人员增长率',
                    type:'line',
                    yAxisIndex: 1,
                    data:jobRateArr,
                }
            ]
        };
        lineCharCross = echarts.init(document.getElementById("linecross-chart"));
        lineCharCross.setOption(option);
    });
}



var bieCharEduGroup="";
function bieChartEduGroup(){
    var url = "/personnel/queryEduGroup/0";
    ajax_get(url,function(result) {
        var data = [];
        result.forEach(function (item) {
            data.push({value:item.count, name:item.education});
        })
        var option = {
            color:["#20998d","#99cc33","#4f8bf9","#6A5ACD","#fea31e","#7cb5ec","#058B22"],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name:'在职员工学历分布',
                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '60%'],
                    center:["50%","65%"],
                    label: {
                        normal: {
                            position: 'outside',
                            formatter: "{b}:{d}%"
                        }
                    },
                    data:data
                }
            ]
        };
        bieCharEduGroup= echarts.init(document.getElementById("pie-chart-eduGroup"));
        bieCharEduGroup.setOption(option);
    });
}

//折线图-人员年份增长率
var personnelGrowthRateChart="";
function personnelGrowthRate(){
    var url = "/personnel/queryJobGrowthRate";
    personnelGrowthRateChart= echarts.init(document.getElementById("line-chart-growthRate"));
    ajax_get(url,function(result){
        var yearArr = [];
        var jobRateArr = [];
        result.forEach(function (item) {
            yearArr.push(item.year);
            var jobRate = [];
            item.rateList.forEach(function (jobRateItem) {
                jobRate.push(jobRateItem.jobRate);
            });
            jobRateArr.push(jobRate);
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
                left: '5%',
                right: '5%',
                bottom: '10%',
                top: '15%',
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
                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }],
            yAxis: [{
                type: 'value',
                name:'增\n长\n率\n︵\n%\n︶',
                nameLocation:"center",
                nameGap:40,
                nameRotate:0,
                nameTextStyle:{
                    fontSize: 12,
                    color:'#fff',
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B',

                    }
                },
                axisLabel: {
                    formatter: '{value}%',
                    margin: 10,
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
                data: jobRateArr[0]
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
                data: jobRateArr[1]
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
                data:jobRateArr[2]
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
                    data: jobRateArr[3]
                },]
        };
        personnelGrowthRateChart.setOption(option);
    })
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
