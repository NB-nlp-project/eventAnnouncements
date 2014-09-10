package models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import models.BaseModel;

import org.apache.commons.codec.digest.DigestUtils;

/**
 * @author gewenzhen
 */
@Entity
public class Person extends BaseModel {
	public String loginName;
	public String password;
	public String avatarURL;
	@Temporal(TemporalType.TIMESTAMP)
	public Date lastLoginTime;

	/*** 静态方法 ***/
	public static Person login(String loginName, String pwd) {
		return find(getDefaultContitionSql(" loginName=? and password=?"),
				loginName, DigestUtils.md5Hex(pwd)).first();
	}

	public static <T extends Person> T findOneById(long id) {
		T p = Person.<T> findById(id);
		return null != p && !p.isDeleted ? p : null;
	}

	public static Person findOneByLoginName(String loginName) {
		return find(getDefaultContitionSql("loginName=?"), loginName).first();
	}

	/*** 实例方法 ***/
	public void updateLoginTime() {
		this.lastLoginTime = new Date();
		this.save();
	}

	public boolean validatePwd(String pwd) {
		if (this.password.equals(DigestUtils.md5Hex(pwd))) {
			return true;
		} else {
			return false;
		}
	}

	// 初始化登录密码
	public static Person initAdmin() {
		Person admin = find(getDefaultContitionSql("loginName=?"), "admin")
				.first();
		if (null == admin) {
			admin = new Person();
			admin.loginName = "admin";
			admin.password = DigestUtils.md5Hex("111111");
			admin.lastLoginTime = new Date();
			admin.save();
		}
		return admin;
	}

	public void updatePassword(String pwd) {
		this.password = DigestUtils.md5Hex(pwd);
		this.save();
	}

}
