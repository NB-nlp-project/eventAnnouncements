var checkInputNumber = function(){
	// 价格字符串格式（小数点后最多两位）
	$$('.jsForPrice').addEvents({
		'keypress': function(ev){
			var result;
			if(this.val().length === 0 || this.val().test('\\.')){// 只能有1个点号
				result = ev.code>=48&&ev.code<=57 || ev.code==8;
			}else{
				result = ev.code>=48&&ev.code<=57||ev.code==8||ev.code==46;
			}
			return result;
		},
		'keyup': function(ev){
			if(this.val().test('\\.')){
				if(this.val().split('.')[1].length>2){
					this.val(this.val().substring(0, this.val().length-1))
				}
			}
//			console.log(this.val().test('^[0-9]+(\\.[0-9]{1,2}){0,1}$'))
		}
	});
	// 只允许输入整数
	$$(".jsForNumber").addEvents({
		'keypress': function(ev){
			return ev.code>=48&&ev.code<=57||ev.code==8;
		}
	})
};
checkInputNumber();