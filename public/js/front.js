if($isArr($$(".jsForNumber"))){
	$$(".jsForNumber").addEvents({
		'keypress': function(ev){
			return ev.code>=48&&ev.code<=57||ev.code==8;
		}
	})
}
// 添加收货地址
if($isEle($('addAddBtn'))){
	$('addAddBtn').addEvent('click', function(){
		var addressForm = $('addressForm');
		var inputArr = addressForm.getElements('input');
		for(var i=0; i < inputArr.length; i++){
			if($isEmpty(inputArr[i])){
				Ibox.alert(inputArr[i].attr('placeholder')+"不能为空！");
				return;
			}
		}
		var cellphoneInput = $("cellphoneInput"), postCodeInput = $("postCodeInput");
		if(!$isRegex(cellphoneInput, $isRegex.MOBILE)){
			Ibox.alert("手机号码格式不正确");
		}else if(!$isRegex(postCodeInput, $isRegex.ZIPCODE)){
			Ibox.alert("邮编格式不正确");
		}else{
			addressForm.submit();
		}
	})
}

// 选择默认收货地址
var confirmAddBtn = $('confirmAddBtn');
if($isEle(confirmAddBtn)){
	$$(".jsForAdd").addEvent('click', function(){
		$$('.myorder_area').swapClass('myorder_area', 'myorder_other_area');
		this.getElement('div').swapClass('myorder_other_area', 'myorder_area');
	});
	confirmAddBtn.addEvent('click', function(){
		new AjaxPost(this, {
			url: '/ShopController/saveAddress',
			data: {
				'goodId': confirmAddBtn.attr('data').split('|')[0], 
				'ownerId': confirmAddBtn.attr('data').split('|')[1],
				'hotId': confirmAddBtn.attr('data').split('|')[2],
				'addressId': $$('.myorder_area')[0].getParent().attr('data')
			}
		}).send();
	})
}

// 提交订单
var orderSubmitBtn = $("orderSubmitBtn");
if($isEle(orderSubmitBtn)){
	// +
	$("increaseBtn").addEvent('click', function(){
		var amountInput = $("amountInput"), leftCount = $("leftCount"), toBuy = new Number(amountInput.val()), left = new Number(leftCount.txt());
		if(left > 0){
			amountInput.val(toBuy+1);
			leftCount.txt(left-1);
		}
	});
	// -
	$("decreaseBtn").addEvent('click', function(){
		var amountInput = $("amountInput"), leftCount = $("leftCount");
		if(new Number(amountInput.val()) > 1){
			amountInput.val(new Number(amountInput.val())-1);
			leftCount.txt(new Number(leftCount.txt())+1);
		}
	});
	$("amountInput").addEvent('blur', function(){
		var ele = this, leftCount = $("leftCount");
		leftCount.txt(new Number(leftCount.txt()) - ele.val());
		if(new Number($("leftCount").txt()) < 0){
			leftCount.txt(0);
			ele.val($("totalCountInput").val());
		}
	});
	orderSubmitBtn.addEvent('click', function(){
		if($isEmpty($("addressInput"))){
			Ibox.alert("请选择收货地址");
		}else{
			$("confirmForm").submit();
		}
	})
}
// 选择货到付款
var deliverPayBtn = $("deliverPayBtn");
if($isEle(deliverPayBtn)){
	deliverPayBtn.addEvent('click', function(){
		var datas = this.attr('data').split('|'), sumId = datas[0], name = datas[1], cost = datas[2];
		Ibox.open({
			url: '<div class="p1 lh20 bbc f14">感谢您的购买，您将购买'+
					'<span class="g0"> &yen;'+cost+' </span>的'+name+'。'+
					'<div>您确认货到付款以后，我们将会联系您确认收货信息，祝您购物愉快！</div>'+
				 '</div>'+
				 '<div class="p1 tc">'+
				 	'<a id="cancelBtn" class="mr15 graybtn2 bdrad05" href="javascript:;">取消</a>'+
				 	'<a id="saveDeliverPayBtn" class="greenbtn bdrad05" href="javascript:;">确定</a>'+
				 '</div>',
			width: 260,
			title: '货到付款',
			onShow: function(){
				$("iboxBtnClose").out();
				$("cancelBtn").addEvent('click', function(){
					Ibox.close();
				})
				$("saveDeliverPayBtn").addEvent('click', function(){
					new AjaxPost(this, {
						url: '/ShopController/saveDeliverPayMode',
						data: {sumId: sumId}
					}).send();
				})
			}
		});
	});
}

// 微信支付
var wxPayBtn = $("wxPayBtn");
if($isEle(wxPayBtn)){
	wxPayBtn.addEvent('click', function(){
		if(!navigator.userAgent.contains('MicroMessenger/5.')){
			Ibox.open({
				url:'<div class="p1 lh20 bbc f14">不好意思，微信支付只支持5.0以上版本的客户端。</div>'+
					'<div class="p1 tc">'+
						'<a id="closeBtn" class="greenbtn bdrad05" href="javascript:;">确定</a>'+
					'</div>',
				width: 260,
				title: '微信付款',
				onShow: function(){
					$("iboxBtnClose").out();
					$("closeBtn").addEvent('click', function(){
						Ibox.close();
					})
				}
			});
		}else{
			var ele = this, datas = this.attr('data').split('|'), sumId = datas[0], name = datas[1], cost = datas[2];
			Ibox.open({
				url: '<div class="p1 lh20 bbc f14">感谢您的购买，您将购买'+
						'<span class="g0"> &yen;'+cost+' </span>的'+name+'。'+
						'<div>您确认微信付款以后，将直接在微信中支付订单！</div>'+
					'</div>'+
					'<div class="p1 tc">'+
						'<a id="cancelBtn" class="mr15 graybtn2 bdrad05" href="javascript:;">取消</a>'+
						'<a id="saveWCPayBtn" class="greenbtn bdrad05" href="javascript:;">确定</a>'+
					'</div>',
				width: 260,
				title: '微信付款',
				onShow: function(){
					this.closbtn.invisible();
					var ibox = this;
					$("cancelBtn").addEvent('click', function(){
						Ibox.close();
					})
					$("saveWCPayBtn").addEvent('click', function(){
						ibox.loading();
						new AjaxPost(this, {
							url: '/ShopController/saveWCPayMode',
							data: {sumId: sumId}
						}).send();
					})
				}
			});
		}
	})
}
// 确认收货
var jsForConfirmReceive = $$(".jsForConfirmReceive");
if($isArr(jsForConfirmReceive)){
	jsForConfirmReceive.addEvent('click', function(){
		var ele = this, sumId = this.attr('data');
		Ibox.open({
				url:'<div class="p1 lh20 bbc f14">您确认收货吗？</div>'+
					'<div class="p1 tc">'+
						'<a id="cancelBtn" class="mr15 graybtn2 bdrad05" href="javascript:;">取消</a>'+
						'<a id="confirmBtn" class="greenbtn bdrad05" href="javascript:;">确定</a>'+
					'</div>',
				width: 260,
				title: '确认收货',
				onShow: function(){
					this.closbtn.invisible();
					var ibox = this;
					$("cancelBtn").addEvent('click', function(){
						Ibox.close();
					})
					$("confirmBtn").addEvent('click', function(){
						ibox.loading();
						new AjaxPost(this, {
							url: '/ShopController/confirmReceive',
							data: {sumId: sumId},
							callback: function(json){
								if(json.succ){
									alert("操作成功");
									$pageFresh();
								}
							}
						}).send();
					})
				}
			});
	})
}
// 更多订单
var moreOrderSumBtn = $("moreOrderSumBtn");
if($isEle(moreOrderSumBtn) && moreOrderSumBtn.isInto()){
	moreOrderSumBtn.addEvent('click', function(){
		var ownerId = this.attr('data').split('|')[0], page = this.attr('data').split('|')[1];
		new AjaxPost(this, {
			url: '/ShopController/jsonMoreOrderSums',
			data: {
				ownerId: ownerId,
				page: page
			},
			callback: function(json){
				if(json.succ){
					new Element('div').html(json.html).inject(moreOrderSumBtn, 'before');
					if(new Number(json.pageCount) == new Number(page)){
						moreOrderSumBtn.out();
					}
				}
			}
		}).send();
	})
}
// 取消订单
var jsForCancelOrder = $$('.jsForCancelOrder');
if($isArr(jsForCancelOrder)){
	jsForCancelOrder.addEvent('click', function(){
		var ele = this, sumId = this.attr('data');
		Ibox.open({
			url:'<div class="p1 lh20 bbc f14">您确认取消订单吗？</div>'+
				'<div class="p1 tc">'+
					'<a id="cancelBtn" class="mr15 graybtn2 bdrad05" href="javascript:;">取消</a>'+
					'<a id="confirmBtn" class="greenbtn bdrad05" href="javascript:;">确定</a>'+
				'</div>',
			width: 260,
			title: '取消订单',
			onShow: function(){
				$("iboxBtnClose").out();
				$("cancelBtn").addEvent('click', function(){
					Ibox.close();
				})
				$("confirmBtn").addEvent('click', function(){
					new AjaxPost(ele, {
						url: '/ShopController/cancelOrderSum',
						data: {sumId: sumId},
						callback: function(json){
							if(json.succ){
								Ibox.alert("成功取消订单", function(){
									$pageFresh();
								});
							}else{
								alert(json.msg);
							}
						}
					}).send();
				})
			}
		});
	});
}
//抢购倒计时
var clockPerSecond = function(){
	if($isArr($$('.hotSecond'))){
		$$('.hotSecond').each(function(item){
			var secEle = item, minEle = item.getPrevious('.hotMinute'), hourEle = item.getPrevious('.hotHour'), dayEle = item.getPrevious('.hotDay'),
				sec = new Number(secEle.txt())+0, min = new Number(minEle.txt())+0, hour = new Number(hourEle.txt())+0, day = new Number(dayEle.txt())+0;
			if(sec == 0){
				if(min == 0){
					if(hour == 0){
						if(day == 0){
							// 抢购结束
						}else{
							day --;
							hour = 23;
							min = 59;
							sec = 59;
						}
					}else{
						hour --;
						min = 59;
						sec = 59;
					}
				}else{
					min --;
					sec = 59;
				}
			}else{
				sec --;
			}
			secEle.txt(sec < 10 ? '0'+sec : sec);
			minEle.txt(min < 10 ? '0'+min : min);
			hourEle.txt(hour < 10 ? '0'+hour : hour);
			dayEle.txt(day < 10 ? '0'+day : day);
		})
	}
};
if($isArr($$('.hotSecond'))){
	setInterval('clockPerSecond()', 1000);
}