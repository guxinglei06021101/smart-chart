package net.sppan.base.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PersonnelQuitRateVo {

    private String year;

    private List<BigDecimal> rateList;

}
