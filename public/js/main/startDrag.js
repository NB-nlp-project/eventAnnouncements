//元素拖拽
var $startDrag = function(bar, target) {
	var params = {
		left: 0,
		top: 0,
		currentX: 0,
		currentY: 0,
		flag: false
	};
	//o是移动对象
	bar.addEvent("mousedown", function(e) {
		params.flag = true;
		params.left = target.getPosition().x;
		params.top = target.getPosition().y;
		params.currentX = e.page.x;
		params.currentY = e.page.y;
	});
	bar.onselectstart = function() {
		return false;
	};
	document.addEvents({
		mouseup: function() {
			params.flag = false;
		},
		mousemove: function(e) {
			if(params.flag){
				var nowX = e.page.x, nowY = e.page.y;
				var disX = nowX - params.currentX, disY = nowY - params.currentY;
				target.css({
					left: params.left + disX,
					top: params.top + disY
				});
			}
		}
	});
};