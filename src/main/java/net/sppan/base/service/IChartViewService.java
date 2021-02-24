package net.sppan.base.service;

import com.baomidou.mybatisplus.extension.service.IService;
import net.sppan.base.entity.Chart;
import net.sppan.base.entity.ChartView;

import java.util.List;

public interface IChartViewService extends IService<ChartView> {
    List<Chart> findChartById(Integer id);

    void del(Integer id);
}
