package com.mtc.zljk.user.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mtc.zljk.user.service.RoleService;
import com.mtc.zljk.util.common.PageData;
import com.mtc.zljk.util.dao.impl.DaoSupport;

@Service
public class RoleServiceImpl implements RoleService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	@Override
	public List<PageData> getRoleList(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDRoleMapper.getRoleList", pd);
	}

	@Override
	public void saveUserRole(PageData pd) throws Exception {
		String orgStr = pd.getString("org_str");
		if(orgStr.length()>0){
			orgStr = orgStr.substring(0, orgStr.length()-1);
		}
		pd.put("write_read",1);
		pd.put("orgIdList",orgStr.split(","));
		dao.save("SDRoleMapper.saveUserRoleTemp", pd);
		dao.save("SDRoleMapper.saveUserRole", pd);
		dao.save("SDRoleMapper.saveUserRoleRela", pd);
		dao.save("SDRoleMapper.saveUserRoleRightsForOrg", pd);
		dao.save("SDRoleMapper.saveUserRoleRightsForFunction", pd);

	}
	@Override
	public List<PageData> getRoleByUserId(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("SDRoleMapper.getRoleByUserId", pd);
	}
	
	@Override
	public void editUserRole(PageData pd) throws Exception {
		String orgStr = pd.getString("org_str");
		if(orgStr.length()>0){
			orgStr = orgStr.substring(0, orgStr.length()-1);
		}
		pd.put("write_read",1);
		pd.put("role_temp_id",pd.get("role_id"));
		pd.put("orgIdList",orgStr.split(","));

		dao.delete("SDRoleMapper.delUserRoleTemp", pd);
		dao.delete("SDRoleMapper.delUserRole", pd);
		dao.delete("SDRoleMapper.delUserRoleRights", pd);
		dao.delete("SDRoleMapper.delUserRoleRela", pd);

		dao.save("SDRoleMapper.saveUserRoleTemp", pd);
		dao.save("SDRoleMapper.saveUserRole", pd);
		dao.save("SDRoleMapper.saveUserRoleRela", pd);
		dao.save("SDRoleMapper.saveUserRoleRightsForOrg", pd);
		dao.save("SDRoleMapper.saveUserRoleRightsForFunction", pd);

	}

	@Override
	public void insertRightsObj(PageData pd) throws Exception {
		dao.save("SDRoleMapper.insertRightsObj", pd);
//		Long objId = (Long)pd.get("rights_id");
		insertRoleRightsByUserId(pd);
	}

	@Override
	public void insertRoleRightsByUserId(PageData pd) throws Exception {
		dao.save("SDRoleMapper.insertRoleRightsByUserId", pd);
	}

}
