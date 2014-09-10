
/* querySelector */
var $query = function(selector,element){
	return element ? element.querySelector(selector) : document.querySelector(selector); 
};
var $queryAll = function(selector,element){
	return element ? element.querySelectorAll(selector) : document.querySelectorAll(selector); 
};


/* prototype */
/*
 ***** 基于原生对象的一些相关扩展 *****
 */

//appendHTML => HTMLElement
HTMLElement.prototype.appendHTML = function(html) {
    var divTemp = document.createElement("div"), 
    	nodes = null,
        // fragment文档片段,一次性append,提高性能
        fragment = document.createDocumentFragment();
    divTemp.innerHTML = html;
    nodes = divTemp.childNodes;
    for (var i=0, length=nodes.length; i<length; i+=1) {
       fragment.appendChild(nodes[i].cloneNode(true));
    }
    this.appendChild(fragment);
    
    //clear
    nodes = null;
    fragment = null;
};
//htmlspecialchars 部分字符转义
function htmlspecialchars(str){
	if(str != "undefined"){
		return str.replace(/&/g,"&amp;").replace(/\"/g,"&quot;").replace(/\'/g,"&#039;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
	}
};

//getAjaxData 获取Ajax
/*
	getAjaxData({
	    type:"post",
	    url:"test.jsp",
	    data:"name=dipoo&info=good",
	    dataType:"json",
	    success:function(data){
	        alert(data.name);
	    }
	});
*/
var getAjaxData = function(conf) {
    // 初始化
    //type参数,可选
    var type = conf.type;
    //url参数，必填 
    var url = conf.url;
    //data参数可选，只有在post请求时需要
    var data = conf.data;
    //datatype参数可选    
    var dataType = conf.dataType;
    //回调函数可选
    var success = conf.success;
                                                                                         
    if (type == null){
        //type参数可选，默认为get
        type = "get";
    }
    if (dataType == null){
        //dataType参数可选，默认为text
        dataType = "text";
    }
    // 创建ajax引擎对象
    var xhr = new XMLHttpRequest();//createAjax();
    // 打开
    xhr.open(type, url, true);
    // 发送
    if (type == "GET" || type == "get") {
        xhr.send(null);
    } else if (type == "POST" || type == "post") {
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data);
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if(dataType == "text"||dataType=="TEXT") {
                if (success != null){
                    //普通文本
                    success(xhr.responseText);
                }
            }else if(dataType=="xml"||dataType=="XML") {
                if (success != null){
                    //接收xml文档    
                    success(xhr.responseXML);
                }  
            }else if(dataType=="json"||dataType=="JSON") {
                if (success != null){
                	//console.log(xhr.responseText);
                    //将json字符串转换为js对象  
                    success(eval("("+xhr.responseText+")"));
                }
            }
        }
    };
};


/* dom Class */
/* 
 *** 手机端页面级常用的函数集 ***
 */
var dom = {

	//倒计时
	countdown : function(element){
			var $_h = $query(".h",element),
				$_m = $query(".m",element),
				$_s = $query(".s",element);
			var _h = $_h ? $_h.innerHTML : null,
				_m = $_m ? $_m.innerHTML : null,
				_s = $_s ? $_s.innerHTML : null;

			function _countdown(element){
				if(_s>0){
					_s = _s - 1;
				}else{
					_s = 59;
					if(_m){
						if(_m>0){
							_m = _m - 1;
						}else{
							_m = 59
							if(_h){
								if(_h>0){
									_h = _h - 1;
								}else{
									_h = _m = _s = 0
								}
							}
						}
					}
				}
				if(_h!=0||_m!=0||_s!=0){ 
					setTimeout(function(){ _countdown(element); },1000); 
				}else{
					//时间到了刷新页面迎接新状态
					location.reload();
				}

				$_h ? $_h.innerHTML = _h : null;
				$_m ? $_m.innerHTML = _m : null;
				$_s ? $_s.innerHTML = _s : null;
			};
			setTimeout(function(){ _countdown(element); },1000);
	},

	//数量框组件
	quantity : function(quantityElementArr){
		for(var i=0,j=quantityElementArr.length;i<j;i++){
			var element = quantityElementArr[i];
			var $minus_btn = $query(".minus",element),
				$plus_btn = $query(".plus",element),
				$_number = $query(".mp-number",element),
				$_price_sum = $queryAll(".J_price_sum"),
				_number = $_number.value ? Number($_number.value) : 1,
				_commodity_number = _number;

			//price_sum
			function price_sum(_num){
				for(var m=0,n=$_price_sum.length;m<n;m++){
					var _price_sum = Number($_price_sum[m].innerHTML),
						_price = _price_sum / _commodity_number;

					_price_sum = _price * _num;
					$_price_sum[m].innerHTML = _price_sum.toFixed(2);
				}
				_commodity_number = _num;
			};
			$minus_btn.onclick = function(){
				if(_number > 1){
					_number = _number - 1;
					$_number.value = _number;
					price_sum(_number);
				}
				if(_number<$query(".limitNumber").attributes['date'].value){
					plusOnclick();
					document.getElementById("limitNumberShow").setAttribute("style","display:none");
				}
			};
			
			var plusOnclick=function(){
				$plus_btn.onclick = function(){
					if(_number<$query(".limitNumber").attributes['date'].value){
						_number = _number + 1;
						$_number.value = _number;
						price_sum(_number);
					}
					if(_number==$query(".limitNumber").attributes['date'].value){
						$plus_btn.onclick=null;
						document.getElementById("limitNumberShow").setAttribute("style","display:block");
					}
				};
			}
			plusOnclick();
		}
	},

	//checkbox 单选
	checkbox_to_radio : function(checkboxElementArr){
		for(var i=0,j=checkboxElementArr.length;i<j;i++){
			var element = checkboxElementArr[i];

			element.onclick = function(e){
				var _element = this,
					_this = e.target,
					_this_tagName = _this.tagName;

				var _li;
				if(_this_tagName != "LI"){
					function _parentNode_to_li(_temp_element){
						if(_temp_element.tagName != "LI"){
							//console.log(_temp_element.tagName)
							_parentNode_to_li(_temp_element.parentNode);
						}else{
							_li = _temp_element;
						}
					};
					_parentNode_to_li(_this.parentNode);
				}else{
					_li = _this;
				}

				var _lis = _element.getElementsByTagName("li");
				for(var s=0,t=_lis.length;s<t;s++){
					_lis[s].getElementsByTagName("input")[0].checked = false;
				}
				_li.getElementsByTagName("input")[0].checked = true;
			};

		}
	},
	
	//input和checkbox验证
	cellphone_delivery_verify : function($submitOrder){
		$submitOrder.onclick=function(){
			if(document.getElementById("cellPhone").value==null){
				document.getElementById("message").setAttribute("style","display:block");
				return false;
			}
			var checkboxElementArr=$queryAll(".J_CheckboxAtLeastOne");
			var count=0;
			for(var i=0,j=checkboxElementArr.length;i<j;i++){
				var element = checkboxElementArr[i];
				if(element.checked){
					count+=1;
				}
			}
			if(count==0){
				document.getElementById("message").setAttribute("style","display:block");
				return false;
			}
		}
	},

	/* 
		TAB切换

		dom.tab({
	        tab_head : "sh_nav_",
	        tab_cont : "sh_cont_",
	        column : 4,
	        auto_css : "",
	        hover_css : "nav_on",
	        default_type : 1
	    });
	*/
	tab : function(setJson){

		var auto_css = setJson.auto_css ? setJson.auto_css : "",
			hover_css = setJson.hover_css ? setJson.hover_css : "",
			default_type = setJson.default_type ? setJson.default_type : 0;

		type_hover(default_type);
		for(var i = 0 ;i<setJson.column;i++){
			(function(i){
				$query("#"+setJson.tab_head+i).addEventListener("click", function(){
					type_hover(i);
				}, false);
			})(i);
		}
		function type_hover(i){
			for(var j = 0 ;j<setJson.column;j++){
				$query("#"+setJson.tab_cont+j).style.display = "none";
				$query("#"+setJson.tab_head+j).className = auto_css;
			};
			$query("#"+setJson.tab_cont+i).style.display = "block";
			$query("#"+setJson.tab_head+i).className = hover_css;
		};
	},
};
