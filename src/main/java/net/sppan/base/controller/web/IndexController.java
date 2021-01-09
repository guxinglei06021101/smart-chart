package net.sppan.base.controller.web;


import net.sppan.base.controller.BaseController;
import net.sppan.base.entity.Chart;
import net.sppan.base.service.IPersonnelService;
import net.sppan.base.service.IUserService;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
		Subject subject = SecurityUtils.getSubject();
		boolean isLogin = subject.isAuthenticated();
		if(isLogin){
			return "admin/index";
		}
		return "admin/login";
	}

	@RequestMapping(value={"/personnel/index"})
	public String personnelList(){
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

	@GetMapping(value={"/chart/index"})
	public String dataChart(){
		return "chart/index";
	}

	@GetMapping(value={"/chart/add"})
	public String addChart(){
		return "chart/add";
	}

	@RequestMapping("/chart/show/{id}")
	public String findById(@PathVariable Integer id, ModelMap map){
		map.put("id",id);
		return "/chart/show";
	}

	@RequestMapping("/chart/edit/{id}")
	public String updateChartById(@PathVariable Integer id, ModelMap map){
		map.put("id",id);
		return "/chart/edit";
	}

}
