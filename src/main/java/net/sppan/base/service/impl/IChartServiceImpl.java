package net.sppan.base.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.sppan.base.dao.mapper.ChartMapper;
import net.sppan.base.entity.Chart;
import net.sppan.base.service.IChartService;
import org.springframework.stereotype.Service;

@Service
public class IChartServiceImpl extends ServiceImpl<ChartMapper, Chart> implements IChartService {
}
