package net.sppan.base.service;

import com.baomidou.mybatisplus.extension.service.IService;
import net.sppan.base.entity.Chart;
import net.sppan.base.vo.ChartUpdateStatusVo;

public interface IChartService extends IService<Chart> {

    void del(Integer id);

    void updateStatusById(ChartUpdateStatusVo chartUpdateStatusVo);
}
