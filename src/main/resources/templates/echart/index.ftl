<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge，chrome=1">
    <meta name="renderer" content="webkit">
    <title>中通人员情况图表分析</title>
    <link rel="stylesheet" type="text/css" href="http://apps.bdimg.com/libs/bootstrap/3.3.4/css/bootstrap.css">
    <link rel="stylesheet" href="${ctx!}/assets/echart/css/index.css"/>
    <script type="text/javascript" src="${ctx!}/assets/echart/js/jquery-1.4.4.min.js"></script>
</head>
<body>
<!--主体-->
<div class="main clearfix">
    <div class="main-left">

        <div class="border-container containertop">
            <div class="name-title tile-size-color">
                在职员工类型分布图
            </div>
            <div class="graduateyear">
                <div class="bar-chart" id="bar-chart"></div>
            </div>
        </div>
        <div class="border-container containerbottom">
            <div class="name-title tile-size-color">
                在职员工学历分布图
            </div>
            <div class="pie-chart" id="pie-chart-eduGroup"></div>
        </div>
    </div>
    <div class="main-middle">
        <div class="border-container containertop">
        	<div class="name-title tile-size-color">
              	 全国分布情况图
            </div>
            <div class="name-title1 tile-size-color1">
                在职人数：<b>${personnelCount.jobCount}</b>
            </div>

           <div id="mapadd">
               <div class="map-chart" id="map-chart"></div>
           </div>
        </div>
        <div class="border-container containerbottom borderno-container">
            <ul class="teacher-pie clearfix">
                <li class="teacherList">
                    <div class="name-title tile-size-color">
                        人员增长分布图
                    </div>
                    <div id="courserate">
                        <div class="progress1-chart" id="linecross-chart"></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="main-right">
        <div class="border-container containertop ">
            <div class="name-title tile-size-color">
                在职员工工龄分布
            </div>
            <div class="graduateyear">
                <div class="pie-chart" id="pie-chart-jobAge"></div>
            </div>
        </div>

        <div class="border-container containerbottom">
            <div class="name-title tile-size-color">
                在职员工工龄分布图
            </div>
            <div class="line-chart" id="line-chart"></div>
        </div>
    </div>

    <div class="main-left">

        <div class="border-container containertop borderno-container">
            <h5 class="name-title tile-size-color">
                在职员工年龄分布占比图
            </h5>
            <div id="radar">

                <div class="pie-chart" id="pie-chart"></div>
                <ul class="SiteStatusList">
                    <li><i class="age2025 Statussame" ></i>20~25：<span>${personnelAgeGroup.age2025}</span></li>
                    <li><i class="age2530 Statussame"></i>25~30：<span>${personnelAgeGroup.age2530}</span></li>
                    <li><i class="age3035 Statussame"></i>30~35：<span>${personnelAgeGroup.age3035}</span></li>
                </ul>
                <ul class="SiteStatusList">
                    <li><i class="age3540 Statussame"></i>35~40：<span>${personnelAgeGroup.age3540}</span></li>
                    <li><i class="age4045 Statussame"></i>40~45：<span>${personnelAgeGroup.age4045}</span></li>
                    <li><i class="age4550 Statussame"></i>45~50：<span>${personnelAgeGroup.age4550}</span></li>
                </ul>
                <ul class="SiteStatusList">
                    <li><i class="under20 Statussame"></i>20以下：<span>${personnelAgeGroup.under20}&nbsp;&nbsp;</span></li>
                    <li><i class="greater50 Statussame"></i>50以上：<span>${personnelAgeGroup.greater50}</span></li>
                </ul>
            </div>
        </div>
        <div class="border-container containerbottom">
            <div class="name-title tile-size-color">
                在职员工学历分布图
            </div>
            <div id="courserate">
                <div class="progress1-chart" id="progress1-chart"></div>
            </div>
        </div>
    </div>

    <div class="main-middle">
        <div class="border-container  containertop borderno-container">
            <div class="name-title tile-size-color">
                人员增长率%
            </div>
            <div class="graduateyear">
                <div class="line-chart" id="line-chart-growthRate"></div>
            </div>
        </div>
        <div class="border-container containerbottom borderno-container">
            <ul class="teacher-pie clearfix">
                <li class="teacherList">
                    <div class="name-title tile-size-color">
                        在职员工年龄分布
                    </div>
                    <div class="graduateyear">
                        <div class="bar-chart" id="bar-chart-JobAgeTypeGroup"></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="main-right">
        <div class="border-container containertop borderno-container">
            <div class="name-title tile-size-color">
                员工籍贯分布图
            </div>
            <div id="radar-chart" class="radar-chart"></div>
        </div>
        <div class="border-container containerbottom">
            <div class="name-title tile-size-color">
                在职员工年龄分布
            </div>
            <div class="graduateyear">
                <div class="line-chart" id="pie-chart-jobAgeGroup"></div>
            </div>
        </div>
    </div>

</div>

<script type="text/javascript" src="${ctx!}/assets/echart/js/echarts.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/new_file.js"></script>
<script type="text/javascript" src="${ctx!}/assets/echart/js/maps.js"></script>

</body>
</html>