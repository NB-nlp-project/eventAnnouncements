// 输入框字数统计
$$(".jsForCount").addEvent('keyup', function(){
	this.getNext('span').txt(30 - this.val().length);
	if(this.val().length > 30){
		this.getNext('span').swapClass('cg', 'cr');
	}else{
		this.getNext('span').swapClass('cr', 'cg');
	}
});
// 上传图片、预览
var iFrameCallBack = function(uploadResult) {
	var target = uploadResult.split('|')[0], p = $("uploadedPic"+target), isLegal = uploadResult.split('|')[3];
	if(isLegal === "false"){
		$testRemind($("uploadTrigger"+target), "图片大小请控制在500k以内", 1);
		setTimeout('$testRemind.hide()',3000);
	}else{
		p.attr("origin", uploadResult.split('|')[1]);
		p.attr("src", uploadResult.split('|')[2]);
		p.into();
		p.removeEvents('click');
		p.addEvent('click', function(){
			$(this.attr('rel')).click();
		})
		$$(".uploadBtn"+target).out();
		$('removePicBtn'+target).attr('data', target);
		$('removePicBtn'+target).removeClass('abs_out');
	}
};

$$(".jsForUpload").addEvent('change', function(){
	this.getParent('form.uploadForm').submit();
});
$$(".uploadBtn").addEvent('click', function(){
	$("#"+this.attr('rel')).click();
});
$$('.jsForUploaded').addEvent('click', function(){
	$(this.attr('rel')).click();
});
$$('.jsForRmPic').addEvent('click', function(){
	var target = this.attr('data');
	$('uploadedPic'+target).out();
	$('uploadedPic'+target).attr('origin','').attr('src','');
	$$('.uploadBtn'+target).into();
	this.addClass('abs_out');
});
// 发布商品
var addGoodBtn = $$(".addGoodBtn");
addGoodBtn.addEvent('click', function(){
	var mainPicDiv = $("mainPicDiv"), previewPicDiv = $("previewPicDiv"), nameInput = $("nameInput"), chiefInput = $("chiefInput"), showPriceInput = $("showPriceInput"), realPriceInput = $("realPriceInput"), leftCountInput = $("leftCountInput"), descrArea = $("descrArea");
	if($isEmpty(nameInput)){
		$testRemind(nameInput, "请输入商品名称", 1);
		setTimeout('$testRemind.hide()',3000);
	}else if($isEmpty(chiefInput)){
		$testRemind(chiefInput, "请输入副标题", 1);
		setTimeout('$testRemind.hide()',3000);
	}else if($isEmpty(showPriceInput) || new Number(showPriceInput.val()*100) > 2000000 || new Number(showPriceInput.val()*100) < 1){
		$testRemind(showPriceInput, "一口价必须在1元-20000元之间", 1);
		setTimeout('$testRemind.hide()',3000);
	}else if($isEmpty(realPriceInput) || new Number(realPriceInput.val()*100) > 2000000 || new Number(realPriceInput.val()*100) < 1){
		$testRemind(realPriceInput, "微店价必须在1元-20000元之间", 1);
		setTimeout('$testRemind.hide()',3000);
	}else if($isEmpty(leftCountInput) || new Number(leftCountInput.val()) < 0){
		$testRemind(leftCountInput, "库存必须大于等于0", 1);
		setTimeout('$testRemind.hide()',3000);
	}else if($isEmpty(descrArea)){
		$testRemind(descrArea, "请输入商品描述", 1);
		setTimeout('$testRemind.hide()',3000);
	}else if(previewPicDiv.getElement('img').attr('origin').length == 0){
		$testRemind(previewPicDiv, '您必须上传&nbsp;<span class="co">1</span>&nbsp;张商品预览图', 1);
		setTimeout('$testRemind.hide()',3000);
	}else if(mainPicDiv.getElement('img').attr('origin').length == 0){
		$testRemind(mainPicDiv, '您必须上传&nbsp;<span class="co">1</span>&nbsp;张商品主图', 1);
		setTimeout('$testRemind.hide()',3000);
	}else{
		var picUrls = '';
		$$('div.commPic img').each(function(item){
			if(item.attr('origin').length>0){
				picUrls += item.attr('origin') + ',';
			}
		})
		if(picUrls.length>0){
			picUrls = picUrls.substring(0, picUrls.length-1);
		}
		new AjaxPost(addGoodBtn, {
			url: '/AdminController/saveGood',
			data: {
				goodId: $("goodIdInput").val(),
				name: nameInput.val().trim(),
				chief: chiefInput.val().trim(),
				showPrice: new Number(showPriceInput.val().trim())*100,
				realPrice: new Number(realPriceInput.val().trim())*100,
				leftCount: leftCountInput.val().trim(),
				descr: ue.getContent(),
				isNew: $('isNewRadio').checked,
				isUnique: $('isUniqueRadio').checked,
				isPublished: $("isPublishedChk").checked,
				imageURL: mainPicDiv.getElement('img').attr('origin'),
				previewURL: previewPicDiv.getElement('img').attr('origin'),
				picUrls: picUrls.length>0?picUrls:null
			},
			callback: function(json){
				if(json.succ){
					Ibox.alert(json.msg, function(){$pageFresh();});
				}
			}
		}).send();
	}
});

var previewGoodBtn = $$("previewGoodBtn");
previewGoodBtn.addEvent('click', function(){
	var mainPicDiv = $("mainPicDiv"), previewPicDiv = $("previewPicDiv"), nameInput = $("nameInput"), chiefInput = $("chiefInput"), showPriceInput = $("showPriceInput"), realPriceInput = $("realPriceInput"), leftCountInput = $("leftCountInput"), descrArea = $("descrArea");
	if($isEmpty(nameInput)){
		$testRemind(nameInput, "请输入商品名称", 1);
		setTimeout('$testRemind.hide()',3000);
	}else if($isEmpty(chiefInput)){
		$testRemind(chiefInput, "请输入副标题", 1);
		setTimeout('$testRemind.hide()',3000);
	}else if($isEmpty(showPriceInput) || new Number(showPriceInput.val()*100) > 2000000 || new Number(showPriceInput.val()*100) < 1){
		$testRemind(showPriceInput, "一口价必须在1元-20000元之间", 1);
		setTimeout('$testRemind.hide()',3000);
	}else if($isEmpty(realPriceInput) || new Number(realPriceInput.val()*100) > 2000000 || new Number(realPriceInput.val()*100) < 1){
		$testRemind(realPriceInput, "微店价必须在1元-20000元之间", 1);
		setTimeout('$testRemind.hide()',3000);
	}else if($isEmpty(leftCountInput) || new Number(leftCountInput.val()) < 0){
		$testRemind(leftCountInput, "库存必须大于等于0", 1);
		setTimeout('$testRemind.hide()',3000);
	}else if($isEmpty(descrArea)){
		$testRemind(descrArea, "请输入商品描述", 1);
		setTimeout('$testRemind.hide()',3000);
	}else if(previewPicDiv.getElement('img').attr('origin').length == 0){
		$testRemind(previewPicDiv, '您必须上传&nbsp;<span class="co">1</span>&nbsp;张商品预览图', 1);
		setTimeout('$testRemind.hide()',3000);
	}else if(mainPicDiv.getElement('img').attr('origin').length == 0){
		$testRemind(mainPicDiv, '您必须上传&nbsp;<span class="co">1</span>&nbsp;张商品主图', 1);
		setTimeout('$testRemind.hide()',3000);
	}else{
		var picUrls = '';
		$$('div.commPic img').each(function(item){
			if(item.attr('origin').length>0){
				picUrls += item.attr('origin') + ',';
			}
		})
		if(picUrls.length>0){
			picUrls = picUrls.substring(0, picUrls.length-1);
		}
		new AjaxPost(previewGoodBtn, {
			url: '/AdminController/jsonGoodSavePreview',
			data: {
				name: nameInput.val().trim(),
				chief: chiefInput.val().trim(),
				showPrice: new Number(showPriceInput.val().trim())*100,
				realPrice: new Number(realPriceInput.val().trim())*100,
				leftCount: leftCountInput.val().trim(),
				descr: ue.getContent(),
				imageURL: mainPicDiv.getElement('img').attr('origin'),
				picUrls: picUrls.length>0?picUrls:null
			},
			callback: function(json){
				if(json.succ){
					Ibox.open({
						url: json.html,
						width: 420, 
						title: '商品预览'
					});
					Ibox.reposition();
				}
			}
		}).send();
	}
});