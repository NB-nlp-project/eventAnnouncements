//version: 0.9.5.1
package japidviews._tags;
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
// NOTE: This file was generated from: japidviews/_tags/editorTag.html
// Change to this file will be lost next time the template file is compiled.
//
@cn.bran.play.NoEnhance
public class editorTag extends cn.bran.play.JapidTemplateBase
{
	public static final String sourceTemplate = "japidviews/_tags/editorTag.html";
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


	public editorTag() {
	super((StringBuilder)null);
	initHeaders();
	}
	public editorTag(StringBuilder out) {
		super(out);
		initHeaders();
	}
	public editorTag(cn.bran.japid.template.JapidTemplateBaseWithoutPlay caller) {
		super(caller);
	}

/* based on https://github.com/branaway/Japid/issues/12
 */
	public static final String[] argNames = new String[] {/* args of the template*/"announcements",  };
	public static final String[] argTypes = new String[] {/* arg types of the template*/"Announcements",  };
	public static final Object[] argDefaults= new Object[] {null, };
	public static java.lang.reflect.Method renderMethod = getRenderMethod(japidviews._tags.editorTag.class);

	{
		setRenderMethod(renderMethod);
		setArgNames(argNames);
		setArgTypes(argTypes);
		setArgDefaults(argDefaults);
		setSourceTemplate(sourceTemplate);
	}
////// end of named args stuff

	private Announcements announcements; // line 1, japidviews/_tags/editorTag.html
	public cn.bran.japid.template.RenderResult render(Announcements announcements) {
		this.announcements = announcements;
		try {super.layout();} catch (RuntimeException __e) { super.handleException(__e);} // line 1, japidviews/_tags/editorTag.html
		return getRenderResult();
	}

	public static cn.bran.japid.template.RenderResult apply(Announcements announcements) {
		return new editorTag().render(announcements);
	}

	@Override protected void doLayout() {
		beginDoLayout(sourceTemplate);
;// line 1, editorTag.html
		p(" \n" + 
"<textarea id=\"descrArea\" name=\"contents\" style=\"height:500px;width:700px\" class=\"Tyz\" tyzn=\"1\" value=\"");// line 1, editorTag.html
		p(announcements==null?"":announcements.contents);// line 3, editorTag.html
		p("\"></textarea>");// line 3, editorTag.html
		
		endDoLayout(sourceTemplate);
	}

}