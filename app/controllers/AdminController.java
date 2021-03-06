package controllers;

import japidviews._javatags.CommonUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import models.LostAndFound;
import models.Person;
import models.Announcements;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;

import play.data.FileUpload;
import play.data.binding.As;
import play.data.parsing.DataParser;
import play.mvc.Before;
import play.templates.JavaExtensions;
import cn.bran.play.JapidPlayAdapter;

/**
 * 后台管理
 *
 * @author xuyuzhu
 */
public class AdminController extends BaseController {

	public static final int PAGESIZE = 10;

	public static void checkLoginInfo() {
		Person currentPerson = CommonUtils.getCurrentPerson();
		if (currentPerson == null) {
			Application.loginPage();
		}
		AdminController.flashPurchase(0l);
	}

	/**** 左侧一级链接 ****/
	public static void personCenter() {
		renderJapid();
	}

	public static void flashPurchase(long goodId) {
		renderJapid(Announcements.findOneById(goodId));
	}

	public static void savePassword(String oldPwd, String newPwd, String newPwdA) {
		Person currPerson = CommonUtils.getCurrentPerson();
		boolean isPwdCorrect = currPerson.validatePwd(oldPwd);
		if (isPwdCorrect && StringUtils.equals(newPwd, newPwdA)) {
			currPerson.updatePassword(newPwd);
			flash.put("tips", "密码修改成功");
		} else {
			flash.put("tips", "密码修改失败");
		}
		personCenter();
	}

	public static void flashPurchaseList(Integer page) {
		if (page == null) {
			page = 1;
		}
		List<Announcements> fastGoodList = Announcements.fetchAllAnnouncements(
				page, 20);
		renderJapid(fastGoodList, page,
				(int) Announcements.countAnnouncements() / 20 + 1);
	}

	// 发布活动
	public static void publishAnnouncements(long announcementsId, String title,
			Date startTime, Date endTime, String contents) {
		Announcements announcements = Announcements
				.findOneById(announcementsId);
		announcements.announcementsUpdateAttributes(announcementsId, title,
				startTime, endTime, contents);
		flashPurchaseList(1);
	}

	// 删除活动
	public static void deleteFastGood(long announcementsId) {
		Announcements announcements = Announcements
				.findOneById(announcementsId);
		announcements.removeOne();
		flashPurchaseList(1);
	}

	public static void preview(long announcementsId) {

	}

	public static void lostFound(long goodId) {
		renderJapid(LostAndFound.findOneById(goodId));
	}

	public static void lostFoundList(Integer page) {
		if (page == null) {
			page = 1;
		}
		List<LostAndFound> fastGoodList = LostAndFound.fetchAllLostAndFounds(
				page, 20);
		renderJapid(fastGoodList, page,
				(int) LostAndFound.countLostAndFounds() / 20 + 1);
	}

	public static void publishLostAndFound(long announcementsId, String title,
			Date startTime, String contents) {
		LostAndFound announcements = LostAndFound.findOneById(announcementsId);
		announcements.lostAndFoundUpdateAttributes(announcementsId, title,
				startTime, contents);
		flashPurchaseList(1);
	}
}
