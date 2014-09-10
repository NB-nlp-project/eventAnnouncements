//version: 0.9.5.1
package japidviews._tags;
import java.util.*;
import java.io.*;
import cn.bran.japid.tags.Each;
import org.apache.commons.lang.StringUtils;
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
// NOTE: This file was generated from: japidviews/_tags/pagination.html
// Change to this file will be lost next time the template file is compiled.
//
@cn.bran.play.NoEnhance
public class pagination extends cn.bran.play.JapidTemplateBase
{
	public static final String sourceTemplate = "japidviews/_tags/pagination.html";
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


	public pagination() {
	super((StringBuilder)null);
	initHeaders();
	}
	public pagination(StringBuilder out) {
		super(out);
		initHeaders();
	}
	public pagination(cn.bran.japid.template.JapidTemplateBaseWithoutPlay caller) {
		super(caller);
	}

/* based on https://github.com/branaway/Japid/issues/12
 */
	public static final String[] argNames = new String[] {/* args of the template*/"url", "argName", "currentPage", "totalPage", "additionalClass",  };
	public static final String[] argTypes = new String[] {/* arg types of the template*/"String", "String", "int", "int", "String",  };
	public static final Object[] argDefaults= new Object[] {null,null,null,null,null, };
	public static java.lang.reflect.Method renderMethod = getRenderMethod(japidviews._tags.pagination.class);

	{
		setRenderMethod(renderMethod);
		setArgNames(argNames);
		setArgTypes(argTypes);
		setArgDefaults(argDefaults);
		setSourceTemplate(sourceTemplate);
	}
////// end of named args stuff

	private String url; // line 2, japidviews/_tags/pagination.html
	private String argName; // line 2, japidviews/_tags/pagination.html
	private int currentPage; // line 2, japidviews/_tags/pagination.html
	private int totalPage; // line 2, japidviews/_tags/pagination.html
	private String additionalClass; // line 2, japidviews/_tags/pagination.html
	public cn.bran.japid.template.RenderResult render(String url,String argName,int currentPage,int totalPage,String additionalClass) {
		this.url = url;
		this.argName = argName;
		this.currentPage = currentPage;
		this.totalPage = totalPage;
		this.additionalClass = additionalClass;
		try {super.layout();} catch (RuntimeException __e) { super.handleException(__e);} // line 2, japidviews/_tags/pagination.html
		return getRenderResult();
	}

	public static cn.bran.japid.template.RenderResult apply(String url,String argName,int currentPage,int totalPage,String additionalClass) {
		return new pagination().render(url, argName, currentPage, totalPage, additionalClass);
	}

	@Override protected void doLayout() {
		beginDoLayout(sourceTemplate);
;// line 1, pagination.html
		;// line 1, pagination.html
		p("<div class=\"paging");// line 2, pagination.html
		p(StringUtils.isNotBlank(additionalClass)?(" "+additionalClass):"");// line 3, pagination.html
		p("\">\n" + 
"    <a class=\"");// line 3, pagination.html
		p(currentPage==1?"page_end":"page_off");// line 4, pagination.html
		p("\" href=\"");// line 4, pagination.html
		p(currentPage==1?"#":getUrl(1));// line 4, pagination.html
		p("\">首页</a>\n" + 
"    <a class=\"");// line 4, pagination.html
		p(currentPage==1?"page_end":"page_off");// line 5, pagination.html
		p("\" href=\"");// line 5, pagination.html
		p(currentPage==1?"#":getUrl(currentPage>1?(currentPage-1):1));// line 5, pagination.html
		p("\">< 上一页</a>\n" + 
"    ");// line 5, pagination.html
		int startPage=currentPage/6*6+1;// line 6, pagination.html
    for(int i=0;i<(totalPage>6?6:totalPage);i++){// line 7, pagination.html
    	int page=startPage+i;// line 8, pagination.html
		p("    	<a class=\"");// line 8, pagination.html
		p(currentPage==page?"page_on":"page_off");// line 9, pagination.html
		p("\" href=\"");// line 9, pagination.html
		p(getUrl(page));// line 9, pagination.html
		p("\">");// line 9, pagination.html
		p(page);// line 9, pagination.html
		p("</a>\n" + 
"    ");// line 9, pagination.html
		}// line 10, pagination.html
		p("    <a class=\"");// line 10, pagination.html
		p(currentPage==totalPage?"page_end":"page_off");// line 11, pagination.html
		p("\" href=\"");// line 11, pagination.html
		p(currentPage==1?"#":getUrl(currentPage<totalPage?(currentPage+1):totalPage));// line 11, pagination.html
		p("\">下一页 ></a>\n" + 
"    <a class=\"");// line 11, pagination.html
		p(currentPage==totalPage?"page_end":"page_off");// line 12, pagination.html
		p("\" href=\"");// line 12, pagination.html
		p(currentPage==1?"#":getUrl(totalPage));// line 12, pagination.html
		p("\">尾页</a>\n" + 
"</div>\n");// line 12, pagination.html
		// line 14, pagination.html
		;// line 16, pagination.html
		
		endDoLayout(sourceTemplate);
	}

public String getUrl(int page) {
StringBuilder sb = new StringBuilder();
StringBuilder ori = getOut();
this.setOut(sb);
TreeMap<Integer, cn.bran.japid.template.ActionRunner> parentActionRunners = actionRunners;
actionRunners = new TreeMap<Integer, cn.bran.japid.template.ActionRunner>();
// line 14, pagination.html
		p("");// line 14, pagination.html
		p(url.trim()+(url.contains("?")?"&":"?")+argName+"="+page);// line 15, pagination.html
		p("");// line 15, pagination.html
		
this.setOut(ori);
if (actionRunners.size() > 0) {
	StringBuilder _sb2 = new StringBuilder();
	int segStart = 0;
	for (Map.Entry<Integer, cn.bran.japid.template.ActionRunner> _arEntry : actionRunners.entrySet()) {
		int pos = _arEntry.getKey();
		_sb2.append(sb.substring(segStart, pos));
		segStart = pos;
		cn.bran.japid.template.ActionRunner _a_ = _arEntry.getValue();
		_sb2.append(_a_.run().getContent().toString());
	}
	_sb2.append(sb.substring(segStart));
	actionRunners = parentActionRunners;
	return _sb2.toString();
} else {
	actionRunners = parentActionRunners;
	return sb.toString();
}
}
}