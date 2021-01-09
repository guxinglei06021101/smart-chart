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
    <link rel="stylesheet" href="${ctx!}/assets/echart/css/show_chart.css"/>


</head>
<body>
<!--主体-->
<div class="main clearfix">

    <div class="main-middle">
        <div class="border-container containertop">
            <div id="chartTitleId" class="name-title tile-size-color"></div>
            <div class="bar-chart" id="datachartId"></div>
            <table id="tableId" class="table table-bordered table-hover table-striped"></table>
        </div>
    </div>
    <input id="id" type="hidden" value="${id}">

</div>

<script type="text/javascript" src="${ctx!}/assets/echart/js/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/echarts.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/maps.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/show_chart.js"></script>

</body>
</html>