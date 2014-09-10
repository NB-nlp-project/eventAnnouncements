/**
* Class Ibox 
*
* Ibox.open(options, from) -> {type,url}
* Ibox.alert() | Ibox.remind() | Ibox.confirm()
**/

var Ibox = {
	presets: {
		marginImage: { x: 50, y: 75 },
		width: 'auto',
		height: 'auto',
		
		url: false, //可以是元素，字符串
		type: 'ele', //ajax, string, iframe, image
		ajax: false,
		ajaxAttr: "href",
		ajaxOptions: {},
		
		title: '提示框',
		ensure: '确定',
		cancel: '取消',
		clostxt: '',
		loadimg: '/public/img/loading.gif',

		overlay: true,
		opacity: 0,
		overlayClosable: false,
		
		reposition: true,
		
		//关闭按钮显示
		closable: true,
		titleable: true,
		optable: false,
		dragable: true,
		zIndex: 199,
		
		//延时关闭
		time: 0,

		useFx: true,
		resizeFx: {},

		onShow: $empty,
		onClose: $empty
	},	
	//初始化
	initialize: function(presets) {
		this.options = {};
		this.setOptions(this.presets, presets || {});
		this.build();
		this.bound = {
			window: this.reposition.bind(this, true),
			close: this.close.bind(this),
			key: this.onKey.bind(this)
		};
		this.isOpen = this.elementObj = false;
		this.ie6 = (window.XMLHttpRequest) ? false: true;
		this.time = this.options.time.toInt();
		return this;
	},
	//构建
	build: function() {
		if (!this.overlay) {
			this.overlay = new Overlay({ name: 'ibox', opacity: this.options.opacity, onClick: (this.options.overlayClosable) ? this.close.bind(this) : null, zIndex: this.options.zIndex - 1});	
		}
		if (!$("iboxWindow")) {
			//页面上无ibox元素
			var boxConstr = '<div id="iboxBar" class="ibox_bar">' +
					'<div id="iboxTitle" class="ibox_title ovh">'+this.options.title+'</div>' +
					'<div class="ibox_close_box"><a onclick="return false;" href="javascript:;" id="iboxBtnClose" class="ibox_close" title="关闭">'+this.options.clostxt+'</a></div>' +
				'</div>' +
				'<div id="iboxContent" class="ibox_cont"></div>' + 
				'<div id="iboxOperate" class="ibox_operate" style="display:none;"></div>';
			this.win = new Element('div', {
				id: 'iboxWindow',
				'class': 'ibox_win',
				styles: {
					position: 'absolute',
					top:-9999,
					left:-9999,
					visibility: "hidden",
					zIndex: this.options.zIndex + 2
				}
			}).set("html", boxConstr);
			document.body.adopt(this.win);
		}
		
		this.bar = $("iboxBar");
		this.title = $("iboxTitle");
		this.closbtn = $("iboxBtnClose");
		this.cont = $("iboxContent");
		this.opt = $("iboxOperate");
		
		return this;
	},
	
	assign: function(to, options) {
		to.addEvent('click', function(e) {
			//例如阻止链接的默认行为
			new Event(e).stop();
			Ibox.open(options, this);
		});
	},
	
	open: function(options, from) {
		options  = options || {},
		this.initialize(options);
		if ($isEle(from)) {
			this.element = $(from);
			this.options.url = this.options.url || this.element.attr(this.options.ajaxAttr);
		}
		this.getContent();
	},
	remind: function(message, options) {
		if (message) {
			//参数还原
			this.initParams();
			options = options || {};
			this.initialize(options);
			this.getContent('<div class="ibox_remind">'+message+'</div>');
			this.closbtn.invisible();
			this.bar.hide();
			this.opt.hide();
			if (this.time > 0) {
				this.close.delay(this.time, this);
			}
		}
		return this;
	},
	alert: function(message, surecall, options) {
		if (!message) {
			return this;	
		}
		//参数还原
		this.initParams();
		
		options = options || {};
		this.initialize(options);
		this.getContent('<div class="ibox_alert">'+message+'</div>');
		this.opt.show();
		this.bar.show();
		
		this.AlertBtnOk = new Element('a', {
			'id': 'iboxAlertOk',
			'class': 'bluebtn btn_s bdrad3',
			'href':'javascript:;'
		}).txt(this.options.ensure);
		this.AlertBtnOk.addEvent('click', function() {
			if ($type(surecall) === 'function') {
				surecall.call(this);	
			}
			this.close();
		} .bind(this));
		
		this.opt.empty().adopt(this.AlertBtnOk);

		if (this.time > 0) {
			this.close.delay(this.time, this);
		}
	},
	alertForApplySucc: function(message, surecall, options) {
		if (!message) {
			return this;	
		}
		//参数还原
		this.initParams();
		
		options = options || {};
		this.initialize(options);
		this.getContent('<div class="ibox_alert">'+message+'</div>');
		this.opt.show();
		this.bar.show();
		
		this.viewBtn = new Element('a', {
			'id': 'iboxAlertOk',
			'class': 'bluebtn btn_s bdrad3',
			'href':'javascript:;'
		}).txt("继续浏览");
		this.viewBtn.addEvent('click', function() {
			if ($type(surecall) === 'function') {
				surecall.call(this);	
			}
			this.close();
		} .bind(this));
		
		this.studyBtn = new Element('a', {
			'id': 'iboxAlertOk',
			'class': 'bluebtn btn_s bdrad3',
			styles: {
				'margin-left' : '10px'
			},
			'href':$('clazzApplyBtn').getNext().get('href')
			
		}).txt("开始学习");
		
		this.opt.empty().adopt(this.viewBtn,this.studyBtn);

		if (this.time > 0) {
			this.close.delay(this.time, this);
		}
	},
	confirm: function(message, surecall, cancelcall, options) {
		if (!message) {
			return this;	
		}
		//参数还原
		this.initParams();
		
		options = options || {};
		this.initialize(options);
		this.getContent('<div class="ibox_alert">'+message+'</div>');
		this.opt.show();
		this.bar.show();
		
		this.ConfirmBtnOk = new Element('a', {
			'id': 'iboxConfirmOk',
			'onclick':'return false;',
			'class': 'bluebtn btn_s bdrad3 mr20',
			'href':'javascript:;'
		}).txt(this.options.ensure);
		this.ConfirmBtnCancel = new Element('a', {
			'id': 'iboxConfirmCancel',
			'onclick':'return false;',
			'class': 'graybtn btn_s bdrad3',
			'href':'javascript:;'
		}).txt(this.options.cancel);
		this.opt.empty().adopt(this.ConfirmBtnOk, this.ConfirmBtnCancel);
		this.ConfirmBtnOk.addEvent('click', function() {
			if ($type(surecall) === 'function') {
				surecall.call(this);	
			}
		} .bind(this));
		this.ConfirmBtnCancel.addEvent('click', function() {
			if ($type(cancelcall) === 'function') {
				cancelcall.call(this);
			}
			this.close();	
		} .bind(this));
	},
	loading: function(message) {
		this.initialize({});
		message = message || '<div class="ibox_loading"><img src="'+this.options.loadimg+'" class="ibox_loading_image" />加载中...</div>';
		this.getContent(message);
		this.closbtn.invisible();
		this.bar.hide();
		this.opt.hide();
		return this;
	},
	
	close: function() {
		if (this.isOpen) {
			this.isOpen = false;
			//执行关闭回调
			if ($isFun(this.options.onClose)) {
				this.options.onClose.call(this);	
			}
			
			//透明背景层
			if (this.overlay && this.options.overlay) {
				this.overlay.dispose();
				this.overlay = null;
			}
			//保护装载元素
			if (this.elementObj) {
				document.body.adopt(this.elementObj.hide());
			}
			
			//内容清空
			this.cont.empty();
			this.opt.empty();
			this.closbtn.invisible();	
			this.win.invisible();
			
			if (this.element) {
				this.element = null;
			}
			
			//参数还原
			this.initParams();
			//移除事件
			this.toggleListeners();
			this.options.onShow = $empty;
			this.options.onClose = $empty;
			
			//清除动画
			if (this.fx) {
				this.fx = null;	
			}

		}
	},
	initParams: function() {
		//参数还原
		this.options = {};
		this.setOptions(this.presets);
	},
	
	toggleListeners: function(state) {
		var fn = (state) ? 'addEvent' : 'removeEvent';
		this.closbtn[fn]('click', this.bound.close);
		document[fn]('keydown', this.bound.key);
		if (this.options.reposition) {
			window[fn]('resize', this.bound.window);
		}
	},
	
	getContent: function(content) {
		this.toggleListeners(true);
		if (content) {
			return this.applyContent(content);	
		}
		var type = this.options.type, url = this.options.url, cacheOption = this.options;
		
		if (!url) {
			return false;	
		}
		if (this.options.ajax) {
			this.loading();
			//参数还原
			this.options = cacheOption;
			this.title.attr("title",this.options.title.trim());
			var x = this.options.width.toInt() || 600, y = this.options.height.toInt() || 400;
			
			//页面外元素
			switch (type) {
				case 'image': {
					var tempImage = new Image(), imgsrc = url;
					tempImage.onload = function() {
						//图片与浏览器窗口大小比对显示
						var box = document.getSize(), size;
						box.x -= this.options.marginImage.x;
						box.y -= this.options.marginImage.y;
						box.y -= 24;//转图操作空间
						size = { x: tempImage.width, y: tempImage.height };

						for (var i = 2; i--; ) {
							if (size.x > box.x) {
								size.y *= box.x / size.x;
								size.x = box.x > 1024 ? 1024 : box.x;
							} else if (size.y > box.y) {
								size.x *= box.y / size.y;
								size.y = box.y;
							}
						}
						size.x = size.x.toInt();
						size.y = size.y.toInt();
						this.applyContent('<div class="p10 tc"><img class="ibox_ajax_image" src="'+imgsrc+'" width="'+size.x+'" height="'+size.y+'" /></div>');
					}.bind(this);
					tempImage.onerror = function() {
						this.alert("图片加载没有成功！");
					}.bind(this);
					tempImage.src = imgsrc;
					break;
				}
				case 'iframe': {
					var iframeOptions = {
						src: url,
						styles: {
							width: x,
							height: y,
							background: 'url('+this.options.loadimg+') no-repeat center',
							border: 0
						},
						'class': 'ibox_ajax_iframe',
						frameborder: 0
					};
					this.applyContent(new IFrame(iframeOptions));
					break;	
				}
				case 'ajax': {
					var self = this;
					new Request.HTML($merge({
						method: 'get'
					}, $extend({ evalScripts: false }, this.options.ajaxOptions))).addEvents({
						onFailure: this.onError.bind(this),
						onComplete: function(a, b, c, d) {
							self.applyContent(c, d);
						}
					}).send({ 'url': url });	
					break;
				}
				case 'swf': {
					var swfHtml = '<div id="swfIbox"></div>'
					var funSwf = new Swiff(url,{
						width:x,
						height:y,
						container: $('swfIbox')	
					});
					this.options.height = "auto";
					this.applyContent(swfHtml,funSwf());
					break;
				}
				default: {
					return this.applyContent(url);	
				}
			}
		} else {
			//页面上元素
			if ($isStr(url)) {
				url = url.replace(/^#/, "");
				if ($(url)) {
					url = $(url);	
				}
			}
			return this.applyContent(url);	
		}
	},
	
	applyContent: function(content, js) {
		var position = this.cont.css("position");	
		if ($isStr(content)) {
			this.cont.set("html", content).css("position", "absolute");	
		} else if ($type(content) === "element") {
			this.elementObj = content;
			this.cont.empty().adopt(content.show());
		} else {
			return this;	
		}
		if (js) { eval(js); }
		this.winsize = this.cont.getSize();
		this.cont.css("position", position);

		this.title.set("html", this.options.title);

		
		this.showControl();
		this.reposition();
		this.win.visible();
		this.isOpen = true;

		//执行显示回调
		if ($isFun(this.options.onShow)) {
			this.options.onShow.call(this);	
		}
		return this;
	},
	
	showControl: function() {
		//是否显示关闭按钮
		if (this.options.closable) {
			this.closbtn.visible();
		} else {
			this.closbtn.invisible();
		}
		//半透明背景层
		if (this.overlay && this.options.overlay) {
			this.overlay.show();
		}
		//是否显示标题栏，默认显示
		if (this.options.titleable) {
			this.bar.show();
		} else {
			this.bar.hide();
		}
		//是否显示按钮，默认不显示
		if (this.options.optable) {
			this.opt.show();
		} else {
			this.opt.hide();
		}
		
		//是否可拖拽
		if (this.options.dragable) {
			$startDrag(this.title, this.win);
		}
	},
	//定位
	reposition: function(fx) {
		var winx = this.winsize? this.winsize.x : this.win.w(), winy = this.win.h(), 
			windowx = window.getSize().x, windowy = window.getSize().y, 
			docsc = document.getScroll().y, 
			c = winy < windowy, 
			posl, post, 
			width = this.options.width.toInt(), height = this.options.height.toInt();
	
		winy = height || winy, winx = width || winx;
		
		posl = (windowx - winx) / 2;
		post = (windowy - winy) / 2 + docsc;
		
		if (this.ie6 || !this.options.reposition) {
			//高度不正常
			this.win.setStyle("position", "absolute");
			post = c? ((windowy - winy) / 2 + docsc) : (50 + docsc);
		} else {post = c? ((windowy - winy) / 2) : 50;	
			this.win.css("position", "fixed");
		}

		var to = {
			width: winx,
			left: posl,
			top: post
		};	
		
		if (this.options.useFx && fx === true) {
			this.fx = {
				win: new Fx.Morph(this.win, $merge({
					duration: 750,
					transition: Fx.Transitions.Quint.easeOut,
					link: 'cancel',
					unit: 'px'
				}, this.options.resizeFx))
			};
		}
		
		if (this.isOpen && this.fx && !this.ie6) {
			this.fx.win.cancel().start(to)
		} else {
			this.win.setStyles(to)
		}
		
	},
	
	onError: function() {
		this.alert('加载出了点小问题。');
	},
	onKey: function(e) {
		switch (e.key) {
			case 'esc': if (this.closbtn.css("visibility") === "visible") { this.close(e); }
			case 'up': case 'down': return false;
		}
	},
	extend: function(properties) {
		return $extend(this, properties);
	}
};
Ibox.extend(new Options);