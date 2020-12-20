package net.sppan.base.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.sppan.base.dao.mapper.PersonnelMapper;
import net.sppan.base.dao.mapper.PersonnelNumberMapper;
import net.sppan.base.entity.PersonnelNumber;
import net.sppan.base.service.IPersonnelNumberService;
import net.sppan.base.vo.PersonnelQuitRateVo;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PersonnelNumberServiceImpl extends ServiceImpl<PersonnelNumberMapper, PersonnelNumber> implements IPersonnelNumberService {

    @Resource
    private PersonnelMapper personnelMapper;

    @Override
    public PersonnelNumberMapper getBaseMapper() {
        return super.getBaseMapper();
    }

    @Override
    public void delAll() {
        getBaseMapper().delAll();
    }

    @Override
    public void addBatchPersonnelNumber() {
        SimpleDateFormat sdfMonth = new SimpleDateFormat("yyyy-MM");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        int startYear = 2016;
        Date nowDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(nowDate);
        //获取年
        int endYear = calendar.get(Calendar.YEAR);
        List<PersonnelNumber> personnelNumberList = new ArrayList<>();

        for(int y=startYear;y<=endYear;y++){
            for(int m=1;m<=12;m++){
                Date startDate = startDay(y, m);
                String endDate = endDay(y, m);
                String month = sdfMonth.format(startDate);
                Map<String, Long> quitDataMap = personnelMapper.queryQuitRate(month, sdf.format(startDate), endDate);
                if(CollectionUtils.isEmpty(quitDataMap)){
                    continue;
                }
                long jobNum = quitDataMap.get("jobNum");
                long quitNum = quitDataMap.get("quitNum");

                BigDecimal jobCount =new BigDecimal(jobNum);
                BigDecimal quitCount =new BigDecimal(quitNum);

                PersonnelNumber personnelNumber = new PersonnelNumber();
                personnelNumber.setYear(y);
                personnelNumber.setMonth(month);
                personnelNumber.setCreateDate(nowDate);
                personnelNumber.setJobNum((int)jobNum);
                personnelNumber.setQuitNum((int)quitNum);
                BigDecimal rate = BigDecimal.ZERO;
                if(jobNum != 0){
                    rate = quitCount.multiply(new BigDecimal(100L)).divide(jobCount,2,BigDecimal.ROUND_HALF_UP);
                    personnelNumber.setQuitRate(rate);
                }
                personnelNumber.setQuitRate(rate);
                personnelNumberList.add(personnelNumber);
            }
        }
        this.delAll();
        this.saveBatch(personnelNumberList);
    }

    @Override
    public List<PersonnelQuitRateVo> queryQuitRate() {

        List<PersonnelQuitRateVo> resultList = new ArrayList<>();

        List<PersonnelNumber> personnelNumberList = getBaseMapper().queryQuitRate();
        if(CollectionUtils.isEmpty(personnelNumberList)){
            return resultList;
        }

        Map<Integer, List<PersonnelNumber>> collect = personnelNumberList.stream().collect(Collectors.groupingBy(PersonnelNumber::getYear,LinkedHashMap::new,Collectors.toList()));

        for(Integer year : collect.keySet()){
            PersonnelQuitRateVo personnelQuitRateVo = new PersonnelQuitRateVo();
            personnelQuitRateVo.setYear(String.valueOf(year));
            List<PersonnelNumber> personnelNumbers = collect.get(year);
            List<BigDecimal> rateList = new ArrayList<>(12);
            personnelNumbers.stream().forEach(personnelNumber -> {
                rateList.add(personnelNumber.getQuitRate());
            });
            personnelQuitRateVo.setRateList(rateList);
            resultList.add(personnelQuitRateVo);
        }
        return resultList;
    }

    @Override
    public List<PersonnelNumber> queryJobNum() {
        return getBaseMapper().queryJobNum();
    }

    private  Date startDay(int y,int m){
        Calendar calendar1 = Calendar.getInstance();
        calendar1.set(Calendar.YEAR,y);
        calendar1.set(Calendar.MONTH,m-1);
        calendar1.set(Calendar.DAY_OF_MONTH,1);
        return calendar1.getTime();
    }

    private  String endDay(int y,int m){
        Calendar calendar1 = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        calendar1.set(Calendar.YEAR,y);
        calendar1.set(Calendar.MONTH,m);
        calendar1.set(Calendar.DAY_OF_MONTH,0);
        return sdf.format(calendar1.getTime());
    }
}
