//提取出常用的DOM对象
var list1 = $query("#packshower_list_1"),
    list2 = $query("#packshower_list_2");

//计算宽度方便后面程序请求图片
var _temp_w = list1.offsetWidth;

var getShowList = function(packshower_date){
  if (!packshower_date || packshower_date == null) {
      $query("#packshower").innerHTML = '<div class="no_packshower">未找到相关数据...</div>';
  } else {
      var list1_html = "",
          list2_html = "";

      for (var i = 0, j = packshower_date.length; i < j; i++) {
          
          //闭包起来，做个图片预加载，加载快的先显示
          (function(i){

              var shower_item = packshower_date[i];

              var _title = shower_item["title"],
                  _title = htmlspecialchars(_title);

              var _img_url = shower_item["img_url"],
                  _img_url = _img_url.replace("/origin/","/"+_temp_w+"_0/");

              var _up = shower_item["up"];
              var _id = shower_item["Id"];

              //先把图片干进去
              var paceshower_li = '<li id="li_'+_id+'" style="display:none;">\
                    <a href="packshower_detail.php?id='+shower_item["Id"]+'">\
                      <div class="shower-img"><img src="'+_img_url+'" alt=""></div>\
                      <div class="shower-info">\
                        <h3 class="title">'+_title+'</h3>\
                        <p class="time">'+shower_item["time"].split(" ")[0]+'</p>\
                        <span class="zan-room"><i class="zan-icon zan-g"></i>'+_up+'</span>\
                      </div>\
                    </a>\
                  </li>';
              if(i%2 === 0){
                  list1.appendHTML(paceshower_li);
              }else{
                  list2.appendHTML(paceshower_li);
              }

              var _img = new Image();
              _img.onload = function(){
                  $query("#li_"+_id).style.display = "block";
              }
              _img.src = _img_url;
          })(i);

      };

      //使用main.js中的扩展插入数据
      //list1.appendHTML(list1_html);
      //list2.appendHTML(list2_html);
  }
}

//ajax部分变量
var _documentElement_h = document.documentElement.clientHeight,
    _ajax_status = false,
    _page = 1;//默认当前页为第一页

window.onscroll = function(){
    var _t = document.body.scrollTop,
        _list1_h = list1.offsetHeight,
        _list2_h = list2.offsetHeight,
        _lower_h = _list1_h > _list2_h ? _list2_h : _list1_h,
        _ajax_h = _lower_h - _documentElement_h - 10;

    if(_t > _ajax_h && !_ajax_status){
        _ajax_status = true;
        //ajax
        console.log(1);

        //ajax请求分页数据
        getAjaxData({
            type:"post",
            url:"ajax_data_func.php",
            data:"name=packshower&type=list&p="+_page,
            dataType:"json",
            success:function(data){
                if(data){
                    _page++;

                    getShowList(data);
                    /*var _json = data,
                      _innerhtml = "";
                    for(var i=0,j=_json.length;i<j;i++){
                      _innerhtml += '<li><p>'+htmlspecialchars(_json[i].content)+'</p><p class="time">'+_json[i].time+'</p></li>';
                    }
                    _list.appendHTML(_innerhtml);*/

                    //初始化一些计算变量等。
                    //_h = _list.offsetHeight;
                    //_ajax_h = _h - _documentElement_h - 100;
                    _ajax_status = false;
                }else{
                    $query("#J_loading").style.display = "none";
                }
            }
        });

    }else{
        return;
    }
}































