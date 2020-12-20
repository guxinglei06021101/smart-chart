package net.sppan.base.vo;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PersonnelTypeRateVo {

    private String type;

    private BigDecimal rate;
}
