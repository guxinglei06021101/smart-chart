package net.sppan.base.dao.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.sppan.base.entity.Personnel;
import net.sppan.base.vo.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


public interface PersonnelMapper extends BaseMapper<Personnel> {

    PersonnelVo queryAgeGroup(@Param("quit") String quit);

    List<PersonnelAgeGroupVo> queryJobAgeTypeGroup();

    Integer queryCountByJob();

    Integer queryCountByQuit();

    Integer queryCount();

    List<PersonnelTypeVo> queryTypeGroup(@Param("quit") String quit);

    List<PersonnelTypeVo> queryEntryDateGroup(@Param("quit") String quit);

    List<PersonnelMonthVo> queryMonthGroup(@Param("quit") String quit);

    List<PersonnelTypeVo> queryProvinceGroup(@Param("quit") String quit);

    List<PersonnelEduVo> queryEduTypeGroup(@Param("quit") String quit);

    List<PersonnelEduVo> queryEduGroup(@Param("quit") String quit);

    List<PersonnelTypeVo> queryCityGroup(@Param("quit") String quit);

    Map<String, Long> queryQuitRate(@Param("month") String month, @Param("startDate") String startDate, @Param("endDate") String endDate);

    List<PersonnelQuitCountVo> queryQuitTypeCount();

    List<PersonnelQuitDayVo> queryQuitDayCount();

    List<PersonnelQuitDayVo> queryQuitTotalCount();

    List<PersonnelJobAgeVo> qurtyJobAgeGroup();

}
