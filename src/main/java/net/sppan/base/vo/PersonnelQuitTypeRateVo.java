package net.sppan.base.vo;

import lombok.Data;

import java.util.List;

@Data
public class PersonnelQuitTypeRateVo {

    private String year;

    private List<PersonnelTypeRateVo> rateVoList;
}
