package net.sppan.base.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.sppan.base.dao.mapper.PersonnelMapper;
import net.sppan.base.entity.Personnel;
import net.sppan.base.entity.PersonnelNumber;
import net.sppan.base.service.IPersonnelNumberService;
import net.sppan.base.service.IPersonnelService;
import net.sppan.base.vo.*;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PersonnelServiceImpl extends ServiceImpl<PersonnelMapper,Personnel> implements IPersonnelService {

    @Resource
    private PersonnelMapper personnelMapper;

    @Override
    public PersonnelVo queryAgeGroup(String quit) {
        return personnelMapper.queryAgeGroup(quit);
    }

    @Override
    public List<PersonnelJobAgeVo> queryJobAgeGroup() {
        return personnelMapper.qurtyJobAgeGroup();
    }

    @Override
    public PersonnelCountVo queryPersonnelCount() {
        PersonnelCountVo personnelCountVo = new PersonnelCountVo();
        personnelCountVo.setCount(personnelMapper.queryCount());
        personnelCountVo.setJobCount(personnelMapper.queryCountByJob());
        personnelCountVo.setQuitCount(personnelMapper.queryCountByQuit());
        return personnelCountVo;
    }

    @Override
    public List<PersonnelTypeVo> queryTypeGroup(String quit) {
        return personnelMapper.queryTypeGroup(quit);
    }

    @Override
    public List<PersonnelTypeVo> queryEntryDateGroup(String quit) {
        return personnelMapper.queryEntryDateGroup(quit);
    }

    @Override
    public List<PersonnelMonthVo> queryMonthGroup(String quit) {
        return personnelMapper.queryMonthGroup(quit);
    }

    @Override
    public List<PersonnelTypeVo> queryProvinceGroup(String quit) {
        return personnelMapper.queryProvinceGroup(quit);
    }

    @Override
    public List<PersonnelEduVo> queryEduTypeGroup(String quit) {
        return personnelMapper.queryEduTypeGroup(quit);
    }

    @Override
    public List<PersonnelEduVo> queryEduGroup(String quit) {
        return personnelMapper.queryEduGroup(quit);
    }

    @Override
    public List<PersonnelTypeVo> queryCityGroup(String quit) {
        return personnelMapper.queryCityGroup(quit);
    }

    @Override
    public List<PersonnelQuitCountVo> queryQuitTypeCount() {
        return personnelMapper.queryQuitTypeCount();
    }

    @Override
    public List<PersonnelQuitDayVo> queryQuitDayCount() {
        return personnelMapper.queryQuitDayCount();
    }

    @Override
    public List<PersonnelQuitDayVo> queryQuitTotalCount() {
        return personnelMapper.queryQuitTotalCount();
    }

    @Override
    public List<PersonnelAgeGroupVo> queryJobAgeTypeGroup() {
        return personnelMapper.queryJobAgeTypeGroup();
    }

    //map转java对象
    public static Object mapToObject(Map<String, Object> map, Class<?> beanClass) throws Exception {
        String jsonStr = JSONObject.toJSONString(map);
        return JSONObject.parseObject(jsonStr, beanClass);
    }


}
