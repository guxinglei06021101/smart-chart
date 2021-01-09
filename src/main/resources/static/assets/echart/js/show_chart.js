$(function(){

var id = $("#id").val();

ajax_get("/chart/findById/"+id,function(result){
$("#chartTitleId").html(result.title);
    optionChart(result);
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

window.onresize = function(){
    chart.resize();    //若有多个图表变动，可多写
}




let toolbox ={} ;
let legend ={} ;
var legendData = [];

let chart="";
function optionChart(result){
    chartType = result.type;
        //var xName = $("#xName").val();
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
    legend = {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: legendData,
            right: '20px',
            top: '6px',
            textStyle: {
                fontSize: 12,
                color: '#fff'
            }
        };
        toolbox = {
            feature: {
                saveAsImage: {
                    backgroundColor: '#040f3c',
                    name: yAxisName,
                    title:'下载图表'
                },
            }
        };
    settingOption();
    chart= echarts.init(document.getElementById("datachartId"));
    chart.setOption(option,true);
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
    for(let i=0;i<xAxisData.length;i++){
        series.push({
            name:legendData[i],
            type: chartType,
            barWidth:20,
            data:xAxisData[i],
            label: {
                normal: {
                    show: true,
                    position: "top",
                    textStyle: {
                        color: "#fff",
                        fontSize: 12
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
                color:"#fff",
                fontSize:12,//坐标值得具体的颜色，
            },
            data: xAxisDataType,       //横坐标
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
                    width:'1',                                                //坐标线的宽度
                }
            },
        }],
        yAxis: [{
            show:true,
            name: yAxisPortraitName,
            nameTextStyle:{
                color:"#fff",
                fontSize:12,//坐标值得具体的颜色，
            },
            nameLocation:"center",
            nameGap:40,
            nameRotate:0,
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
            formatter:'{b}: {c}',
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
            right: '20px',
            top: '6px',
            textStyle: {
                fontSize: 12,
                color: '#fff'
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
            areaStyle: {
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
            },
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
        xAxis: {
            name:'',
            type: 'category',
            boundaryGap: false,
            nameTextStyle:{
                color:"#fff",
                fontSize:12,//坐标值得具体的颜色，
            },
            data: xAxisDataType,       //横坐标
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
                    width:'1',                                                //坐标线的宽度
                }
            },
        },
        yAxis: {
            name: yAxisPortraitName,
            nameTextStyle:{
                color:"#fff",
                fontSize:12,//坐标值得具体的颜色，
            },
            nameLocation:"center",
            nameGap:40,
            nameRotate:0,
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
            right: '20px',
            top: '6px',
            textStyle: {
                fontSize: 12,
                color: '#fff'
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
            right: '20px',
            top: '6px',
            textStyle: {
                fontSize: 12,
                color: '#fff'
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
                       	successfunction(result);
                    },
                    //请求失败，包含具体的错误信息
                    error : function(e){
                        console.log(e.status);
                        console.log(e.responseText);
                    }
                });
}

function tableChange() {
    xAxisData = [];
    chartColor = [];
    legendData = [];
    var xAxisMaxData = [];
    $("#tbodyId").find("tr").each(function(){
        var tdArr = $(this).children();
        var len = xAxisDataType.length;
        var xAxisArr = [];
        legendData.push(tdArr.eq(0).find('input').val());
        for(let i=1;i<=len;i++){
            xAxisArr.push(tdArr.eq(i).find('input').val());
            xAxisMaxData.push(tdArr.eq(i).find('input').val());
        }
        xAxisData.push(xAxisArr);
        chartColor.push(tdArr.eq(len+1).find('input').val());
    });
    const max = Math.max.apply(null,xAxisMaxData);
    $("#xAxisMaxValId").val(max);
    xAxisMaxVal = max;
    legend = {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: legendData,
        right: '20px',
        top: '6px',
        textStyle: {
            fontSize: 12,
            color: '#fff'
        }
    };
}

function tableHead() {
    var result="";
    result += "<thead><tr>";
    result += "<th>系列名称</th>";
    xAxisDataType.forEach(function (item) {
        result +="<th>"+item+"</th>";
    });
    result += "<th id=\"colorthId_0\">颜色</th>";
    result +="<th id=\"operatethId_0\">操作 &nbsp;&nbsp;<a href=\"#\" onclick=\"addTableTr()\"  class=\"btn btn-success\">✚</a></th>";

    result +="</tr></thead><tbody id=\"tbodyId\"><tr v-for=\"item in search(keywords)\" >";
    result +="<td><input style=\"width: 120px;padding: 0px;text-align: center\" onkeyup=\"dataKeyup()\" class=\"form-control\" type=\"text\" value=\"系列1\"></td>";
    var val = 0;
    let length = xAxisDataType.length;
    for(let i=0;i<length;i++){
        val = val + 100;
        result += "<td>" ;
        result += "<input style=\"width: 60px;padding: 2px;text-align: center\" onkeyup=\"dataKeyup()\" class=\"form-control\" type=\"text\" value=\""+val+"\">" ;
        result += "<input id=\"colorPieId_"+i+"\" style=\"width: 60px;height: 25px;padding: 2px;margin-top:5px;text-align: center;display:none\" oninput=\"dataKeyup()\" class=\"form-control\" type=\"color\" value=\""+colorArr[i]+"\">" ;
        result += "</td>";
    }
    result += "<td id=\"colorthId_1\"><input style=\"width: 60px;padding: 2px;text-align: center\" oninput='dataKeyup()' class=\"form-control\" type=\"color\" value=\""+colorArr[0]+"\" ></td>";
    result +="<td id=\"operatethId_1\"></td>";
    result +="</tr></tbody>";
    $("#tableId").html(result);
}
function addTableTr() {
    let trLen = $("#tableId").find("tr").length;
    if(trLen > 5){
        alert("最多只能添加5条数据");
        return;
    }
    let val = 0;
    let result ="<tr id=\"datatrId_"+trLen+"\"><td><input style=\"width: 120px;padding: 0px;text-align: center\" onkeyup=\"dataKeyup()\" class=\"form-control\" type=\"text\" value=\"系列"+trLen+"\"></td>";
    xAxisDataType.forEach(function (item) {
        val = val+100*trLen;
        result +="<td><input style=\"width: 60px;padding: 0px;text-align: center\" onkeyup=\"dataKeyup()\" class=\"form-control\" type=\"text\" value=\""+val+"\"></td>";
    });
    result +="<td id=\"colorthId_"+trLen+"\"><input style=\"width: 60px;padding: 0px;text-align: center\" oninput='dataKeyup()' class=\"form-control\" type=\"color\" value=\""+colorArr[trLen-1]+"\"></td>";
    result +="<td id=\"operatethId_"+trLen+"\"><a href=\"#\" onclick=\"removeTr(this)\" >删除</a></td>";
    result +="</tr>";
    $("#tableId").append(result);
    dataKeyup();
}

function dataKeyup() {
    tableChange();
    optionChart();
}

function removeTr(obj) {
    let tr = $(obj).parent().parent();
    tr.remove();
    dataKeyup();
}

function setBackgroundColor(obj){
     $(".main-middle").css("background", $(obj).val());
}

function showTableTr() {
    switch (chartType) {
        case 'pie':
            showTableOperate = false;
            break;
        case 'funnel':
            showTableOperate = false;
            break;
        case 'gauge':
            showTableOperate = false;
            break;
        default:
            showTableOperate = true;
    }

    let typeLen = xAxisDataType.length;
    let trLen = $("#tableId").find("tr").length;
    if(showTableOperate){
        for(let i=0;i<=trLen;i++){
            $("#colorthId_"+i).show();
            $("#operatethId_"+i).show();
            $("#datatrId_"+(i+1)).show();
        }
        for(let i=0;i<=typeLen;i++){
            $("#colorPieId_"+i).hide();
        }

    }else {
        for(let i=0;i<=trLen;i++){
            $("#colorthId_"+i).hide();
            $("#operatethId_"+i).hide();
            $("#datatrId_"+(i+1)).hide();
        }
        for(let i=0;i<=typeLen;i++){
            $("#colorPieId_"+i).show();
        }
    }
    optionChart();
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
