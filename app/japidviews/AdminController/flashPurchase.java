//version: 0.9.5.1
package japidviews.AdminController;
import java.util.*;
import java.io.*;
import cn.bran.japid.tags.Each;
import japidviews.AdminController.leftMenusTag;
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

	private Announcements announcements; // line 2, japidviews/AdminController/flashPurchase.html
	public cn.bran.japid.template.RenderResult render(Announcements announcements) {
		this.announcements = announcements;
		try {super.layout();} catch (RuntimeException __e) { super.handleException(__e);} // line 2, japidviews/AdminController/flashPurchase.html
		return getRenderResult();
	}

	public static cn.bran.japid.template.RenderResult apply(Announcements announcements) {
		return new flashPurchase().render(announcements);
	}

	@Override protected void doLayout() {
		beginDoLayout(sourceTemplate);
;// line 1, flashPurchase.html
// line 4, flashPurchase.html
// line 5, flashPurchase.html
		p("<div class=\"navbar-inner\">\n" + 
"</div>\n" + 
"<div class=\"container\">\n" + 
"	<!-- 左菜单 -->\n" + 
"	");// line 69, flashPurchase.html
		new leftMenusTag(flashPurchase.this).render(); // line 74, flashPurchase.html// line 74, flashPurchase.html
		p("	<!-- 主内容 -->\n" + 
"	<div class=\"content\">\n" + 
"	<form action=\"");// line 74, flashPurchase.html
		p(lookup("AdminController.publishAnnouncements", new Object[]{}));// line 77, flashPurchase.html
		p("\" method=\"post\">\n" + 
"	<div  id=\"J_pbox_form_box\">\n" + 
"	<h3 class=\"title\" date=\"\">发布闪购商品</h3>\n" + 
"            <div class=\"portlet-box-body\">\n" + 
"                <div class=\"pbox-form-list\">\n" + 
"                    <ul>\n" + 
"                        <li>\n" + 
"                           <label>闪购时间：</label>\n" + 
"                           <div class=\"pbox-controls\">\n" + 
"                               <input class=\"Tyz\" tyzn=\"1\" name=\"dateStart_day\" type=\"text\" id=\"dateStart\">\n" + 
"                               <span class=\"text-inline\">到</span>\n" + 
"                               <input class=\"Tyz\" tyzn=\"1\" name=\"dateEnd_day\" type=\"text\" id=\"dateEnd\">\n" + 
"                           </div>\n" + 
"                        </li>\n" + 
"                        <li>\n" + 
"                           <label>商品名称：</label>\n" + 
"                           <div class=\"pbox-controls\">\n" + 
"                               <input name=\"goodName\" type=\"text\" class=\"defaultInput goodName Tyz\" tyzn=\"1\">\n" + 
"                           </div>\n" + 
"                        </li>\n" + 
"                        <li>\n" + 
"                           <label>商品编号：</label>\n" + 
"                           <div class=\"pbox-controls\">\n" + 
"                               <input name=\"goodNumber\" type=\"text\" class=\"defaultInput goodNumber Tyz\" tyzn=\"1\">\n" + 
"                           </div>\n" + 
"                        </li>\n" + 
"                        <li>\n" + 
"                           <label>商品分类：</label>\n" + 
"                           <div class=\"pbox-controls\">\n" + 
"                               <input name=\"goodType\" type=\"text\" class=\"defaultInput goodType Tyz\" tyzn=\"1\" >\n" + 
"                           </div>\n" + 
"                        </li>\n" + 
"                        <li class=\"clr\">\n" + 
"                           <label>原价：</label>\n" + 
"                           <input name=\"goodPrice\" type=\"number\" class=\"defaultInput sm2 pbox-c-input price Tyz\" tyzn=\"1\" >\n" + 
"                           <label class=\"m-l--20px\">闪购价：</label>\n" + 
"                           <input name=\"realPrice\" type=\"number\" class=\"defaultInput sm2 pbox-c-input hotPrice Tyz\" tyzn=\"1\">\n" + 
"                        </li>\n" + 
"                        <li class=\"clr\">\n" + 
"                           <label>每人限购：</label>\n" + 
"                           <input name=\"limitNumber\" type=\"number\" class=\"defaultInput sm2 pbox-c-input price Tyz\" tyzn=\"1\" >\n" + 
"                        </li>\n" + 
"                        <li>\n" + 
"                            <label>数量：</label>\n" + 
"                            <div class=\"pbox-controls\">\n" + 
"                                <input name=\"goodNum\" type=\"number\" class=\"defaultInput sm2 goodNum Tyz\" tyzn=\"1\" >\n" + 
"                            </div>\n" + 
"                        </li>\n" + 
"                        <li>\n" + 
"                            <label>详情介绍：</label>\n" + 
"                            <div class=\"pbox-controls\">\n" + 
"                                <textarea id=\"descrArea\" name=\"goodContent\" style=\"height:200px;\" class=\"Tyz\" tyzn=\"1\"></textarea>\n" + 
"                            </div>\n" + 
"                        </li>\n" + 
"                    </ul>\n" + 
"                    <div class=\"pbox-controls\">\n" + 
"                        <input type=\"submit\" value=\"确定\" class=\"defaultBtn submit flashpurchase TyzAutoYz\" tyzroomid=\"J_pbox_form_box\"/>\n" + 
"                    </div>\n" + 
"                </div>\n" + 
"            </div>\n" + 
"            </div>\n" + 
"            </form>\n" + 
"        </div>\n" + 
"        <!-- h20 -->\n" + 
"        <div class=\"h20\"></div>\n" + 
"</div>\n");// line 77, flashPurchase.html
		
		endDoLayout(sourceTemplate);
	}

	@Override protected void moreJSLink() {
		// line 5, flashPurchase.html
		p("<script type=\"text/javascript\" src=\"");// line 5, flashPurchase.html
		p(lookupStatic("/public/frontEnd/js/swfupload/swfupload/swfupload.js"));// line 6, flashPurchase.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\" src=\"");// line 6, flashPurchase.html
		p(lookupStatic("/public/frontEnd/js/swfupload/js/swfupload.queue.js"));// line 7, flashPurchase.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\" src=\"");// line 7, flashPurchase.html
		p(lookupStatic("/public/frontEnd/js/swfupload/js/fileprogress.js"));// line 8, flashPurchase.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\" src=\"");// line 8, flashPurchase.html
		p(lookupStatic("/public/frontEnd/js/swfupload/js/handlers.js"));// line 9, flashPurchase.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\" src=\"");// line 9, flashPurchase.html
		p(lookupStatic("/public/js/ueditor/ueditor.config.js"));// line 10, flashPurchase.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\" src=\"");// line 10, flashPurchase.html
		p(lookupStatic("/public/js/ueditor/ueditor.all.min.js"));// line 11, flashPurchase.html
		p("\"></script>\n" + 
"<script type=\"text/javascript\">\n" + 
"var swfu;\n" + 
"window.onload = function() {\n" + 
"	var settings = {\n" + 
"		flash_url : \"/public/frontEnd/js/swfupload/swfupload/swfupload.swf\",\n" + 
"		upload_url: \"http://121.40.83.194/pic/form\",\n" + 
"		post_params: {\n" + 
"			\"bucketName\" : \"ningboGo\",\n" + 
"			\"source\" : \"web\"\n" + 
"		},\n" + 
"		file_post_name : \"qqfile\",\n" + 
"		file_size_limit : \"100 MB\",\n" + 
"		file_types : \"*.*\",\n" + 
"		file_types_description : \"All Files\",\n" + 
"		file_upload_limit : 100,\n" + 
"		file_queue_limit : 0,\n" + 
"		custom_settings : {\n" + 
"			progressTarget : \"fsUploadProgress\",\n" + 
"			cancelButtonId : \"btnCancel\"\n" + 
"		},\n" + 
"		debug: false,\n" + 
"\n" + 
"		// Button settings\n" + 
"		button_image_url: \"../public/img/swfupload_bg.png\",	// Relative to the Flash file\n" + 
"		button_width: \"112\",\n" + 
"		button_height: \"35\",\n" + 
"		button_placeholder_id: \"spanButtonPlaceHolder\",\n" + 
"		button_text: '',\n" + 
"		button_text_style: \".theFont { font-size: 16; }\",\n" + 
"		button_text_left_padding: 12,\n" + 
"		button_text_top_padding: 3,\n" + 
"		button_action : SWFUpload.BUTTON_ACTION.SELECT_FILE, //一次选择一个文件\n" + 
"		\n" + 
"		// The event handler functions are defined in handlers.js\n" + 
"		file_queued_handler : fileQueued,\n" + 
"		file_queue_error_handler : fileQueueError,\n" + 
"		file_dialog_complete_handler : fileDialogComplete,\n" + 
"		upload_start_handler : uploadStart,\n" + 
"		upload_progress_handler : uploadProgress,\n" + 
"		upload_error_handler : uploadError,\n" + 
"		upload_success_handler : uploadSuccess,\n" + 
"		upload_complete_handler : uploadComplete,\n" + 
"		queue_complete_handler : queueComplete	// Queue plugin event\n" + 
"	};\n" + 
"	swfu = new SWFUpload(settings);\n" + 
" };\n" + 
" var del = function (node) {   \n" + 
"        node.dblclick(function(){\n" + 
"        	ele=$(this);\n" + 
"        	ele.next().remove();\n" + 
"        	ele.remove();\n" + 
"        })      \n" + 
"    }   \n" + 
"del($(\"#image_show_box\").children());\n" + 
"main.setSidebarHover(\"index\");\n" + 
"var ue = UE.getEditor('descrArea');\n" + 
"</script>\n");// line 11, flashPurchase.html
		;
	}
	@Override protected void title() {
		// line 4, flashPurchase.html
		p("后台管理");// line 4, flashPurchase.html
		;
	}
}