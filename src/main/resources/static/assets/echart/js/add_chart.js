$(function(){
    barChar();
    $("#chartTitleId").html($("#titleId").val());

    $("#titleId").keyup(function(){
        $("#chartTitleId").html($(this).val());
        $("#nameId").val($(this).val());
    });

    $("#chartTypeId").change(function(){
        chartType = $(this).val();
        barChar();
     });

     $("#yAxisId").keyup(function(){
             yAxisName = $(this).val();
             barChar();
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
       barChar();
        });

    $("#xAxisDataTypeId").keyup(function(){
        var data = $(this).val();
            data = data.replace(reg1,",");
            data = data.replace(reg2,",");
            data = data.replace(reg3,",");
            data = data.replace(reg4,",");
            data = data.replace(reg5,",");
            $(this).val(data);
        xAxisDataType = data.split(',');
        barChar();
    });

});


var chartType = "bar";
var yAxisName = "自定义Y轴名称";
var xAxisData = [1000,100,1000];
var xAxisDataType = ['自定义1','自定义2','自定义3'];


var reg1 = new RegExp("，","g");//g,表示全部替换。
var reg2 = new RegExp(";","g");//g,表示全部替换。
var reg3 = new RegExp("；","g");//g,表示全部替换。
var reg4 = new RegExp(" ","g");//g,表示全部替换。
var reg5 = new RegExp("、","g");//g,表示全部替换。

//柱状图
var barChart="";
function barChar(){
    settingOption();
    barChart= echarts.init(document.getElementById("bar-chart"));
    barChart.setOption(option);
}

window.onresize = function(){
    barChart.resize();    //若有多个图表变动，可多写

}

var option ;
function settingOption(){
    var type = $("#chartTypeId").val();
    switch(type){
        case 'bar':
        break;
        case 'pie':
        break;
        case 'line':
        break;
    };
    option = {
            tooltip: {
                formatter:'{b}:{c}'
            },
           /* grid: {
                left: '6%',
                right: '3%',
                bottom: '6%',
                top: '20%',

                containLabel: true,
                z: 22
            },*/
            xAxis: {
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
                        width:'1  ',                                                //坐标线的宽度
                    }
                },
            },
            yAxis: {
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