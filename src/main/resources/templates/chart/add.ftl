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
    <link rel="stylesheet" href="${ctx!}/assets/echart/css/datachart.css"/>
    <script type="text/javascript" src="${ctx!}/assets/echart/js/jquery-1.4.4.min.js"></script>
</head>
<body>
<!--主体-->
<div class="main clearfix">

    <div class="main-middle">
        <div class="border-container containertop">
        	<div id="chartTitleId" class="name-title tile-size-color">

            </div>

            <div class="bar-chart" id="bar-chart"></div>
        </div>
    </div>


    <div class="main-form">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins" style="align-content: center">
                    <div class="ibox-content">
                        <form class="form-horizontal m-t" id="frm" method="post" action="${ctx!}/chart/save">
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span class="text-danger " style="font-size: large;">*</span>图表类型：</label>
                                <div class="col-sm-3">
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
                                <label class="col-sm-2 control-label"><span class="text-danger " style="font-size: large;">*</span>图表标题：</label>
                                <div class="col-sm-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">标题</span>
                                        <input id="titleId" name="title" class="form-control" placeholder="图表标题" type="text" value="自定义图表标题">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span class="text-danger " style="font-size: large;">*</span>图表名称：</label>
                                <div class="col-sm-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">名称</span>
                                        <input id="nameId" name="name" class="form-control" placeholder="图表名称" type="text" value="">

                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span class="text-danger " style="font-size: large;">*</span>Y轴名称：</label>
                                <div class="col-sm-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">Y轴名称</span>
                                        <input id="yAxisId" name="yName" class="form-control" placeholder="Y轴名称" type="text" value="自定义Y轴名称">

                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Y轴最大值：</label>
                                <div class="col-sm-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">Y轴最大值</span>
                                        <input id="xAxisMaxValId" name="xAxisMaxVal" class="form-control" placeholder="" type="text" value="500">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">X轴数据：</label>
                                <div class="col-sm-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">X轴名称</span>
                                        <input id="xAxisDataTypeId" name="seriesType" class="form-control" placeholder="X轴名称" type="text" value="自定义1,自定义2,自定义3,自定义4,自定义5">
                                    </div>
                                </div>
                            </div>

                            <div class="form-group" >
                                    <table id="tableId" class="table table-bordered table-hover table-striped">
                                        <thead>
                                        <tr>　　
                                            <th>系列</th>
                                            <th>自定义1</th>
                                            <th>自定义2</th>
                                            <th>自定义3</th>
                                            <th>自定义4</th>
                                            <th>自定义5</th>
                                            <th>颜色</th>
                                            <th>操作 &nbsp;&nbsp;<a href="#" onclick="addTableTr()"  class="btn btn-success">✚</a></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in search(keywords)" >
                                            <td><input style="width: 120px;padding: 0px;text-align: center" class="form-control" type="text" value="系列名称"></td>
                                            <td><input style="width: 60px;padding: 0px;text-align: center" class="form-control" type="text" value="100"></td>
                                            <td><input style="width: 60px;padding: 0px;text-align: center" class="form-control" type="text" value="200"></td>
                                            <td><input style="width: 60px;padding: 0px;text-align: center" class="form-control" type="text" value="300"></td>
                                            <td><input style="width: 60px;padding: 0px;text-align: center" class="form-control" type="text" value="400"></td>
                                            <td><input style="width: 60px;padding: 0px;text-align: center" class="form-control" type="text" value="500"></td>
                                            <td><input style="width: 60px;padding: 2px;text-align: center" class="form-control" type="color" ></td>
                                            <td></td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">描述：</label>
                                <div class="col-sm-6">
                                    <textarea class="form-control" name="remark" placeholder="内容…"></textarea>
                                </div>

                            </div>
                            <div class="form-group">
                                <div class="col-sm-3 col-sm-offset-3">
                                    <br/>
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