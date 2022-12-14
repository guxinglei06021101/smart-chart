<!DOCTYPE html>
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
    <link rel="stylesheet" type="text/css" href="${ctx!}/assets/echart/css/xcConfirm.css" />
    <link rel="stylesheet" href="${ctx!}/assets/echart/css/datachart.css"/>


</head>
<body>
<!--主体-->
<div class="main clearfix">

    <div class="main-middle">
        <div class="border-container containertop">
        	<div id="chartTitleId" class="name-title tile-size-color"></div>
            <div class="bar-chart" id="bar-chart"></div>
            <div style="width:690px; height:240px; overflow:scroll;">
                <table id="tableId" class="table table-bordered table-hover table-striped"></table>
            </div>
        </div>

    </div>

    <div class="main-form">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins" style="align-content: center">
                    <div class="ibox-content">
                        <form class="form-horizontal m-t" id="frm" method="" action="${ctx!}/chart/save">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">类型：</label>
                                <div class="col-sm-5">
                                    <select id="chartTypeId" name="type" class="form-control selectpicker"  style="height: min-content;width: 180px">
                                        <option value="bar" selected="selected">柱状图</option>
                                        <option value="line" >折线图</option>
                                        <option value="pie" >饼状图</option>
                                        <option value="annular" >环形图</option>
                                        <option value="rose" >南丁格尔玫瑰图</option>
                                        <option value="radar" >雷达图</option>
                                        <option value="funnel" >漏斗图</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">样式：</label>
                                <div class="col-sm-5">
                                    <select id="themeStyleId" name="themeStyle" class="form-control selectpicker"  style="height: min-content;width: 180px">
                                        <option value="shine" selected="selected">shine</option>
                                        <option value="roma" >roma</option>
                                        <option value="macarons" >macarons</option>
                                        <option value="infographic" >infographic</option>
                                        <option value="vintage" >vintage</option>
                                        <option value="blue" >blue</option>
                                        <option value="dark" >dark</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">标题：</label>
                                <div class="col-sm-9">
                                    <input id="titleId" name="title" class="form-control" placeholder="图表标题" type="text" value="自定义图表标题">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">名称：</label>
                                <div class="col-sm-9">
                                    <input id="nameId" name="name" class="form-control" placeholder="图表名称" type="text" value="">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Y轴：</label>
                                <div class="col-sm-9">
                                    <input id="yAxisId" name="yName" class="form-control" placeholder="Y轴名称" type="text" value="自定义Y轴名称">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">X轴：</label>
                                <div class="col-sm-9">
                                    <textarea id="xAxisDataTypeId" name="seriesType" class="form-control" placeholder="X轴" type="text" value=""></textarea>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">描述：</label>
                                <div class="col-sm-9">
                                    <textarea class="form-control" name="remark" id="remarkId" placeholder=""></textarea>
                                </div>

                            </div>
                            <div class="form-group">
                                <div class="col-sm-3 col-sm-offset-3">
                                    <br/>
                                    <input id="xAxisMaxValId" name="xAxisMaxVal" class="form-control" placeholder="" type="hidden" value="500">
                                    <input id="id" type="hidden" value="${id}">
                                    <button class="btn btn-primary" type="button" id="submitId">保存</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<script type="text/javascript"  src="${ctx!}/assets/js/jquery.min.js?v=2.1.4"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/echarts.min.5.0.1.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/dark.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/infographic.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/macarons.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/roma.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/shine.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/vintage.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/blue.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/maps.js"></script>
<script src="${ctx!}/assets/echart/js/xcConfirm.js"></script>
<script src="${ctx!}/assets/js/plugins/layer/layer.min.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/edit_chart.js"></script>


</body>
</html>