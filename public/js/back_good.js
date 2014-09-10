/* 商品管理 */
var goodFilter = $("goodFilter");
// 筛选
goodFilter.addEvent('change', function(){
	new AjaxPost(this,{
		url: '/AdminController/filterGoods',
		data: {goodFilter: this.val()}
	}).send();
});
// 搜索
$('searchGoodBtn').addEvent('click', function(){
	new AjaxPost(this, {
		url: '/AdminController/filterGoods',
		data: {
			name: searchNameInput.val().trim(), 
			shopId: $isEle($("searchShopInput")) ? $("searchShopInput").val() : 0,
			goodFilter: $("goodFilter").val()
		}
	}).send();
});

//预览商品
var previewGoodBtn=$$(".previewGoodBtn")
if($isArr(previewGoodBtn)){
	previewGoodBtn.addEvent('click',function(){
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




// 删除商品
removeData(function(){
	new AjaxPost($("iboxConfirmOk"), {
		url: '/AdminController/removeGoods',
		data: { goodIds : $$(".jsForCheck:checked").attr('data')},
		callback: function(json){
			var ids = $$(".jsForCheck:checked").attr('data');
			ids.each(function(item){
				$("goodChk_"+item).dispose();
				$("good_"+item).dispose();
			})
			$("dataCount").txt(new Number($("dataCount").txt())-ids.length);
			if(json.succ){
				Ibox.alert("删除成功");
			}else{
				Ibox.alert("删除成功，但是编号为："+json.msg+"的商品已经被删除");
			}
		}
	}).send();
});
// 抢购设置
var jsForHotSetting = $$(".jsForHotSetting");
if($isArr(jsForHotSetting)){
	jsForHotSetting.addEvent('click', function(){
		var hotDatas = null == this.attr('hot') ? null : this.attr('hot').split('|');
		var datas = this.attr('data').split('|'), goodId = datas[0], name = datas[1], leftCount = datas[2], realPrice = datas[3];
		Ibox.open({
			url:
				'<div class="tc">'+
					'<article class="pl10 mt20 mb20">'+
						'<ul>'+
							'<li class="mb15">'+
		                    	'<span class="dib w70 tr">'+
									'商品名称：'+
		                        '</span><div style="display:inline-block;width:280px;text-align:left">'+ name +"</div>"+
							'</li>'+
							'<li class="mb15">'+
		                    	'<span class="dib w70 tr">'+
		                        	'<span class="cr">*</span>'+
									'总数：'+
		                        '</span>'+
								'<div style="width:280px;display:inline-block;text-align:left;">'+
									'<input id="countInput" class="jsForNumber" type="text" style="height:20px;border:1px solid #D2D2D2;" value="'+(null == hotDatas ? '' : hotDatas[0])+'"/>（商品剩余数量：'+leftCount+'）'+
								'</div>'+
							'</li>'+
		                    '<li class="mb15">'+
		                    	'<span class="dib w70 tr">'+
		                        	'<span class="cr">*</span>'+
									'闪购价：'+
		                        '</span>'+
		                        '<div style="width:280px;display:inline-block;text-align:left;">'+
									'<input id="hotPriceInput" class="jsForPrice" type="text" style="height:20px;border:1px solid #D2D2D2;" value="'+(null == hotDatas ? '' : hotDatas[1])+'"/>（商品现价：&yen;&nbsp;'+realPrice+'）'+
								'</div>'+
							'</li>'+
							'<li class="mb15">'+
		                    	'<span class="dib w70 tr">'+
		                        	'<span class="cr">*</span>'+
									'截止时间：'+
		                        '</span>'+
								'<div style="width:280px;display:inline-block;text-align:left;">'+
		                        	'<input id="endTimeInput" type="text" readonly style="height:20px; border:1px solid #D2D2D2;" value="'+(null == hotDatas ? '' : hotDatas[2].split('_')[0])+'"/>'+
		                        	'<select id="hourSel"></select>&nbsp:&nbsp;'+
		                        	'<select id="minuteSel"></select>'+
		                        '</div>'+
							'</li>'+
						'</ul>'+
						'<div class="pt10 ml20"><a id="saveHotBtn" class="bluebtn btn_m bdrad3" href="javascript:;">保存</a></div>'+
					'</article>'+
				'</div>', 
				width: 450, 
				title: '闪购设置',
				onShow: function(){
					new Datepicker($("endTimeInput"), $("endTimeInput"), {showMode: 'all'});
					var h='', m='', show='';
					for(var i=0;i<24;i++){
						show= i < 10 ? ('0'+i) : i;
						h+='<option value="'+show+'" '+(null == hotDatas ? '' : (hotDatas[2].split('_')[1] == show ? 'selected' : ''))+'>'+show+'</option>';
					}
					for(var i=0;i<12;i++){
						show=(i < 2 ? '0' : '')+i*5;
						m+='<option value="'+show+'" '+(null == hotDatas ? '' : (hotDatas[2].split('_')[2] == show ? 'selected' : ''))+'>'+show+'</option>';
					}
					$("hourSel").html(h);
					$("minuteSel").html(m);
					
					checkInputNumber();
					
					var saveHotBtn = $("saveHotBtn");
					saveHotBtn.addEvent('click', function(){
						var endTimeInput = $("endTimeInput"), hour = $("hourSel").val(), min = $("minuteSel").val(), hotPriceInput = $("hotPriceInput"), countInput = $("countInput");
						if($isEmpty(countInput)){
							$testRemind(countInput, "闪购数量不能为空", 1);
							setTimeout('$testRemind.hide()', 3000);
						}else if(new Number(countInput.val()) > new Number(leftCount)){
							$testRemind(countInput, "闪购数量不能超过总数量", 1);
							setTimeout('$testRemind.hide()', 3000);
						}else if($isEmpty(hotPriceInput)){
							$testRemind(hotPriceInput, "闪购价不能为空", 1);
							setTimeout('$testRemind.hide()', 3000);
						}else{
							new AjaxPost(this,{
								url: '/AdminController/setHotBuy',
								data:{
									goodId: goodId,
									hotPrice: hotPriceInput.val().trim()*100,
									leftCount: countInput.val().trim(),
									endTime: endTimeInput.val().trim()+" "+hour+":"+min+":00"
								},
								callback: function(json){
									if(json.succ){
										Ibox.alert("保存成功", function(){$pageFresh()});
									}else{
										Ibox.alert(json.msg);
									}
								}
							}).send();
						}
					})
				}
		});
	})
}