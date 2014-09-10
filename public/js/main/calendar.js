//calendar
var Calendar = new Class({
	Implements: [Options, Events],
	options: {
		initDate: new Date(),
		monthText: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		weekText: ['日', '一', '二', '三', '四', '五', '六'],
		range: [new Date(2000, 0, 1), new Date(2016, 0, 1)],
		display: true,
		zIndex:"",
		showMode:"",
		onSelect: $empty
	},
	initialize: function(cal, options) {
		this.setOptions(options);
		this.container = $(cal);
		this.initDate = this.options.initDate;
		this.init(this.container, this.initDate);
		this.display = this.options.display;
		(this.display) ? this.show() : this.hide();
	},
	init: function(cal, date) {

		cal.set('html', '');
		var month = this.MonthInfo(date.getFullYear(), date.getMonth()),
		preMonth = this.MonthInfo(date.getFullYear(), (date.getMonth() - 1)< 0?11:(date.getMonth() - 1));
		cal.addClass("mcalendar").css({zIndex:this.options.zIndex});

		var yearStr = [];
		yearStr.push('<li><a class="mcalendar_preyear" href="javascript:" cal="preyear" title="上一年"></a></li>');
		yearStr.push('<li><a class="mcalendar_premonth" href="javascript:" cal="premonth" title="上一月"></a></li>');
		yearStr.push('<li><a class="w50 g5" href="javascript:" cal="month" month="' + date.getMonth() + '">' + this.options.monthText[date.getMonth()] + '</a></li>');
		yearStr.push('<li><a class="w50 g5" href="javascript:" cal="year" year="' + date.getFullYear() + '">' + date.getFullYear() +'</a></li>');
		yearStr.push('<li><a class="mcalendar_nextmonth" href="javascript:" cal="nextmonth" title="下一月"></a></li>');
		yearStr.push('<li><a class="mcalendar_nextyear" href="javascript:" cal="nextyear" title="下一年"></a></li>');
		var year = new Element('ul').set('html', yearStr.join('')).addClass("mcalendar_top");

		var weekStr = []
		for (i = 0; i < 7; i++) {
			weekStr.push('<li class="mcalendar_week">' + this.options.weekText[i] + '</li>');
		}
		var week = new Element('ul').set('html', weekStr.join('')).addClass("mcalendar_weekx");
		cal.adopt(year, week);
		
		var nowadays = new Date(), tdays = new Date(nowadays.getFullYear(), nowadays.getMonth(), nowadays.getDate()), showMode = this.options.showMode, rangeStart, rangeEnd;
		if (showMode === "all"){
			rangeStart = this.options.range[0];
			rangeEnd = this.options.range[1];
		} else if (showMode ==="later") {
			rangeStart = tdays;
			rangeEnd = this.options.range[1]
		} else if (showMode ==="pass"){
			rangeStart = this.options.range[0];
			rangeEnd = tdays;
		} else return;
		
		var dayInject = function(cls,d){
			days.grab(new Element('li').set('html', '<a href="javascript:" class="' + cls + '" year="' + date.getFullYear() + '" month="' + date.getMonth() + '" date="' + d + '">' + d + '</a>'))
		};
		for (i = 0; i < 6; i++) {
			var days = new Element('ul').addClass("mcalendar_dayx");
			for (var j = 0; j < 7; j++) {
				var d = 7 * i - month.firstDay + j + 1;
				if (d > 0 && d <= month.days) {
					var curd = new Date(date.getFullYear(), date.getMonth(), d);
					if (curd >= rangeStart && curd <= rangeEnd) {
						if (curd.toDateString() === tdays.toDateString()){
							var cls = (j === 0 || j === 6) ? "mcalendar_selected co" : "mcalendar_selected";
							dayInject(cls,d);
						} else if (j === 0 || j === 6) {
							dayInject("co",d);
						} else {
							dayInject("",d);
						}
					}  else {
						days.grab(new Element('li').addClass("mcalendar_outrange").set("html", d));
					}
				} else {
					var d = d > month.days ? d - month.days :preMonth.days + d;
					days.grab(new Element('li').addClass('mcalendar_outrange').set("html", d));
				}
			}
			cal.adopt(days);
		};

		cal.getElements("a").addEvent('focus', function() { this.blur() });
		
		var monFlag = false, yearFlag = false;
		cal.getElements("a").addEvent('click', function(e) {
			var self = new Event(e).target;
			if ($(self).getProperty("cal") == "preyear") {
				date.setFullYear(date.getFullYear() - 1);
				this.init(cal, date);
			} else if ($(self).getProperty("cal") == "nextyear") {
				date.setFullYear(date.getFullYear() + 1);
				this.init(cal, date);
			} else if ($(self).getProperty("cal") == "premonth") {
				date.setDate(1);
				date.setMonth(date.getMonth() -1);
				this.init(cal, date);
			} else if ($(self).getProperty("cal") == "nextmonth") {
				date.setMonth(date.getMonth() + 1);
				this.init(cal, date);
			} else if ($(self).getProperty("cal") == "year") {
				var year = new Element('select').setStyle('width', '50px').setStyle('height',  '20px');
				var selected = $(self).getProperty('year');
				for (var i = this.options.range[0].getFullYear(); i <= this.options.range[1].getFullYear(); i++) {

					year.grab(new Element('option').setProperty('value', i).set('html', i));
				}
				year.addEvent('change', function(e) {
					var self = new Event(e).target;
					date.setFullYear(self.value);
					this.init(cal, date);
				} .bind(this));
				year.setProperty('value', selected);
				year.replaces($(self));

			} else if ($(self).getProperty("cal") == "month") {
				var mon = new Element('select').setStyle('width', '50px').setStyle('height',  '20px');
				var selected = $(self).getProperty('month');
				for (i = 0; i < 12; i++) {
					mon.grab(new Element('option').setProperty('value', i).set('html', this.options.monthText[i]));
				}
				mon.addEvent('change', function(e) {
					var self = new Event(e).target;
					date.setMonth(self.value);
					this.init(cal, date);
				} .bind(this));

				mon.setProperty('value', selected);
				mon.replaces($(self));
			} else {
				var eleSelected = cal.getElement(".mcalendar_selected");
				if (eleSelected) {
					eleSelected.removeClass("mcalendar_selected");
				}
				$(self).addClass("mcalendar_selected");
				this.fireEvent('select', [new Date($(self).getProperty("year"), $(self).getProperty("month"), $(self).getProperty("date"))]);

			}
			return false;
		} .bind(this));
	},
	MonthInfo: function(y, m) {
		var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var d = (new Date(y, m, 1));
		d.setDate(1);
		if (d.getDate() == 2) d.setDate(0);
		y += 1900;
		return {
			days: m == 1 ? (((y % 4 == 0) && (y % 100 != 0)) || (y % 400 == 0) ? 29 : 28) : monthDays[m],
			firstDay: d.getDay()
		};
	},
	show: function() {
		this.display = true;
		this.container.show();
	},
	hide: function() {
		this.display = false;
		this.container.hide();
	},
	dispose: function() {
		this.container.empty();
	}
});

// iclass datepicker
var Datepicker = new Class({
	Implements: [Options],
	options: {
		initDate: "",
		monthText: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		weekText: ["日", "一", "二", "三", "四", "五", "六"],
		range: [new Date(2000, 0, 1), new Date(2016, 0, 1)],
		splitChar: "-", //
		zIndex:300,
		showMode:"all",
		onSelect: $empty
	},
	initialize: function(ele, dateinput, options) {
		this.setOptions(options);
		this.calendar = null;
		this.container = null;
		this.ele = $(ele);
		this.ele.addEvent('click', function(e) {
			
			dateinput.css("color", "#555");
			
			if (this.calendar) { if(this.calendar.display) {this.calendar.hide()} else{ this.resetPostion(e); this.calendar.show(); return;} }
			
			if (!this.container) this.container = new Element('div').attr('id', $time() + '_date');
			
			this.resetPostion(e);

			$(document.body).grab(this.container);

			var initdate = this.options.initDate || new Date();
			
			this.calendar = new Calendar(this.container, {
				initDate: initdate,
				range: this.options.range,
				monthText: this.options.monthText,
				weekText: this.options.weekText,
				zIndex: this.options.zIndex,
				showMode: this.options.showMode,
				onSelect: function(date) {
					var year = date.getFullYear(), month = (date.getMonth() + 1), day = date.getDate();
					if (this.options.splitChar) {
						if (month < 10) { month = "0" + month; }
						if (day < 10) { day = "0" + day; }
						dateinput.value = year + this.options.splitChar + month + this.options.splitChar + day;
					} else {
						dateinput.value = year + "年" + month + "月" + day + "日";
					}	
					this.calendar.hide();
					this.options.onSelect.call(dateinput);
				}.bind(this)
			});
		} .bind(this));
		
		if(dateinput.val().length < 1){
			var nowadays = new Date(), month = (nowadays.getMonth() + 1), day = nowadays.getDate();
			if (month < 10) { month = "0" + month; }
			if (day < 10) { day = "0" + day; }
			dateinput.val(nowadays.getFullYear() + this.options.splitChar + month + this.options.splitChar + day);
		}

		document.addEvent('mousedown', this.insideSelector.bind(this));

	},
	
	resetPostion : function(e) {
		var self = new Event(e).target;
		var offset = $(self).getCoordinates();
		this.container.css({
			position: "absolute",
			left: offset.left,
			top: offset.bottom
		});

	},
	
	insideSelector: function(e) {
		if ($(e.target).getParents('.mcalendar').length === 0 && e.target !== this.ele && this.calendar) this.calendar.hide();
	},

	dispose: function() {
		if (this.calendar) this.calendar.dispose();
	}
});