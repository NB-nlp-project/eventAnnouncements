//列表元素平滑切换脚本
var $smoothSlide = function(container, elements, options) {
	if (!container || !elements)  { return; }
	var defaults = {
		direct: "left", //其他可选值为"top", "right", "bottom"
		duration: "normal",
		index: 0, //当前第一个列表索引值
		visible: 1, //当前显示的列表个数
		loop: 1, //每次移动的数目
		name: "slide", //产生两个,
		autoTime: 0, //自动播放时间
		prev: null,
		next: null,
		prevCall: $empty,
		nextCall: $empty
	};
	var params = $extend(defaults, options || {});
	var posHash = new Hash(), initPos = 0;
	
	elements = $splat(elements); //数组化
	params.length = elements.length;
	
	if (params.length < params.visible) { return; }
	
	elements.each(function(list, index) {
		posHash[index] = -1 * initPos;
		if (params.direct === "left" || params.direct === "right") {
			initPos += list.w();
		} else if (params.direct === "top" || params.direct === "bottom") {
			initPos += list.h();
		}
	});
	
	
	container.set("tween",  { duration: params.duration }).css(params.direct, posHash[params.index]);
	var funTween = function(position) {
		container.tween(params.direct, position);
	};
	
	var funFadeIn = function(ele){
		ele.css("opacity","100").css("filter","alpha(opacity=100)").css("z-index","20");
	}
	var funFadeOut = function(ele){
		ele.css("opacity","0").css("filter","alpha(opacity=0)").css("z-index","-20");
	}
	
	var funBtnState = function() {
		var prevClass = params.name + "_prev_disable", nextClass = params.name + "_next_disable";
		if (params.prev) {
			if (params.index <= 0) {
				params.prev.addClass(prevClass).store("disable", true);
				params.index = 0;
				funFadeOut(params.prev);
			} else {
				params.prev.removeClass(prevClass).store("disable", false);
				funFadeIn(params.prev);
			}
		}
		if (params.next) {
			if (params.index >= (params.length - params.visible)) {
				params.next.addClass(nextClass).store("disable", true);
				params.index = params.length - params.visible;
				funFadeOut(params.next);
			} else {
				params.next.removeClass(nextClass).store("disable", false);
				funFadeIn(params.next);
			}
		}
	};
	
	//前后按钮状态初始化
	funBtnState();
	
	//事件绑定
	if (params.prev) {
		params.prev.addEvent("click", function() {
			if (!this.retrieve("disable")) {
				params.index -= params.loop;
				funBtnState();
				funTween(posHash[params.index]);
				if ($isFun(params.prevCall)) {
					params.prevCall.call(this, container);
				}
			}
			return false;
		});	
	}
	if (params.next) {
		params.next.addEvent("click", function() {
			if (!this.retrieve("disable")) {
				params.index += params.loop;
				funBtnState();
				funTween(posHash[params.index]);
				if ($isFun(params.nextCall)) {
					params.nextCall.call(this, container);
				}
			}
			return false;
		});	
	}
	
	//自动播放
	if (params.autoTime.toInt() > 0) {
		var currentTarget = params.next;
		setInterval(function() {
			currentTarget.fireEvent("click");
			if (currentTarget.retrieve("disable")) {
				if (currentTarget == params.next) {
					currentTarget = params.prev;
				} else {
					currentTarget = params.next;
				}
			}
		}, params.autoTime);
	}
};