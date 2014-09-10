package japidviews._javatags;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import models.Person;

import org.apache.commons.lang.StringUtils;

import play.Logger;
import play.i18n.Messages;
import play.mvc.Http.Header;
import play.mvc.Http.Request;
import play.mvc.Scope.Flash;
import play.mvc.Scope.Session;
import play.templates.JavaExtensions;
import cn.bran.play.JapidPlayAdapter;
import controllers.BaseController;

public class CommonUtils {

	public static String DEFAULT_GOOD_IMAGE = "/public/img/goods/g1.jpg";
	public static String DEFAULT_SHOP_IMAGE = "/public/img/shop/s1.png";

	private static String getDataFromSession(String arg) {
		Session session = Session.current();
		return null != session && session.contains(arg) ? session.get(arg)
				: null;
	}

	public static <T extends Person> T getCurrentPerson() {
		T currPerson = null;
		String s = getDataFromSession(BaseController.CURRENT_PERSON_ID);
		if (StringUtils.isNotBlank(s)) {
			currPerson = Person.findOneById(Long.valueOf(s));
		}
		return null != currPerson && !currPerson.isDeleted ? currPerson : null;
	}

	public static String getPassedTime(Date date) {
		Date now = new Date();
		if (now.before(date)) {
			return "";
		}
		long delta = (now.getTime() - date.getTime()) / 1000;
		if (delta < 60) {
			return delta + "秒前";
		}
		if (delta < 60 * 60) {
			long minutes = delta / 60;
			return minutes + "分钟前";
		}
		if (delta < 24 * 60 * 60) {
			long hours = delta / (60 * 60);
			return hours + "小时前";
		}
		if (delta < 4 * 24 * 60 * 60) {
			long days = delta / (24 * 60 * 60);
			return days + "天前";
		}
		return JavaExtensions.format(date, "yyyy-MM-dd");
	}

	public static String formatDate(Date date, String format) {
		return JavaExtensions.format(date, format);
	}

	public static Date getDate(String dateStr, String format) {
		SimpleDateFormat formatter = new SimpleDateFormat(format);
		try {
			return formatter.parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static String formatNumber(Number number, String format) {
		return JavaExtensions.format(number, format);
	}

	public static Map<String, Integer> getInterval(Date beginTime, Date endTime) {
		Map<String, Integer> result = new HashMap();
		long deta = endTime.getTime() - beginTime.getTime();
		long done = 0l;
		int dCount = (int) deta / 1000 / 60 / 60 / 24;
		done += dCount * 1000 * 60 * 60 * 24;
		int hCount = (int) (deta - done) / 1000 / 3600;
		done += hCount * 1000 * 3600;
		int mCount = (int) (deta - done) / 1000 / 60;
		done += mCount * 1000 * 60;
		int sCount = (int) (deta - done) / 1000;
		Flash.current().get("ads");

		result.put("DAY", dCount);
		result.put("HOUR", hCount);
		result.put("MINUTE", mCount);
		result.put("SECOND", sCount);
		return result;
	}

	public static String escapeURL(String url) {
		return url.replace("=", "%3D").replace("/", "%2F").replace(":", "%3A")
				.replace("&", "%26").replace("amp;", "%26");
	}

	public static String filterEmoji(String source) {
		StringBuffer sb = new StringBuffer(source);
		for (int len = source.length(), i = len - 1; i >= 0; --i) {
			int codePoint = source.codePointAt(i);
			// Emoji表情所在码位为U+1F300 – U+1F64F
			if (codePoint >= 127744) {
				sb.deleteCharAt(i);
			}
		}
		return sb.toString();
	}

	public static String nl2brStr(String source) {
		if (StringUtils.isBlank(source)) {
			return "";
		}
		return JavaExtensions.nl2br(source).toString();
	}

	/**
	 * 添加统计功能
	 *
	 * @return
	 */
	public static String getImageUrl() {
		int siteId = 1252973691;
		String imageLocation = "http://c.cnzz.com/wapstat.php";
		String referer;
		try {
			Header header = Request.current().headers.get("referer");
			referer = URLEncoder.encode(header == null ? "" : header.value(),
					"utf-8");
		} catch (UnsupportedEncodingException e) {
			referer = "";
		}
		String rnd = (int) (Math.random() * 0x7fffffff) + "";
		String imageUrl = imageLocation + "?" + "siteid=" + siteId + "&r="
				+ referer + "&rnd=" + rnd;
		return imageUrl;
	}

	public static void main(String[] args) {
		System.out.println(CommonUtils.getImageUrl());
	}

}
