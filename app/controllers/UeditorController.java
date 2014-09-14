package controllers;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextAttributeListener;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpServletRequest;

import play.mvc.Http.Request;
import groovy.json.JsonBuilder;

import com.google.gson.JsonObject;
import com.sun.xml.internal.ws.client.RequestContext;

public class UeditorController extends BaseController {

	public static void controller(String action, String noCache)
			throws IOException {
		String filter = action.split(",")[1].replaceAll(" ", "");
		switch (filter) {
		case "config":
			InputStreamReader read = new InputStreamReader(new FileInputStream(
					"public/js/ueditor/jsp/config.json"), "utf-8");
			BufferedReader bufferedReader = new BufferedReader(read);
			String lineTxt = "";
			String ss = "";
			while ((ss = bufferedReader.readLine()) != null) {
				lineTxt = lineTxt + ss;
			}
			renderJSON(lineTxt.replaceAll("/\\*[\\s\\S]+?\\*/", "").replaceAll(
					" ", ""));
			break;
		case "uploadimage":

			break;
		/* 上传涂鸦 */
		case "uploadscrawl":
			/* 上传视频 */
		case "uploadvideo":
			/* 上传文件 */
		case "uploadfile":
			break;
		default:
			break;
		}
	}

}
