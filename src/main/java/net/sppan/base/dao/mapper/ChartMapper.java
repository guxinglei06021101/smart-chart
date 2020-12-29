package net.sppan.base.dao.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.sppan.base.entity.Chart;
import net.sppan.base.vo.ChartUpdateStatusVo;
import org.apache.ibatis.annotations.Param;

public interface ChartMapper extends BaseMapper<Chart> {

    void del(Integer id);

    void updateStatusById(ChartUpdateStatusVo chartUpdateStatusVo);
}
