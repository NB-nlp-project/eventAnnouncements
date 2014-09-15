//version: 0.9.5.1
package japidviews.AdminController;
import java.util.*;
import java.io.*;
import cn.bran.japid.tags.Each;
import models.Person;
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
// NOTE: This file was generated from: japidviews/AdminController/personCenter.html
// Change to this file will be lost next time the template file is compiled.
//
@cn.bran.play.NoEnhance
public class personCenter extends backStageLayout
{
	public static final String sourceTemplate = "japidviews/AdminController/personCenter.html";
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


	public personCenter() {
	super((StringBuilder)null);
	initHeaders();
	}
	public personCenter(StringBuilder out) {
		super(out);
		initHeaders();
	}
	public personCenter(cn.bran.japid.template.JapidTemplateBaseWithoutPlay caller) {
		super(caller);
	}

/* based on https://github.com/branaway/Japid/issues/12
 */
	public static final String[] argNames = new String[] {/* args of the template*/ };
	public static final String[] argTypes = new String[] {/* arg types of the template*/ };
	public static final Object[] argDefaults= new Object[] { };
	public static java.lang.reflect.Method renderMethod = getRenderMethod(japidviews.AdminController.personCenter.class);

	{
		setRenderMethod(renderMethod);
		setArgNames(argNames);
		setArgTypes(argTypes);
		setArgDefaults(argDefaults);
		setSourceTemplate(sourceTemplate);
	}
////// end of named args stuff

	public cn.bran.japid.template.RenderResult render() {
		try {super.layout();} catch (RuntimeException __e) { super.handleException(__e);} // line 0, japidviews/AdminController/personCenter.html
		return getRenderResult();
	}

	public static cn.bran.japid.template.RenderResult apply() {
		return new personCenter().render();
	}

	@Override protected void doLayout() {
		beginDoLayout(sourceTemplate);
;// line 1, japidviews\AdminController\personCenter.html
Person currPerson = getCurrentPerson();// line 3, japidviews\AdminController\personCenter.html
// line 5, japidviews\AdminController\personCenter.html
// line 6, japidviews\AdminController\personCenter.html
		p("<div class=\"navbar-inner\">\n" + 
"</div>\n" + 
"<div class=\"container\">\n" + 
"	<!-- 左菜单 -->\n" + 
"	");// line 12, japidviews\AdminController\personCenter.html
		new leftMenusTag(personCenter.this).render(); // line 17, japidviews\AdminController\personCenter.html// line 17, japidviews\AdminController\personCenter.html
		p("	<!-- 主内容 -->\n" + 
"	<div class=\"content\">\n" + 
"        <div class=\"constr fix\">\n" + 
"		<section class=\"cell\">\n" + 
"			<nav class=\"nav_content_box fix\">\n" + 
"				<h4 class=\"l\">您的基本信息</h4>\n" + 
"	        </nav>\n" + 
"            <article class=\"mt20 ml20 pl10\">\n" + 
"            	<div class=\"pb20\">\n" + 
"                    <div class=\"ml20 pl10 pt10\">\n" + 
"                    	<p class=\"ml10 pl5 pb10\">\n" + 
"                        	登录名：\n" + 
"                            <span class=\"inline_five\">");// line 17, japidviews\AdminController\personCenter.html
		p(currPerson.loginName);// line 30, japidviews\AdminController\personCenter.html
		p("</span>\n" + 
"                        </p>\n" + 
"                        <p>\n" + 
"                        	上次登录：\n" + 
"                             <span class=\"inline_five\">");// line 30, japidviews\AdminController\personCenter.html
		p(formatDate(null == currPerson.lastLoginTime ? currPerson.createTime : currPerson.lastLoginTime, "yyyy年MM月dd日 HH:mm:ss"));// line 34, japidviews\AdminController\personCenter.html
		p("</span>\n" + 
"                        </p>\n" + 
"                    </div>\n" + 
"                </div>\n" + 
"            </article> \n" + 
"			<article class=\"pl10 mt20 mb20\">\n" + 
"			<form action=\"");// line 34, japidviews\AdminController\personCenter.html
		p(lookup("AdminController.savePassword", new Object[]{}));// line 40, japidviews\AdminController\personCenter.html
		p("\" method=\"post\">\n" + 
"				<ul>\n" + 
"					<li class=\"mb15\">\n" + 
"                    	<span class=\"dib w70 tr\">\n" + 
"                        	<span class=\"cr\">*</span>\n" + 
"							当前密码：\n" + 
"                        </span>\n" + 
"						<input class=\"text_input\" type=\"password\" name=\"oldPwd\"/>\n" + 
"					</li>\n" + 
"                    <li class=\"mb15\">\n" + 
"                    	<span class=\"dib w70 tr\">\n" + 
"                        	<span class=\"cr\">*</span>\n" + 
"							新密码：\n" + 
"                        </span>\n" + 
"						<input class=\"text_input\" type=\"password\" name=\"newPwd\"/>\n" + 
"					</li>\n" + 
"					<li class=\"mb15\">\n" + 
"                    	<span class=\"dib w70 tr\">\n" + 
"                        	<span class=\"cr\">*</span>\n" + 
"							再输一遍：\n" + 
"                        </span>\n" + 
"						<input class=\"text_input\" type=\"password\" name=\"newPwdA\"/>\n" + 
"					</li>\n" + 
"				</ul>\n" + 
"				<div class=\"pt10 ml20\">\n" + 
"					<p class=\"pt10 ml20\">");// line 40, japidviews\AdminController\personCenter.html
		p(flash.get("tips"));// line 65, japidviews\AdminController\personCenter.html
		p("</p>\n" + 
"					<input class=\"bluebtn btn_m bdrad3\" type=\"submit\" value=\"修改密码\"/>\n" + 
"				</div>\n" + 
"			</form>\n" + 
"			</article>\n" + 
"		</section>\n" + 
"	</div>\n" + 
"</div>");// line 65, japidviews\AdminController\personCenter.html
		
		endDoLayout(sourceTemplate);
	}

	@Override protected void moreJSLink() {
		// line 6, japidviews\AdminController\personCenter.html
		p("");// line 6, japidviews\AdminController\personCenter.html
		p("<script>\n" + 
"main.setSidebarHover(\"index\");\n" + 
"</script>\n");// line 7, japidviews\AdminController\personCenter.html
		p("");// line 11, japidviews\AdminController\personCenter.html
		;
	}
	@Override protected void title() {
		// line 5, japidviews\AdminController\personCenter.html
		p("后台管理-账号管理");// line 5, japidviews\AdminController\personCenter.html
		;
	}
}