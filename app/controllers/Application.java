package controllers;

import play.*;
import play.mvc.*;
import play.mvc.Scope.Session;
import japidviews._javatags.CommonUtils;

import java.util.*;

import models.*;

public class Application extends BaseController {

	public static void loginPage() {
		Person p = CommonUtils.getCurrentPerson();
		if (null != p) {
			AdminController.flashPurchase(0l);
		}
		renderJapid();
	}

	public static void loginFromWebsite(String loginName, String password) {
		Person loginedPerson = Person.login(loginName, password);
		if (null != loginedPerson) {
			session.put(CURRENT_PERSON_ID, loginedPerson.id);
			loginedPerson.updateLoginTime();
			AdminController.flashPurchase(0l);
		} else {
			renderText("error login name or password");
		}
	}

	public static void logout() {
		Session.current().remove(CURRENT_PERSON_ID);
		Session.current().remove(CURRENT_OPENID);
		loginPage();
	}
}