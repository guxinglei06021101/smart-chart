package net.sppan.base.controller.datachart;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value={"/dataChart"})
@Controller
public class DataEchartController {


    @GetMapping(value={"/index"})
    public String dataChart(){
        return "datachart/index";
    }
}
