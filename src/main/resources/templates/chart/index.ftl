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
    </style>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content  animated fadeInRight">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>图表列表</h5>
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
                                    <div class="col-sm-2">
                                        <div class="input-group">
                                            <span class="input-group-addon">类型</span>
                                            <select id="quit" onchange="return search(this.options[this.selectedIndex].value)" name="direction" class="form-control selectpicker" style="height: min-content;width: 80%;">
                                                <option value="">全部</option>
                                                <option value="0">饼状图</option>
                                                <option value="1">折线图</option>
                                                <option value="2">柱状图</option>
                                            </select>
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

<!-- 全局js -->
<script src="${ctx!}/assets/js/jquery.min.js?v=2.1.4"></script>
<script src="${ctx!}/assets/js/bootstrap.min.js?v=3.3.6"></script>

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
                title: "ID",
                field: "id",

            },{
                title: "名称",
                field: "name"
            },{
                title: "类型",
                field: "type"
            },{
                title: "是否可用",
                field: "dr",
                formatter: function(value,row,index){
                    if (value == '0')
                        return '<span class="label label-primary">可用</span>';
                    return '<span class="label label-danger">已禁用</span>';
                }
            },{
                title: "创建时间",
                field: 'createTime',
                sortable: true
            },{
                title: "更新时间",
                field: 'updateTime'
            },{
                title: "备注",
                field: 'remark'
            },{
                title: "操作",
                field: "id"
            }]
        });
    });

    function detailFormatter(index, row) {
        var html = [];
        html.push('<p><b>备注:</b> ' + row.remark + '</p>');
        return html.join('');
    }
    

    function search(quit) {

        $('#table_list').bootstrapTable('refresh', {
            query:
                {
                    quit:quit
                }
        });
    }
    function addChart() {
        alert('新增图表');
    }
</script>
</body>

</html>
