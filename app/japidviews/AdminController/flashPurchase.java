//version: 0.9.5.1
package japidviews.AdminController;
import java.util.*;
import java.io.*;
import cn.bran.japid.tags.Each;
import japidviews.AdminController.leftMenusTag;
import japidviews._tags.editorTag;
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
// NOTE: This file was generated from: japidviews/AdminController/flashPurchase.html
// Change to this file will be lost next time the template file is compiled.
//
@cn.bran.play.NoEnhance
public class flashPurchase extends backStageLayout
{
	public static final String sourceTemplate = "japidviews/AdminController/flashPurchase.html";
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


	public flashPurchase() {
	super((StringBuilder)null);
	initHeaders();
	}
	public flashPurchase(StringBuilder out) {
		super(out);
		initHeaders();
	}
	public flashPurchase(cn.bran.japid.template.JapidTemplateBaseWithoutPlay caller) {
		super(caller);
	}

/* based on https://github.com/branaway/Japid/issues/12
 */
	public static final String[] argNames = new String[] {/* args of the template*/"announcements",  };
	public static final String[] argTypes = new String[] {/* arg types of the template*/"Announcements",  };
	public static final Object[] argDefaults= new Object[] {null, };
	public static java.lang.reflect.Method renderMethod = getRenderMethod(japidviews.AdminController.flashPurchase.class);

	{
		setRenderMethod(renderMethod);
		setArgNames(argNames);
		setArgTypes(argTypes);
		setArgDefaults(argDefaults);
		setSourceTemplate(sourceTemplate);
	}
////// end of named args stuff

	private Announcements announcements; // line 3, japidviews/AdminController/flashPurchase.html
	public cn.bran.japid.template.RenderResult render(Announcements announcements) {
		this.announcements = announcements;
		try {super.layout();} catch (RuntimeException __e) { super.handleException(__e);} // line 3, japidviews/AdminController/flashPurchase.html
		return getRenderResult();
	}

	public static cn.bran.japid.template.RenderResult apply(Announcements announcements) {
		return new flashPurchase().render(announcements);
	}

	@Override protected void doLayout() {
		beginDoLayout(sourceTemplate);
;// line 1, flashPurchase.html
// line 5, flashPurchase.html
// line 6, flashPurchase.html
		p("<div class=\"navbar-inner\">\n" + 
"</div>\n" + 
"<div class=\"container\">\n" + 
"	<!-- 左菜单 -->\n" + 
"	");// line 16, flashPurchase.html
		new leftMenusTag(flashPurchase.this).render(); // line 21, flashPurchase.html// line 21, flashPurchase.html
		p("	<!-- 主内容 -->\n" + 
"	<div class=\"content\">\n" + 
"	<form action=\"");// line 21, flashPurchase.html
		p(lookup("AdminController.publishAnnouncements", new Object[]{}));// line 24, flashPurchase.html
		p("\" method=\"post\">\n" + 
"	<input type=\"hidden\" name=\"announcementsId\" value=\"");// line 24, flashPurchase.html
		p(announcements==null?"":announcements.id);// line 25, flashPurchase.html
		p("\">\n" + 
"	<div  id=\"J_pbox_form_box\">\n" + 
"	<h3 class=\"title\" date=\"\">活动发布</h3>\n" + 
"            <div class=\"portlet-box-body\">\n" + 
"                <div class=\"pbox-form-list\">\n" + 
"                    <ul>\n" + 
"                    	<li>\n" + 
"                           <label>活动标题：</label>\n" + 
"                           <div class=\"pbox-controls\">\n" + 
"                               <input name=\"title\" type=\"text\" class=\"defaultInput goodName Tyz\" tyzn=\"1\" value=\"");// line 25, flashPurchase.html
		p(announcements==null?"":announcements.title);// line 34, flashPurchase.html
		p("\">\n" + 
"                           </div>\n" + 
"                        </li>\n" + 
"                        <li>\n" + 
"                           <label>活动时间：</label>\n" + 
"                           <div class=\"pbox-controls\">\n" + 
"                               <input class=\"Tyz\" tyzn=\"1\" name=\"startTime\" type=\"text\" id=\"dateStart\" value=\"");// line 34, flashPurchase.html
		p(announcements==null?"":announcements.startTime);// line 40, flashPurchase.html
		p("\">\n" + 
"                               <span class=\"text-inline\">到</span>\n" + 
"                               <input class=\"Tyz\" tyzn=\"1\" name=\"endTime\" type=\"text\" id=\"dateEnd\" value=\"");// line 40, flashPurchase.html
		p(announcements==null?"":announcements.endTime);// line 42, flashPurchase.html
		p("\">\n" + 
"                           </div>\n" + 
"                        </li>\n" + 
"                        <li>\n" + 
"                            <label>详情介绍：</label>\n" + 
"                            <div class=\"pbox-controls\">\n" + 
"                            	");// line 42, flashPurchase.html
		new editorTag(flashPurchase.this).render(announcements); // line 48, flashPurchase.html// line 48, flashPurchase.html
		p("                            </div>\n" + 
"                        </li>\n" + 
"                    </ul>\n" + 
"                    <div class=\"pbox-controls\">\n" + 
"                        <input type=\"submit\" value=\"确定\" class=\"defaultBtn submit flashpurchase TyzAutoYz\" tyzroomid=\"J_pbox_form_box\"/>\n" + 
"                        <a type=\"submit\" class=\"defaultBtn submit flashpurchase TyzAutoYz btn-green\"/>预览</a>\n" + 
"                    </div>\n" + 
"                </div>\n" + 
"            </div>\n" + 
"            </div>\n" + 
"            </form>\n" + 
"        </div>\n" + 
"        <!-- h20 -->\n" + 
"        <div class=\"h20\"></div>\n" + 
"</div>\n");// line 48, flashPurchase.html
		
		endDoLayout(sourceTemplate);
	}

	@Override protected void moreJSLink() {
		// line 6, flashPurchase.html
		p("<script type=\"text/javascript\" src=\"");// line 6, flashPurchase.html
		p(lookupStatic("/public/frontEnd/js/swfupload/swfupload/swfupload.js"));// line 7, flashPurchase.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\" src=\"");// line 7, flashPurchase.html
		p(lookupStatic("/public/frontEnd/js/swfupload/js/swfupload.queue.js"));// line 8, flashPurchase.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\" src=\"");// line 8, flashPurchase.html
		p(lookupStatic("/public/frontEnd/js/swfupload/js/fileprogress.js"));// line 9, flashPurchase.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\" src=\"");// line 9, flashPurchase.html
		p(lookupStatic("/public/frontEnd/js/swfupload/js/handlers.js"));// line 10, flashPurchase.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\" src=\"");// line 10, flashPurchase.html
		p(lookupStatic("/public/js/ueditor/ueditor.config.js"));// line 11, flashPurchase.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\" src=\"");// line 11, flashPurchase.html
		p(lookupStatic("/public/js/ueditor/ueditor.all.js"));// line 12, flashPurchase.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\">\n" + 
"var ue = UE.getEditor('descrArea');\n" + 
"</script>\n");// line 12, flashPurchase.html
		;
	}
	@Override protected void title() {
		// line 5, flashPurchase.html
		p("后台管理");// line 5, flashPurchase.html
		;
	}
}