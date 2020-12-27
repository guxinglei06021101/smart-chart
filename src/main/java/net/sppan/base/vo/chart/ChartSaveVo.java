package net.sppan.base.vo.chart;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;

@Data
public class ChartSaveVo {

    @NotBlank(message = "图表名称不能为空")
    private String name;

    private String title;

    private String type;

    private String xName;

    private String xData;

    private String yName;

    private String seriesType;

    private String seriesData;

    private String remark;
}
