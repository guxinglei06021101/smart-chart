package net.sppan.base.dao.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.sppan.base.entity.Chart;
import net.sppan.base.entity.ChartView;

import java.util.List;

public interface ChartViewMapper extends BaseMapper<ChartView> {

    void del(Integer id);

    List<Chart> findChartById(Integer id);
}
