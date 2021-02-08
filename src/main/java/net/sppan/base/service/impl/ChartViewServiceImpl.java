package net.sppan.base.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.sppan.base.dao.mapper.ChartViewMapper;
import net.sppan.base.entity.ChartView;
import net.sppan.base.service.IChartViewService;
import org.springframework.stereotype.Service;

@Service
public class ChartViewServiceImpl extends ServiceImpl<ChartViewMapper, ChartView> implements IChartViewService {
}
