//version: 0.9.5.1
package japidviews._layouts;
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
// NOTE: This file was generated from: japidviews/_layouts/backStageLayout.html
// Change to this file will be lost next time the template file is compiled.
//
@cn.bran.play.NoEnhance
public abstract class backStageLayout extends cn.bran.play.JapidTemplateBase
{
	public static final String sourceTemplate = "japidviews/_layouts/backStageLayout.html";
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


	public backStageLayout() {
	super((StringBuilder)null);
	initHeaders();
	}
	public backStageLayout(StringBuilder out) {
		super(out);
		initHeaders();
	}
	public backStageLayout(cn.bran.japid.template.JapidTemplateBaseWithoutPlay caller) {
		super(caller);
	}

	@Override public void layout() {
		beginDoLayout(sourceTemplate);
p("<!doctype html>\n" + 
"<html>\n" + 
"<head>\n" + 
"<meta charset=\"utf-8\">\n" + 
"<meta name=\"viewport\" content=\"width=device-width, minimum-scale=1, maximum-scale=1\">\n" + 
"<title>");// line 1, backStageLayout.html
		title();p("</title>\n" + 
"	<link type=\"text/css\" href=\"");// line 6, backStageLayout.html
		p(lookupStatic("/public/backStage/css/main.css"));// line 7, backStageLayout.html
		p("\" rel=\"stylesheet\" />\n" + 
"	<link type=\"text/css\" href=\"");// line 7, backStageLayout.html
		p(lookupStatic("/public/backStage/css/default.css"));// line 8, backStageLayout.html
		p("\" rel=\"stylesheet\" />\n" + 
"	<link href=\"");// line 8, backStageLayout.html
		p(lookupStatic("/public/css/comm.css"));// line 9, backStageLayout.html
		p("\" rel=\"stylesheet\">\n" + 
"	<link href=\"");// line 9, backStageLayout.html
		p(lookupStatic("/public/css/default.css"));// line 10, backStageLayout.html
		p("\" rel=\"stylesheet\">\n" + 
"	");// line 10, backStageLayout.html
		moreCSSLink();p("</head>\n" + 
"<body ");// line 11, backStageLayout.html
		bodyStyle();p(">\n");// line 13, backStageLayout.html
		new headTag(backStageLayout.this).render(); // line 14, backStageLayout.html// line 14, backStageLayout.html
doLayout();// line 15, backStageLayout.html
		p("<script src=\"");// line 15, backStageLayout.html
		p(lookupStatic("/public/backStage/js/jquery-1.9.1.min.js"));// line 16, backStageLayout.html
		p("\"></script>\n" + 
"<script src=\"");// line 16, backStageLayout.html
		p(lookupStatic("/public/frontEnd/js/quo-2.3.6.min.js"));// line 17, backStageLayout.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\" src=\"");// line 17, backStageLayout.html
		p(lookupStatic("/public/js/min/do.js"));// line 18, backStageLayout.html
		p("\" data-cfg-autoload=\"true\"></script>\n" + 
"<script src=\"");// line 18, backStageLayout.html
		p(lookupStatic("/public/backStage/js/default.js"));// line 19, backStageLayout.html
		p("\"></script>\n" + 
"<script src=\"");// line 19, backStageLayout.html
		p(lookupStatic("/public/js/main/zebra_datepicker.js"));// line 20, backStageLayout.html
		p("\"></script>\n" + 
"<script src=\"");// line 20, backStageLayout.html
		p(lookupStatic("/public/js/main/core.js"));// line 21, backStageLayout.html
		p("\"></script>\n" + 
"<script src=\"");// line 21, backStageLayout.html
		p(lookupStatic("/public/js/back_editgood.js"));// line 22, backStageLayout.html
		p("\"></script>\n" + 
"<script src=\"");// line 22, backStageLayout.html
		p(lookupStatic("/public/js/Tyz.js"));// line 23, backStageLayout.html
		p("\"></script>\n" + 
"<script src=\"");// line 23, backStageLayout.html
		p(lookupStatic("/public/js/back_fastbuy.js"));// line 24, backStageLayout.html
		p("\"></script>\n");// line 24, backStageLayout.html
		moreJSLink();p("</body>\n" + 
"</html>");// line 25, backStageLayout.html
		
		endDoLayout(sourceTemplate);
	}

	 protected void moreJSLink() {};
	 protected void moreCSSLink() {};
	 protected void bodyStyle() {};
	 protected void title() {};

	protected abstract void doLayout();
}