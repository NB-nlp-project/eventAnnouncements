var oldNonceStr, oldTimeStamp;
function getAppId()
{
    return $("#appIdInput").val();
}
function getTimeStamp()
{
    var timestamp=new Date().getTime();
    var timestampstring = timestamp.toString();//一定要转换字符串
    oldTimeStamp = timestampstring;
    return oldTimeStamp;
}
function getNonceStr()
{
    var $chars = 'testwcpaynonce';
    var maxPos = $chars.length;
    var nonceStr = "";
    for (i = 0; i < 32; i++) {
        nonceStr += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    oldNonceStr=nonceStr;
    return oldNonceStr;
}
function getAccessToken()
{
	return $("#atInput").val();
}
function getURL()
{
	return $("#urlInput").val();
}
function getAddrSign()
{
    //第一步，对所有需要传入的参数加上appkey作一次key＝value字典序的排序
    var keyvaluestring = "accesstoken="+getAccessToken().toString()
    					+"&appid="+getAppId().toString()
    					+"&noncestr="+oldNonceStr
    					+"&timestamp="+oldTimeStamp
    					+"&url="+getURL();
    sign = CryptoJS.SHA1(keyvaluestring).toString();
    return sign;
}
//当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
//	alert('here it is');
	getTimeStamp();
	getNonceStr();
	WeixinJSBridge.invoke('editAddress',{
		 	"appId": getAppId().toString(),
		    "scope": "jsapi_address", // 获得编辑地址权限
		    "signType": "sha1",
		    "addrSign": getAddrSign(),
		    "timeStamp": oldTimeStamp,
		    "nonceStr": oldNonceStr
		}, function(res){
//			if(res.msg === 'get_brand_grant_info:fail' || res.msg === 'editAddress:fail' || 'edit_address:fail'){
			if(res.err_msg === 'edit_address:ok'){
				save2WeshopDB(res.userName, 
						res.telNumber, 
						res.nationalCode, 
						res.proviceFirstStageName+'-'+res.addressCitySecondStageName+'-'+res.addressCountiesThirdStageName,
						res.addressDetailInfo);
			}else{
				alert('不好意思，微信收货地址编辑失败，请选择收货地址');
				window.location.href=$("#weshopAddrURLInput").val();
			}
		}
	);
	WeixinJSBridge.log('yo~ address\'s ready.');
}, false);
function save2WeshopDB(name, cellphone, postCode, location, detailAddress)
{
	$.ajax({
		url: "/APIController/saveWCAddress",
		dataType: "json",
		data: {
			goodId: $("#goodIdInput").val(),
			hotId: $("#hotIdInput").val(),
			ownerId: $("#ownerIdInput").val(),
			name: name,
			cellphone: cellphone,
			postCode: postCode,
			location: location,
			address: detailAddress
		},
		async: true,
		success: function(data){
			var result = eval(data);
			if(data.succ){
				window.location.href=data.msg;
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert("服务器异常");
		}
	});
}