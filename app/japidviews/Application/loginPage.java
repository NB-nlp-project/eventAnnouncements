//version: 0.9.5.1
package japidviews.Application;
import java.util.*;
import java.io.*;
import cn.bran.japid.tags.Each;
import static cn.bran.play.JapidPlayAdapter.*;
import static play.data.validation.Validation.*;
import static play.templates.JavaExtensions.*;
import play.data.validation.Error;
import play.i18n.Messages;
import play.mvc.Scope.*;
import japidviews._tags.*;
import play.data.validation.Validation;
import play.i18n.Lang;
import controllers.*;
import static japidviews._javatags.CommonUtils.*;
import japidviews._layouts.*;
import models.*;
import play.mvc.Http.*;
//
// NOTE: This file was generated from: japidviews/Application/loginPage.html
// Change to this file will be lost next time the template file is compiled.
//
@cn.bran.play.NoEnhance
public class loginPage extends cn.bran.play.JapidTemplateBase
{
	public static final String sourceTemplate = "japidviews/Application/loginPage.html";
	 private void initHeaders() {
		putHeader("Content-Type", "text/html; charset=utf-8");
		setContentType("text/html; charset=utf-8");
	}
	{
	}

// - add implicit fields with Play

	final play.mvc.Http.Request request = play.mvc.Http.Request.current(); 
	final play.mvc.Http.Response response = play.mvc.Http.Response.current(); 
	final play.mvc.Scope.Session session = play.mvc.Scope.Session.current();
	final play.mvc.Scope.RenderArgs renderArgs = play.mvc.Scope.RenderArgs.current();
	final play.mvc.Scope.Params params = play.mvc.Scope.Params.current();
	final play.data.validation.Validation validation = play.data.validation.Validation.current();
	final cn.bran.play.FieldErrors errors = new cn.bran.play.FieldErrors(validation);
	final play.Play _play = new play.Play(); 

// - end of implicit fields with Play 


	public loginPage() {
	super((StringBuilder)null);
	initHeaders();
	}
	public loginPage(StringBuilder out) {
		super(out);
		initHeaders();
	}
	public loginPage(cn.bran.japid.template.JapidTemplateBaseWithoutPlay caller) {
		super(caller);
	}

/* based on https://github.com/branaway/Japid/issues/12
 */
	public static final String[] argNames = new String[] {/* args of the template*/ };
	public static final String[] argTypes = new String[] {/* arg types of the template*/ };
	public static final Object[] argDefaults= new Object[] { };
	public static java.lang.reflect.Method renderMethod = getRenderMethod(japidviews.Application.loginPage.class);

	{
		setRenderMethod(renderMethod);
		setArgNames(argNames);
		setArgTypes(argTypes);
		setArgDefaults(argDefaults);
		setSourceTemplate(sourceTemplate);
	}
////// end of named args stuff

	public cn.bran.japid.template.RenderResult render() {
		try {super.layout();} catch (RuntimeException __e) { super.handleException(__e);} // line 0, japidviews/Application/loginPage.html
		return getRenderResult();
	}

	public static cn.bran.japid.template.RenderResult apply() {
		return new loginPage().render();
	}

	@Override protected void doLayout() {
		beginDoLayout(sourceTemplate);
p("<!DOCTYPE html>\n" + 
"<html>\n" + 
"<head>\n" + 
"<meta charset=\"utf-8\">\n" + 
"<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">\n" + 
"<title>后台登录</title>\n" + 
"<meta name=\"description\" content=\"\">\n" + 
"<meta name=\"keywords\" content=\"\">\n" + 
"<link href=\"public/backStage/css/default.css\" rel=\"stylesheet\">\n" + 
"<link href=\"public/backStage/css/login.css\" rel=\"stylesheet\">\n" + 
"</head>\n" + 
"<body>\n" + 
"	<div class=\"login\">\n" + 
"	    <div class=\"logo\">\n" + 
"			<h1>宁波大学活动发布后台</h1>\n" + 
"		</div>\n" + 
"		<div class=\"content\">\n" + 
"			<!-- BEGIN LOGIN FORM -->\n" + 
"			<form class=\"form-vertical login-form\" action=\"");// line 1, japidviews\Application\loginPage.html
		p(lookup("Application.loginFromWebsite", new Object[]{}));// line 19, japidviews\Application\loginPage.html
		p("\" method=\"post\" novalidate=\"novalidate\">\n" + 
"				<h3 class=\"form-title\">用户登录</h3>\n" + 
"				<!-- <div class=\"alert alert-error hide\">\n" + 
"					<button class=\"close\" data-dismiss=\"alert\"></button>\n" + 
"					<span>Enter any username and password.</span>\n" + 
"				</div> -->\n" + 
"				<div class=\"control-group\">\n" + 
"					<!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->\n" + 
"					<label class=\"control-label\">Username</label>\n" + 
"					<div class=\"controls\">\n" + 
"						<div class=\"input-icon left\">\n" + 
"							<i class=\"icon icon-user\"></i>\n" + 
"							<input class=\"m-wrap placeholder-no-fix\" type=\"text\" placeholder=\"后台帐号\" name=\"loginName\">\n" + 
"						</div>\n" + 
"					</div>\n" + 
"				</div>\n" + 
"				<div class=\"control-group\">\n" + 
"					<label class=\"control-label\">Password</label>\n" + 
"					<div class=\"controls\">\n" + 
"						<div class=\"input-icon left\">\n" + 
"							<i class=\"icon icon-lock\"></i>\n" + 
"							<input class=\"m-wrap placeholder-no-fix\" type=\"password\" placeholder=\"密码\" name=\"password\">\n" + 
"						</div>\n" + 
"					</div>\n" + 
"				</div>\n" + 
"				<div class=\"form-actions\">\n" + 
"					<label class=\"checkbox\"><input type=\"checkbox\" name=\"remember\" value=\"1\"> Remember me</label>\n" + 
"					<button type=\"submit\" class=\"btn green pull-right\">登录</button>            \n" + 
"				</div>\n" + 
"			</form>\n" + 
"			<!-- END LOGIN FORM -->\n" + 
"		</div>\n" + 
"	</div>\n" + 
"</body>\n" + 
"</html>");// line 19, japidviews\Application\loginPage.html
		
		endDoLayout(sourceTemplate);
	}

}