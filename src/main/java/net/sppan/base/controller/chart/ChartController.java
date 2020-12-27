package net.sppan.base.controller.chart;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import net.sppan.base.common.JsonResult;
import net.sppan.base.controller.BaseController;
import net.sppan.base.entity.Chart;
import net.sppan.base.entity.Personnel;
import net.sppan.base.service.IChartService;
import net.sppan.base.vo.chart.ChartSaveVo;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;


@RestController
@RequestMapping(value={"/chart"})
public class ChartController extends BaseController {

    @Resource
    private IChartService chartService;

    @GetMapping("/list")
    public IPage<Chart> queryList(){
        QueryWrapper<Chart> queryWrapper = new QueryWrapper();
        PageRequest pageRequest = getPageRequest();
        IPage<Chart> page = new Page<>(pageRequest.getPageNumber(),pageRequest.getPageSize());
        return chartService.page(page,queryWrapper);
    }

    @ResponseBody
    @PostMapping(value = "/save")
    public JsonResult save(@Validated ChartSaveVo chartSaveVo, BindingResult bindingResult){

        if(bindingResult.hasErrors()){
            String errorMsg = bindingResult.getFieldError().getDefaultMessage();
            return JsonResult.failure(errorMsg);
        }

        try{
            Chart chart = new Chart();
            BeanUtils.copyProperties(chartSaveVo,chart);
            chartService.save(chart);

        }catch (Exception e){
            e.printStackTrace();
            return JsonResult.failure(e.getMessage());
        }

        return JsonResult.success("操作成功");
    }

}
