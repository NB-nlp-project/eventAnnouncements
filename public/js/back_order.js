/* 订单管理 */
var orderFilter = $("orderFilter");
if($isEle(orderFilter)){
	new Datepicker($("dateFromInput"), $("dateFromInput"), {showMode: 'pass'});
	new Datepicker($("dateToInput"), $("dateToInput"), {showMode: 'pass'});
// 筛选
	orderFilter.addEvent('change', function(){
		var dateFrom = $("dateFromInput"), dateTo = $("dateToInput");
		new AjaxPost(this,{
			url: '/AdminController/filterOrders',
			data: {
				orderFilter: this.val(), 
				goodName: $("goodNameInput").val(),
				orderSerial: $("orderSerialInput").val(),
				dateFrom: $("dateFromInput").val(),
				dateTo: $("dateToInput").val()
			}
		}).send();
	});
// 订单查询
	var searchOrderBtn = $("searchOrderBtn");
	searchOrderBtn.addEvent('click', function(){
		new AjaxPost(this,{
			url: '/AdminController/filterOrders',
			data: {
				orderFilter: $("orderFilter").val(),
				goodName: $("goodNameInput").val(),
				orderSerial: $("orderSerialInput").val(),
				dateFrom: $("dateFromInput").val(),
				dateTo: $("dateToInput").val()
			}
		}).send();
	});
}
// 发货
var deliverBtn = $("deliverBtn");
if($isEle(deliverBtn)){
	deliverBtn.addEvent('click', function(){
		Ibox.confirm('<span class="f14">您确定发货吗？</span>', function() {
			this.loading();
			new AjaxPost(this.ConfirmBtnOk, {
				url: '/APIController/deliverOrderSum',
				data: {orderSumId: deliverBtn.attr('data')},
				callback: function(json){
					if(json.succ){
						Ibox.alert('发货成功！', function(){
							$pageFresh();
						})
					}else{
						Ibox.alert('不好意思，发货出了点问题，请重试。')
					}
				}
			}).send();
		},"",{title : "确认发货"});
	});
}
// 取消订单
var cancelBtn = $("cancelBtn");
if($isEle(cancelBtn)){
	cancelBtn.addEvent('click', function(){
		Ibox.confirm('<span class="f14">您确定取消订单吗？</span>', function() {
			this.loading();
			new AjaxPost(this.ConfirmBtnOk, {
				url: '/AdminController/cancelOrderSum',
				data: {orderSumId: cancelBtn.attr('data')},
				callback: function(json){
					if(json.succ){
						Ibox.alert('订单取消成功！', function(){
							$pageFresh();
						})
					}else{
						Ibox.alert(json.msg);
					}
				}
			}).send();
		},"",{title : "取消订单"});
	})
}


//在订单详情里预览商品
var showdetail=$("showdetail")
if($isEle(showdetail)){
	showdetail.addEvent('click',function(ele){
		var ele=this;
		Ibox.open({
			url:'<div id="previewBox"></div>',
			title: '商品预览',
			width: 420,
			onShow: function(){
				Ibox.reposition();
				new AjaxPost(ele, {
					url : '/AdminController/jsonGoodPreview',
					data: {goodId: ele.attr('data')},
					callback: function(json){
						if(json.succ){
							$("previewBox").html(json.html);
								Ibox.reposition();
							}
						}
				}).send();
			}
		});
	});
}