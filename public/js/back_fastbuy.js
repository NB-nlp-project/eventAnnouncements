//newAjax
Do.add('newAjax', {path: '/public/js/min/newAjax.js', type: 'js'});

var delSite=function(node){
	node.click(function(){
		var ele=$(this);
		Do('newAjax', function(){
			$.newAjax(this,{
				url: "/AdminController/delSite",
				data:{
					id:ele.attr("date")
				},
				callback: function(json){
					if(json.succ){
						ele.parent().parent().remove();
					}
				}
			});	
		});
	})
}
delSite($("a[id='delSite']"));

var addSitFastGood=function(){
	$("#addSiteGood").click(function(){
		Do('newAjax', function(){
			$.newAjax(this,{
				url: "/AdminController/addSitFastGood",
				data:{
					fastGoodId:$("#fastGoodId").attr("date"),
					deliveryPointId:$(".site").val(),
					sitGoodNum:$("#sitGoodNum").val()
				},
				callback: function(json){
					if(json.succ){
						$("#siteList").parent().append(json.html);
						editSiteInventory($("#siteList").nextAll().find(".editSiteInventory"));
					}
				}
			});	
		});
	})
}
addSitFastGood();

//编辑站点货品量
var editSiteInventory=function(node){
	node.click(function(){
		ele=$(this);
		ele.prev().remove();
		ele.before('<td><input type="text" id="sitGoodNum" ></td>');
		ele.prev().children().change(function(e){
			Do('newAjax', function(){
				$.newAjax(this,{
					url: "/AdminController/updateSiteInventory",
					data:{
						deliveryPoint_FastGoodId : ele.parent().attr("date"),
						num : ele.prev().children().val()
					},
					callback: function(json){
						if(json.succ){
							ele.before('<td>'+node.prev().children().val()+'</td>');
							ele.prev().prev().remove();
						}
					}
				});	
			});
		});
	})
}
editSiteInventory($("#siteList").nextAll().find(".editSiteInventory"));

//提货管理
var manageDeliveryFastGood=function(){
	$("#submitDeliverPassWord").click(function(){
		Do('newAjax', function(){
			$.newAjax(this,{
				url: "/AdminController/completeDelivery",
				data:{
					deliveryPointId:$("#deliveryPointId").attr("value"),
					deliveryPassWord:$("#deliveryPassWord").val().replace(/\s+/g,"")
				},
				callback: function(json){
					if(json.succ){
						confirm(json.html);
						location.reload();
					}else{
						alert(json.html);
					}
				}
			});	
		});
	})
}
manageDeliveryFastGood();

//向用户发送消息
var sendMessageByOpenId=function(){
	$(".sendMessage").click(function(){
		Do('newAjax', function(){
			$.newAjax(this,{
				url: "/AdminController/sendMessageToUsr",
				data:{
					usrOpenId:$("#usrOpenId").attr("date"),
					messageContent:$(".messageContent").val()
				},
				callback: function(json){
					if(json.succ){
						alert("发送成功");
					}else{
						alert("发送失败");
					}
				}
			});	
		});
	})
}
sendMessageByOpenId();

