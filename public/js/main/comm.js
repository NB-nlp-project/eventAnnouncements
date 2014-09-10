 /*------------------------------------------------- implement (工具)-----------------------------------------------*/
//字符串相关工具
String.implement({
	cnEncode: function() {
		return encodeURIComponent(this);
	},
	cnDecode: function() {
		return decodeURIComponent(this);
	},
	charCode: function() {
		var l = this.length, nchar = "";
		for (var i=0; i<l; i+=1) {
			nchar += this.charCodeAt(i);
		}
		return nchar;
	},
	trimHTML: function() {
		var mach = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;'	
		}, expr = /[&|<|>|"]/g;
		return this.replace(expr, function(o) { return mach[o]; });
	},
	escapeBlank: function() {
		var str;
		str = this.replace(/\s/g,'&nbsp;');
		var regExp = new RegExp("<br>","g");
		str = str.replace(regExp , "\n"); 
		return str;
	},
	revertBlank: function() {
		return this.replace(/\n/g,"<br>");
	},
	trimSearch: function() {
		return DBC2SBC(this.trim()).replace(/[^a-zA-Z0-9\u4E00-\u9FA5 \-\_，\']/g, "");
	}
});

//元素相关方法
Element.implement({
	//装载HTML内容,此方法用来装载HTML片段字符串，如果要直接装载节点，请使用inject()方法
	appendHTML: function(html, where) {
		if ($type(html) != 'string') return false;
		where = where || 'bottom';
		var temp = new Element('div');
		temp.set('html', html);
		var data = (where == 'bottom' || where == 'top') ? $A(temp.childNodes) : $A(temp.childNodes).reverse();
		data.each(function(node) {
			if ($type(node) == 'element') $(node).inject(this, where);
		}, this);
		return this;
	},
	//将mootools默认的setStyle以及setStyles方法转化为与jQuery类似的css()形式
	css: function(key, value) {
		if ($type(key) == 'object') {
			for (var p in key) this.css(p, key[p]);
			return this;
		}
		if(!$chk(value)){
			return this.getStyle(key);
		}
		this.setStyle(key, value);
		return this;
	},
	//将mootools默认的setProperty以及setProperties方法转化为与jQuery类似的attr()形式
	attr: function(key, value) {
		if ($type(key) == 'object') {
			for (var p in key){
				this.attr(p, key[p]);
			}
			return this;
		}
		if(!$chk(value)){
			if (value === "") {
				return this.removeProperty(key);
			}
			return this.getProperty(key);
		}
		this.setProperty(key, value);
		return this;
	},
	//val方法
	val: function (v) {
		if ($chk(v) || v == "") {
			return this.set("value", v);
		} else {
			return this.get("value");	
		}
	},
	//宽度高度方法,width/height的命名在IE下有问题，故w/h代替
	w: function (v) {
		if ($chk(v)) {
			return this.css("width", v);
		} else {
			return this.getWidth();	
		}
	},
	h: function (v) {
		if ($chk(v)) {
			return this.css("height", v);
		} else {
			return this.getHeight();	
		}
	},
	//html, text方法 ， 命名text会出错，txt代替
	html: function(v) {
		if ($chk(v) || v == "") {
			return	this.set("html", v);
		} else {
			return this.get("html");	
		}
	},
	txt: function(v) {
		if ($chk(v) || v == "") {
			return	this.set("text", v);
		} else {
			return this.get("text");	
		}
	},
	//元素是否隐藏，如果显示，返回true，否则false
	isDisplayed: function() {
		return this.getStyle('display') != 'none';
	},
	isInto: function(){
		return this.getStyle('position') == 'static';
	},
	toggle: function() {
		return this[this.isDisplayed() ? 'hide' : 'show']();
	},
	hide: function() {
		return this.css('display', 'none');
	},
	show: function(display) {
		return this.css('display', display ||  'block');
	},
	visible: function() {
		return this.css('visibility', 'visible');
	},
	invisible: function() {
		return this.css('visibility', 'hidden');
	},
	out: function() {
		return this.css({
			position: 'absolute',
			top: '-9999px',
			left: '-9999px'
		});
	},
	into: function() {
		return this.css('position', 'static');
	},
	swapClass: function(remove, add) {
		return this.removeClass(remove).addClass(add);
	}
});

/*------------------------------------------------- validate (一些验证)-----------------------------------------------*/

var $isFun = function (o) {
	return $type(o) === "function";
}, $isEle = function(o) {
	return $type(o) === "element";	
}, $isObj = function(o) {
	return $type(o) === "object";	
}, $isArr = function(o) {
	return $type(o) === "array";	
}, $isStr = function(o) {
	return $type(o) === "string";
}, $isNum = function(o) {
	return $type(o) === "number";
}, $isIe6 = function() {
	return window.XMLHttpRequest? false : true;
}();

/*------------------------------------------------- public function (公共方法)-----------------------------------------------*/

var DBC2SBC = function DBC2SBC(str){
 var result = '';
 for (i=0 ; i<str.length; i++){
  code = str.charCodeAt(i);
  if (code >= 65281 && code <= 65373){
	result += String.fromCharCode(str.charCodeAt(i) - 65248);
  }else if (code == 12288) {
	result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
  }else {
   result += str.charAt(i);
  }
 }
 return result;
};

//返回正则匹配判断
var $isRegex = function(ele, regex, params) {
	return $(ele).val().trim().test(regex, params || 'i');
}, $isEmpty = function(ele, value) {
	value = value || $(ele).attr("placeholder");
	var v = $(ele).val().trim();
	if (!v || v === value) {
		return true;	
	} else {
		return false;	
	}
};
$isRegex.extend({
    EMAIL:"^[a-z0-9._%-]+@[a-z0-9]+(\\.[a-z]{2,4}){1,4}$",
    URL:"^(http|https|ftp)\\:\\/\\/[a-z0-9\\-\\.]+\\.[a-z]{2,3}(:[a-z0-9]*)?\\/?([a-z0-9\\-\\._\\?\\,\\'\\/\\\\\\+&amp;%\\$#\\=~])*$",
    MOBILE:"^1\\d{10}$",
    ZIPCODE:"^\\d{6}$"
});

var $pageFresh = function(url) {
	window.location.href = url || window.location.href.split("#")[0];
};


//光标最后
var $cursorToEnd = function(ele){
	if (ele.createTextRange){
		var range = ele.createTextRange();
		range.moveStart("character", ele.value.length);
		range.collapse(true);
		range.select();
	} else {
		ele.setSelectionRange(ele.value.length, ele.value.length);
		ele.focus();
	}
};

//textarea占位符
var $textareaRemind = function(ele){
	$classToggle(ele, {
		eventType: "focus",
		inCall: function() {
			if (this.val().trim() === this.attr("placeholder")) {
				this.html("");
			}
			this.css("color", "#555");
		},
		outCall: function() {
			if (this.val().trim() === "") {
				this.html(this.attr("placeholder"));
				this.css("color", "#999");
			}
		}
	});
}