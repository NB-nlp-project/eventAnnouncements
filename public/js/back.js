//发布闪购商品
//var publishHotBuy=

// personCenter - 修改个人密码
var modifyPwdBtn = $("modifyPwdBtn");
if($isEle(modifyPwdBtn)){
	modifyPwdBtn.addEvent('click', function(){
		Ibox.open({
			url:'<div class="tc">'+
				'<article class="pl10 mt20 mb20">'+
					'<ul>'+
						'<li class="mb15">'+
	                    	'<span class="dib w70 tr">'+
	                        	'<span class="cr">*</span>'+
								'当前密码：'+
	                        '</span>'+
							'<input id="currPwdInput" class="text_input" type="password" />'+
						'</li>'+
	                    '<li class="mb15">'+
	                    	'<span class="dib w70 tr">'+
	                        	'<span class="cr">*</span>'+
								'新密码：'+
	                        '</span>'+
							'<input id="newPwdInput" class="text_input" type="password" />'+
						'</li>'+
						'<li class="mb15">'+
	                    	'<span class="dib w70 tr">'+
	                        	'<span class="cr">*</span>'+
								'再输一遍：'+
	                        '</span>'+
							'<input id="rePwdInput" class="text_input" type="password" />'+
						'</li>'+
					'</ul>'+
					'<div class="pt10 ml20"><a id="savePwdBtn" class="bluebtn btn_m bdrad3" href="javascript:;">保存</a></div>'+
				'</article>'+
			'</div>', 
			width: 450, 
			title: '修改密码',
			onShow: function(){
				var savePwdBtn = $("savePwdBtn");
				savePwdBtn.addEvent('click', function(){
					if($isEmpty($("currPwdInput"))){
						$testRemind($("currPwdInput"), "请输入当前密码", 1);
						setTimeout('$testRemind.hide()',3000);
					}else if($isEmpty($("newPwdInput"))){
						$testRemind($("newPwdInput"), "请输入新密码", 1);
						setTimeout('$testRemind.hide()',3000);
					}else if($isEmpty($("rePwdInput"))){
						$testRemind($("rePwdInput"), "请重新输入新密码", 1);
						setTimeout('$testRemind.hide()',3000);
					}else if($("rePwdInput").val().trim() != $("newPwdInput").val().trim()){
						$testRemind($("rePwdInput"), "两次输入密码不一致，请检查", 1);
						setTimeout('$testRemind.hide()',3000);
					}else{
						new AjaxPost(this,{
							url: '/AdminController/savePassword',
							data: {
								oldPwd: $("currPwdInput").val().trim(),
								newPwd: $("newPwdInput").val().trim()
							},
							callback: function(json){
								if(json.succ){
									Ibox.alert("密码修改成功");
								}else{
									$testRemind($("currPwdInput"), "密码错误", 1);
									setTimeout('$testRemind.hide()',3000);
									return;
								}
							}
						}).send();
					}
				})
			}
		});
	})
}

// 进账流水
var searchBillBtn = $("searchBillBtn");
if($isEle(searchBillBtn)){
	new Datepicker($("dateFromInput"), $("dateFromInput"), {showMode: 'pass'});
	new Datepicker($("dateToInput"), $("dateToInput"), {showMode: 'pass'});
	
	searchBillBtn.addEvent('click', function(){
		new AjaxPost(this,{
			url: '/AdminController/filterBills',
			data: {
				shopId: $isEle($("shopSel")) ? $("shopSel").val() : 0,
				dateFrom: $("dateFromInput").val()+" 00:00:00",
				dateTo: $("dateToInput").val()+" 00:00:00"
			}
		}).send();
	})
}

// 会员管理
var searchVIPBtn = $("searchVIPBtn");
if($isEle(searchVIPBtn)){
	searchVIPBtn.addEvent('click', function(){
		new AjaxPost(this,{
			url: '/AdminController/filterVIPs',
			data: {
				nickName: $("nickNameInput").val()
			}
		}).send();
	})
}