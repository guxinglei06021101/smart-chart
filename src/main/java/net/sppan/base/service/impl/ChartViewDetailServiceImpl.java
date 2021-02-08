package net.sppan.base.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.sppan.base.dao.mapper.ChartViewDetailMapper;
import net.sppan.base.entity.ChartViewDetail;
import net.sppan.base.service.IChartViewDetailService;
import org.springframework.stereotype.Service;

@Service
public class ChartViewDetailServiceImpl extends ServiceImpl<ChartViewDetailMapper, ChartViewDetail> implements IChartViewDetailService {
}
