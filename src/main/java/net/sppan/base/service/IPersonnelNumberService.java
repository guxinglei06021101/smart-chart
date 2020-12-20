package net.sppan.base.service;

import com.baomidou.mybatisplus.extension.service.IService;
import net.sppan.base.entity.PersonnelNumber;
import net.sppan.base.vo.PersonnelQuitRateVo;

import java.util.List;

public interface IPersonnelNumberService extends IService<PersonnelNumber> {

     void delAll();

     void addBatchPersonnelNumber();

     List<PersonnelQuitRateVo> queryQuitRate();

     List<PersonnelNumber> queryJobNum();
}
