package net.sppan.base.vo;

import lombok.Data;

@Data
public class PersonnelEduListVo {

    private PersonnelEduGroupVo office;

    private PersonnelEduGroupVo driver;

    private PersonnelEduGroupVo logistics;

    private PersonnelEduGroupVo operation;

    private PersonnelEduGroupVo management;

    private PersonnelEduGroupVo senior;

}
