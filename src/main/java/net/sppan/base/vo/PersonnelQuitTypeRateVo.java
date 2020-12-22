package net.sppan.base.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PersonnelQuitTypeRateVo {

    //年份
    private String year;
    //办公室
    private BigDecimal officeRate = BigDecimal.ZERO;
    //司机
    private BigDecimal driverRate = BigDecimal.ZERO;
    //后勤
    private BigDecimal logisticsRate = BigDecimal.ZERO;
    //操作
    private BigDecimal operationRate = BigDecimal.ZERO;
    //管理层
    private BigDecimal managementRate = BigDecimal.ZERO;
    //高管
    private BigDecimal seniorRate = BigDecimal.ZERO;
}
