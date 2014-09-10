//滚动加载
var $lazyLoading = function(elements, options) {
	var defaults = {
		attr: "data-url",
		container: window //滚动容器
	};
	var params = $extend(defaults, options || {});
	params.cache = [];
	if (params.container !== window && !$isEle(params.container)) {
		params.container = window;
	}
	if ($isEle(elements)) {
		elements = [elements];	
	}
	if ($isArr(elements)) {
		elements.each(function(ele) {
			var node = ele.get("tag"), url = ele.attr(params["attr"]);
			if (!url) { return; }
			//重组
			var data = {
				obj: ele,
				tag: node,
				url: url
			};
			params.cache.push(data);
		});	
	}
	//动态显示数据
	var loading = function() {
		var st = params.container.getScroll().y, sth = st + params.container.getHeight();
		params.cache.each(function(data) {
			var o = data.obj, tag = data.tag, url = data.url, post, posb;
			if (o) {
				if (params.container === window) {
					post = o.getPosition().y;
				} else {
					post = o.getPosition(params.container).y;
				}
				posb = post + o.h();
				if ((post > st && post < sth) || (posb > st && posb < sth)) {
					//在浏览器窗口内
					if (tag === "img") {
						//图片，改变src
						o.attr("src", url);	
					} else {
						o.load(url);
					}	
					data.obj = null;		
				}
			}
		});		
		return false;	
	};
	
	//事件触发
	//加载完毕即执行
	loading();
	//滚动执行
	params.container.addEvent("scroll", loading);
};