<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge，chrome=1">
    <meta name="renderer" content="webkit">
    <title>中通人员情况图表分析</title>
    <link rel="stylesheet" type="text/css" href="http://apps.bdimg.com/libs/bootstrap/3.3.4/css/bootstrap.css">
    <link rel="stylesheet" href="${ctx!}/assets/echart/css/quit-index.css"/>

    <script type="text/javascript" src="${ctx!}/assets/echart/js/jquery-1.4.4.min.js"></script>
    <link rel="stylesheet" type="text/css" href="${ctx!}/assets/echart/css/jquery.shCircleLoader.css" />
    <script type="text/javascript" src="${ctx!}/assets/echart/js/jquery.shCircleLoader-min.js"></script>

</head>
<body>
<!--主体-->
<div class="main clearfix">
    <div class="main-left">
        <div class="border-container containertop">
            <h5 class="name-title tile-size-color">
                                离职员工年龄分布占比
            </h5>
            <div id="radar">
            	<div class="pie-chart" id="pie-nestchar"></div>
            </div>
        </div>

        <div class="border-container containerbottom">
            <div class="name-title tile-size-color">
                离职员工就职天数对比
            </div>
            <div id="courserate">
                <div class="line-chart" id="line-chart-quit-day"></div>
            </div>
        </div>

    </div>
    <div class="main-middle">

        <div class="border-container containertop">
            <div class="name-title tile-size-color">
                离职员工工龄分布图
            </div>
            <div class="line-chart" id="line-chart"></div>
        </div>

        <div class="border-container containerbottom  borderno-container">
            <div class="name-title tile-size-color">
                离职员工学历分布图
            </div>
            <div id="courserate">
                <div class="progress1-chart" id="progress1-chart"></div>
            </div>
        </div>
    </div>
    <div class="main-right">
        <div class="border-container containertop">
            <div class="name-title tile-size-color">
                离职员工岗位分布图
            </div>
            <div class="line-chart" id="line-chart-quit"></div>
        </div>

        <div class="border-container containerbottom">
            <div class="name-title tile-size-color">
                离职员工籍贯分布图
            </div>
            <div id="radar-chart" class="radar-chart"></div>

        </div>

    </div>
</div>

<script type="text/javascript" src="${ctx!}/assets/echart/js/echarts.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/quit_file.js"></script>
 
</body>
</html>