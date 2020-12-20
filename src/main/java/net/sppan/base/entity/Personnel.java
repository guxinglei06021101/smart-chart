package net.sppan.base.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import net.sppan.base.entity.support.BaseEntity;

import java.util.Date;

@Data
@TableName(value = "tb_personnel")
public class Personnel  extends BaseEntity {

	@TableId(value = "id",type = IdType.AUTO)
	private Integer id;

	private String name;

	private String code;

	private String idcard;

	@JSONField(format = "yyyy-MM-dd" )
	private Date entryDate;

	@JSONField(format = "yyyy-MM-dd")
	private Date quitDate;

	private Long jobDay;

	private String department;

	private String post;

	private String postRank;

	private String city;

	private Integer age;

	private String sex;

	private String education;

	private String province;

	private String type;

	private String provincialArea;

	private String distribution;

	private String quit;

	private Date createDate;
}
