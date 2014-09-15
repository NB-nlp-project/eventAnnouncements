package controllers;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;


import com.sun.xml.internal.ws.client.RequestContext;

public class UeditorController extends BaseController {

	public static void controller(String action, String noCache)
			throws IOException {
		InputStreamReader read;
		String filter = action.split(",")[1].replaceAll(" ", "");
		switch (filter) {
		case "config":
			read= new InputStreamReader(new FileInputStream(
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
			System.err.println(request.params);
			System.err.println(request.params.get("upfile"));

			break;
		/* 上传涂鸦 */
		case "uploadscrawl":
			/* 上传视频 */
		case "uploadvideo":
			/* 上传文件 */
		case "uploadfile":
		default:
			break;
		}
	}

}
