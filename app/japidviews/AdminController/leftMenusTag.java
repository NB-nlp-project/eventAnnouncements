//version: 0.9.5.1
package japidviews.AdminController;
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
// NOTE: This file was generated from: japidviews/AdminController/leftMenusTag.html
// Change to this file will be lost next time the template file is compiled.
//
@cn.bran.play.NoEnhance
public class leftMenusTag extends cn.bran.play.JapidTemplateBase
{
	public static final String sourceTemplate = "japidviews/AdminController/leftMenusTag.html";
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


	public leftMenusTag() {
	super((StringBuilder)null);
	initHeaders();
	}
	public leftMenusTag(StringBuilder out) {
		super(out);
		initHeaders();
	}
	public leftMenusTag(cn.bran.japid.template.JapidTemplateBaseWithoutPlay caller) {
		super(caller);
	}

/* based on https://github.com/branaway/Japid/issues/12
 */
	public static final String[] argNames = new String[] {/* args of the template*/ };
	public static final String[] argTypes = new String[] {/* arg types of the template*/ };
	public static final Object[] argDefaults= new Object[] { };
	public static java.lang.reflect.Method renderMethod = getRenderMethod(japidviews.AdminController.leftMenusTag.class);

	{
		setRenderMethod(renderMethod);
		setArgNames(argNames);
		setArgTypes(argTypes);
		setArgDefaults(argDefaults);
		setSourceTemplate(sourceTemplate);
	}
////// end of named args stuff

	public cn.bran.japid.template.RenderResult render() {
		try {super.layout();} catch (RuntimeException __e) { super.handleException(__e);} // line 0, japidviews/AdminController/leftMenusTag.html
		return getRenderResult();
	}

	public static cn.bran.japid.template.RenderResult apply() {
		return new leftMenusTag().render();
	}

	@Override protected void doLayout() {
		beginDoLayout(sourceTemplate);
p("<div class=\"sidebar\">\n" + 
"	<div class=\"item open\">\n" + 
"		<a href=\"#\" class=\"title\">系统管理</a>\n" + 
"		<ul>\n" + 
"            <li><a href=\"");// line 1, japidviews\AdminController\leftMenusTag.html
		p(lookup("AdminController.personCenter", new Object[]{}));// line 5, japidviews\AdminController\leftMenusTag.html
		p("\" ");// line 5, japidviews\AdminController\leftMenusTag.html
		p("personCenter".equals(request.actionMethod)?" name='index'":"");// line 5, japidviews\AdminController\leftMenusTag.html
		p(">账号管理</a></li>\n" + 
"		</ul>\n" + 
"	</div>\n" + 
"	<div class=\"item open\">\n" + 
"		<a href=\"#\" class=\"title\">活动管理</a>\n" + 
"		<ul>\n" + 
"            <li><a href=\"");// line 5, japidviews\AdminController\leftMenusTag.html
		p(lookup("AdminController.flashPurchase", new Object[]{}));// line 11, japidviews\AdminController\leftMenusTag.html
		p("\" ");// line 11, japidviews\AdminController\leftMenusTag.html
		p("flashPurchase".equals(request.actionMethod)?" name='index'":"");// line 11, japidviews\AdminController\leftMenusTag.html
		p(">活动发布</a></li>\n" + 
"            <li><a href=\"");// line 11, japidviews\AdminController\leftMenusTag.html
		p(lookup("AdminController.flashPurchaseList", new Object[]{}));// line 12, japidviews\AdminController\leftMenusTag.html
		p("\" ");// line 12, japidviews\AdminController\leftMenusTag.html
		p("flashPurchaseList".equals(request.actionMethod)?" name='index'":"");// line 12, japidviews\AdminController\leftMenusTag.html
		p(">发布活动列表</a></li>\n" + 
"		</ul>\n" + 
"	</div>\n" + 
"	<div class=\"item open\">\n" + 
"		<a href=\"#\" class=\"title\">失物招领</a>\n" + 
"		<ul>\n" + 
"            <li><a href=\"");// line 12, japidviews\AdminController\leftMenusTag.html
		p(lookup("AdminController.lostFound", new Object[]{}));// line 18, japidviews\AdminController\leftMenusTag.html
		p("\" ");// line 18, japidviews\AdminController\leftMenusTag.html
		p("lostFound".equals(request.actionMethod)?" name='index'":"");// line 18, japidviews\AdminController\leftMenusTag.html
		p(">失物招领-发布</a></li>\n" + 
"            <li><a href=\"");// line 18, japidviews\AdminController\leftMenusTag.html
		p(lookup("AdminController.lostFoundList", new Object[]{}));// line 19, japidviews\AdminController\leftMenusTag.html
		p("\" ");// line 19, japidviews\AdminController\leftMenusTag.html
		p("lostFoundList".equals(request.actionMethod)?" name='index'":"");// line 19, japidviews\AdminController\leftMenusTag.html
		p(">失物招领-列表</a></li>\n" + 
"		</ul>\n" + 
"	</div>\n" + 
"</div>");// line 19, japidviews\AdminController\leftMenusTag.html
		
		endDoLayout(sourceTemplate);
	}

}