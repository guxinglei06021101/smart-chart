package net.sppan.base.enums;

public enum EducationEnum {

    PRIMARY_SCHOOL("PRIMARY_SCHOOL","小学"),
    MIDDLE_SCHOOL("MIDDLE_SCHOOL","初中"),
    HIGH_SCHOOL("HIGH_SCHOOL","高中"),
    SECONDARY_SPECIALIZED ("SECONDARY_SPECIALIZED","中专"),
    JUNIOR_COLLEGE("JUNIOR_COLLEGE","大专"),
    UNDERGRADUATE("UNDERGRADUATE","本科"),
    MASTER("MASTER","硕士");

    private String code;

    private String name;

    EducationEnum(String code, String name) {
        this.code = code;
        this.name = name;
    }

    public static EducationEnum getByName(String name){
        for(EducationEnum educationEnum:EducationEnum.values()){
            if(educationEnum.getName().equals(name)){
                return educationEnum;
            }
        }
        return null;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
