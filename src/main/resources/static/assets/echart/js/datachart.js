$(function(){
	pieChar();

});
window.onresize = function(){
    pieChart.resize();

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

//饼状图
var pieChart="";
function pieChar(){
    var option = {
        color:["#24998d","#4682B4","#99cc33","#4f8bf9","#959595","#6A5ACD","#fea31e","#7cb5ec"],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
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
}
