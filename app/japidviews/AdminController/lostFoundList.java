//version: 0.9.5.1
package japidviews.AdminController;
import java.util.*;
import java.io.*;
import cn.bran.japid.tags.Each;
import models.Announcements;
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
// NOTE: This file was generated from: japidviews/AdminController/lostFoundList.html
// Change to this file will be lost next time the template file is compiled.
//
@cn.bran.play.NoEnhance
public class lostFoundList extends backStageLayout
{
	public static final String sourceTemplate = "japidviews/AdminController/lostFoundList.html";
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


	public lostFoundList() {
	super((StringBuilder)null);
	initHeaders();
	}
	public lostFoundList(StringBuilder out) {
		super(out);
		initHeaders();
	}
	public lostFoundList(cn.bran.japid.template.JapidTemplateBaseWithoutPlay caller) {
		super(caller);
	}

/* based on https://github.com/branaway/Japid/issues/12
 */
	public static final String[] argNames = new String[] {/* args of the template*/"announcementList", "currentPage", "totalPage",  };
	public static final String[] argTypes = new String[] {/* arg types of the template*/"List<Announcements>", "int", "int",  };
	public static final Object[] argDefaults= new Object[] {null,null,null, };
	public static java.lang.reflect.Method renderMethod = getRenderMethod(japidviews.AdminController.lostFoundList.class);

	{
		setRenderMethod(renderMethod);
		setArgNames(argNames);
		setArgTypes(argTypes);
		setArgDefaults(argDefaults);
		setSourceTemplate(sourceTemplate);
	}
////// end of named args stuff

	private List<Announcements> announcementList; // line 3, japidviews/AdminController/lostFoundList.html
	private int currentPage; // line 3, japidviews/AdminController/lostFoundList.html
	private int totalPage; // line 3, japidviews/AdminController/lostFoundList.html
	public cn.bran.japid.template.RenderResult render(List<Announcements> announcementList,int currentPage,int totalPage) {
		this.announcementList = announcementList;
		this.currentPage = currentPage;
		this.totalPage = totalPage;
		try {super.layout();} catch (RuntimeException __e) { super.handleException(__e);} // line 3, japidviews/AdminController/lostFoundList.html
		return getRenderResult();
	}

	public static cn.bran.japid.template.RenderResult apply(List<Announcements> announcementList,int currentPage,int totalPage) {
		return new lostFoundList().render(announcementList, currentPage, totalPage);
	}

	@Override protected void doLayout() {
		beginDoLayout(sourceTemplate);
;// line 1, japidviews\AdminController\lostFoundList.html
// line 6, japidviews\AdminController\lostFoundList.html
// line 7, japidviews\AdminController\lostFoundList.html
		p("<div class=\"navbar-inner\">\n" + 
"</div>\n" + 
"<div class=\"container\">\n" + 
"	<!-- 左菜单 -->\n" + 
"	");// line 11, japidviews\AdminController\lostFoundList.html
		new leftMenusTag(lostFoundList.this).render(); // line 16, japidviews\AdminController\lostFoundList.html// line 16, japidviews\AdminController\lostFoundList.html
		p("    	<!-- 主内容 -->\n" + 
"		  <div class=\"content\" id=\"content\">\n" + 
"            <!-- 标题 -->\n" + 
"            <h3 class=\"title add-commodity-title\">闪购商品列表</h3>\n" + 
"			");// line 16, japidviews\AdminController\lostFoundList.html
		p("            <!-- table -->\n" + 
"            <table class=\"table\">\n" + 
"                <tr>\n" + 
"                    <th>活动名称</th>\n" + 
"                    <th>开始时间</th>\n" + 
"                    <th>结束时间</th>\n" + 
"                    <th class=\"handle-w1\">操作</th>\n" + 
"                </tr>\n" + 
"                ");// line 24, japidviews\AdminController\lostFoundList.html
		if(!announcementList.isEmpty()){// line 33, japidviews\AdminController\lostFoundList.html
                for(Announcements announcements :announcementList){// line 34, japidviews\AdminController\lostFoundList.html
		p("                	<tr>\n" + 
"                    <td>");// line 34, japidviews\AdminController\lostFoundList.html
		p(announcements.title);// line 36, japidviews\AdminController\lostFoundList.html
		p("</td>\n" + 
"                    <td>");// line 36, japidviews\AdminController\lostFoundList.html
		p(announcements.startTime);// line 37, japidviews\AdminController\lostFoundList.html
		p("</td>\n" + 
"                    <td>");// line 37, japidviews\AdminController\lostFoundList.html
		p(announcements.endTime);// line 38, japidviews\AdminController\lostFoundList.html
		p("</td>\n" + 
"                    <td>\n" + 
"                    	<a id=\"preview\" href=\"");// line 38, japidviews\AdminController\lostFoundList.html
		p(lookup("AdminController.preview", announcements.id));// line 40, japidviews\AdminController\lostFoundList.html
		p("\" class=\"defaultBtn btn-sm btn-green\">预览</a>\n" + 
"                        <a id=\"del\" href=\"");// line 40, japidviews\AdminController\lostFoundList.html
		p(lookup("AdminController.deleteFastGood", announcements.id));// line 41, japidviews\AdminController\lostFoundList.html
		p("\" class=\"defaultBtn btn-sm btn-red\">删除</a>\n" + 
"                    </td>\n" + 
"                </tr>\n" + 
"                ");// line 41, japidviews\AdminController\lostFoundList.html
		}// line 44, japidviews\AdminController\lostFoundList.html
                }// line 45, japidviews\AdminController\lostFoundList.html
		p("            </table>\n" + 
"            ");// line 45, japidviews\AdminController\lostFoundList.html
		new pagination(lostFoundList.this).render(getUrl(),"page",currentPage,totalPage,null); // line 47, japidviews\AdminController\lostFoundList.html// line 47, japidviews\AdminController\lostFoundList.html
            // line 48, japidviews\AdminController\lostFoundList.html
		p("            <!-- h20 -->\n" + 
"            <div class=\"h20\"></div>\n" + 
"		</div>\n" + 
"\n" + 
"    </div>\n" + 
"</body>\n" + 
"</html>");// line 50, japidviews\AdminController\lostFoundList.html
		
		endDoLayout(sourceTemplate);
	}

	@Override protected void moreJSLink() {
		// line 7, japidviews\AdminController\lostFoundList.html
		p("<script>\n" + 
"    main.setSidebarHover(\"index\");\n" + 
"</script>\n");// line 7, japidviews\AdminController\lostFoundList.html
		;
	}
	@Override protected void title() {
		// line 6, japidviews\AdminController\lostFoundList.html
		p("后台管理-闪购商品列表");// line 6, japidviews\AdminController\lostFoundList.html
		;
	}
public String getUrl() {
StringBuilder sb = new StringBuilder();
StringBuilder ori = getOut();
this.setOut(sb);
TreeMap<Integer, cn.bran.japid.template.ActionRunner> parentActionRunners = actionRunners;
actionRunners = new TreeMap<Integer, cn.bran.japid.template.ActionRunner>();
// line 48, japidviews\AdminController\lostFoundList.html
		p("            	");// line 48, japidviews\AdminController\lostFoundList.html
		p(lookup("AdminController.flashPurchaseList", new Object[]{}));// line 49, japidviews\AdminController\lostFoundList.html
		p("            ");// line 49, japidviews\AdminController\lostFoundList.html
		
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