package controllers;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import org.json.JSONArray;
import org.json.JSONObject;

import groovy.json.JsonBuilder;

import com.baidu.ueditor.ActionEnter;
import com.baidu.ueditor.define.AppInfo;
import com.baidu.ueditor.define.BaseState;
import com.google.gson.JsonObject;

public class UeditorController extends BaseController {

	public static void controller(String action, String noCache)
			throws IOException {
		switch (action.split(",")[1].replaceAll(" ", "")) {
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
			System.err.println("11111111");
			break;
		default:
			break;
		}
	}
}
