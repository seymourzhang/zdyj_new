package com.mtc.zljk.util.action;

import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.common.PubFun;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

/**
 * Created by LeLe on 3/2/2017.
 */
@Controller
@RequestMapping("/info")
public class InfoAction extends BaseAction {

    /**
     * 跳转到批次管理页面
     * raymon 2016-10-18
     * @return
     */
    @RequestMapping(value="/version")
    public ModelAndView showOrgManage()throws Exception{
        ModelAndView mv = this.getModelAndView();
        PageData pd = this.getPageData();
        String projectPath =  PubFun.getWEBINFpath().replace("WEB-INF/","");
        String versionPatchFilePath = projectPath + "version.patch";
        String version = getModifiedTime(versionPatchFilePath);
        pd.put("version",version);
//        pd.put("projectPath",projectPath);
        mv.addObject("pd",pd);
        mv.setViewName("modules/util/info");
        return mv;
    }



    String getModifiedTime(String patchFilePath){
        File f = new File(patchFilePath);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(f.lastModified());
        return  sdf.format(cal.getTime());
    }
}
