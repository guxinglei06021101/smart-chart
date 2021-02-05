$(function(){

    var id = $("#id").val();

    ajax_get("/chart/findById/"+id,function(result) {
        $("#chartTitleId").html(result.title);
        $("#titleId").val(result.title);
        chartType = result.type;
        $("#chartTypeId").val(chartType);
        themeStyle = result.themeCode;
        $("#themeStyleId").val(themeStyle);
        $("#nameId").val(result.name);
        $("#yAxisId").val(result.yName);
        yAxisName = result.yName ;
        var  yAxisNameArr = yAxisName.split("");
        yAxisPortraitName = "";
        yAxisNameArr.forEach(function(item){
            yAxisPortraitName = yAxisPortraitName + item + "\n";
        });

        xAxisDataType = JSON.parse(result.xData);
        $("#xAxisDataTypeId").val(xAxisDataType.join(","));

        xAxisMaxVal = result.yMax;
        legendData = JSON.parse(result.seriesName);
        xAxisData = JSON.parse(result.seriesData);
        legend = {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: legendData,
            right: '20px',
            top: '5px',
            textStyle: {
                fontSize: 10,
            }
        };
        toolbox = {
            feature: {
                saveAsImage: {
                    name: yAxisName,
                    title:'下载图表'
                },
            }
        };
        console.log(JSON.stringify(xAxisData));
        tableHead();
        tableChange();
        showTableTr();
    });

    $("#submitId").click(function(){

    layer.confirm('确定要保存吗?', {icon: 3, title:'提示'}, function(index){
        var data = {
            id:parseInt(id),
            name:$("#nameId").val(),
            title:$("#titleId").val(),
            type:chartType,
            xName:'',
            yMax:xAxisMaxVal,
            yName:yAxisName,
            themeCode:themeStyle,
            xData:JSON.stringify(xAxisDataType),
            seriesName:JSON.stringify(legendData),
            seriesType:chartType,
            seriesData:JSON.stringify(xAxisData),
            remark:$("#remarkId").val()
        }
            $.ajax({
                //请求方式
                type : "POST",
                //请求的媒体类型
                //contentType: "application/json;charset=UTF-8",
                dataType: "json",
                //请求地址
                url : '/chart/update',
                //数据，json字符串
                data : data,
                //请求成功
                success : function(result) {
                    if(result.code != 0){
                        layer.msg(result.message,{icon: 2});
                        return;
                    }
                    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    layer.msg(result.message, {time: 1000},function(){
                        if(result.code == 0){
                            parent.layer.close(index);
                        }
                    });

                    if(result.code == 0){
                        if(window.parent.document.getElementById("J_iframe") != null){
                            window.parent.document.getElementById("J_iframe").src="${ctx!}/chart/index";
                        }
                    }
                },
                //请求失败，包含具体的错误信息
                error : function(e){
                layer.msg(e.message,{icon: 2});
                }
            });
        });
    });

    $("#chartTitleId").html($("#titleId").val());
    $("#titleId").keyup(function(){
        $("#chartTitleId").html($(this).val());
        $("#nameId").val($(this).val());
    });

    $("#chartTypeId").change(function(){
        chartType = $(this).val();
        showTableTr();
     });
    $("#themeStyleId").change(function(){
        themeStyle = $(this).val();
        optionChart();
    });

     $("#yAxisId").keyup(function(){
         yAxisName = $(this).val();
         let yAxisNameArr = yAxisName.split("");
         yAxisPortraitName = "";
         for(let i=0;i<yAxisNameArr.length;i++){
             yAxisPortraitName = yAxisPortraitName + yAxisNameArr[i] + '\n';
         }
          toolbox = {
             feature: {
                 saveAsImage: {
                     backgroundColor: '#040f3c',
                     name: yAxisName
                 },
             }
         }
         optionChart();
          });

    $("#xAxisDataTypeId").keyup(function(){
        let data = $(this).val();
            data = data.replace(reg1,",");
            data = data.replace(reg2,",");
            data = data.replace(reg3,",");
            data = data.replace(reg4,"");
            data = data.replace(reg5,",");
            $(this).val(data);
        xAxisDataType = data.split(',');
        tableHead();
        tableChange();
        showTableTr();
    });

});

let showTableOperate = true;
let xAxisMaxVal = 500;
let chartType = "bar";
let yAxisName = "自定义Y轴名称";
let yAxisPortraitName ="自\n定\n义\nY \n轴\n名\n称";
let xAxisData = [[100,200,300,400,500]];
let xAxisDataType = ['自定义1','自定义2','自定义3','自定义4','自定义5'];
var legendData = ['系列1'];
var themeStyle = "vintage";

let reg1 = new RegExp("，","g");//g,表示全部替换。
let reg2 = new RegExp(";","g");//g,表示全部替换。
let reg3 = new RegExp("；","g");//g,表示全部替换。
let reg4 = new RegExp(" ","g");//g,表示全部替换。
let reg5 = new RegExp("、","g");//g,表示全部替换。

let toolbox = {
    feature: {
        saveAsImage: {
            backgroundColor: '#040f3c',
            name: yAxisName,
            title:'下载图表'
        },
    }
};
let legend = {
    icon: 'rect',
    itemWidth: 14,
    itemHeight: 5,
    itemGap: 13,
    data: legendData,
    right: '20px',
    top: '5px',
    textStyle: {
        fontSize: 10,
    }
};

let chart="";
function optionChart(){
    settingOption();
    if(chart != ""){
        chart.dispose();
    }
    chart= echarts.init(document.getElementById("bar-chart"),themeStyle);
    chart.setOption(option,true);
}

window.onresize = function(){
    if(chart != ""){
        chart.resize();    //若有多个图表变动，可多写
    }
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
            right: '20px',
            top: '6px',
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
            right: '20px',
            top: '5px',
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
            right: '20px',
            top: '6px',
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
        legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: xAxisDataType,
            right: '20px',
            top: '6px',
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


function tableChange() {
    xAxisData = [];
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
            fontSize: 10,
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
    result +="<th id=\"operatethId_0\">操作 &nbsp;&nbsp;<a href=\"#\" onclick=\"addTableTr()\"  class=\"btn btn-success\">✚</a></th>";
    result +="</tr></thead><tbody id=\"tbodyId\">";

    var len = legendData.length;
    let length = xAxisDataType.length;
    for(let i=0;i<len;i++){
        if(i == 0){
            result +="<tr>";
        }else{
            result +="<tr id=\"datatrId_"+i+"\">";
        }
        result +="<td><input style=\"width: 120px;padding: 0px;text-align: center\" onkeyup=\"dataKeyup()\" class=\"form-control\" type=\"text\" value=\""+legendData[i]+"\"></td>";
        for(let k=0;k<length;k++){
            result += "<td>" ;
            result += "<input style=\"width: 60px;padding: 2px;text-align: center\" onkeyup=\"dataKeyup()\" class=\"form-control\" type=\"text\" value=\""+ xAxisData[i][k]+"\">" ;
            result += "</td>";
        }
        if(i == 0 ){
            result +="<td id=\"operatethId_"+(i+1)+"\"></td></tr>";
        }else{
            result +="<td id=\"operatethId_"+(i+1)+"\"><a href=\"#\" onclick=\"removeTr(this)\" >删除</a></td>";
        }
    }
    result +="</tbody>";
    $("#tableId").html(result);
}

function addTableTr() {
    let trLen = $("#tableId").find("tr").length;
    if(trLen > 10){
        alert("最多只能添加10条数据");
        return;
    }
    let val = 0;
    let result ="<tr id=\"datatrId_"+trLen+"\"><td><input style=\"width: 120px;padding: 0px;text-align: center\" onkeyup=\"dataKeyup()\" class=\"form-control\" type=\"text\" value=\"系列"+trLen+"\"></td>";
    xAxisDataType.forEach(function (item) {
        val = val+100*trLen;
        result +="<td><input style=\"width: 60px;padding: 0px;text-align: center\" onkeyup=\"dataKeyup()\" class=\"form-control\" type=\"text\" value=\""+val+"\"></td>";
    });
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

function showTableTr() {
    switch (chartType) {
        case 'pie':
            showTableOperate = false;
            break;
        case 'funnel':
            showTableOperate = false;
            break;
        case "annular":
            showTableOperate = false;
            break;
        case "rose":
            showTableOperate = false;
            break;
        default:
            showTableOperate = true;
    }

    let trLen = $("#tableId").find("tr").length;
    if(showTableOperate){
        for(let i=0;i<=trLen;i++){
            $("#operatethId_"+i).show();
            $("#datatrId_"+(i+1)).show();
        }

    }else {
        for(let i=0;i<=trLen;i++){
            $("#operatethId_"+i).hide();
            $("#datatrId_"+(i+1)).hide();
        }
    }
    optionChart();
}

