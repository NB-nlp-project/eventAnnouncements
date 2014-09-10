//类似更多隐藏显示切换
var $visibleToggle = function(elements, options) {
	var defaults = {
		attribute: "rel",
		eventType: "click",
		property: "position",
		display: false,
		showCall: $empty,
		hideCall: $empty	
	};
	var s = $extend(defaults, options ||{}), target;
	if ($isEle(elements)) {
		elements = [elements];	
	}
	if ($isArr(elements)) {
		elements.each(function(items) {
			items.store("display", s.display).addEvent(s.eventType, function() {
				var target = $(this.attr(s.attribute)) || $$("." + this.attr(s.attribute));
				if (this.retrieve("display")) {
					//显示，则隐藏
					if (s.property === "position") {
						target.out();
					} else if (s.property === "display") {
						target.hide();
					} else if (s.property === "visibility") {
						target.invisible();
					}
					items.store("display", false);
					if ($isFun(s.hideCall)) {
						s.hideCall.call(this);	
					}
				} else {
					if (s.property === "position") {
						target.into();
					} else if (s.property === "display") {
						target.show();
					} else if (s.property === "visibility") {
						target.visible();
					}
					items.store("display", true);
					if ($isFun(s.showCall)) {
						s.showCall.call(this);
					}
				}
				if (this.get("tag") === "a") {
					return false;
				}
			});	
		});
	}
};