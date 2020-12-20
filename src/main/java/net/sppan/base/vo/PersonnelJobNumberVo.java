package net.sppan.base.vo;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PersonnelJobNumberVo {

    private String year;

    private String month;

    private Integer jobNum;

    private BigDecimal jobRate;
}
