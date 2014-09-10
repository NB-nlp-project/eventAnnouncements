/* 商铺管理 */
// 重置密码
if($isArr($$('.jsForPwdReset'))){
	$$('.jsForPwdReset').addEvent('click', function(){
		var ele = this;
		Ibox.confirm('<span class="f14">您确定要重置密码？</span>', function() {
			new AjaxPost(ele, {
				url: '/AdminController/resetPassword',
				data:{
					shopId: ele.attr('data')
				},
				callback: function(json){
					Ibox.close();
					$testRemind(ele, "密码重置成功", 1);
					setTimeout('$testRemind.hide()',3000);
				}
			}).send()
		},"",{title : "重置密码"});
	});
}
//删除
removeData(function(){
	new AjaxPost($("iboxConfirmOk"), {
		url: '/AdminController/removeShops',
		data: { shopIds : $$(".jsForCheck:checked").attr('data')},
		callback: function(json){
			var ids = $$(".jsForCheck:checked").attr('data');
			ids.each(function(item){
				$("shop_"+item).dispose();
			})
			$("dataCount").txt(new Number($("dataCount").txt())-ids.length)
			if(json.succ){
				Ibox.alert("删除成功");
			}else{
				Ibox.alert("删除成功，但是编号为："+json.msg+"的商铺已经被删除");
			}
		}
	}).send();
});
// 上传回调
var iFrameCallBack = function(uploadResult) {
	var origin = uploadResult.split('|')[0], preview=uploadResult.split('|')[1], p = $("avatarEle");
	p.attr("origin", origin);
	p.attr("src", preview);
};
// 保存商铺
var saveShop = function(){
	var saveShopBtn = $("saveShopBtn");
	if($isEle(saveShopBtn)){
		//上传头像
		$("fileInput").addEvent('change', function(){
			this.getParent('form#uploadForm').submit();
		});
		$("uploadBtn").addEvent('click', function(){
			$(this.attr('rel')).click();
		});
		saveShopBtn.addEvent('click', function(){
			var shopNameInput = $("shopNameInput"), loginNameInput = $("loginNameInput"), memoInput = $("memoInput");
			if($isEmpty(shopNameInput)){
				$testRemind(shopNameInput, "店名不能为空", 1);
				setTimeout('$testRemind.hide()',3000);
			}else if($isEmpty(loginNameInput)){
				$testRemind(loginNameInput, "登录名不能为空", 1);
				setTimeout('$testRemind.hide()',3000);
			}else{
				new AjaxPost(saveShopBtn, {
					url: '/AdminController/saveShop',
					data: {
						shopId: $("shopIdInput").val(),
						shopName: shopNameInput.val().trim(),
						loginName: loginNameInput.val().trim(),
						memo: memoInput.val().trim(),
						avatarURL: $("avatarEle").attr("origin")
					},
					callback: function(json){
						if(json.succ){
							Ibox.alert("修改成功");
						}else{
							$testRemind(loginNameInput, "该登录名已经存在", 1);
							setTimeout('$testRemind.hide()',3000);
						}
					}
				}).send();
			}
		})
	}
};
var editShop = function(trigger, shopId, iboxTitle){
	new AjaxPost(trigger, {
		url: '/AdminController/jsonEditShopPage',
		data:{shopId: shopId},
		callback: function(json){
			if(json.succ){
				var html = json.html;
				Ibox.open({
					url: html, 
					width: 400, 
					title: iboxTitle,
					onShow: function(){
						saveShop();
					}
				});
			}
		}
	}).send();
};
// 添加商铺
//$('addShopBtn').addEvent('click', function(){
//	editShop(this, 0, '添加商铺');
//})
$('addShopBtn').click(function(){
	editShop(this, 0, '添加商铺');
})
// 编辑
$("editShopBtn").addEvent('click', function(){
	if($$(".jsForCheck:checked").length == 0){
		Ibox.alert('请选择要编辑的商铺');
	}else if($$(".jsForCheck:checked").length > 1){
		Ibox.alert('编辑时只能选择1个商铺');
	}else{
		editShop(this, $$(".jsForCheck:checked")[0].attr('data'), '编辑商铺');
	}
});
