package net.sppan.base.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import net.sppan.base.entity.support.BaseEntity;

import java.util.Date;

/**
 * @author 12085
 */
@Data
@TableName(value = "tb_chart_view_detail")
public class ChartViewDetail extends BaseEntity {

    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;

    private Integer chartViewId;
    private Integer chartId;
    private String chartName;
    private Integer userId;
    private Integer sort;
    @JSONField(format = "yyyy-MM-dd" )
    private Date createTime;

    @JSONField(format = "yyyy-MM-dd HH:mm:ss" )
    private Date updateTime;
    private Boolean dr;
}
