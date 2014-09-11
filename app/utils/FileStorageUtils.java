package utils;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import models.BaseModel;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang.StringUtils;

import play.cache.Cache;
import play.templates.JavaExtensions;

public class FileStorageUtils {

	public static String save(File file) throws IOException {
		if (file != null)
			return save(file.getName(), FileUtils.openInputStream(file));
		else
			return "";
	}

	public static String saveWithRandomName(File file) throws IOException {
		if (file != null)
			return save(file.getName(), FileUtils.openInputStream(file));
		else
			return "";
	}

	public static String save(String originFilename, InputStream inputStream)
			throws IOException {
		String filename = "public/files/" + RandomStringUtils.randomNumeric(4)
				+ "/" + RandomStringUtils.randomNumeric(4) + "/"
				+ getTempFileName(originFilename);
		File file = new File(filename);
		FileUtils.copyInputStreamToFile(inputStream, file);
		return "/" + filename;
	}

	public static Boolean delete(String str) {
		String progressedPath = getRelativePath(str);
		if (progressedPath == null)
			return false;
		File f = new File(progressedPath);
		if (f.exists()) {
			f.delete();
			return true;
		}
		return false;
	}

	public static String getRelativePath(String storedPath) {
		if (StringUtils.startsWith(storedPath, "/public")) {
			return storedPath.substring(1);
		}
		return null;
	}

	public static String getTempFileName(String fileName) {
		return RandomStringUtils.randomAlphanumeric(8) + "/" + fileName;
	}

	// 读openId列表
	public static List<String> readOpenId() throws IOException {
		List<String> openIdList = new ArrayList<String>();
		InputStreamReader read = new InputStreamReader(new FileInputStream(
				"public/files/openIdList.txt"), "utf-8");// 考虑到编码格式
		BufferedReader bufferedReader = new BufferedReader(read);
		String lineTxt = null;
		while ((lineTxt = bufferedReader.readLine()) != null) {
			System.out.println(lineTxt.split("\"")[1]);
			openIdList.add(lineTxt.split("\"")[1]);
		}
		read.close();
		return openIdList;
	}

	public static List<String> readWinningList(String path) throws IOException {
		List<String> winnings = new ArrayList<String>();
		InputStreamReader read = new InputStreamReader(new FileInputStream(
				"conf/nbmetro/win.txt"), "utf-8");// 考虑到编码格式
		BufferedReader bufferedReader = new BufferedReader(read);
		String lineTxt = null;
		while ((lineTxt = bufferedReader.readLine()) != null) {
			winnings.add(lineTxt);
		}
		read.close();
		Cache.add("win", winnings, "10d");
		return winnings;
	}

	public static boolean ListHas(List<String> list, String o) {
		boolean b = false;
		for (String ob : list) {
			if (ob.toString().equals(o)) {
				b = true;
			}
		}
		return b;
	}

	public static void writeWinning(String s) throws IOException {
		InputStreamReader read = new InputStreamReader(new FileInputStream(
				"conf/nbmetro/winInformation.txt"), "utf-8");// 考虑到编码格式
		BufferedReader bufferedReader = new BufferedReader(read);
		String lineTxt = "";
		String ss = "";
		while ((ss = bufferedReader.readLine()) != null) {
			lineTxt = lineTxt + ss + "\r\n";
		}
		File f = new File("conf/nbmetro/winInformation.txt");
		BufferedWriter output = new BufferedWriter(new FileWriter(f));
		output.write(lineTxt + s);
		output.close();
		read.close();
	}
}
