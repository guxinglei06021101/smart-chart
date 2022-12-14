<!doctype html>
<html lang="zh"  class="no-js">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>看板列表</title>
    <link rel="shortcut icon" href="favicon.ico">
    <link href="${ctx!}/assets/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="${ctx!}/assets/css/font-awesome.css?v=4.4.0" rel="stylesheet">

    <link href="${ctx!}/assets/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${ctx!}/assets/echart/css/chartViewList.css" rel="stylesheet">

</head>
<body id="bodyId">
    <div class="row row-lg">
        <div class="col-sm-3">
            <div class="example-wrap">
                <div class="example">
                    <div class="form-group">
                        <label class="col-sm-2 control-label"><i class="fa fa-arrows-alt fa-2x" style="color: #02a5fa" id="fullscreenId" aria-hidden="true"></i></label>
                        <div class="col-sm-3">
                            <select id="chartViewId" name="direction" class="form-control selectpicker" style="height: min-content;width: 300px;">
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <div id="contentId">
        <ul class="cd-gallery" id="ulId">
            <!--<li><div class="cd-single-item" id="id_6"></div><div class="cd-item-info"><b><a href="#0">图表信息</a></b></div></li>-->
        </ul>
        <div class="nodata"></div>
    </div>
</body>

<script src="${ctx!}/assets/js/jquery.min.js?v=2.1.4"></script>
<script src="${ctx!}/assets/js/bootstrap.min.js?v=3.3.6"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/echarts.min.5.0.1.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/maps.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/dark.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/infographic.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/macarons.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/roma.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/shine.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/vintage.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/theme/blue.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/chartViewList.js"></script>

<script src="${ctx!}/assets/js/plugins/layer/layer.min.js"></script>
<!--Popup Lightbox Js-->
<script src="${ctx!}/assets/js/content.js?v=1.0.0"></script>
</html>