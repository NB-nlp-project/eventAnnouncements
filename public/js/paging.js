// 跳页
if($isEle($("jump2PageBtn"))){
	$("jump2PageBtn").addEvent('click', function(){
		var jumpPageInput = $("jumpPageInput"), page = new Number(jumpPageInput.val()), pageCount = this.attr('data').split('|')[0], url = this.attr('data').split('|')[1], argName = this.attr('data').split('|')[2];
		if($isEmpty(jumpPageInput) || page < 1 || page > pageCount){
			$testRemind(jumpPageInput, "页码不合法", 3);
			setTimeout('$testRemind.hide()',3000);
		}else{
			window.location.href=url+ (url.contains('?') ? "&" : '?') +argName+"="+page;
		}
	});
}