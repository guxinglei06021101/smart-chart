$(function(){
    optionChart();
    $("#chartTitleId").html($("#titleId").val());

    $("#titleId").keyup(function(){
        $("#chartTitleId").html($(this).val());
        $("#nameId").val($(this).val());
    });

    $("#chartTypeId").change(function(){
        chartType = $(this).val();
        optionChart();
     });

     $("#yAxisId").keyup(function(){
         yAxisName = $(this).val();
         optionChart();
          });

   $("#xAxisDataId").keyup(function(){
        var data = $(this).val();
        data = data.replace(reg1,",");
        data = data.replace(reg2,",");
        data = data.replace(reg3,",");
        data = data.replace(reg4,",");
        data = data.replace(reg5,",");
        $(this).val(data);
       xAxisData = data.split(',');
       const max = Math.max.apply(null,xAxisData);
       $("#xAxisMaxValId").val(max);
       xAxisMaxVal = max;
       optionChart();
        });

    $("#xAxisMaxValId").keyup(function(){
        xAxisMaxVal = $(this).val();
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
        optionChart();
    });
});

let xAxisMaxVal = 500;
let chartType = "bar";
let yAxisName = "自定义Y轴名称";
let xAxisData = [100,200,300,400,500];
let xAxisDataType = ['自定义1','自定义2','自定义3','自定义4','自定义5'];


let reg1 = new RegExp("，","g");//g,表示全部替换。
let reg2 = new RegExp(";","g");//g,表示全部替换。
let reg3 = new RegExp("；","g");//g,表示全部替换。
let reg4 = new RegExp(" ","g");//g,表示全部替换。
let reg5 = new RegExp("、","g");//g,表示全部替换。

//柱状图
let chart="";
function optionChart(){
    settingOption();
    chart= echarts.init(document.getElementById("bar-chart"));
    chart.setOption(option,true);
}

window.onresize = function(){
    chart.resize();    //若有多个图表变动，可多写
}

var option;
function settingOption(){
    //var type = $("#chartTypeId").val();
    const  length =  xAxisDataType.length;
    switch(chartType){
        case 'bar':
            option = {
                tooltip: {
                    formatter:'{b}:{c}',
                    trigger:'axis',
                    axisPointer: {
                        type:'shadow',
                        lineStyle: {
                            color: '#fff',
                            type:'dashed'
                        }
                    }
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
                },
                yAxis: {
                    show:true,
                    name: yAxisName,
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
                    type: chartType,
                    barWidth:20,
                    data:xAxisData,
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
        break;
        case 'pie':
            const data = [];
            for(let i=0;i<length;i++){
                data.push({name:xAxisDataType[i],value:xAxisData[i]});
            }
            option = {
                color:["#6A5ACD","#fea31e","#7cb5ec","#99cc33","#4f8bf9","#4682B4","#959595","#24998d"],
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
                xAxis:{
                    show:false
                },
                yAxis:{
                    show:false
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
                        name:yAxisName,
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
        break;
        case 'line':
            option = {
                tooltip: {//鼠标指上时的标线
                    trigger: 'axis',
                    formatter: '{b}: {c0}',
                    axisPointer: {
                        type:'cross',
                        lineStyle: {
                            color: '#fff',
                            type:'dashed'
                        }
                    }
                },
                radar:[{}],
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '10%',
                    top: '15%',
                    containLabel: true,
                    z: 22
                },
                xAxis: [{
                    show:true,
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
                    data: xAxisDataType
                }],
                yAxis: [{
                    show:true,
                    name:yAxisName,
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
                        formatter: '{value}',
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
                    data: xAxisData
                }]
            };
            break;
        case 'radar':
            let indicator  = [];
            for(let i=0;i<length;i++){
                indicator.push({text: xAxisDataType[i],max: xAxisMaxVal});
            }
            option = {
                color: ['#623ad1', '#3383fc'],
                tooltip: {},
                radar: [{
                    indicator: indicator,
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
                series: [{
                    name: '雷达图',
                    type: 'radar',
                    data: [
                        {
                            name: yAxisName,
                            value: xAxisData,
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
            }
            break;
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