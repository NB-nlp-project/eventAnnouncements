//选项卡切换，无动画效果
var $tabSwitch = function(elements, options) {
	var defaults = {
		eventType: "click", //点击事件，还是鼠标经过事件，其他可选参数："hover"
		classAdd: "", //添加的类名
		classRemove: "", //移除的类名
		property: "position",
		targetAttr: "rel", //切换的对象
		timeDelay: 100, //此参数仅当eventType为hover时有效，如果值为自然数，则鼠标经过延迟
		timePlay: 0, //此参数仅当eventType为hover时有效，如果值为自然数，则选项卡内容自动播放
		switchCall: $empty
	};
	var pms = $extend(defaults, options || {}),
		length, timerDelay, timerPlay, timerPlayTrigger,
		numDelayTime = pms.timeDelay.toInt(),
		numPlayTime = pms.timePlay.toInt();
		
	pms.elementCache = null;
	pms.indexCache = -1;
	
	var funSwitch = function(ele, pmsIndex) {
		//params为当前选项卡元素或是索引值
		var cache = pms.elementCache, eleOld, eleNew;
		if (pms.eventType === "hover") {
			if ($isNum(pmsIndex)) {
				pms.indexCache = pmsIndex;
			} else {
				//定时器
				if (numPlayTime > 0) {
					pms.indexCache = (pms.indexCache === length - 1) ? 0: pms.indexCache + 1;
					timerPlay = funSwitch.delay(numPlayTime);
				}
			}
		}
		
		ele = ele || elements[pms.indexCache];
		
		if ($isEle(ele)) {
			//当前元素样式变换，目标对象显示
			ele.swapClass(pms.classRemove, pms.classAdd);
			if (eleNew = $(ele.attr(pms.targetAttr))) {
				if (pms.property === "position") {
					eleNew.into();	
				} else if (pms.property === "display") {
					eleNew.show();
				}
			}
			pms.elementCache = ele;
		} else {
			return;	
		}
		
		if ($isEle(cache) && cache !== ele) {
			cache.swapClass(pms.classAdd, pms.classRemove);
			//目标对象隐藏
			if (eleOld = $(cache.attr(pms.targetAttr))) {
				if (pms.property === "position") {
					eleOld.out();
				} else if (pms.property === "display") {
					eleOld.hide();
				}
				
			}
		}

		//回调
		if ($isFun(pms.switchCall)) {
			pms.switchCall.call(ele, eleNew, cache, eleOld);	
		}
	};
	
	if ($isArr(elements) && (length = elements.length) && length > 0) {
		if (!pms.classAdd) {
			pms.elementCache = elements[0];
			pms.indexCache = 0;	
		}
		elements.each(function(term, index) {
			if (pms.classAdd && term.hasClass(pms.classAdd)) {
				pms.elementCache = term;
				pms.indexCache = index;	
			}
			switch (pms.eventType) {
				case "click": {
					term.addEvent("click", function() {
						if (!this.hasClass(pms.classAdd)) {
							funSwitch(this);
						}
						if (this.get("tag") === "a") {
							return false;
						}
					});
					break;	
				}
				case "hover": {
					term.addEvents({
						mouseenter: function() {
							//如果是自动播放，清除自动播放定时器
							if (numPlayTime > 0) {
								$clear(timerPlayTrigger);
								$clear(timerPlay);
							}
							if (!this.hasClass(pms.classAdd)) {
								//是否延时
								if (numDelayTime > 0) {
									timerDelay = funSwitch.pass([this, index]).delay(numDelayTime);
								} else {
									pms.indexCache = index;
									funSwitch(this);	
								}
							}
						},
						mouseleave: function() {
							//如果定时播放，启动定时器
							$clear(timerDelay);
							if (numPlayTime > 0) {
								timerPlayTrigger = funSwitch.delay(numPlayTime);
							}
						}
					});	
				}
			}
		});	
		if ($chk(numPlayTime) && pms.eventType === "hover") {
			timerPlayTrigger = funSwitch.delay(numPlayTime);
		}
	}
};