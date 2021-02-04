package net.sppan.base.vo.chart;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;

@Data
public class ChartSaveVo {

    @NotBlank(message = "图表名称不能为空")
    private String name;

    @NotBlank(message = "图表标题不能为空")
    private String title;

    @NotBlank(message = "图表类型不能为空")
    private String type;

    private String xName;

    private String yMax;

    private String themeCode;

    @NotBlank(message = "图表数值不能为空")
    private String xData;

    private String yName;

    @NotBlank(message = "图表系列名称不能为空")
    private String seriesName;

    @NotBlank(message = "图表系列类型不能为空")
    private String seriesType;

    private String seriesData;

    private String remark;
}
