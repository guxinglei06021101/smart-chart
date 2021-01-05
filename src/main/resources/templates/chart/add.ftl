﻿<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge，chrome=1">
    <meta name="renderer" content="webkit">
    <title>中通人员情况图表分析</title>
    <link rel="shortcut icon" href="favicon.ico">
    <link href="${ctx!}/assets/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="${ctx!}/assets/css/bootstrap-select.min.css?v=3.3.6" rel="stylesheet">
    <link href="${ctx!}/assets/css/font-awesome.css?v=4.4.0" rel="stylesheet">
    <link href="${ctx!}/assets/css/animate.css" rel="stylesheet">
    <link href="${ctx!}/assets/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${ctx!}/assets/css/prettify.css" rel="stylesheet">
    <link rel="stylesheet" href="${ctx!}/assets/echart/css/datachart.css"/>
    <script type="text/javascript" src="${ctx!}/assets/echart/js/jquery-1.4.4.min.js"></script>
</head>
<body>
<!--主体-->
<div class="main clearfix">

    <div class="main-middle">
        <div class="border-container containertop">
        	<div id="chartTitleId" class="name-title tile-size-color"></div>
            <div class="bar-chart" id="bar-chart"></div>
            <table id="tableId" class="table table-bordered table-hover table-striped"></table>
        </div>

    </div>

    <div class="main-form">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins" style="align-content: center">
                    <div class="ibox-content">
                        <form class="form-horizontal m-t" id="frm" method="post" action="${ctx!}/chart/save">
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span class="text-danger " style="font-size: large;">*</span>类型：</label>
                                <div class="col-sm-5">
                                    <select id="chartTypeId" name="type" class="form-control selectpicker"  style="height: min-content;width: 180px">
                                        <option value="bar" selected="selected">柱状图</option>
                                        <option value="line" >折线图</option>
                                        <option value="pie" >饼状图</option>
                                        <option value="radar" >雷达图</option>
                                        <option value="funnel" >漏斗图</option>
                                        <option value="gauge" >仪表盘</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span class="text-danger " style="font-size: large;">*</span>标题：</label>
                                <div class="col-sm-9">
                                    <div class="input-group">
                                        <span class="input-group-addon">标题</span>
                                        <input id="titleId" name="title" class="form-control" placeholder="图表标题" type="text" value="自定义图表标题">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span class="text-danger " style="font-size: large;">*</span>名称：</label>
                                <div class="col-sm-9">
                                    <div class="input-group">
                                        <span class="input-group-addon">名称</span>
                                        <input id="nameId" name="name" class="form-control" placeholder="图表名称" type="text" value="">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span class="text-danger " style="font-size: large;">*</span>X轴：</label>
                                <div class="col-sm-9">
                                    <div class="input-group">
                                        <span class="input-group-addon">名称</span>
                                        <input id="xAxisDataTypeId" name="seriesType" class="form-control" placeholder="X轴" type="text" value="自定义1,自定义2,自定义3,自定义4,自定义5">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span class="text-danger " style="font-size: large;">*</span>Y轴：</label>
                                <div class="col-sm-9">
                                    <div class="input-group">
                                        <span class="input-group-addon">名称</span>
                                        <input id="yAxisId" name="yName" class="form-control" placeholder="Y轴名称" type="text" value="自定义Y轴名称">

                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">描述：</label>
                                <div class="col-sm-9">
                                    <textarea class="form-control" name="remark" placeholder="内容…"></textarea>
                                </div>

                            </div>
                            <div class="form-group">
                                <div class="col-sm-3 col-sm-offset-3">
                                    <br/>
                                    <input id="xAxisMaxValId" name="xAxisMaxVal" class="form-control" placeholder="" type="text" value="500">
                                    <button class="btn btn-primary" type="submit">提交</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<script type="text/javascript" src="${ctx!}/assets/echart/js/echarts.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/add_chart.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/maps.js"></script>

</body>
</html>