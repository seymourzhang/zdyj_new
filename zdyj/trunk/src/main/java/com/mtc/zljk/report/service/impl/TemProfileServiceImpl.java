package com.mtc.zljk.report.service.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.xml.crypto.Data;

import com.mtc.zljk.batch.service.BatchManageService;
import com.mtc.zljk.util.common.PubFun;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtc.zljk.report.service.TemProfileService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;

@Service
public class TemProfileServiceImpl implements TemProfileService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;

	@Autowired
	private BatchManageService batchManageService;

	@Override
	public List<PageData> getTemProfile(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("ReportMapper.temProfileDaily", pd);
	}

	@Override
	public List<PageData> getTemProfileMonth(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("ReportMapper.temProfileMonth", pd);
	}

	@Override
	public List<PageData> selectTemForMobileDay(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("ReportMapper.selectTemForMobileDay", pd);
	}

	@Override
	public List<PageData> selectTemForMobileHour(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("ReportMapper.selectTemForMobileHour", pd);
	}

	@Override
	public List<PageData> selectTemForMobileMinute(PageData pd) throws Exception {
		String DataRangeStart = "";
		String DataRangeEnd = "";
		String ReqFlag = pd.get("ReqFlag").toString();
		String DataRange = pd.get("DataRange").toString();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		if (ReqFlag.equals("N")) {
			String tarTime = "";
			if (DataRange.equals(PubFun.getCurrentDate())) {
				String tCurTime = PubFun.getCurrentTime();
				if (tCurTime.substring(3, 5).compareTo("30") > 0) {
					tarTime = tCurTime.substring(0, 2) + ":30";
				} else {
					tarTime = tCurTime.substring(0, 2) + ":00";
				}
			} else {
				tarTime = "00:00";
			}
			DataRangeStart = DataRange + " " + tarTime;
			Date date = formatter.parse(DataRangeStart);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);
			calendar.add(Calendar.MINUTE, 30);
			DataRangeEnd = formatter.format(calendar.getTime());
		} else {
			DataRangeEnd = DataRange;
			Date date = formatter.parse(DataRangeEnd);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);
			calendar.add(Calendar.MINUTE, -30);
			DataRangeStart = formatter.format(calendar.getTime());

			date = formatter.parse(DataRangeEnd);
			DataRangeEnd = formatter.format(date);
		}
		String tHourValue = DataRangeStart.substring(11, 13);
		String codeType = "";
		if (DataRangeStart.endsWith("00")) {
			codeType = "PerMinute1";
		} else {
			codeType = "PerMinute2";
		}
		pd.put("DataType", codeType);
		pd.put("DataRangeStart", DataRangeStart);
		pd.put("DataRangeEnd", DataRangeEnd);
		pd.put("Hour", tHourValue);
		return (List<PageData>) dao.findForList("ReportMapper.selectTemForMobileMinute", pd);
	}

	@Override
	public List<PageData> selectLCForMobileDay(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("ReportMapper.selectLCForMobileDay", pd);
	}

	@Override
	public List<PageData> selectLCForMobileHour(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("ReportMapper.selectLCForMobileHour", pd);
	}

	@Override
	public List<PageData> selectLCForMobileMinute(PageData pd) throws Exception {
		String DataRangeStart = "";
		String DataRangeEnd = "";
		String ReqFlag = pd.get("ReqFlag").toString();
		String DataRange = pd.get("DataRange").toString();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		if (ReqFlag.equals("N")) {
			String tarTime = "";
			if (DataRange.equals(PubFun.getCurrentDate())) {
				String tCurTime = PubFun.getCurrentTime();
				if (tCurTime.substring(3, 5).compareTo("30") > 0) {
					tarTime = tCurTime.substring(0, 2) + ":30";
				} else {
					tarTime = tCurTime.substring(0, 2) + ":00";
				}
			} else {
				tarTime = "00:00";
			}
			DataRangeStart = DataRange + " " + tarTime;
			Date date = formatter.parse(DataRangeStart);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);
			calendar.add(Calendar.MINUTE, 30);
			DataRangeEnd = formatter.format(calendar.getTime());
		} else {
			DataRangeEnd = DataRange;
			Date date = formatter.parse(DataRangeEnd);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);
			calendar.add(Calendar.MINUTE, -30);
			DataRangeStart = formatter.format(calendar.getTime());

			date = formatter.parse(DataRangeEnd);
			DataRangeEnd = formatter.format(date);
		}
		String tHourValue = DataRangeStart.substring(11, 13);
		String codeType = "";
		if (DataRangeStart.endsWith("00")) {
			codeType = "PerMinute1";
		} else {
			codeType = "PerMinute2";
		}
		pd.put("DataType", codeType);
		pd.put("DataRangeStart", DataRangeStart);
		pd.put("DataRangeEnd", DataRangeEnd);
		pd.put("Hour", tHourValue);
		return (List<PageData>) dao.findForList("ReportMapper.selectLCForMobileMinute", pd);
	}
}
