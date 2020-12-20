package net.sppan.base.enums;

public enum JobTypeEnum {
    OFFICE("OFFICE","文员"),
    DRIVER("DRIVER","司机"),
    LOGISTICS("LOGISTICS","后勤"),
    OPERATION("OPERATION","操作"),
    MANAGEMENT("MANAGEMENT","管理层"),
    SENIOR("SENIOR","高管")
    ;

    private String code;

    private String name;

    JobTypeEnum(String code, String name) {
        this.code = code;
        this.name = name;
    }

    public static JobTypeEnum getByName(String name){
        for(JobTypeEnum jobTypeEnum:JobTypeEnum.values()){
            if(jobTypeEnum.getName().equals(name)){
                return jobTypeEnum;
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
