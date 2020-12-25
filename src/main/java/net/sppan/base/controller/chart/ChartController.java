package net.sppan.base.controller.chart;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import net.sppan.base.controller.BaseController;
import net.sppan.base.entity.Chart;
import net.sppan.base.entity.Personnel;
import net.sppan.base.service.IChartService;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
