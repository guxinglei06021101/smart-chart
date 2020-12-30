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
    let option = settingOption();
    chart= echarts.init(document.getElementById("bar-chart"));
    chart.setOption({});
    chart.setOption(option);
}

window.onresize = function(){
    chart.resize();    //若有多个图表变动，可多写
}


function settingOption(){
    //var type = $("#chartTypeId").val();
    let option ;
    switch(chartType){
        case 'bar':
            option = {
                tooltip: {
                    formatter:'{b}:{c}',
                    trigger:'axis',
                    axisPointer: {
                        type:'cross',
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
            const  length =  xAxisDataType.length;
            for(let i=0;i<length;i++){
                data.push({name:xAxisDataType[i],value:xAxisData[i]});
            }
            option = {
                color:["#6A5ACD","#fea31e","#7cb5ec","#99cc33","#4f8bf9","#4682B4","#959595","#24998d"],
                tooltip: {
                    formatter:'{b}:{c}%',
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
                                formatter: "{b}:{d}"
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
    };
    return option;
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