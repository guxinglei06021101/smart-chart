package net.sppan.base.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import net.sppan.base.entity.support.BaseEntity;

import java.util.Date;

@Data
@TableName(value = "tb_tb_chart")
public class Chart extends BaseEntity {
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    private String name;
    private String type;
    private String legendData;
    private String xData;
    private String yData;
    private String yName;
    private Integer yMin;
    private Integer yMax;
    private Integer yInterval;
    private String seriesName;
    private String seriesType;
    private String seriesData;
    private Integer userId;
    private String remark;
    private Date createTime;
    private Date updateTime;
    private Boolean dr;
}
