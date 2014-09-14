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
// NOTE: This file was generated from: japidviews/AdminController/lostAndFound.html
// Change to this file will be lost next time the template file is compiled.
//
@cn.bran.play.NoEnhance
public class lostAndFound extends backStageLayout
{
	public static final String sourceTemplate = "japidviews/AdminController/lostAndFound.html";
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


	public lostAndFound() {
	super((StringBuilder)null);
	initHeaders();
	}
	public lostAndFound(StringBuilder out) {
		super(out);
		initHeaders();
	}
	public lostAndFound(cn.bran.japid.template.JapidTemplateBaseWithoutPlay caller) {
		super(caller);
	}

/* based on https://github.com/branaway/Japid/issues/12
 */
	public static final String[] argNames = new String[] {/* args of the template*/"lostAndFound",  };
	public static final String[] argTypes = new String[] {/* arg types of the template*/"LostAndFound",  };
	public static final Object[] argDefaults= new Object[] {null, };
	public static java.lang.reflect.Method renderMethod = getRenderMethod(japidviews.AdminController.lostAndFound.class);

	{
		setRenderMethod(renderMethod);
		setArgNames(argNames);
		setArgTypes(argTypes);
		setArgDefaults(argDefaults);
		setSourceTemplate(sourceTemplate);
	}
////// end of named args stuff

	private LostAndFound lostAndFound; // line 3, japidviews/AdminController/lostAndFound.html
	public cn.bran.japid.template.RenderResult render(LostAndFound lostAndFound) {
		this.lostAndFound = lostAndFound;
		try {super.layout();} catch (RuntimeException __e) { super.handleException(__e);} // line 3, japidviews/AdminController/lostAndFound.html
		return getRenderResult();
	}

	public static cn.bran.japid.template.RenderResult apply(LostAndFound lostAndFound) {
		return new lostAndFound().render(lostAndFound);
	}

	@Override protected void doLayout() {
		beginDoLayout(sourceTemplate);
;// line 1, lostAndFound.html
// line 5, lostAndFound.html
// line 6, lostAndFound.html
		p("<div class=\"navbar-inner\">\n" + 
"</div>\n" + 
"<div class=\"container\">\n" + 
"	<!-- 左菜单 -->\n" + 
"	");// line 15, lostAndFound.html
		new leftMenusTag(lostAndFound.this).render(); // line 20, lostAndFound.html// line 20, lostAndFound.html
		p("	<!-- 主内容 -->\n" + 
"	<div class=\"content\">\n" + 
"	<form action=\"");// line 20, lostAndFound.html
		p(lookup("AdminController.publishLostAndFound", new Object[]{}));// line 23, lostAndFound.html
		p("\" method=\"post\">\n" + 
"	<input type=\"hidden\" name=\"announcementsId\" value=\"");// line 23, lostAndFound.html
		p(lostAndFound==null?"":lostAndFound.id);// line 24, lostAndFound.html
		p("\">\n" + 
"	<div  id=\"J_pbox_form_box\">\n" + 
"	<h3 class=\"title\" date=\"\">失物招领-发布</h3>\n" + 
"            <div class=\"portlet-box-body\">\n" + 
"                <div class=\"pbox-form-list\">\n" + 
"                    <ul>\n" + 
"                    	<li>\n" + 
"                           <label>标题：</label>\n" + 
"                           <div class=\"pbox-controls\">\n" + 
"                               <input name=\"title\" type=\"text\" class=\"defaultInput goodName Tyz\" tyzn=\"1\" value=\"");// line 24, lostAndFound.html
		p(lostAndFound==null?"":lostAndFound.title);// line 33, lostAndFound.html
		p("\">\n" + 
"                           </div>\n" + 
"                        </li>\n" + 
"                        <li>\n" + 
"                           <label>发布时间：</label>\n" + 
"                           <div class=\"pbox-controls\">\n" + 
"                               <input class=\"Tyz\" tyzn=\"1\" name=\"startTime\" type=\"text\" id=\"dateStart\" value=\"");// line 33, lostAndFound.html
		p(lostAndFound==null?"":lostAndFound.startTime);// line 39, lostAndFound.html
		p("\">\n" + 
"                           </div>\n" + 
"                        </li>\n" + 
"                        <li>\n" + 
"                            <label>详情介绍：</label>\n" + 
"                            <div class=\"pbox-controls\">\n" + 
"                            	<textarea id=\"descrArea\" name=\"contents\" style=\"height:500px;width:700px\" class=\"Tyz\" tyzn=\"1\" value=\"");// line 39, lostAndFound.html
		p(lostAndFound==null?"":lostAndFound.contents);// line 45, lostAndFound.html
		p("\"></textarea>\n" + 
"                            </div>\n" + 
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
"</div>\n");// line 45, lostAndFound.html
		
		endDoLayout(sourceTemplate);
	}

	@Override protected void moreJSLink() {
		// line 6, lostAndFound.html
		p("<script type=\"text/javascript\" src=\"");// line 6, lostAndFound.html
		p(lookupStatic("/public/frontEnd/js/swfupload/swfupload/swfupload.js"));// line 7, lostAndFound.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\" src=\"");// line 7, lostAndFound.html
		p(lookupStatic("/public/frontEnd/js/swfupload/js/swfupload.queue.js"));// line 8, lostAndFound.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\" src=\"");// line 8, lostAndFound.html
		p(lookupStatic("/public/frontEnd/js/swfupload/js/fileprogress.js"));// line 9, lostAndFound.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\" src=\"");// line 9, lostAndFound.html
		p(lookupStatic("/public/frontEnd/js/swfupload/js/handlers.js"));// line 10, lostAndFound.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\" src=\"");// line 10, lostAndFound.html
		p(lookupStatic("/public/js/ueditor/ueditor.config.js"));// line 11, lostAndFound.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\" src=\"");// line 11, lostAndFound.html
		p(lookupStatic("/public/js/ueditor/ueditor.all.js"));// line 12, lostAndFound.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\">\n" + 
"</script>\n");// line 12, lostAndFound.html
		;
	}
	@Override protected void title() {
		// line 5, lostAndFound.html
		p("后台管理");// line 5, lostAndFound.html
		;
	}
}