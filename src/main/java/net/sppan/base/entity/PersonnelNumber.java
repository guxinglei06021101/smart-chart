package net.sppan.base.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import net.sppan.base.entity.support.BaseEntity;

import java.math.BigDecimal;
import java.util.Date;

@Data
@TableName(value = "tb_personnel_number")
public class PersonnelNumber extends BaseEntity {

	@TableId(value = "id",type = IdType.AUTO)
	private Integer id;

	private Integer year;

	private String month;

	private Integer quitNum;

	private BigDecimal quitRate;

	private Integer jobNum;

	private Date createDate;
}
