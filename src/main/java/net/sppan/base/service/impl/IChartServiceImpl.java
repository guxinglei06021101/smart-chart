package net.sppan.base.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.sppan.base.dao.mapper.ChartMapper;
import net.sppan.base.entity.Chart;
import net.sppan.base.service.IChartService;
import net.sppan.base.vo.ChartUpdateStatusVo;
import org.springframework.stereotype.Service;

@Service
public class IChartServiceImpl extends ServiceImpl<ChartMapper, Chart> implements IChartService {
    @Override
    public void del(Integer id) {
        this.baseMapper.del(id);
    }

    @Override
    public void updateStatusById(ChartUpdateStatusVo chartUpdateStatusVo) {
        this.baseMapper.updateStatusById(chartUpdateStatusVo);
    }
}
