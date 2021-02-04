<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>图表</title>
    <meta name="keywords" content="">
    <meta name="description" content="">

    <link rel="shortcut icon" href="favicon.ico">
    <link href="${ctx!}/assets/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="${ctx!}/assets/css/font-awesome.css?v=4.4.0" rel="stylesheet">

    <link href="${ctx!}/assets/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">

    <link href="${ctx!}/assets/css/animate.css" rel="stylesheet">
    <link href="${ctx!}/assets/css/style.css?v=4.1.0" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="${ctx!}/assets/echart/css/jquery.shCircleLoader.css" />
    <link rel="stylesheet" type="text/css" href="${ctx!}/assets/echart/css/xcConfirm.css" />

    <style>
        a[class="button-selectimg"] {
            color: #00A2D4;
            padding: 4px 6px;
            border: 1px dashed #00A2D4;
            border-radius: 2px;
            text-decoration: none;
        }

        input[id="avatval"] {
            padding: 3px 6px;
            padding-left: 10px;
            border: 1px solid #E7EAEC;
            width: 230px;
            height: 25px;
            line-height: 25px;
            border-left: 3px solid #3FB7EB;
            background: #FAFAFB;
            border-radius: 2px;
        }

        input[type='file'] {
            border: 0px;
            display: none;
        }
        .chartImg{
            height: 60px;
            width: 60px;
        }
        .subTable{
        margin:20px;
        }
    </style>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content  animated fadeInRight">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>数据列表</h5>
                </div>
                <div class="ibox-content">
                    <p>
                    <@shiro.hasPermission name="system:role:add">
                        <div class="input-file">
                            <input type="button" id="chartBtn" class="btn btn-success"  onclick="addChart();" value="添加">
                            <div id="loader" ></div>
                        </div>
                    </@shiro.hasPermission>
                    </p>
                    <hr>
                    <div class="row row-lg">
                        <div class="col-sm-12">
                            <!-- Example Card View -->
                            <div class="example-wrap">
                                <div class="example">
                                    <div class="form-group">
                                        <div class="col-sm-2">
                                            <div class="input-group">
                                                <span class="input-group-addon">类型</span>
                                                <select id="type" onchange="return search(this.options[this.selectedIndex].value)" name="direction" class="form-control selectpicker" style="height: min-content;width: 80%;">
                                                    <option value="">全部</option>
                                                    <option value="pie">饼状图</option>
                                                    <option value="line">折线图</option>
                                                    <option value="bar">柱状图</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-2">
                                            <div class="input-group">
                                                <span class="input-group-addon">状态</span>
                                                <select id="status" onchange="return searchStatus(this.options[this.selectedIndex].value)" name="direction" class="form-control selectpicker" style="height: min-content;width: 80%;">
                                                    <option value="">全部</option>
                                                    <option value="enable">可用</option>
                                                    <option value="disable">禁用</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <table id="table_list"></table>
                                </div>
                            </div>
                            <!-- End Example Card View -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="chartId"></div>

<!-- 全局js -->
<script src="${ctx!}/assets/js/jquery.min.js?v=2.1.4"></script>
<script src="${ctx!}/assets/js/bootstrap.min.js?v=3.3.6"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/echarts.min.5.0.1.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/dark.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/infographic.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/macarons.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/roma.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/shine.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/vintage.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/blue.js"></script>

<!-- Bootstrap table -->
<script src="${ctx!}/assets/js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script src="${ctx!}/assets/js/plugins/bootstrap-table/bootstrap-table-mobile.min.js"></script>
<script src="${ctx!}/assets/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<script src="${ctx!}/assets/echart/js/jquery.shCircleLoader-min.js"></script>
<script src="${ctx!}/assets/echart/js/xcConfirm.js"></script>
<!-- Peity -->
<script src="${ctx!}/assets/js/plugins/peity/jquery.peity.min.js"></script>

<script src="${ctx!}/assets/js/plugins/layer/layer.min.js"></script>

<!-- 自定义js -->
<script src="${ctx!}/assets/js/content.js?v=1.0.0"></script>

<!-- Page-Level Scripts -->
<script>
    var chartDataArr = [];
    $(document).ready(function () {

        //初始化表格,动态从服务器加载数据
        $("#table_list").bootstrapTable({
            //使用get请求到服务器获取数据
            method: "GET",
            //必须设置，不然request.getParameter获取不到请求参数
            contentType: "application/x-www-form-urlencoded",
            //获取数据的Servlet地址
            url: "${ctx!}/chart/list",
            //表格显示条纹
            striped: true,
            //启动分页
            pagination: true,
            //每页显示的记录数
            pageSize: 10,
            //当前第几页
            pageNumber: 1,
            //记录数可选列表
            pageList: [ 10, 20, 30, 50,100],
            //是否启用查询
            search: true,
            //是否启用详细信息视图
            detailView:true,
            detailFormatter:detailFormatter,
            //表示服务端请求
            sidePagination: "server",
            //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
            //设置为limit可以获取limit, offset, search, sort, order
            queryParamsType: "undefined",
            //json数据解析
            responseHandler: function(res) {
                return {
                    "rows": res.records,
                    "total": res.total
                };
            },
            //数据列
            columns: [{
                title: "图表",
                field: "type",
                formatter: function(value,row,index){
                    chartDataArr.push(row);
                    return "<div style=\"height: 40px;width: 60px\" id=\"id_"+row.id+"\"></div>";
                }
            },{
                title: "类型",
                field: "type",
                formatter: function(value,row,index){
                    if (value == 'bar'){
                        return '柱状图';
                    }else if(value == 'pie'){
                        return '饼图';
                    }else if(value == 'line'){
                        return '折线图';
                    }
                    return '-';
                }
            },{
                title: "名称",
                field: "name"
            },{
                title: "标题",
                field: "title"
            },{
                title: "Y轴名称",
                field: "yName"
            },{
                title: "状态",
                field: "status",
                formatter: function(value,row,index){
                    if (value == 'enable')
                        return '<span class="label label-success">可用</span>';
                    return '<span class="label label-danger">已禁用</span>';
                }
            },{
                title: "创建时间",
                field: 'createTime',
                sortable: true
            },{
                title: "备注",
                field: 'remark'
            },{
                title: "操作",
                field: "id",
                formatter: function (value, row, index) {

                    var operateHtml = '<@shiro.hasPermission name="system:role:deleteBatch"><button class="btn btn-info btn-xs" type="button" onclick="showDataChart(\''+row.id+'\')"><i class="fa fa-info-circle"></i>&nbsp;详情</button> &nbsp;</@shiro.hasPermission>';
                    operateHtml = operateHtml + '<@shiro.hasPermission name="system:role:edit"><button class="btn btn-primary btn-xs" type="button" onclick="editDataChart(\''+row.id+'\')"><i class="fa fa-edit"></i>&nbsp;修改</button> &nbsp;</@shiro.hasPermission>';
                    if(row.status == 'enable'){
                        operateHtml = operateHtml + '<@shiro.hasPermission name="system:role:grant"><button class="btn btn-danger btn-xs" type="button" onclick="updateStatus(\''+row.id+'\',\'disable\')"><i class="fa fa-ban"></i>&nbsp;禁用</button> &nbsp;</@shiro.hasPermission>';
                    }else{
                        operateHtml = operateHtml + '<@shiro.hasPermission name="system:role:grant"><button class="btn btn-success btn-xs" type="button" onclick="updateStatus(\''+row.id+'\',\'enable\')"><i class="fa fa-check-square-o"></i>&nbsp;启用</button> &nbsp;</@shiro.hasPermission>';
                    }
                    operateHtml = operateHtml + '<@shiro.hasPermission name="system:role:deleteBatch"><button class="btn btn-danger btn-xs" type="button" onclick="del(\''+row.id+'\')"><i class="fa fa-times-circle"></i>&nbsp;删除</button> &nbsp;</@shiro.hasPermission>';
                    return operateHtml;
                }
            }],
            onPostBody: function() {
                chartDataArr.forEach(function (item) {
                    optionChart(item);
                });
                chartDataArr = [];
            },
        });
    });

    function detailFormatter(index, row) {



    var result = "<div class=\"subTable\"><table class=\"table table-bordered table-hover table-striped\"><thead><tr>";
    result += "<th>系列名称</th>";
    var xData = JSON.parse(row.xData);
    xData.forEach(function (item) {
        result +="<th>"+item+"</th>";
    });
    result +="</tr></thead><tbody>";

    var seriesData = JSON.parse(row.seriesData);
    var seriesName = JSON.parse(row.seriesName);
    var dataLen = seriesData.length;
    for(let i=0;i<dataLen;i++){
     result +="<tr><td>"+seriesName[i]+"</td>";
     seriesData[i].forEach(function (item) {
          result +="<td>"+item+"</td>";
     });
     result +="</tr>";
    }
    result +="</tbody></table></div>";
        return result;
    }
    

    function search(type) {
        $('#table_list').bootstrapTable('refresh', {
            query:
                {
                    type:type,
                    status:$("#status").val()
                }
        });
    }
    function searchStatus(status) {
        $('#table_list').bootstrapTable('refresh', {
            query:
                {
                    type:$("#type").val(),
                    status:status
                }
        });
    }

    function addChart() {
        layer.open({
            type: 2,
            title: '图表添加',
            shadeClose: false,
            maxmin: true,
            shade: 0.6,
            area: ['90%', '90%'],
            content: '${ctx!}/chart/add',
            success: function(layero,index){
                var mask = $(".layui-layer-shade");
                mask.appendTo(layero.parent());
                //layer.full(index);
            },
            end: function (index) {
                $('#table_list').bootstrapTable('refresh', {
                    query:
                        {
                            type:$("#type").val(),
                            status:$("#status").val()
                        }
                });
            }
        });
    }
    function del(id){
        layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "${ctx!}/chart/delete/" + id,
                success: function(msg){
                    layer.msg(msg.message, {time: 2000},function(){
                        $('#table_list').bootstrapTable("refresh");
                        layer.close(index);
                    });
                }
            });
        });
    }
    function updateStatus(id,option){
        layer.confirm('确定要操作吗?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "${ctx!}/chart/updateStatus",
                data:{id:id,status:option},
                success: function(msg){
                    layer.msg(msg.message, {time: 2000},function(){
                        $('#table_list').bootstrapTable("refresh");
                        layer.close(index);
                    });
                }
            });
        });
    }

    function showDataChart(id) {
        layer.open({
            type: 2,
            title: '图表展示',
            shadeClose: false,
            maxmin: true,
            shade: 0.6,
            area: ['70%', '80%'],
            content: '${ctx!}/chart/show/' + id,
            success: function(layero,index){
                var mask = $(".layui-layer-shade");
                mask.appendTo(layero.parent());
                //layer.full(index);
            },
            end: function (index) {
            }
        });
    }

    function editDataChart(id) {
        layer.open({
            type: 2,
            title: '图表修改',
            shadeClose: false,
            maxmin: true,
            shade: 0.6,
            area: ['90%', '90%'],
            content: '${ctx!}/chart/edit/' + id,
            success: function(layero,index){
                var mask = $(".layui-layer-shade");
                mask.appendTo(layero.parent());
                layer.full(index);
            },
            end: function (index) {
                $('#table_list').bootstrapTable('refresh', {
                    query:
                        {
                            type:$("#type").val(),
                            status:$("#status").val()
                        }
                });
            }
        });
    }



    let xAxisMaxVal = 500;
    let themeStyle = 'vintage';
    let chartType = "bar";
    let yAxisName = "自定义Y轴名称";
    let yAxisPortraitName ="自\n定\n义\nY \n轴\n名\n称";
    let xAxisData = [[100,200,300,400,500]];
    let xAxisDataType = ['自定义1','自定义2','自定义3','自定义4','自定义5'];

    window.onresize = function(){
        chart.resize();    //若有多个图表变动，可多写
    }

    var legendData = [];

    let chart="";
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
        chart = echarts.init(document.getElementById("id_"+result.id),themeStyle);
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
            barWidth = 5;
        }else if(xAxisLength < 5){
            barWidth = 3;
        }else{
            barWidth = 1;
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
            grid: {
            },
            xAxis: {
                show:true,
                name:'',
                data: xAxisDataType,       //横坐标
            },
            yAxis: {
                show:false,
            },
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
            series: [
                {
                    name:'',
                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '80%'],
                    center:["50%","48%"],
                    label: {
                        show: false,
                        position: 'center'
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
            series: [
                {
                    name:xAxisDataType,
                    type:'pie',
                    selectedMode: 'single',
                    radius: ['40%', '80%'],
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
                data: xAxisData[i],
            });
        }

        option = {
            grid: {
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
            yAxis: {},
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
                                opacity: 0.3 // 区域透明度
                            }
                        },
                    }]
            });
        }
        option = {
            radar: [{
                indicator: indicator,
                center: ['50%', '52%'],
                radius: '90%',
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
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: [5, 20],
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
</script>
</body>

</html>
