package net.sppan.base.controller.chart;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import net.sppan.base.common.JsonResult;
import net.sppan.base.controller.BaseController;
import net.sppan.base.entity.Chart;
import net.sppan.base.entity.ChartView;
import net.sppan.base.service.IChartViewDetailService;
import net.sppan.base.service.IChartViewService;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping(value={"/chartView"})
public class ChartViewController  extends BaseController {

    @Resource
    private IChartViewService chartViewService;
    @Resource
    private IChartViewDetailService chartViewDetailService;

    @GetMapping("/page/list")
    public IPage<ChartView> queryPageList(){
        QueryWrapper<ChartView> queryWrapper = new QueryWrapper();

        queryWrapper.eq("dr",0);
        queryWrapper.orderByDesc("create_time");
        PageRequest pageRequest = getPageRequest();
        IPage<ChartView> page = new Page<>(pageRequest.getPageNumber(),pageRequest.getPageSize());
        return chartViewService.page(page,queryWrapper);
    }

    @GetMapping("/queryList")
    public List<ChartView> queryList(){
        QueryWrapper<ChartView> queryWrapper = new QueryWrapper();
        queryWrapper.eq("dr",0);
        queryWrapper.orderByDesc("create_time");
        return chartViewService.list(queryWrapper);
    }

    @GetMapping("/findChartById/{id}")
    public List<Chart> findChartById(@PathVariable("id") Integer id){
        return  chartViewService.findChartById(id);
    }

    @PostMapping("/delete/{id}")
    public JsonResult deleteById(@PathVariable("id") Integer id){
        try{
            chartViewService.del(id);
        }catch (Exception e){
            e.printStackTrace();
            return JsonResult.failure(e.getMessage());
        }
        return JsonResult.success();
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
