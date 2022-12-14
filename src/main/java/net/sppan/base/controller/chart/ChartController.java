package net.sppan.base.controller.chart;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import net.sppan.base.common.JsonResult;
import net.sppan.base.controller.BaseController;
import net.sppan.base.entity.Chart;
import net.sppan.base.service.IChartService;
import net.sppan.base.vo.ChartUpdateStatusVo;
import net.sppan.base.vo.chart.ChartUpdateVo;
import org.apache.commons.lang3.StringUtils;
import net.sppan.base.vo.chart.ChartSaveVo;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.math.BigDecimal;


@RestController
@RequestMapping(value={"/chart"})
public class ChartController extends BaseController {

    @Resource
    private IChartService chartService;

    @GetMapping("/list")
    public IPage<Chart> queryList(){
        QueryWrapper<Chart> queryWrapper = new QueryWrapper();
        String type = request.getParameter("type");
        String status = request.getParameter("status");
        if(StringUtils.isNotBlank(type)){
            queryWrapper.eq("type",type);
        }
        if(StringUtils.isNotBlank(status)){
            queryWrapper.eq("status",status);
        }
        queryWrapper.eq("dr",0);
        queryWrapper.orderByDesc("create_time");
        PageRequest pageRequest = getPageRequest();
        IPage<Chart> page = new Page<>(pageRequest.getPageNumber(),pageRequest.getPageSize());
        return chartService.page(page,queryWrapper);
    }

    @PostMapping(value = "/save")
    public JsonResult save(@Validated ChartSaveVo chartSaveVo, BindingResult bindingResult){

        if(bindingResult.hasErrors()){
            String errorMsg = bindingResult.getFieldError().getDefaultMessage();
            return JsonResult.failure(errorMsg);
        }

        try{
            Chart chart = new Chart();
            BeanUtils.copyProperties(chartSaveVo,chart);
            chart.setYMax(new BigDecimal(chartSaveVo.getYMax()));
            chart.setStatus("enable");
            chartService.save(chart);

        }catch (Exception e){
            e.printStackTrace();
            return JsonResult.failure(e.getMessage());
        }

        return JsonResult.success("????????????");
    }

    @PostMapping(value = "/update")
    public JsonResult update(@Validated ChartUpdateVo chartUpdateVo, BindingResult bindingResult){

        if(bindingResult.hasErrors()){
            String errorMsg = bindingResult.getFieldError().getDefaultMessage();
            return JsonResult.failure(errorMsg);
        }
        try{
            Chart chart = new Chart();
            BeanUtils.copyProperties(chartUpdateVo,chart);
            chart.setYMax(new BigDecimal(chartUpdateVo.getYMax()));
            chartService.updateById(chart);
        }catch (Exception e){
            e.printStackTrace();
            return JsonResult.failure(e.getMessage());
        }
        return JsonResult.success("????????????");
    }


    @PostMapping("/delete/{id}")
    public JsonResult deleteById(@PathVariable("id") Integer id){
        try{
            chartService.del(id);
        }catch (Exception e){
            e.printStackTrace();
            return JsonResult.failure(e.getMessage());
        }
        return JsonResult.success();
    }

    @PostMapping("/updateStatus")
    public JsonResult updateStatus( ChartUpdateStatusVo chartUpdateStatusVo){
        try{
            chartService.updateStatusById(chartUpdateStatusVo);
        }catch (Exception e){
            e.printStackTrace();
            return JsonResult.failure(e.getMessage());
        }
        return JsonResult.success();
    }

    @RequestMapping("/findById/{id}")
    public Chart findById(@PathVariable Integer id){
        return chartService.getById(id);
    }

}
