package net.sppan.base.controller.web;

import java.util.List;

import net.sppan.base.controller.BaseController;
import net.sppan.base.entity.User;
import net.sppan.base.service.IPersonnelService;
import net.sppan.base.service.IUserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;

@Controller
public class IndexController extends BaseController{
	
	@Autowired
	private IUserService userService;
	@Resource
	private IPersonnelService personnelService;
	
	private Logger logger = LoggerFactory.getLogger(getClass());

	@RequestMapping(value={"/","/index"})
	public String index(){
		return "personnel/index";
	}

	@RequestMapping(value={"/echart"})
	public String echart(ModelMap map, @RequestParam("quit") String quit){
		map.put("personnelCount",personnelService.queryPersonnelCount());
		map.put("personnelAgeGroup",personnelService.queryAgeGroup(quit));
		if("0".equals(quit)){
			return "echart/index";
		}else {
			return "echart/quit-index";
		}
	}

	@RequestMapping(value={"/importData"})
	public String importData(ModelMap map){
		return "echart/import-data";
	}


}