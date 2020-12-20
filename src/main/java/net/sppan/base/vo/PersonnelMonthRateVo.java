package net.sppan.base.vo;

import lombok.Data;

@Data
public class PersonnelMonthRateVo {

    private String year;

    private int under3;

    private int month3_6;

    private int month6_12;

    private int month12_24;

    private int month24_36;

    private int greater36;

}
