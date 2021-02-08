
var pageNumber = 1;  // 当前页码
var pageSize =10; // 当前每页条数
var pageCount=0;//总页数

$(function(){
   getData();//初始获取数据，加载数据事件
        //鼠标滚动事件
    $(window).scroll(function() {
        /*$(window).scrollTop()这个方法是当前滚动条滚动的距离
        $(window).height()获取当前窗体的高度
        $(document).height()获取当前文档的高度*/
        var bot = 200; //bot是底部距离的高度
        if ((bot + $(window).scrollTop()) >= ($(document).height() - $(window).height())) {
           //当底部基本距离+滚动的高度〉=文档的高度-窗体的高度时；
            //我们需要去异步加载数据了
            if(pageNumber !== pageCount){
                pageNumber++;
                getData();
            }else{
                $(".nodata").show().html("别滚动了，已经到底了...");
            }
        }
    });
});

let xAxisMaxVal = 500;
let chartType = "bar";
let themeStyle = 'blue';
let yAxisName = "自定义Y轴名称";
let yAxisPortraitName ="自\n定\n义\nY \n轴\n名\n称";
let xAxisData = [[100,200,300,400,500]];
let xAxisDataType = ['自定义1','自定义2','自定义3','自定义4','自定义5'];

let charArr = [];
window.onresize = function(){
    charArr.forEach(function(item){
        item.resize();
    });
}

let toolbox ={} ;
let legend = {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: legendData,
            right: '5px',
            top: '5px',
            textStyle: {
                fontSize: 10,
            }
        };
var legendData = [];

function getData() {
    $.ajax({
        type : "GET",
        //请求的媒体类型
        //contentType: "application/json;charset=UTF-8",
        dataType: "json",
        //请求地址
        url : "/chart/list",
        async: true,
        data:{"pageNumber":pageNumber,"pageSize":pageSize},
        success : function(result) {
                pageCount = result.pages;
                var chartList = result.records;
                chartList.forEach(function(item){
                    var divHtml = "<li><div class=\"cd-single-item\" id=\"id_"+item.id+"\"></div><div class=\"cd-item-info\"><b><a href=\"#0\">"+item.title+"</a></b></div></li>";
                    $("#ulId").append(divHtml);
                    optionChart(item);
                });
        },
        //请求失败，包含具体的错误信息
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

function optionChart(result){
    chartType = result.type;
    yAxisName = result.yName;
    themeStyle = result.themeCode;
    var  yAxisNameArr = yAxisName.split("");
    yAxisPortraitName = "";
    yAxisNameArr.forEach(function(item){
        yAxisPortraitName = yAxisPortraitName + item + "\n";
    });
    xAxisDataType = JSON.parse(result.xData);
    legendData = JSON.parse(result.seriesName);
    xAxisData = JSON.parse(result.seriesData);
    settingOption();
    var chart = echarts.init(document.getElementById("id_"+result.id),themeStyle);
    chart.setOption(option,true);
    charArr.push(chart);
}

var option;
function settingOption(){
    //var type = $("#chartTypeId").val();
    switch(chartType){
        case 'bar':
            barChart();
            break;
        case 'pie':
            pieChart();
            break;
        case 'line':
            lineChart();
            break;
        case 'radar':
            radarChart();
            break;
        case 'funnel':
            funnelChart();
            break;
        case 'annular':
            annularChart();
            break;
        case 'rose':
            roseChart();
            break;
        default:

    };
}

//柱状图
function barChart() {
    var series = [];
    var barWidth = 0;
    var xAxisLength = xAxisData.length;
    if(xAxisLength < 3){
        barWidth = 15;
    }else if(xAxisLength < 5){
        barWidth = 11;
    }else{
        barWidth = 9;
    }
    for(let i=0;i<xAxisData.length;i++){
        series.push({
            name:legendData[i],
            type: chartType,
            barWidth:barWidth,
            data:xAxisData[i],
        });
    }

    option = {
        tooltip: {
            trigger:'axis',
            axisPointer: {
                type:'shadow',
                lineStyle: {
                    type:'dashed'
                }
            }
        },
        toolbox: toolbox,
        legend: legend,
        grid: {
            left: '6%',
            right: '3%',
            bottom: '6%',
            top: '20%',
            containLabel: true,
            z: 22
        },
        xAxis: [{
            show:true,
            name:'',
            data: xAxisDataType,       //横坐标
            axisLabel: {
                interval:0,
                rotate:40
            }
        }],
        yAxis: [{
            show:true,
            name: yAxisPortraitName,
            nameLocation:"center",
            nameGap:40,
            nameRotate:0,
        }],
        series: series,
    };
}
//饼状图
function pieChart() {
    var data = [];
    const  length =  xAxisDataType.length;
    for(let i=0;i<length;i++){
        data.push({name:xAxisDataType[i],value:xAxisData[0][i]});
    }
    option = {
        tooltip: {
            formatter:'{b}: {c}',
            trigger:'item',
        },
        toolbox: toolbox,
        legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: xAxisDataType,
            right: '5px',
            top: '5px',
            textStyle: {
                fontSize: 10,
            }
        },
        series: [
            {
                name:xAxisDataType,
                type:'pie',
                selectedMode: 'single',
                radius: [0, '50%'],
                center:["50%","48%"],
                label: {
                    normal: {
                        position: 'outside',
                        formatter: "{b}: {d}%"
                    }
                },
                data:data,
            }
        ]
    };
}
//环状图
function annularChart(){
    var data = [];
    const  length =  xAxisDataType.length;
    for(let i=0;i<length;i++){
        data.push({name:xAxisDataType[i],value:xAxisData[0][i]});
    }
    option = {
        tooltip: {
            formatter:'{b}: {c}',
            trigger:'item',
            axisPointer: {
                type:'none',
                lineStyle: {
                    type:'dashed'
                }
            }
        },
        toolbox: toolbox,
        legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: xAxisDataType,
            right: '5px',
            top: '5px',
            textStyle: {
                fontSize: 10,
            }
        },
        series: [
            {
                name:xAxisDataType,
                type:'pie',
                selectedMode: 'single',
                radius: ['40%', '60%'],
                center:["50%","48%"],
                label: {
                    show: false
                },
                data:data,
            }
        ]
    };
}
//折线图
function lineChart() {
    var series = [];
    for(let i=0;i<xAxisData.length;i++){
        series.push({
            name:legendData[i],
            type: 'line',
            smooth: true,
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            /*areaStyle: {
                normal: {
                    color:chartColor[i],
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },*/
            data: xAxisData[i],
        });
    }

    option = {
        tooltip: {//鼠标指上时的标线
            trigger: 'axis',
            //formatter: '{b}: {c0}',
            axisPointer: {
                type:'cross',
            }
        },
        toolbox: toolbox,
        legend: legend,
        grid: {
            left: '6%',
            right: '3%',
            bottom: '6%',
            top: '20%',
            containLabel: true,
            z: 22
        },
        xAxis: {
            name:'',
            type: 'category',
            boundaryGap: false,
            data: xAxisDataType,       //横坐标
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    width:'1',                                                //坐标线的宽度
                }
            },
            axisLabel: {
                interval:0,
                rotate:40
            }
        },
        yAxis: {
            name: yAxisPortraitName,
            nameLocation:"center",
            nameGap:40,
            nameRotate:0,
            /*axisLine: {
                lineStyle: {
                    type: 'solid',
                    color:axisLineColor,
                    width:'1  ',                                                //坐标线的宽度
                }
            },*/
        },
        series: series
    };
}
//雷达图
function radarChart() {
    const  length =  xAxisDataType.length;
    let indicator  = [];
    for(let i=0;i<length;i++){
        indicator.push({text: xAxisDataType[i],max: xAxisMaxVal});
    }
    var series = [];
    for(let i=0;i<xAxisData.length;i++) {
        series.push({
            name:legendData[i],
            type: 'radar',
            data: [
                {
                    name: legendData[i],
                    value: xAxisData[i],
                    symbolSize:3,
                    areaStyle: {
                        normal: { // 单项区域填充样式
                            opacity: 0.5 // 区域透明度
                        }
                    },
                }]
        });
    }
    option = {
        toolbox: toolbox,
        legend: legend,
        tooltip: {},
        radar: [{
            indicator: indicator,
            triggerEvent:true,   //开启雷达图的边角名称可点击
            center: ['50%', '52%'],
            radius: '70%',
            startAngle: 90,
            name: {
                formatter: '{value}',
            },
            splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                show: true,
                areaStyle: { // 分隔区域的样式设置。
                    color: [], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
                }
            },
        }, ],
        series: series
    }
}
//漏斗图
function funnelChart() {
    var data = [];
    const  length =  xAxisDataType.length;
    for(let i=0;i<length;i++){
        data.push({name:xAxisDataType[i],value:xAxisData[0][i]});
    }
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c}"
        },
        toolbox: toolbox,
        legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: xAxisDataType,
            right: '5px',
            top: '5px',
            textStyle: {
                fontSize: 10,
            }
        },
        series: [
            {
                name:xAxisDataType,
                type:'funnel',
                left: '10%',
                top: 60,
                //x2: 80,
                bottom: 30,
                width: '80%',
                // height: {totalHeight} - y - y2,
                min: 0,
                max: xAxisMaxVal,
                minSize: '0',
                maxSize: xAxisMaxVal,
                sort: 'ascending',
                gap: 4,
                label: {
                    show: true,
                    position: 'inside'
                },
                labelLine: {
                    length: 10,
                    lineStyle: {
                        width: 3,
                        type: 'solid'
                    }
                },
                emphasis: {
                    label: {
                        fontSize: 16
                    }
                },
                data:data
            }
        ]
    };
}
//南丁格尔玫瑰图
function roseChart() {
    var data = [];
    const  length =  xAxisDataType.length;
    for(let i=0;i<length;i++){
        data.push({name:xAxisDataType[i],value:xAxisData[0][i]});
    }
    option = {
        tooltip: {
            formatter:'{b}: {c}',
            trigger:'item',
            axisPointer: {
                type:'none',
                lineStyle: {
                    type:'dashed'
                }
            }
        },
        legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: xAxisDataType,
            right: '5px',
            top: '5px',
            textStyle: {
                fontSize: 10,
            }
        },
        toolbox: toolbox,
        series: [
            {
                name: xAxisDataType,
                type: 'pie',
                radius: [20, 100],
                center: ['50%', '48%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 5
                },
                data: data
            }
        ]
    };
}



