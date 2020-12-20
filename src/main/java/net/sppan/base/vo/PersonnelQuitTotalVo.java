package net.sppan.base.vo;

import lombok.Data;

@Data
public class PersonnelQuitTotalVo {

    private int weekCount = 0;
    private int twoWeekCount = 0;
    private int lessMonthCount = 0;
    private int monthCount = 0;
    private int threeMonthCount = 0;
    private int sixMonthCount = 0;
    private int yearCount = 0;
    private int manyYearCount = 0;
}
