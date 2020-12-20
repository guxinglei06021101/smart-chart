package net.sppan.base.vo;

import lombok.Data;

import java.util.List;

@Data
public class PersonnelJobGrowthRateVo {

    private String year;

    List<PersonnelJobNumberVo> rateList;
}
