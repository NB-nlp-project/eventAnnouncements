//Ajax方法
 var AjaxReq = new Class({
 	Implements: [Options, Events],
 	options: {
 		url: null,
 		method: 'get',
 		data: null,
 		headers: {},
 		async: true,
 		evalScripts: true,
 		secure: false,
 		update: false,
 		//custom options
 		callType: 'json',
 		timeOut: 30000,
 		onRequest: $empty,
 		onSuccess: $empty,
 		onError: $empty

 	},

 	initialize: function(options) {
 		this.setOptions(options);
 		var requestOptions = {
 			url: this.options.url,
 			method: this.options.method,
 			data: this.options.data,
 			headers: this.options.headers,
 			async: this.options.async,
 			evalScripts: this.options.evalScripts,
 			secure: this.options.secure,
 			update: this.options.update
 		};
 		requestOptions.onRequest = this.request.bind(this);
 		requestOptions.onSuccess = this.success.bind(this);
 		requestOptions.onFailure = requestOptions.onException = requestOptions.onCancel = this.error.bind(this);

 		switch (this.options.callType) {
 			case 'html': {
				this.ajax = new Request.HTML(requestOptions);
				break;
			}
 			case 'json': {
				this.ajax = new Request.JSON(requestOptions);
				//this.ajax.headers.extend({ 'Accept': 'application/json, */*' });
				break;
			}
 		}
 		return this;
 	},
 	error: function() {
 		if (this.options.timeOut) $clear(this.options.timeOut);
 		this.fireEvent('error');
 		return this;
 	},
 	success: function(a, b, c, d) {
 		if (this.options.timeOut) $clear(this.options.timeOut);
 		if (this.options.callType == 'html') {
 			if (this.$events.success) {
 				this.fireEvent('success', [a, b, c, d]);
 			}
 		} else {
 			if (this.$events.success) {
 				this.fireEvent('success', [a, b]);
 			}
 		}
 		return this;
 	},
 	request: function() {
 		this.fireEvent('request');
 		return this;
 	},
 	send: function(options) {
 		this.options.timeOut = setTimeout(function() { this.ajax.cancel(); }.bind(this), this.options.timeOut);
 		this.ajax.send(options);
 	}
 });
 
//Ajax POST操作
var AjaxPost = new Class({
	Implements: [Options],
	options: {
		url: "",
		remind: null,
		text: "",
		delay: 0,
		data: {},
		callback: $empty
	},
	initialize: function(ele, options) {
		this.setOptions(options);
		this.ele = $(ele);
		this.options.url = this.options.url || this.ele.attr("href");
	},
	href: function() {
		this.ele.addEvent("click", function() {
			this.send();
			return false;
		}.bind(this));
	},
	send: function() {
		var s = this.options, trigger = this.ele, text = trigger.txt();
		if (!trigger) { return; }
		if (s.url && trigger.retrieve("ajax") != false) {
			//禁止二次点击
			trigger.store("ajax", false);
			if (s.text) {
				trigger.txt(s.text);
			}
			new AjaxReq({
				url: s.url,
				data: s.data,
				method: "post",
				onSuccess: function(json) {
					trigger.store("ajax", true);						
					$jsonHandle(json, s);
					if (s.text) {
						trigger.txt(text);
					}
					if ($isFun(s.callback)) {
						s.callback(json);	
					}
					return false;
				},
				onError: function() {
					trigger.store("ajax", true);
					var json = {
						succ: false,
						msg: "抱歉，由于系统的原因，刚才的操作没有成功，您可以稍后重试。"
					};
					$jsonHandle(json, s);
					if (s.text) {
						trigger.txt(text);
					}
					return false;
				}
			}).send();
		}
	}
}); 

//后台返回JSON公共处理方法
var $jsonHandle = function(json, s) {
	if (json) {
		if (json["msg"]) {
			if (s.remind && $(s.remind)) {
				if (json["succ"]) {
					$(s.remind).html(json["msg"]).swapClass("co", "cg");
				} else {
					$(s.remind).html(json["msg"]).swapClass("cg", "co");
				}
				if (s.delay.toInt() > 0) {
					setTimeout(function() {
						$(s.remind).empty();
					}, s.delay.toInt());
				}
			} else {
				Ibox.alert(json["msg"], null, { time: s.delay });
			}
		}
		
		if (json["url"]) {
			$pageFresh(json["url"]);
		} else {
			if (json["refresh"]) {
				$pageFresh();
			}
		}
	}				
};