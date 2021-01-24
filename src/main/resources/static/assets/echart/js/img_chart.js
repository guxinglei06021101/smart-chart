
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

let chartColor = ["#3b5ede"];
let colorArr = ["#3b5ede","#6A5ACD","#fea31e","#7cb5ec","#99cc33","#4f8bf9","#4682B4","#959595","#24998d"];
let xAxisMaxVal = 500;
let chartType = "bar";
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
                color: '#625B5B'
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
    var  yAxisNameArr = yAxisName.split("");
    yAxisPortraitName = "";
    yAxisNameArr.forEach(function(item){
        yAxisPortraitName = yAxisPortraitName + item + "\n";
    });
    xAxisDataType = JSON.parse(result.xData);
    legendData = JSON.parse(result.seriesName);
    xAxisData = JSON.parse(result.seriesData);
    chartColor = JSON.parse(result.seriesColor);
    settingOption();
    var chart = echarts.init(document.getElementById("id_"+result.id));
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
        case 'gauge':
            gaugeChart();
            break;
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
            label: {
                normal: {
                    show: true,
                    position: "top",
                    textStyle: {
                        color: "#625B5B",
                        fontSize: 10
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: chartColor[i]},                   //柱图渐变色
                            {offset: 0.5, color: chartColor[i]},                 //柱图渐变色
                            {offset: 1, color: chartColor[i]},                   //柱图渐变色
                        ]
                    )
                }
            },
        });
    }

    option = {
        tooltip: {
            trigger:'axis',
            axisPointer: {
                type:'shadow',
                lineStyle: {
                    color: '#fff',
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
            nameTextStyle:{
                color:"#625B5B",
                fontSize:12,//坐标值得具体的颜色，
            },
            data: xAxisDataType,       //横坐标
            axisLabel:{
                textStyle: {
                    color:'#625B5B',
                    fontSize:12,
                }
            },
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color:'#EFEFF0',
                    width:'1',                                                //坐标线的宽度
                }
            },
        }],
        yAxis: [{
            show:true,
            name: yAxisPortraitName,
            nameTextStyle:{
                color:"#625B5B",
                fontSize:12,//坐标值得具体的颜色，
            },
            nameLocation:"center",
            nameGap:30,
            nameRotate:0,
            axisLabel: {
                textStyle: {
                    color: '#625B5B',
                    fontSize:10,//坐标值得具体的颜色
                }
            },
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color:'#EFEFF0',
                    width:'1  ',                                                //坐标线的宽度

                }
            },
            splitLine: {
                lineStyle: {
                    color: "#EFEFF0",
                }
            }
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
        color:chartColor,
        tooltip: {
            formatter:'{b}: {c} <br/>占比：{d}%',
            trigger:'item',
            axisPointer: {
                type:'none',
                lineStyle: {
                    color: '#fff',
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
                color: '#625B5B'
            }
        },
        series: [
            {
                name:xAxisDataType,
                type:'pie',
                selectedMode: 'single',
                radius: [0, '70%'],
                center:["50%","50%"],
                label: {
                    normal: {
                        position: 'inside',
                        formatter: "{b}: {d}%"
                    }
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
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: chartColor[i].colorRgb(0.5),
                    }, {
                        offset: 1,
                        color: chartColor[i].colorRgb(0),
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },*/
            itemStyle: {
                normal: {
                    color: chartColor[i],
                }
            },
            data: xAxisData[i],
        });
    }

    option = {
        tooltip: {//鼠标指上时的标线
            trigger: 'axis',
            //formatter: '{b}: {c0}',
            axisPointer: {
                type:'cross',
                lineStyle: {
                    color: '#625B5B',
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
        xAxis: {
            name:'',
            type: 'category',
            boundaryGap: false,
            nameTextStyle:{
                color:"#24214e",
                fontSize:12,//坐标值得具体的颜色，
            },
            data: xAxisDataType,       //横坐标
            axisLabel:{
                textStyle: {
                    color:'#625B5B',
                    fontSize:12,
                }
            },
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color:'#625B5B',
                    width:'1',                                                //坐标线的宽度
                }
            },
        },
        yAxis: {
            name: yAxisPortraitName,
            nameTextStyle:{
                color:"#625B5B",
                fontSize:12,//坐标值得具体的颜色，
            },
            nameLocation:"center",
            nameGap:35,
            nameRotate:0,
            axisLabel: {
                textStyle: {
                    color: '#625B5B',
                    fontSize:10,//坐标值得具体的颜色
                }
            },
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color:'#625B5B',
                    width:'1  ',                                                //坐标线的宽度

                }
            },
            splitLine: {
                lineStyle: {
                    color: "#EFEFF0",
                }
            }
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
                                    color: chartColor[i]
                                },
                                    {
                                        offset: 1,
                                        color: chartColor[i]
                                    }],
                                globalCoord: false
                            },
                            opacity: 0.3 // 区域透明度
                        }
                    },
                }]
        });
    }
    option = {
        color: chartColor,
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
                textStyle: {
                    fontSize: 12, //外圈标签字体大小
                    color: '#625B5B' //外圈标签字体颜色
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
                    color: '#EFEFF0'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#EFEFF0', // 分隔线颜色
                    width: 1, // 分隔线线宽
                }
            }
        }, ],
        series: series
    }
}
//漏斗图
function funnelChart() {
    var data = [];
    var colorArr = [];
    const  length =  xAxisDataType.length;
    for(let i=0;i<length;i++){
        data.push({name:xAxisDataType[i],value:xAxisData[0][i]});
        colorArr.push($("#colorPieId_"+i).val());
    }
    option = {
        color:colorArr,
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
                color: '#625B5B'
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
                itemStyle: {
                    borderColor: '#57617B',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 20
                    }
                },
                data:data
            }
        ]
    };
}
//仪表盘
function gaugeChart() {
    let data = [];
    let colorArr = [];
    const  length =  xAxisDataType.length;
    var dataTotal = 0.0;
    var colorRateArr = [];
    for(let i=0;i<length;i++){
        dataTotal = dataTotal + parseFloat(xAxisData[0][i]);
        data.push({name: xAxisDataType[i],value: xAxisData[0][i]});
        colorArr.push($("#colorPieId_"+i).val());
    }

    var rate = 0.0;
    for(let i=0;i<length;i++){
        rate =  rate + parseFloat(xAxisData[0][i])/parseFloat(dataTotal);
        let x = [(rate).toFixed(1),colorArr[i]];
        colorRateArr.push(x);
    }
    option = {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}'
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
                color: '#625B5B'
            }
        },
        series: [
            {
                name: xAxisDataType,
                type: 'gauge',
                max: xAxisMaxVal,
                detail: {formatter: '{value}'},
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: colorRateArr,//修改指针颜色,指针颜色根据仪表盘颜色变化
                        width: 3,
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                title: {
                    show:false,
                    color:'#fff'
                },
                data: data
            }
        ]
    };
}
//十六进制颜色值的正则表达式
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
/*16进制颜色转为RGB格式*/
String.prototype.colorRgb = function(opacity){
    var sColor = this.toLowerCase();
    if(sColor && reg.test(sColor)){
        if(sColor.length === 4){
            var sColorNew = "#";
            for(var i=1; i<4; i+=1){
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for(var i=1; i<7; i+=2){
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
        }
       // return "rgb(" + sColorChange.join(",") + ")";
//或
        return "rgba(" + sColorChange.join(",") + ","+opacity+")";
    }else{
        return sColor;
    }
};
