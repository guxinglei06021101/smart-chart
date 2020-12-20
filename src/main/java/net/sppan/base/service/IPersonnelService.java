package net.sppan.base.service;

import com.baomidou.mybatisplus.extension.service.IService;
import net.sppan.base.entity.Personnel;
import net.sppan.base.vo.*;

import java.util.List;


public interface IPersonnelService extends IService<Personnel> {

    PersonnelVo queryAgeGroup(String quit);

    List<PersonnelJobAgeVo> queryJobAgeGroup();

    PersonnelCountVo queryPersonnelCount();

    List<PersonnelTypeVo> queryTypeGroup(String quit);

    List<PersonnelTypeVo> queryEntryDateGroup(String quit);

    List<PersonnelMonthVo> queryMonthGroup(String quit);

    List<PersonnelTypeVo> queryProvinceGroup(String quit);

    List<PersonnelEduVo> queryEduTypeGroup(String quit);

    List<PersonnelEduVo> queryEduGroup(String quit);

    List<PersonnelTypeVo> queryCityGroup(String quit);

    List<PersonnelQuitCountVo> queryQuitTypeCount();

    List<PersonnelQuitDayVo> queryQuitDayCount();

    List<PersonnelQuitDayVo>  queryQuitTotalCount();

    List<PersonnelAgeGroupVo> queryJobAgeTypeGroup();

}
