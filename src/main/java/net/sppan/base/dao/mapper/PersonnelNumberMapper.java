package net.sppan.base.dao.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.sppan.base.entity.PersonnelNumber;

import java.util.List;

public interface PersonnelNumberMapper extends BaseMapper<PersonnelNumber> {
    void delAll();

    List<PersonnelNumber> queryQuitRate();

    List<PersonnelNumber> queryJobNum();

}
