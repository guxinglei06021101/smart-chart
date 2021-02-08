package net.sppan.base.dao.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.sppan.base.entity.ChartViewDetail;

public interface ChartViewDetailMapper extends BaseMapper<ChartViewDetail> {

    void del(Integer id);
}
