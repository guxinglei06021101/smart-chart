<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>制版</title>
    <meta name="keywords" content="">
    <meta name="description" content="">

    <link rel="shortcut icon" href="favicon.ico">
    <link href="${ctx!}/assets/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="${ctx!}/assets/css/bootstrap-select.min.css?v=3.3.6" rel="stylesheet">
    <link href="${ctx!}/assets/css/font-awesome.css?v=4.4.0" rel="stylesheet">
    <link href="${ctx!}/assets/css/animate.css" rel="stylesheet">
    <link href="${ctx!}/assets/css/style.css?v=4.1.0" rel="stylesheet">
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">

    <div class="row">
        <div class="col-sm-10">
            <div class="ibox float-e-margins" style="align-content: center">
                <div class="ibox-title">
                    <span>新增看板</span>
                </div>
                <div class="ibox-content">
                    <form class="form-horizontal m-t" id="frm" method="post" action="${ctx!}/house/save">
                        <div class="form-group">
                            <div class="col-sm-5">
                                <div class="input-group">
                                    <span class="input-group-addon">名称</span>
                                    <input id="tenancyMin" name="tenancyMin" class="form-control" placeholder="" type="text" value="${house.tenancyMin}">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-5">
                                <div class="input-group">
                                    <span class="input-group-addon">风格</span>
                                        <select id="payType" name="payType" class="form-control selectpicker" style="height: min-content">
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
                        </div>
                        <div class="form-group">
                            <div class="col-sm-5">
                                <div class="input-group">
                                    <span class="input-group-addon">选择图表</span>
                                    <input id="selectChartId" type="button"  class="form-control" value="             ">
                                </div>
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


<!-- 全局js -->
<script src="${ctx!}/assets/js/jquery.min.js?v=2.1.4"></script>
<script src="${ctx!}/assets/js/bootstrap.min.js?v=3.3.6"></script>
<script src="${ctx!}/assets/js/bootstrap-select.min.js?v=3.3.6"></script>

<!-- 自定义js -->
<script src="${ctx!}/assets/js/content.js?v=1.0.0"></script>

<!-- jQuery Validation plugin javascript-->
<script src="${ctx!}/assets/js/plugins/validate/jquery.validate.min.js"></script>
<script src="${ctx!}/assets/js/plugins/validate/messages_zh.min.js"></script>
<script src="${ctx!}/assets/js/plugins/layer/layer.min.js"></script>
<script src="${ctx!}/assets/js/plugins/layer/laydate/laydate.js"></script>

<script type="text/javascript">
    $(document).ready(function () {

        $("#selectChartId").click(function () {
            selectchart();
        });
    });

    function selectchart() {
        layer.open({
            type: 2,
            title: '选择图表',
            shadeClose: false,
            maxmin: true,
            shade: 0.6,
            area: ['90%', '90%'],
            content: '/chartView/selectchart',
            success: function(layero,index){
                var mask = $(".layui-layer-shade");
                mask.appendTo(layero.parent());
                //layer.full(index);
            },
            end: function (index) {
                /*$('#table_list').bootstrapTable('refresh', {
                    query:
                        {
                            type:$("#type").val(),
                            status:$("#status").val()
                        }
                });*/
            }
        });
    }
</script>

</body>

</html>
