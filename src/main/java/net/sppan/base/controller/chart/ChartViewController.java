package net.sppan.base.controller.chart;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import net.sppan.base.controller.BaseController;
import net.sppan.base.entity.ChartView;
import net.sppan.base.service.IChartViewDetailService;
import net.sppan.base.service.IChartViewService;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping(value={"/chartView"})
public class ChartViewController  extends BaseController {

    @Resource
    private IChartViewService chartViewService;
    @Resource
    private IChartViewDetailService chartViewDetailService;

    @GetMapping("/list")
    public IPage<ChartView> queryList(){
        QueryWrapper<ChartView> queryWrapper = new QueryWrapper();

        queryWrapper.eq("dr",0);
        queryWrapper.orderByDesc("create_time");
        PageRequest pageRequest = getPageRequest();
        IPage<ChartView> page = new Page<>(pageRequest.getPageNumber(),pageRequest.getPageSize());
        return chartViewService.page(page,queryWrapper);
    }

/*    @GetMapping("/detail/list")
    public IPage<ChartView> queryDetailList(){
        QueryWrapper<ChartView> queryWrapper = new QueryWrapper();

        queryWrapper.eq("dr",0);
        queryWrapper.orderByDesc("create_time");
        PageRequest pageRequest = getPageRequest();
        IPage<ChartView> page = new Page<>(pageRequest.getPageNumber(),pageRequest.getPageSize());
        return chartViewService.page(page,queryWrapper);
    }*/
}
