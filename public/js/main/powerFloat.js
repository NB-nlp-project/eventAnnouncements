//万能浮动层
var $powerFloat = function(eleTrigger, options) {
	if ($isEle(eleTrigger)) {
		eleTrigger = [eleTrigger];	
	}
	if (!$isArr(eleTrigger)) { return false; }
	var defaults  = {
		width: "auto", //可选参数：inherit，数值(px)
		offsets: {
			x: 0,
			y: 0	
		},
		zIndex: 19,
		
		eventType: "hover", //事件类型，其他可选参数有：click, focus,contextmenu
		
		showDelay: 0, //鼠标hover显示延迟
		hideDelay: 0, //鼠标移出隐藏延时
		
		hoverHold: true,
		
		targetMode: "common", //浮动层的类型，其他可选参数有：ajax, list,remind
		target: null, //target对象获取来源，优先获取，如果为null，则从targetAttr中获取。
		targetAttr: "rel", //target对象获取来源，当targetMode为list时无效
		
		container: null, //转载target的容器，可以使用"plugin"关键字，则表示使用插件自带容器类型
		reverseSharp: false, //是否反向小三角的显示，默认ajax是显示三角的，其他如list和自定义形式是不显示的
		
		position: "4-1", //trigger-target
		edgeAdjust: false, //边缘位置自动调整
		
		showCall: $empty,
		hideCall: $empty

	};
	
	var o = {
		targetGet: function() {
			//一切显示的触发来源
			if (!this.trigger) { return this; }
			var attr = this.trigger.attr(this.s.targetAttr), target = this.s.target;
			
			switch (this.s.targetMode) {
				case "common": {
					if (target) {
						if ($isEle(target)) {
							o.target = target;
						} else if ($isArr(target) && $isEle(target[0])) {
							o.target = target[0];
						} else if ($isStr(target) && $(target)) {
							o.target = $(target);
						}
					} else {
						if (attr && $(attr)) {
							o.target = $(attr);
						}
					}
					if (o.target) {
						o.targetShow();
					}
					return this;
					break;
				}
				case "ajax": {
					//ajax元素，如图片，页面地址
					var url = target || attr;
					
					this.targetProtect = false;
					if (/(\.jpg|\.png|\.gif|\.bmp|\.jpeg)$/i.test(url)) {
						
						if (o.cacheData[url]) {
							o.target = o.cacheData[url];
							o.targetShow();
						} else {
							var tempImage = new Image();
							o.loading();
							tempImage.onload = function() {
								var w = tempImage.width, h = tempImage.height;
								var winw = $(window).getWidth(), winh = $(window).getHeight();
								var imgScale = w / h, winScale = winw / winh;
								if (imgScale > winScale) {
									//图片的宽高比大于显示屏幕
									if (w > winw / 2) {
										w = winw / 2;
										h = w / imgScale;	
									}
								} else {
									//图片高度较高
									if (h > winh / 2) {
										h = winh / 2;
										w = h * imgScale;
									}
								}
								var eleImage = new Element("img").attr({
									width: w,
									height: h,
									src: url,
									"class": "float_ajax_image"	
								});
								o.target = eleImage;
								o.cacheData[url] = eleImage;
								o.targetShow();
							};
							tempImage.onerror = function() {
								o.target = new Element("div").addClass("float_ajax_error").set("text", "图片加载失败！");
								o.targetShow();
							};
							tempImage.src = url;
						}
					} else {
						if (url) {
							if (o.cacheData[url]) {
								o.target = new Element("div").addClass("float_ajax_data").html(o.cacheData[url]);
								o.targetShow();	
							} else {
								o.loading();
								new Request.HTML({
									method: "get",
									url: url,
									onComplete: function(tree, ele, html, js) { //element, arr, string, string
										o.target = new Element("div").addClass("float_ajax_data").html(html);
										o.targetShow();
										o.cacheData[url] = html;
									},
 									onError: function() {
										o.target = new Element("div").addClass("float_ajax_error").set("text", "数据没有加载成功。");
										o.targetShow();
									}
								}).send();
							}
						}
					}
					break;
				}
				case "list": {
					//下拉列表
					var eleList = new Element("ul").addClass("float_list_ul"), targetHtml = "", arrLength;
					if ($isArr(target) && (arrLength = target.length)) {
						target.each(function(obj, i) {
							var list = "", strClass = "", text, href;
							if (i === 0) {
								strClass = ' class="float_list_li_first"';
							}
							if (i === arrLength - 1) {
								strClass = ' class="float_list_li_last"';	
							}
							if ($isObj(obj) && (text = obj.text.toString())) {
								if (href = (obj.href || "javascript:")) {
									list = '<a href="' + href + '" class="float_list_a">' + text + '</a>';	
								} else {
									list = text;	
								}
							} else if (obj && $isStr(obj)) {
								list = obj;
							}
							if (list) {
								targetHtml += '<li' + strClass + '>' + list + '</li>';	
							}
						});
					} else {
						targetHtml += '<li class="float_list_null">列表无数据。</li>';	
					}
					o.target = eleList.html(targetHtml);
					this.targetProtect = false;	
					o.targetShow();	
					break;	
				}
				case "remind": {
					//内容均是字符串
					var strRemind = target || attr;
					this.targetProtect = false;	
					if ($isStr(strRemind)) {
						o.target = new Element("span").html(strRemind);
						o.targetShow();	
					}
					break;
				}
				default: {
					var objOther = target || attr;
					if (objOther) {
						if ($isStr(objOther)) {
							if ($$(objOther).length) {
								//元素
								o.target = $$(objOther)[0];
								this.targetProtect = true;	
							} else {
								o.target = new Element("div").html(objOther);	
							}
						} else if ($isEle(objOther)) {
							o.target = objOther;
						} else if ($isArr(objOther) && $isEle(objOther[0])) {
							o.target = objOther[0];
						}
						o.targetShow();	
					}
				}
			}
			return this;
		},
		container: function() {
			//容器(如果有)重装target
			var cont = this.s.container, mode = this.s.targetMode || "mode";
			if (mode === "ajax" || mode === "remind") {
				//显示三角
				this.s.sharpAngle = true;	
			} else {
				this.s.sharpAngle = false;
			}
			//是否反向
			if (this.s.reverseSharp) {
				this.s.sharpAngle = !this.s.sharpAngle;	
			}
			
			if (mode !== "common") {
				//common模式无新容器装载
				if (cont === null) {
					cont = "plugin";	
				} 
				if ( cont === "plugin" ) {
					if (!$("floatBox_" + mode)) {
						new Element("div").attr("id", "floatBox_" + mode).addClass("float_" + mode + "_box").out().inject(document.body);
					}
					cont = $("floatBox_" + mode);	
				} 
				
				if (cont && !$isStr(cont)) {
					if (this.targetProtect) {
						o.target.show().into();
					}
					o.target = cont.empty().adopt(o.target);
				}
			}
			return this;
		},
		setWidth: function() {
			var w = this.s.width;
			if (w === "auto") {
				if (this.target.style.width) {
					this.target.css("width", "auto");	
				}
			} else if (w === "inherit") {
				this.target.w(this.trigger.w());
			} else {
				this.target.css("width", w);	
			}
			return this;
		},
		position: function() {
			var pos = this.trigger.getPosition(),
				tri_h = 0, tri_w = 0, cor_w = 0, cor_h = 0,
				tri_l, tri_t, tar_l, tar_t, cor_l, cor_t,
				tar_h = this.target.h(), tar_w = this.target.w(),
				st = window.getScroll().y,
				off_x = this.s.offsets.x.toInt() || 0, off_y = this.s.offsets.y.toInt() || 0,
			tri_h = this.trigger.h();
			tri_w = this.trigger.w();
			tri_l = pos.x;
			tri_t = pos.y;
			
			var arrLegalPos = ["4-1", "1-4", "5-7", "2-3", "2-1", "6-8", "3-4", "4-3", "8-6", "1-2", "7-5", "3-2"],
				align = this.s.position, alignMatch = false, strDirect;
				
			arrLegalPos.each(function(n) {
				if (n === align) {
					alignMatch = true;	
					return;
				}
			});
			if (!alignMatch) {
				align = "4-1";
			}
			var funDirect = function(a) {
				var dir = "bottom";
				//确定方向
				switch (a) {
					case "1-4": case "5-7": case "2-3": {
						dir = "top";
						break;
					}
					case "2-1": case "6-8": case "3-4": {
						dir = "right";
						break;
					}
					case "1-2": case "8-6": case "4-3": {
						dir = "left";
						break;
					}
					case "4-1": case "7-5": case "3-2": {
						dir = "bottom";
						break;
					}
				}
				return dir;
			};
			
			var funCenterJudge = function(a) {
				if (a === "5-7" || a === "6-8" || a === "8-6" || a === "7-5") {
					return true;
				}
				return false;
			};
			
			var funJudge = function(dir) {
				var totalHeight = 0, totalWidth = 0, flagCorner = (o.s.sharpAngle && o.corner) ? true: false;
				if (dir === "right") {
					totalWidth = tri_l + tri_w + tar_w + off_x;
					if (flagCorner) {
						totalWidth += o.corner.w();
					}	
					if (totalWidth > $(window).getWidth()) {
						return false;	
					}
				} else if (dir === "bottom") {
					totalHeight = tri_t + tri_h + tar_h + off_y;
					if (flagCorner) {
						totalHeight += 	o.corner.h();
					}
					if (totalHeight > st + $(window).getHeight()) {
						return false;	
					}
				} else if (dir === "top") {
					totalHeight = tar_h + off_y;
					if (flagCorner) {
						totalHeight += o.corner.h();
					}
					if (totalHeight > tri_t - st) {
						return false;	
					} 
				} else if (dir === "left") {
					totalWidth = tar_w + off_x;
					if (flagCorner) {
						totalWidth += o.corner.w();
					}
					if (totalWidth > tri_l) {
						return false;	
					}
				}
				return true;
			};
			//此时的方向
			strDirect = funDirect(align);

			if (this.s.sharpAngle) {
				//创建尖角
				this.createSharp(strDirect);
			}
			
			//边缘过界判断
			if (this.s.edgeAdjust) {
				//根据位置是否溢出显示界面重新判定定位
				if (funJudge(strDirect)) {
					//该方向不溢出
					(function() {
						if (funCenterJudge(align)) { return; }
						var obj = {
							top: {
								right: "2-3",
								left: "1-4"	
							},
							right: {
								top: "2-1",
								bottom: "3-4"
							},
							bottom: {
								right: "3-2",
								left: "4-1"
							},
							left: {
								top: "1-2",
								bottom: "4-3"	
							}
						};
						var o = obj[strDirect], name;
						if (o) {
							for (name in o) {
								if (!funJudge(name)) {
									align = o[name];
								}
							}
						}
					})();
				} else {
					//该方向溢出
					(function() {
						if (funCenterJudge(align)) { 
							var center = {
								"5-7": "7-5",
								"7-5": "5-7",
								"6-8": "8-6",
								"8-6": "6-8"
							};
							align = center[align];
						} else {
							var obj = {
								top: {
									left: "3-2",
									right: "4-1"	
								},
								right: {
									bottom: "1-2",
									top: "4-3"
								},
								bottom: {
									left: "2-3",
									right: "1-4"
								},
								left: {
									bottom: "2-1",
									top: "3-4"
								}
							};
							var o = obj[strDirect], arr = [];
							for (name in o) {
								arr.push(name);
							}
							if (funJudge(arr[0]) || !funJudge(arr[1])) {
								align = o[arr[0]];
							} else {
								align = o[arr[1]];	
							}
						}
					})();
				}
			}
			
			//已确定的尖角
			var strNewDirect = funDirect(align), strFirst = align.split("-")[0];
			if (this.s.sharpAngle) {
				//创建尖角
				this.createSharp(strNewDirect);
				cor_w = this.corner.w(), cor_h = this.corner.h();
			}

			//确定left, top值
			switch (strNewDirect) {
				case "top": {
					tar_t = tri_t - off_y - tar_h - cor_h;
					if (strFirst == "1") {
						tar_l = tri_l - off_x;	
					} else if (strFirst === "5") {
						tar_l = tri_l - (tar_w - tri_w) / 2 - off_x;
					} else {
						tar_l = tri_l - (tar_w - tri_w) - off_x;
					}
					cor_t = tri_t - cor_h - off_y - 1;
					cor_l = tri_l - (cor_w - tri_w) / 2;
					break;
				}
				case "right": {
					tar_l = tri_l + tri_w + off_x + cor_w;
					if (strFirst == "2") {
						tar_t = tri_t + off_y;	
					} else if (strFirst === "6") {
						tar_t = tri_t - (tar_h - tri_h) / 2 + off_y;
					} else {
						tar_t = tri_t - (tar_h - tri_h) + off_y;
					}
					cor_l = tri_l + tri_w + off_x + 1;
					cor_t = tri_t - (cor_h - tri_h) / 2;
					break;
				}
				case "bottom": {
					tar_t = tri_t + tri_h + off_y + cor_h;
					if (strFirst == "4") {
						tar_l = tri_l + off_x;	
					} else if (strFirst === "7") {
						tar_l = tri_l - (tar_w - tri_w) / 2 + off_x;
					} else {
						tar_l = tri_l - (tar_w - tri_w) + off_x;
					}
					cor_t = tri_t + tri_h + off_y + 1;
					cor_l = tri_l - (cor_w - tri_w) / 2;
					break;
				}
				case "left": {
					tar_l = tri_l - tar_w - off_x - cor_w;
					if (strFirst == "2") {
						tar_t = tri_t - off_y;	
					} else if (strFirst === "6") {
						tar_t = tri_t - (tar_w - tri_w) / 2 - off_y;
					} else {
						tar_t = tri_t - (tar_h - tri_h) - off_y;
					}
					cor_l = tar_l + cor_w;
					cor_t = tri_t - (tar_w - cor_w) / 2;
					break;
				}
			}
			//尖角的显示
			if (cor_h && cor_w && this.corner) {
				this.corner.css({
					left: cor_l,
					top: cor_t,
					zIndex: this.s.zIndex + 1	
				});
			}
			//浮动框显示
			this.target.css({
				position: "absolute",
				left: tar_l,
				top: tar_t,
				zIndex: this.s.zIndex
			});
			return this;
		},
		createSharp: function(dir) {
			var bgColor, bdColor, color1 = "", color2 = "";
			var objReverse = {
				left: "right",
				right: "left",
				bottom: "top",
				top: "bottom"	
			}, dirReverse = objReverse[dir] || "top";
			
			if (this.target) {
				bgColor = this.target.css("background-color");
				if (this.target.css("border-" + dirReverse + "-width").toInt() > 0) {
					bdColor = this.target.css("border-" + dirReverse + "-color");
				} 
				
				if (bdColor &&  bdColor !== "transparent") {
					color1 = 'style="color:' + bdColor + ';"';
				} else {
					color1 = 'style="display:none;"';
				}
				if (bgColor && bgColor !== "transparent") {
					color2 = 'style="color:' + bgColor + ';"';	
				}else {
					color2 = 'style="display:none;"';
				}
			}
			
			var htmlCorner = '<span class="corner corner_1" ' + color1 + '>◆</span><span class="corner corner_2" ' + color2 + '>◆</span>';
			var eleCorner = new Element("div").attr("id", "floatCorner_" + dir).addClass("float_corner float_corner_" + dir).html(htmlCorner);
			
			if (!$("floatCorner_" + dir)) {
				eleCorner.inject(document.body);	
			}
			this.corner = $("floatCorner_" + dir);
			return this;
		},
		targetHold: function() {
			if (this.s.hoverHold) {
				var delay = this.s.hideDelay.toInt() || 200;
				this.target.addEvents({
					mouseenter: function() {
						o.flagDisplay = true;
					},
					mouseleave: function() {
						o.flagDisplay = false;
						//鼠标移出检测是否hover trigger，以决定其显示与否
						setTimeout(function() {
							o.displayDetect();	
						}, delay);
					}
				});
			}
			return this;
		},
		loading: function() {
			this.target = new Element("div").addClass("float_loading");
			this.targetShow();
			return this;
		},
		displayDetect: function() {
			//显示与否检测与触发
			if (!this.flagDisplay) {
				this.targetHide();
			} 
			return this;
		},
		targetShow: function() {
			o.cornerClear();
			this.flagDisplay = true;

			this.container().setWidth().position();
			this.target.show();
			if ($isFun(this.s.showCall)) {
				this.s.showCall.call(this.trigger, this.target);	
			}
			//全局隐藏浮动层方法
			window.powerFloatHide = function() {
				o.targetHide();	
			};
			return this;
		},
		targetHide: function() {
			this.flagDisplay = false;
			this.targetClear();
			this.cornerClear();
			if ($isFun(this.s.hideCall)) {
				this.s.hideCall.call(this.trigger);	
			}
			this.target = null;
			this.trigger = null;
			this.s = {};
			this.targetProtect = false;
			return this;
		},
		targetClear: function() {
			if (this.target) {
				if (this.targetProtect) {
					//保护孩子
					this.target.getFirst().out().inject(document.body);
				} 
				this.target.out();
			}
		},
		cornerClear: function() {
			if (this.corner) {
				//使用remove避免潜在的尖角颜色冲突问题
				this.corner.dispose();
			}
		},
		target: null,
		trigger: null,
		s: {},
		cacheData: {},
		targetProtect: false
	};
	var documentEvent = function(e) {
		if (!o.flagDisplay) { return false;}
		var px = e.page.x, py = e.page.y, off = o.target.getPosition(), tarw = o.target.w(), tarh = o.target.h();
		if ((o.s.eventType === "click" && e.target != o.trigger) || o.s.eventType == 'contextmenu') {
			if (!(px > off.x && px < off.x + tarw && py > off.y && py < off.y + tarh)) {
				o.flagDisplay = false;	
				o.displayDetect();
				document.removeEvent("mouseup", documentEvent);
			}
		}
		return false;
	};
	return eleTrigger.each(function(items) {
		var s = $extend(defaults, options || {});
		var init = function(pms, trigger) {
			if (o.target && o.target.isDisplayed()) {
				o.targetHide();
			}
			o.s = pms;
			o.trigger = trigger;	
		}, fnMouseClick = function(ele){
			if (o.flagDisplay && e.target === o.trigger) {
				o.flagDisplay = false;	
				o.displayDetect();
			} else {
				init(s, ele);		
				o.targetGet();
			}
			document[o.flagDisplay? "addEvent" : "removeEvent"]("mouseup", documentEvent);
			return false;
		};
		switch (s.eventType) {
			case "hover": {
				items.addEvents({
					mouseenter: function() {
						var numShowDelay = s.showDelay.toInt(), hoverTimer;
						init(s, this);	
						//鼠标hover延时
						if (numShowDelay) {
							if (hoverTimer) {
								$clear(hoverTimer);
							}
							hoverTimer = o.targetGet.bind(o).delay(numShowDelay);
						} else {
							o.targetGet();	
						}
					},
					mouseleave: function() {
						o.flagDisplay = false;
						o.targetHold();
						if (s.hoverHold) {
							setTimeout(function() {
								o.displayDetect();
							}, 200);
						} else {
							o.displayDetect();
						}
					}
				});
				if (s.hoverFollow) {
					//鼠标跟随	
					$(this).mousemove(function(e) {
						o.cacheData.left = e.page.x;
						o.cacheData.top = e.page.y;
						o.targetGet();
						return false;
					});
				}
				break;	
			}
			case "click": {
				items.addEvent("click", function(e) {
					fnMouseClick(this)
				});
				break;
			}
			case "contextmenu": {
				items.addEvent("contextmenu", function(e) {
					e.preventDefault();
					fnMouseClick(this)
				});
				break;
			}
			case "focus": {
				items.addEvents({
					focus: function() {
						setTimeout(function() {
							init(s, this);
							o.targetGet();	
						}.bind(this), 200);
					},
					blur: function() {
						o.flagDisplay = false;
						setTimeout(function() {
							o.displayDetect();	
						}, 190);
					}
				});
				break;
			}
			default: {
				init(s, items);
				o.targetGet();
			}
		}
	});
};
$powerFloat.extend({
	hide: function() {
		if (window.powerFloatHide) {
			powerFloatHide();
		}
	}
});