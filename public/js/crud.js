if($isEle($("checkAllBtn"))){
	// 全选、反选
	var checkFun = function(){
		var checkAllBtn = $("checkAllBtn"), checkAllChk = $("checkAllChk");
		if(checkAllBtn.retrieve('checkAll') === 'true'){
			$$('.jsForCheck').each(function(item){
				if(item.checked){
					item.checked = false;
				}
			});
			checkAllBtn.txt('全选');
			checkAllBtn.store('checkAll', 'false')
			checkAllChk.checked = false;
		}else{
			$$('.jsForCheck').each(function(item){
				if(!item.checked){
					item.checked = true;
				}
			});
			checkAllBtn.txt('反选');
			checkAllBtn.store('checkAll', 'true');
			checkAllChk.checked = true;
		}
	};
	$("checkAllBtn").addEvent('click', function(){
		checkFun();
	});
	$("checkAllChk").addEvent('click', function(){
		checkFun();
	});
	$$('.jsForCheck').addEvent('click', function(){
		var checkAllChk = $("checkAllChk");
		if(!this.checked){
			if(checkAllChk.checked){
				checkAllChk.checked = false;
			}
		}
	});
	// 删除确认框
	var removeData = function(fn){
		var removeBtn = $("removeBtn");
		removeBtn.addEvent('click', function(){
			if($$(".jsForCheck:checked").length == 0){
				Ibox.alert('请选择要删除的记录');
			}else{
				Ibox.confirm('<span class="f14">您确定要删除选中的记录吗？</span><div style="font-size:12px;color:red;padding-top:20px;padding-bottom:20px;">注意：删除操作会级联删除选中记录的关联数据。</div>', function() {
					if(typeof(fn) === 'function'){
						fn();
					}
				},"",{title : "删除"});
			}
		});
	};
}