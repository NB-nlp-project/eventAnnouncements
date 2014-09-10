var main = {
	init : function(){ //初始化

		//添加最小高度
		var h = $(window).height();
		$("#sidebar, #content").css("min-height",h-62);

		//sidebar 显示隐藏事件
		$("#sidebar").on("click",".title",function(){
			var _this = $(this),
				_item = _this.parents(".item");
			if(_item.hasClass("open")){
				_item.removeClass("open");
			}else{
				_item.addClass("open");
			}
		});
	},
	setSidebarHover : function(name){
		var sidebar = $(".sidebar");
		sidebar.find("li, .item").removeClass("active");
		sidebar.find("li>a[name='"+name+"']").addClass("active").parents(".item").addClass("active");
		sidebar.find("li>a[name='"+name+"']").addClass("active").parents(".item").append("<span class='selected'></span>");
	}
};

$(function(){
	//公共初始化
	main.init();
	$(window).resize(function(){ main.init(); });
	main.setSidebarHover("index");
});














































