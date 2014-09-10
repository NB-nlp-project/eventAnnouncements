/*
 ************ Tyz 1.0 beta ************
 */

/* 配置预编项 */
var errTxt = {
    _null: "该项不允许为空",
    _range_err: function(a, b) {
        return "该项必须为" + a + "－" + b + "个字符";
    },
    _size_err: function() {
        return "您所填的数值超出了范围,请填写真实数据";
    },
    _email: "邮箱格式不正确",
    _telnum: "手机号码格式错误",
    _number: "请输入数值",
    _pwd: "密码格式不正确",
    _telre: "该手机号码已被注册",
    _repwd: "密码输入不一致",
    _select: "该项为必选项"
}

var RegList = {
    EMAIL: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
    NUMBER: /^(-?\d+)(\.\d+)?$/,
    TEL: /^1[3|4|5|8][0-9]\d{8}$/,
    PWD: /^[\@A-Za-z0-9\!\_\-\#\$\%\^\&\*\.\~]{6,22}$/
}

/* 验证处理方法 */
var TyzFunc = {
    //是否为空
    _null: function(obj, value) {
        if (value == "") {
            this._error(obj, errTxt._null);
            return false;
        }
        return true;
    },
    //字符限制
    _range: function(obj, range, count) {
        var _int = range.split(",");
        if (_int[0] == 0) {
            if (count > _int[1]) {
                this._error(obj, errTxt._range_err(_int[0], _int[1]));
                return false;
            }
        } else if (count < _int[0] || count > _int[1]) {
            this._error(obj, errTxt._range_err(_int[0], _int[1]));
            return false;
        }
        return true;
    },
    //正则处理办法
    _Regyz: function(obj, value, reg, errtxt) {
        if (value) {
            var r = value.match(reg);
            if (r === null) {
                this._error(obj, errtxt);
                return false;
            }
        }
        return true;
    },
    //数值大小比较
    _Size: function(obj, size, value) {
        var _int = size.split(",");
        //转换字符为数值
        _int[0] = parseFloat(_int[0]);
        _int[1] = parseFloat(_int[1]);
        value = parseFloat(value);
        //判断大小
        if (value) {
            if (_int[0] == 0) {
                if (value > _int[1]) {
                    this._error(obj, errTxt._size_err());
                    return false;
                }
            } else if (value < _int[0] || value > _int[1]) {
                this._error(obj, errTxt._size_err());
                return false;
            }
        }
        return true;
    },
    //统一处理错误信息
    _error: function(obj, title) {
        var _txt_room = obj.nextAll(".yztxt");
        if (_txt_room.length > 0) {
            _txt_room.html(title).removeClass("Tright").addClass("Terror");
        } else if (obj.attr("TyzErrId")) {
            $("#" + obj.attr("TyzErrId")).html(title).removeClass("Tright").addClass("Terror");
        } else {
            if (!obj.attr("TyzTxtRoomId") || obj.attr("TyzTxtRoomId") == "undefined") {
                var _temp_id;

                //随机ID函数
                function randomId() {
                    _temp_id = "KTR" + parseInt(Math.random() * 100000);
                    if ($("#" + _temp_id).length > 0) { //如果ID已存在
                        randomId(); //调用自己再生成一个
                    }
                };
                randomId();

                obj.attr("TyzTxtRoomId", _temp_id);
                var _TyzErrRoom = $('<div class="TyzErrTxt" id="' + _temp_id + '"><span class="title">' + title + '</span><i></i></div>');
                $("body").append(_TyzErrRoom);
                _TyzErrRoom.css({
                    left: obj.offset().left,
                    top: obj.offset().top - 35
                }).delay(2000).fadeOut(200);

                if ($(".TyzErrTxt:visible").length > 1) {
                    _TyzErrRoom.hide();
                }
            } else {
                if ($(".TyzErrTxt:visible").length < 1) {
                    $("#" + obj.attr("TyzTxtRoomId")).show().delay(2000).fadeOut(200);
                }
                $("#" + obj.attr("TyzTxtRoomId")).find("span.title").html(title);
            }
        }
    },
    //统一处理正确信息
    _right: function(obj) {
        var _txt_room = obj.nextAll(".yztxt");
        if (_txt_room.length > 0) {
            _txt_room.html("验证通过").removeClass("Terror").addClass("Tright");
        } else if (obj.attr("TyzErrId")) {
            $("#" + obj.attr("TyzErrId")).html("验证通过").removeClass("Terror").addClass("Tright");
        } else {
            if (obj.attr("TyzTxtRoomId") != "undefined") {
                /*$("#"+obj.attr("TyzTxtRoomId")).fadeOut(400,function(){
					$(this).remove();
				});*/
                $("#" + obj.attr("TyzTxtRoomId")).remove();
                obj.attr("TyzTxtRoomId", "");
            }
        }
    },
    //统一处理ajax等待事件
    _default: function(obj) {
        var _txt_room = obj.next(".yztxt");
        if (_txt_room.length > 0) {
            _txt_room.html("正在请求...");
        }
    }
};

//普通输入框验证统一执行函数
function TyzFunction(obj) {
    var _yz = true,
        _this = obj;

    //判断是否为空
    if (_this.attr("TyzN") === "1" && _yz) {
        _yz = TyzFunc._null(_this, _this.val());
    }

    //字符限制验证
    if (_this.attr("TyzR") && _yz) {
        _yz = TyzFunc._range(_this, _this.attr("TyzR"), _this.val().replace(/[^\x00-\xff]/g, "**").length);
    }

    //正则规则验证
    if (_this.attr("TyzType") && _yz) {
        switch (_this.attr("TyzType")) {
            case "email":
                _yz = TyzFunc._Regyz(_this, _this.val(), RegList.EMAIL, errTxt._email);
                break;
            case "number":
                _yz = TyzFunc._Regyz(_this, _this.val(), RegList.NUMBER, errTxt._number);
                break;
            case "tel":
                _yz = TyzFunc._Regyz(_this, _this.val(), RegList.TEL, errTxt._telnum);
                break;
            case "pwd":
                _yz = TyzFunc._Regyz(_this, _this.val(), RegList.PWD, errTxt._pwd);
                break;
            case "repwd":
                _yz = TyzFunc._Regyz(_this, _this.val(), RegList.PWD, errTxt._pwd);
                if (_yz) {
                    var tyzname = _this.attr('TyzName'),
                        tyzval = _this.val();
                    $("input[TyzName='" + tyzname + "']").each(function() {
                        if (tyzval != $(this).val()) {
                            _yz = false;
                            TyzFunc._error(_this, errTxt._repwd);
                            return false;
                        }
                    });
                }
                break;
            default:
                break;
        }
    }

    //数值大小验证
    if (_this.attr("TyzNumSize") && _yz) {
        _yz = TyzFunc._Size(_this, _this.attr("TyzNumSize"), _this.val());
    }

    //验证通过
    if (!_this.attr("TyzAjax") && _yz) {
        TyzFunc._right(_this);
    }
    return _yz;
};

//textarea输入框验证统一执行函数
function TyzTextFunction(obj) {
    var _this = obj,
        _yz = false,
        _errbox = $("#" + _this.attr("TyzTextErrId")),
        _count = _this.attr("TyzTextSize") * 2,
        _val_count = _this.val().replace(/[^\x00-\xff]/g, "**").length,
        _temp_notnull = TyzFunc._null(_this, _this.val());

    if (_temp_notnull) {
        TyzFunc._right(_this);
        _yz = true;
    }

    if (_yz) {
        if (_count > _val_count || _count == _val_count) {
            _errbox.removeClass("Terror").html('还可以输入<span class="num">' + (_count / 2 - Math.ceil(_val_count / 2)) + '</span>个字');
            _yz = true;
        } else {
            _errbox.addClass("Terror").html('已超出<span class="num">' + (Math.ceil(_val_count / 2) - _count / 2) + '</span>个字');
            TyzFunc._error(_this, '已超出<span class="num">' + (Math.ceil(_val_count / 2) - _count / 2) + '</span>个字');
            _yz = false;
        }
    }
    return _yz;
};

//select统一验证
function TyzSelectFunction(obj) {
    var _yz = false;
    if (obj.find("option:selected").val() == "") {
        _yz = false;
        TyzFunc._error(obj, errTxt._select);
    } else {
        _yz = true;
        TyzFunc._right(obj);
    }
    return _yz;
};

//JQUERY验证提交函数
$.fn.extend({
    Tyz: function() {
        var _id = $(this).attr("TyzRoomId"), //获取需要验证的块对象
            _yz = true,
            _obj = $("#" + _id),
            _ajaxObj = _obj.find(".TyzAjax"), //ajax验证对象
            _ajax_yz = true, //ajax验证锁
            _focus_obj = null; //失败默认焦点


        _obj.find(".Tyz").each(function() {
            var _temp_yz = TyzFunction($(this));
            if (_yz) {
                _yz = _temp_yz;
                _focus_obj = $(this);
            }
        });

        _obj.find(".TyzText").each(function() {
            var _temp_yz = TyzTextFunction($(this));
            if (_yz) {
                _yz = _temp_yz;
                _focus_obj = $(this);
            }
        });

        _obj.find(".TyzSelect").each(function() {
            var _temp_yz = TyzSelectFunction($(this));
            if (_yz) {
                _yz = _temp_yz;
                _focus_obj = $(this);
            }
        });

        //普通验证通过
        if (_yz) {

            //判断Ajax验证通过情况
            if (_ajaxObj.length > 0) {

                _ajaxObj.each(function() {
                    if (!$(this).attr("_ajax") || $(this).attr("_ajax") === "undefined") {
                        if (_ajax_yz) {
                            _ajax_yz = false;
                            _focus_obj = $(this);
                        }
                    }
                });

                if (!_ajax_yz) {
                    _focus_obj.focus();
                    return false;
                } else {
                    return true;
                }

            } else {
                return true;
            }

            //普通验证不通过
        } else {
            if (_focus_obj) {
                _focus_obj.focus();
            }
            return false;
        }
    },
    hideTyz: function() {
        var _id = $(this).attr("TyzRoomId"), //获取需要验证的块对象
            _obj = $("#" + _id);
        _obj.find(".Tyz, .TyzText").each(function() {
            if ($(this).attr("tyztxtroomid") && $(this).attr("tyztxtroomid") != "undefined") {
                $("#" + $(this).attr("tyztxtroomid")).remove();
                $(this).attr("tyztxtroomid", "");
            }
        });
    }
});

/************* 密码强度判断 *************/
//模式判断
function CharMode(iN) {
    if (iN >= 48 && iN <= 57) //数字
        return 1;
    if (iN >= 65 && iN <= 90) //大写字母
        return 2;
    if (iN >= 97 && iN <= 122) //小写
        return 4;
    else
        return 8; //特殊字符
}
//计算出当前密码当中一共有多少种模式
function bitTotal(num) {
    modes = 0;
    for (i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}
//返回密码的强度级别
function checkStrong(sPW) {
    if (sPW.length <= 4)
        return 0; //密码太短
    Modes = 0;
    for (i = 0; i < sPW.length; i++) {
        //测试每一个字符的类别并统计一共有多少种模式
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
}

$(document).ready(function() {

    /**************  默认验证事件绑定 ***************/
    /* 单框验证 */
    $(".Tyz").on("blur", function() {
        var _this = $(this),
            _yz = TyzFunction($(this));

        //ajax验证 //ajax验证不需要在提交的时候重新验证
        if (_this.attr("TyzAjax") && _yz) {
            var ajaxoption = _this.attr("TyzAjax").split(",");
            var json = {};
            json[ajaxoption[0]] = _this.val();
            $.ajax({
                type: 'POST',
                url: ajaxoption[1],
                data: json,
                dataType: 'JSON',
                error: function() {
                    TyzFunc._error(_this, "请求错误");
                    _this.attr("_ajax", 0);
                    return false;
                },
                success: function(data) {
                    if (!data && data != "0") {
                        TyzFunc._error(_this, "请求错误，无法注册");
                        _this.attr("_ajax", 0);
                        return false;
                    } else if (data == "0") {
                        TyzFunc._error(_this, "该邮箱已被注册");
                        _this.attr("_ajax", 0);
                        return false;
                    }
                    _this.attr("_ajax", 1);
                    TyzFunc._right(_this);
                }
            });
        }
    });

    /* select验证 */
    $(".TyzSelect").on("change", function() {
        TyzSelectFunction($(this));
    });


    $(".TyzPwd").on("keyup keydown", function() {
        //密码强度判断
        var _this = $(this),
            _value_sh = checkStrong(_this.val()),
            _TyzQ = $("#" + _this.attr("TyzQ")),
            _Tpwdqd_title = _TyzQ.find(".Tpwdqd_title"),
            _Tpwdqd_bg = _TyzQ.find(".Tpwdqd_bg");
        switch (_value_sh) {
            case 1:
                _Tpwdqd_title.css({
                    width: "30%",
                    background: "#ff0000"
                });
                _Tpwdqd_bg.attr("title", "密码强度极弱");
                break;
            case 2:
                _Tpwdqd_title.css({
                    width: "70%",
                    background: "#ffc000"
                });
                _Tpwdqd_bg.attr("title", "密码强度一般");
                break;
            case 3:
            case 4:
                _Tpwdqd_title.css({
                    width: "100%",
                    background: "#aabf0d"
                });
                _Tpwdqd_bg.attr("title", "密码强度非常高");
                break;
            default:
                break;
        }
    });

    /* textarea验证 */
    $(".TyzText").on("keyup keydown blur", function() {
        TyzTextFunction($(this));
    });


    /* 提交时统一验证 */
    $(".TyzAutoYz").on("click", function() {
        if (!$(this).Tyz()) {
            return false;
        }
    });

    //重置验证
    $(".TyzAutoCancel").on("click", function() {
        $(this).hideTyz();
    });

});