package net.sppan.base.controller.echart;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;
import net.sppan.base.common.JsonResult;
import net.sppan.base.controller.BaseController;
import net.sppan.base.entity.Personnel;
import net.sppan.base.entity.PersonnelNumber;
import net.sppan.base.enums.EducationEnum;
import net.sppan.base.enums.JobTypeEnum;
import net.sppan.base.service.IPersonnelNumberService;
import net.sppan.base.service.IPersonnelService;
import net.sppan.base.utils.XLSX2CSV;
import net.sppan.base.vo.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.openxml4j.opc.PackageAccess;
import org.apache.poi.openxml4j.util.ZipSecureFile;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/personnel")
public class PersonnelController extends BaseController {

    @Resource
    private IPersonnelService personnelService;
    @Resource
    private IPersonnelNumberService personnelNumberService;


    @ResponseBody
    @GetMapping("/queryJobAgeTypeGroup")
    public List<PersonnelAgeTypeVo> queryJobAgeTypeGroup(){
        List<PersonnelAgeTypeVo> result = new ArrayList<>();
        List<PersonnelAgeGroupVo> personnelAgeGroupVos = personnelService.queryJobAgeTypeGroup();
        if(CollectionUtils.isEmpty(personnelAgeGroupVos)){
            return result;
        }
        Map<String, List<PersonnelAgeGroupVo>> collect = personnelAgeGroupVos.stream().collect(Collectors.groupingBy(PersonnelAgeGroupVo::getType));
        int under20 = 0;
        int age2025 = 0;
        int age2530 = 0;
        int age3035 = 0;
        int age3540 = 0;
        int age4045 = 0;
        int age4550 = 0;
        int greater50 = 0;
        for(String key:collect.keySet()){
            PersonnelAgeTypeVo personnelAgeTypeVo = new PersonnelAgeTypeVo();
            personnelAgeTypeVo.setType(key);
            PersonnelVo personnelVo = new PersonnelVo();

            List<PersonnelAgeGroupVo> personnelAgeGroupVoList = collect.get(key);
            for(PersonnelAgeGroupVo personnelAgeGroupVo:personnelAgeGroupVoList){
                String ageName = personnelAgeGroupVo.getAgeName();
                int count = personnelAgeGroupVo.getCount();
                switch (ageName){
                    case "under20":
                        personnelVo.setUnder20(count);
                        under20 = under20 + count;
                        break;
                    case "age2025":
                        personnelVo.setAge2025(count);
                        age2025 = age2025 + count;
                        break;
                    case "age2530":
                        personnelVo.setAge2530(count);
                        age2530 = age2530 + count;
                        break;
                    case "age3035":
                        personnelVo.setAge3035(count);
                        age3035 = age3035 + count;
                        break;
                    case "age3540":
                        personnelVo.setAge3540(count);
                        age3540 = age3540 + count;
                        break;
                    case "age4045":
                        personnelVo.setAge4045(count);
                        age4045 = age4045 + count;
                        break;
                    case "age4550":
                        personnelVo.setAge4550(count);
                        age4550 = age4550 + count;
                        break;
                    case "greater50":
                        personnelVo.setGreater50(count);
                        greater50 = greater50 + count;
                        break;
                    default:
                }
            }
            personnelAgeTypeVo.setPersonnelVo(personnelVo);
            result.add(personnelAgeTypeVo);
        }

        PersonnelAgeTypeVo ageTypeTotal = new PersonnelAgeTypeVo();
        PersonnelVo personnelTotal = new PersonnelVo();
        ageTypeTotal.setType("合计");
        personnelTotal.setUnder20(under20);
        personnelTotal.setAge2025(age2025);
        personnelTotal.setAge2530(age2530);
        personnelTotal.setAge3035(age3035);
        personnelTotal.setAge3540(age3540);
        personnelTotal.setAge4045(age4045);
        personnelTotal.setAge4550(age4550);
        personnelTotal.setGreater50(greater50);

        ageTypeTotal.setPersonnelVo(personnelTotal);
        result.add(ageTypeTotal);
        return result;
    }

    @ResponseBody
    @GetMapping("/queryJobGrowthRate")
    public List<PersonnelJobGrowthRateVo> queryJobGrowthRate(){
        List<PersonnelJobGrowthRateVo> result = new ArrayList<>();
        List<PersonnelJobNumberVo> personnelJobNumberVoList = this.queryJobNum();
        LinkedHashMap<String, List<PersonnelJobNumberVo>> collect = personnelJobNumberVoList.stream().collect(Collectors.groupingBy(PersonnelJobNumberVo::getYear, LinkedHashMap::new, Collectors.toList()));
        List<String> keySet = collect.keySet().stream().sorted(Comparator.reverseOrder()).collect(Collectors.toList());

        for(String year:keySet){
            List<PersonnelJobNumberVo> personnelJobNumberVos = collect.get(year);
            PersonnelJobGrowthRateVo personnelJobGrowthRateVo = new PersonnelJobGrowthRateVo();
            personnelJobGrowthRateVo.setRateList(personnelJobNumberVos);
            personnelJobGrowthRateVo.setYear(year);
            result.add(personnelJobGrowthRateVo);
        }
        return result;
    }

    @ResponseBody
    @GetMapping("/queryJobNum")
    public List<PersonnelJobNumberVo> queryJobNum(){

        List<PersonnelJobNumberVo> result = new ArrayList<>();

        List<PersonnelNumber>  personnelNumberList = personnelNumberService.queryJobNum();
        if(CollectionUtils.isEmpty(personnelNumberList)){
            return result;
        }

        for(int i=1;i<personnelNumberList.size();i++){
            PersonnelJobNumberVo personnelJobNumberVo = new PersonnelJobNumberVo();

            PersonnelNumber personnelNumber = personnelNumberList.get(i);
            PersonnelNumber personnelNumber1 = personnelNumberList.get(i-1);
            Integer jobNum = personnelNumber.getJobNum();
            Integer jobNum1 = personnelNumber1.getJobNum();

            /*if(i == 1){
                PersonnelJobNumberVo personnelJobNumberVo1 = new PersonnelJobNumberVo();
                personnelJobNumberVo1.setMonth(personnelNumber1.getMonth());
                personnelJobNumberVo1.setJobNum(personnelNumber1.getJobNum());
                personnelJobNumberVo1.setJobRate(BigDecimal.ZERO);
                result.add(personnelJobNumberVo1);
            }*/

            personnelJobNumberVo.setJobRate(BigDecimal.ZERO);
            if(jobNum1 != 0){
                BigDecimal jobRate = new BigDecimal(100 * (jobNum - jobNum1)).divide(new BigDecimal(jobNum1), 2, BigDecimal.ROUND_HALF_UP);
                personnelJobNumberVo.setJobRate(jobRate);
            }
            personnelJobNumberVo.setYear(String.valueOf(personnelNumber.getYear()));
            personnelJobNumberVo.setMonth(personnelNumber.getMonth());
            personnelJobNumberVo.setJobNum(personnelNumber.getJobNum());
            if(personnelNumber.getYear() > 2016){
                result.add(personnelJobNumberVo);
            }
        }
        return result;
    }

    @ResponseBody
    @GetMapping("/queryQuitTotalRate")
    public PersonnelQuitTotalVo queryQuitTotalRate(){
        PersonnelQuitTotalVo result = new PersonnelQuitTotalVo();
        List<PersonnelQuitDayVo> personnelQuitDayVos = personnelService.queryQuitTotalCount();
        if(CollectionUtils.isEmpty(personnelQuitDayVos)){
            return  result;
        }

        int weekCount = 0;
        int twoWeekCount = 0;
        int lessMonthCount = 0;
        int monthCount = 0;
        int threeMonthCount = 0;
        int sixMonthCount = 0;
        int yearCount = 0;
        int manyYearCount = 0;
        for(PersonnelQuitDayVo personnelQuitDayVo:personnelQuitDayVos){
            int count = personnelQuitDayVo.getCount();
            int day = personnelQuitDayVo.getDay();
            //7天以内
            if(day < 7){
                weekCount = weekCount + count;
                //7~15天
            }else if(7<=day && day<15){
                twoWeekCount = twoWeekCount + count;
                //15~30
            }else if(15<=day && day<30){
                monthCount = monthCount + count;
            }else if(30<=day && day<90){
                threeMonthCount = threeMonthCount + count;
            }else if(90<=day && day<180){
                sixMonthCount = sixMonthCount + count;
            }else if(180<=day && day<365){
                yearCount = yearCount + count;
            }else if(day>=365){
                manyYearCount = manyYearCount + count;
            }
        }
        lessMonthCount = weekCount + twoWeekCount + monthCount;

        result.setWeekCount(weekCount);
        result.setTwoWeekCount(twoWeekCount);
        result.setMonthCount(monthCount);
        result.setLessMonthCount(lessMonthCount);
        result.setThreeMonthCount(threeMonthCount);
        result.setSixMonthCount(sixMonthCount);
        result.setYearCount(yearCount);
        result.setManyYearCount(manyYearCount);
        return result;
    }

    @ResponseBody
    @GetMapping("/queryQuitDayRate")
    public List<PersonnelQuitRateVo> queryQuitDayRate(){

        List<PersonnelQuitRateVo> result = new ArrayList<>();

        List<PersonnelQuitDayVo> personnelQuitDayVos = personnelService.queryQuitDayCount();
        if(CollectionUtils.isEmpty(personnelQuitDayVos)){
            return  result;
        }
        LinkedHashMap<String, List<PersonnelQuitDayVo>> collect = personnelQuitDayVos.stream().collect(Collectors.groupingBy(PersonnelQuitDayVo::getYear, LinkedHashMap::new, Collectors.toList()));
        for(String year:collect.keySet()){

            int weekCount = 0;
            int twoWeekCount = 0;
            int monthCount = 0;
            int threeMonthCount = 0;
            int sixMonthCount = 0;
            int yearCount = 0;
            int manyYearCount = 0;
            List<PersonnelQuitDayVo> personnelQuitDayList = collect.get(year);
            for(PersonnelQuitDayVo personnelQuitDayVo:personnelQuitDayList){
                int count = personnelQuitDayVo.getCount();
                int day = personnelQuitDayVo.getDay();
                //7天以内
                if(day < 7){
                    weekCount = weekCount + count;
                    //7~15天
                }else if(7<=day && day<15){
                    twoWeekCount = twoWeekCount + count;
                    //15~30
                }else if(15<=day && day<30){
                    monthCount = monthCount + count;
                }else if(30<=day && day<90){
                    threeMonthCount = threeMonthCount + count;
                }else if(90<=day && day<180){
                    sixMonthCount = sixMonthCount + count;
                }else if(180<=day && day<365){
                    yearCount = yearCount + count;
                }else if(day>=365){
                    manyYearCount = manyYearCount + count;
                }
            }
            int totalCount = weekCount + twoWeekCount + monthCount + threeMonthCount + sixMonthCount + yearCount + manyYearCount;

            BigDecimal total = new BigDecimal(totalCount);
            List<BigDecimal> rateList = new ArrayList<>();
            rateList.add(new BigDecimal(weekCount).divide(total,2,BigDecimal.ROUND_HALF_UP));
            rateList.add(new BigDecimal(twoWeekCount).divide(total,2,BigDecimal.ROUND_HALF_UP));
            rateList.add(new BigDecimal(monthCount).divide(total,2,BigDecimal.ROUND_HALF_UP));
            rateList.add(new BigDecimal(threeMonthCount).divide(total,2,BigDecimal.ROUND_HALF_UP));
            rateList.add(new BigDecimal(sixMonthCount).divide(total,2,BigDecimal.ROUND_HALF_UP));
            rateList.add(new BigDecimal(yearCount).divide(total,2,BigDecimal.ROUND_HALF_UP));
            rateList.add(new BigDecimal(manyYearCount).divide(total,2,BigDecimal.ROUND_HALF_UP));

            PersonnelQuitRateVo personnelQuitRateVo = new PersonnelQuitRateVo();
            personnelQuitRateVo.setYear(year);
            personnelQuitRateVo.setRateList(rateList);

            result.add(personnelQuitRateVo);
        }

        return result;

    }

    @ResponseBody
    @GetMapping("/queryQuitTypeRate")
    public List<PersonnelQuitTypeRateVo> queryQuitTypeCount(){

        List<PersonnelQuitTypeRateVo>  result = new ArrayList<>();
        List<PersonnelQuitCountVo> personnelQuitCountVos = personnelService.queryQuitTypeCount();
        if(CollectionUtils.isEmpty(personnelQuitCountVos)){
            return result;
        }
        LinkedHashMap<String, List<PersonnelQuitCountVo>> collect = personnelQuitCountVos.stream().collect(Collectors.groupingBy(PersonnelQuitCountVo::getYear, LinkedHashMap::new, Collectors.toList()));
        Map<String,Integer> yearCountMap = new HashMap<>(collect.size());
        for(String year:collect.keySet()){
            int count = 0;
            List<PersonnelQuitCountVo> personnelQuitCountList = collect.get(year);
            for(PersonnelQuitCountVo personnelQuitCountVo:personnelQuitCountList){
                count = count + personnelQuitCountVo.getCount();
            }
            yearCountMap.put(year,count);
        }

        for(String year:collect.keySet()){
            PersonnelQuitTypeRateVo quitTypeRateVo = new PersonnelQuitTypeRateVo();
            quitTypeRateVo.setYear(year);
            List<PersonnelQuitCountVo> personnelQuitCountList = collect.get(year);
            for(PersonnelQuitCountVo personnelQuitCountVo:personnelQuitCountList){
                BigDecimal count = BigDecimal.valueOf(personnelQuitCountVo.getCount()*100);
                Integer yearCount = yearCountMap.get(year);
                BigDecimal rate = BigDecimal.ZERO;
                if(yearCount != 0 ){
                     rate = count.divide(new BigDecimal(yearCount), 2, BigDecimal.ROUND_HALF_UP);
                }

                JobTypeEnum jobTypeEnum = JobTypeEnum.getByName(personnelQuitCountVo.getType());
                switch (jobTypeEnum){
                    case DRIVER: quitTypeRateVo.setDriverRate(rate);
                        break;
                    case OFFICE: quitTypeRateVo.setOfficeRate(rate);
                        break;
                    case SENIOR: quitTypeRateVo.setSeniorRate(rate);
                        break;
                    case LOGISTICS: quitTypeRateVo.setLogisticsRate(rate);
                        break;
                    case OPERATION: quitTypeRateVo.setOperationRate(rate);
                        break;
                    case MANAGEMENT:quitTypeRateVo.setManagementRate(rate);
                        break;
                    default:
                }
            }
            result.add(quitTypeRateVo);
        }
        return  result;
    }

    @ResponseBody
    @GetMapping("/queryQuitRate")
    public List<PersonnelQuitRateVo> queryQuitRate(){
        return personnelNumberService.queryQuitRate();
    }

    @PostMapping("/uploadFile")
    @ResponseBody
    @Transactional(rollbackFor = Exception.class)
    public JsonResult uploadFile(@RequestParam("files") MultipartFile file,@RequestParam("quit") String quit) throws Exception{

        log.info("开始上传...");
        String fileName = file.getOriginalFilename();
        String suffix = fileName.substring(fileName.lastIndexOf(".")+1);
        InputStream ins = file.getInputStream();
        log.info("获取文件流...");
        Workbook wb = null;
        if(suffix.equals("xlsx")){
            wb = new XSSFWorkbook(ins);
        }else{
            wb = new HSSFWorkbook(ins);
        }
        log.info("上传获取sheet...");
        Sheet sheet = wb.getSheetAt(0);
        List<Personnel> personnels = new ArrayList<>(1000);
        Date nowDate = new Date();

        if(null != sheet){
            log.info("上传获取数据中...");
            Map<String, Object> columnMap = new HashMap<>();
            columnMap.put("quit",quit);
            personnelService.removeByMap(columnMap);

            for(int line = 1; line <= sheet.getLastRowNum();line++){
                Personnel personnel = new Personnel();
                try{
                    Row row = sheet.getRow(line);
                    if(null == row ||row.getCell(0) == null ){
                        continue;
                    }
//                    if(1 != row.getCell(0).getCellType()){
//                        throw new Exception("单元格类型不是文本类型！");
//                    }
//                    row.getCell(1).setCellType(Cell.CELL_TYPE_STRING);
                    personnel.setName( row.getCell(0).getStringCellValue());
                    personnel.setCode(row.getCell(1).getStringCellValue());
                    personnel.setIdcard(row.getCell(2).getStringCellValue());
                    personnel.setEntryDate(row.getCell(3).getDateCellValue());
                    if("1".equals(quit)){
                        personnel.setQuitDate(row.getCell(4).getDateCellValue());
                    }
                    personnel.setDepartment(row.getCell(5).getStringCellValue());
                    personnel.setPost(row.getCell(6).getStringCellValue());
                    personnel.setPostRank(row.getCell(7).getStringCellValue());
                    personnel.setCity(row.getCell(8).getStringCellValue().replace("市",""));
                    //row.getCell(9).setCellType(Cell.CELL_TYPE_STRING);
                    personnel.setAge(Integer.parseInt(row.getCell(9).getStringCellValue()));
                    personnel.setSex(row.getCell(10).getStringCellValue());
                    personnel.setEducation(row.getCell(11).getStringCellValue());
                    personnel.setProvince(row.getCell(12).getStringCellValue());
                    personnel.setType(row.getCell(13).getStringCellValue());
                    personnel.setProvincialArea(row.getCell(14).getStringCellValue());
                    personnel.setDistribution(row.getCell(15).getStringCellValue());
                    personnel.setQuit(quit);
                    personnel.setCreateDate(nowDate);
                    log.info(JSON.toJSONString(personnel));
                    personnels.add(personnel);
                    if(personnels.size() == 1000){
                        personnelService.saveBatch(personnels);
                        personnels = new ArrayList<>(1000);
                    }
                }catch (Exception e){
                    e.printStackTrace();
                    return JsonResult.failure("上传失败，第"+(line+1)+"行数据存在异常:\r\n"+JSON.toJSONString(personnel)+";\r\n异常原因："+e.getMessage());
                }
            }
            if(personnels.size() >0){
                personnelService.saveBatch(personnels);
            }
            personnelNumberService.addBatchPersonnelNumber();
        }
        return JsonResult.success("上传成功！");
    }

    @ResponseBody
    @PostMapping("/upload")
    @Transactional(rollbackFor = Exception.class)
    public JsonResult upload(@RequestParam("files") MultipartFile file,@RequestParam("quit") String quit) throws Exception{

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date nowDate = new Date();
        ZipSecureFile.setMinInflateRatio(-1.0d);
        OPCPackage p = OPCPackage.open(file.getInputStream());
        // 20代表最大列数
        XLSX2CSV xlsx2csv = new XLSX2CSV(p, 20);
        xlsx2csv.process();
        ArrayList<ArrayList<String>> output = xlsx2csv.get_output();
        p.close();   //释放
        List<Personnel> personnels = new ArrayList<>(output.size());

        for(int i=1;i<output.size();i++){
            List<String> list = output.get(i);
            try {
                log.info(JSON.toJSONString(list));
                Personnel personnel = new Personnel();
                personnel.setName(list.get(0));
                personnel.setCode(list.get(1));
                personnel.setIdcard(list.get(2));
                personnel.setEntryDate(sdf.parse(list.get(3)));
                if ("1".equals(quit)) {
                    personnel.setQuitDate(sdf.parse(list.get(4)));
                }
                personnel.setDepartment(list.get(5));
                personnel.setPost(list.get(6));
                personnel.setPostRank(list.get(7));
                personnel.setCity(list.get(8).replace("市", ""));
                personnel.setAge(Integer.parseInt(list.get(9)));
                personnel.setSex(list.get(10));
                personnel.setEducation(list.get(11));
                personnel.setProvince(list.get(12));
                personnel.setType(list.get(13));
                personnel.setProvincialArea(list.get(14));
                personnel.setDistribution(list.get(15));
                personnel.setQuit(quit);
                personnel.setCreateDate(nowDate);
                personnels.add(personnel);
            }catch (Exception e){
                e.printStackTrace();
                throw new Exception("上传失败，第"+(i+1)+"行数据存在异常:\r\n"+JSON.toJSONString(list)+";\r\n异常原因："+e.getMessage());
                //return JsonResult.failure("上传失败，第"+(i+1)+"行数据存在异常:\r\n"+JSON.toJSONString(list)+";\r\n异常原因："+e.getMessage());
            }
        }
        if(personnels.size() >0){
            Map<String, Object> columnMap = new HashMap<>();
            columnMap.put("quit",quit);
            personnelService.removeByMap(columnMap);
            personnelService.saveBatch(personnels,1000);
        }
        personnelNumberService.addBatchPersonnelNumber();
        return JsonResult.success("上传成功！");
    }



    @GetMapping("/list")
    public IPage<Personnel> queryList(){

        PageRequest pageRequest = getPageRequest();
        QueryWrapper<Personnel> queryWrapper = new QueryWrapper();

        if(pageRequest.getSort() != null){
            Sort sort = pageRequest.getSort();
            Iterator<Sort.Order> iterator = sort.iterator();
            while (iterator.hasNext()){
                Sort.Order next = iterator.next();
                Sort.Direction direction = next.getDirection();
                next.getProperty();
                if(direction.isAscending()){
                    queryWrapper.orderBy(true,true, next.getProperty());
                }else{
                    queryWrapper.orderBy(true,false, next.getProperty());
                }
            }

        }else{
            queryWrapper.orderByDesc("entry_date");
        }

        String quit = request.getParameter("quit");
        if(StringUtils.isNotBlank(quit)){
            queryWrapper.eq("quit",quit);
        }

        IPage<Personnel> page = new Page<>(pageRequest.getPageNumber(),pageRequest.getPageSize());
        IPage<Personnel> pageList = personnelService.page(page, queryWrapper);
        List<Personnel> records = pageList.getRecords();
        if(CollectionUtils.isEmpty(records)){
            return page;
        }
        records.stream().forEach(personnel -> {
            Date entryDate = personnel.getEntryDate();//入职日期
            String isQuit = personnel.getQuit();//是否离职
            Date endDate = new Date();
            if("1".equals(isQuit)){
                endDate = personnel.getQuitDate();
            }
            personnel.setJobDay(daysBetween(endDate,entryDate));
        });
        pageList.setRecords(records);
        return pageList;
    }

    private static long daysBetween(Date end, Date start) {
        long difference =  (end.getTime()-start.getTime())/86400000;
        return Math.abs(difference);
    }

    @GetMapping("/queryAgeGroup/{quit}")
    public PersonnelVo queryAgeGroup(@PathVariable("quit") String quit){
        return personnelService.queryAgeGroup(quit);
    }

    @GetMapping("/qurtyJobAgeGroup")
    public List<PersonnelTypeRateVo> queryAgeGroup(){
        List<PersonnelTypeRateVo> result = new ArrayList<>();
        List<PersonnelJobAgeVo> personnelTypeVos = personnelService.queryJobAgeGroup();
        if(CollectionUtils.isEmpty(personnelTypeVos)){
            return result;
        }
        int total = 0;
        for(PersonnelJobAgeVo personnelTypeVo:personnelTypeVos){
            total = total + personnelTypeVo.getCount();
        }
        for(PersonnelJobAgeVo personnelTypeVo:personnelTypeVos){
            PersonnelTypeRateVo personnelTypeRateVo = new PersonnelTypeRateVo();
            personnelTypeRateVo.setType(personnelTypeVo.getAgeGroup());
            personnelTypeRateVo.setRate(new BigDecimal(personnelTypeVo.getCount()*100).divide(new BigDecimal(total),2,BigDecimal.ROUND_HALF_UP));
            result.add(personnelTypeRateVo);
        }
        return result;
    }

    @GetMapping("/queryTypeGroup/{quit}")
    public List<PersonnelTypeVo> queryTypeGroup(@PathVariable("quit") String quit){
        return personnelService.queryTypeGroup(quit);
    }

    @GetMapping("/queryEntryDateGroup/{quit}")
    public List<PersonnelTypeVo> queryEntryDateGroup(@PathVariable("quit") String quit){
        return personnelService.queryEntryDateGroup(quit);
    }

    @GetMapping("/queryProvinceGroup/{quit}")
    public List<PersonnelTypeVo> queryProvinceGroup(@PathVariable("quit") String quit){
        return personnelService.queryProvinceGroup(quit);
    }

    @GetMapping("/queryCityGroup/{quit}")
    public List<PersonnelTypeVo> queryCityGroup(@PathVariable("quit") String quit){
        return personnelService.queryCityGroup(quit);
    }

    @GetMapping("/queryEduGroup/{quit}")
    public List<PersonnelEduVo> queryEduGroup(@PathVariable("quit") String quit){
        return personnelService.queryEduGroup(quit);
    }

    @GetMapping("/queryEduTypeGroup/{quit}")
    public PersonnelEduListVo queryEduTypeGroup(@PathVariable("quit") String quit){

        List<PersonnelEduVo> personnelEduVos = personnelService.queryEduTypeGroup(quit);
        if(CollectionUtils.isEmpty(personnelEduVos)){
            return null;
        }
        Map<String, List<PersonnelEduVo>> personnelEduMap = personnelEduVos.stream().collect(Collectors.groupingBy(PersonnelEduVo::getEducation));

        PersonnelEduListVo personnelEduListVo = new PersonnelEduListVo();

        PersonnelEduGroupVo office = new PersonnelEduGroupVo();
        PersonnelEduGroupVo management = new PersonnelEduGroupVo();
        PersonnelEduGroupVo senior = new PersonnelEduGroupVo();
        PersonnelEduGroupVo driver = new PersonnelEduGroupVo();
        PersonnelEduGroupVo logistics = new PersonnelEduGroupVo();
        PersonnelEduGroupVo operation = new PersonnelEduGroupVo();

        for(String  education:personnelEduMap.keySet()) {
            EducationEnum educationEnum = EducationEnum.getByName(education);
            List<PersonnelEduVo> personnelEduVoList = personnelEduMap.get(education);

            switch (educationEnum) {
                case PRIMARY_SCHOOL:
                    for (PersonnelEduVo personnelEduVo : personnelEduVoList) {
                        JobTypeEnum jobTypeEnum = JobTypeEnum.getByName(personnelEduVo.getType());

                        switch (jobTypeEnum) {
                            case OFFICE:
                                office.setPrimary(personnelEduVo.getCount());
                                break;
                            case MANAGEMENT:
                                management.setPrimary(personnelEduVo.getCount());
                                break;
                            case DRIVER:
                                driver.setPrimary(personnelEduVo.getCount());
                                break;
                            case SENIOR:
                                senior.setPrimary(personnelEduVo.getCount());
                                break;
                            case LOGISTICS:
                                logistics.setPrimary(personnelEduVo.getCount());
                                break;
                            case OPERATION:
                                operation.setPrimary(personnelEduVo.getCount());
                                break;
                            default: {
                            }
                        }
                    }
                    break;
                case MIDDLE_SCHOOL:
                    for (PersonnelEduVo personnelEduVo : personnelEduVoList) {
                        JobTypeEnum jobTypeEnum = JobTypeEnum.getByName(personnelEduVo.getType());

                        switch (jobTypeEnum) {
                            case OFFICE:
                                office.setMiddleSchool(personnelEduVo.getCount());
                                break;
                            case MANAGEMENT:
                                management.setMiddleSchool(personnelEduVo.getCount());
                                break;
                            case DRIVER:
                                driver.setMiddleSchool(personnelEduVo.getCount());
                                break;
                            case SENIOR:
                                senior.setMiddleSchool(personnelEduVo.getCount());
                                break;
                            case LOGISTICS:
                                logistics.setMiddleSchool(personnelEduVo.getCount());
                                break;
                            case OPERATION:
                                operation.setMiddleSchool(personnelEduVo.getCount());
                                break;
                            default: {
                            }
                        }
                    }
                    break;
                case HIGH_SCHOOL:
                    for (PersonnelEduVo personnelEduVo : personnelEduVoList) {
                        JobTypeEnum jobTypeEnum = JobTypeEnum.getByName(personnelEduVo.getType());

                        switch (jobTypeEnum) {
                            case OFFICE:
                                office.setHighSchool(personnelEduVo.getCount());
                                break;
                            case MANAGEMENT:
                                management.setHighSchool(personnelEduVo.getCount());
                                break;
                            case DRIVER:
                                driver.setHighSchool(personnelEduVo.getCount());
                                break;
                            case SENIOR:
                                senior.setHighSchool(personnelEduVo.getCount());
                                break;
                            case LOGISTICS:
                                logistics.setHighSchool(personnelEduVo.getCount());
                                break;
                            case OPERATION:
                                operation.setHighSchool(personnelEduVo.getCount());
                                break;
                            default: {
                            }
                        }
                    }
                    break;
                case SECONDARY_SPECIALIZED:
                    for (PersonnelEduVo personnelEduVo : personnelEduVoList) {
                        JobTypeEnum jobTypeEnum = JobTypeEnum.getByName(personnelEduVo.getType());

                        switch (jobTypeEnum) {
                            case OFFICE:
                                office.setSecondarySpecialized(personnelEduVo.getCount());
                                break;
                            case MANAGEMENT:
                                management.setSecondarySpecialized(personnelEduVo.getCount());
                                break;
                            case DRIVER:
                                driver.setSecondarySpecialized(personnelEduVo.getCount());
                                break;
                            case SENIOR:
                                senior.setSecondarySpecialized(personnelEduVo.getCount());
                                break;
                            case LOGISTICS:
                                logistics.setSecondarySpecialized(personnelEduVo.getCount());
                                break;
                            case OPERATION:
                                operation.setSecondarySpecialized(personnelEduVo.getCount());
                                break;
                            default: {
                            }
                        }
                    }
                    break;
                case JUNIOR_COLLEGE:
                    for (PersonnelEduVo personnelEduVo : personnelEduVoList) {
                        JobTypeEnum jobTypeEnum = JobTypeEnum.getByName(personnelEduVo.getType());

                        switch (jobTypeEnum) {
                            case OFFICE:
                                office.setJuniorCollege(personnelEduVo.getCount());
                                break;
                            case MANAGEMENT:
                                management.setJuniorCollege(personnelEduVo.getCount());
                                break;
                            case DRIVER:
                                driver.setJuniorCollege(personnelEduVo.getCount());
                                break;
                            case SENIOR:
                                senior.setJuniorCollege(personnelEduVo.getCount());
                                break;
                            case LOGISTICS:
                                logistics.setJuniorCollege(personnelEduVo.getCount());
                                break;
                            case OPERATION:
                                operation.setJuniorCollege(personnelEduVo.getCount());
                                break;
                            default: {
                            }
                        }
                    }
                    break;
                case UNDERGRADUATE:
                    for (PersonnelEduVo personnelEduVo : personnelEduVoList) {
                        JobTypeEnum jobTypeEnum = JobTypeEnum.getByName(personnelEduVo.getType());

                        switch (jobTypeEnum) {
                            case OFFICE:
                                office.setUndergraduate(personnelEduVo.getCount());
                                break;
                            case MANAGEMENT:
                                management.setUndergraduate(personnelEduVo.getCount());
                                break;
                            case DRIVER:
                                driver.setUndergraduate(personnelEduVo.getCount());
                                break;
                            case SENIOR:
                                senior.setUndergraduate(personnelEduVo.getCount());
                                break;
                            case LOGISTICS:
                                logistics.setUndergraduate(personnelEduVo.getCount());
                                break;
                            case OPERATION:
                                operation.setUndergraduate(personnelEduVo.getCount());
                                break;
                            default: {
                            }
                        }
                    }
                    break;
                case MASTER:
                    for (PersonnelEduVo personnelEduVo : personnelEduVoList) {
                        JobTypeEnum jobTypeEnum = JobTypeEnum.getByName(personnelEduVo.getType());

                        switch (jobTypeEnum) {
                            case OFFICE:
                                office.setMaster(personnelEduVo.getCount());
                                break;
                            case MANAGEMENT:
                                management.setMaster(personnelEduVo.getCount());
                                break;
                            case DRIVER:
                                driver.setMaster(personnelEduVo.getCount());
                                break;
                            case SENIOR:
                                senior.setMaster(personnelEduVo.getCount());
                                break;
                            case LOGISTICS:
                                logistics.setMaster(personnelEduVo.getCount());
                                break;
                            case OPERATION:
                                operation.setMaster(personnelEduVo.getCount());
                                break;
                            default: {
                            }
                        }
                    }
                    break;
                default: {

                }
            }
        }
        personnelEduListVo.setDriver(driver);
        personnelEduListVo.setLogistics(logistics);
        personnelEduListVo.setManagement(management);
        personnelEduListVo.setOffice(office);
        personnelEduListVo.setOperation(operation);
        personnelEduListVo.setSenior(senior);
        return personnelEduListVo;
    }

    @GetMapping("/queryMonthRateGroup/{quit}")
    public PersonnelMonthRateVo queryMonthRateGroup(@PathVariable("quit") String quit){

        List<PersonnelMonthVo> personnelGroupVos = personnelService.queryMonthGroup(quit);
        PersonnelMonthRateVo personnelMonthRateVo = new PersonnelMonthRateVo();
        personnelMonthRateVo.setYear("2020");
        if(!CollectionUtils.isEmpty(personnelGroupVos)){

            for(PersonnelMonthVo personnelGroupVo:personnelGroupVos){
                if(personnelGroupVo.getMonth() <3){
                    personnelMonthRateVo.setUnder3(personnelMonthRateVo.getUnder3() + personnelGroupVo.getCount());
                }else if(personnelGroupVo.getMonth() >=3 && personnelGroupVo.getMonth() <6){
                    personnelMonthRateVo.setMonth3_6(personnelMonthRateVo.getMonth3_6() + personnelGroupVo.getCount());
                }else if( personnelGroupVo.getMonth() >= 6 && personnelGroupVo.getMonth() < 12){
                    personnelMonthRateVo.setMonth6_12(personnelMonthRateVo.getMonth6_12() + personnelGroupVo.getCount());
                }else if( personnelGroupVo.getMonth() >= 12 && personnelGroupVo.getMonth() < 24){
                    personnelMonthRateVo.setMonth12_24(personnelMonthRateVo.getMonth12_24() + personnelGroupVo.getCount());
                }else if(personnelGroupVo.getMonth() >= 24 && personnelGroupVo.getMonth() < 36){
                    personnelMonthRateVo.setMonth24_36(personnelMonthRateVo.getMonth24_36() + personnelGroupVo.getCount());
                }else {
                    personnelMonthRateVo.setGreater36(personnelMonthRateVo.getGreater36() + personnelGroupVo.getCount());
                }
            }
        }

        return personnelMonthRateVo;
    }

}
