package net.sppan.base.dao.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.sppan.base.entity.ChartView;

public interface ChartViewMapper extends BaseMapper<ChartView> {

    void del(Integer id);
}
