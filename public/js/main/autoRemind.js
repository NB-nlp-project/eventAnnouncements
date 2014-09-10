//控件文字自动提示
var $autoRemind = function(trigger, initvalue) {
	if ($isEle(trigger)) {
		initvalue = initvalue || trigger.attr("placeholder");
		if (initvalue) {
			$classToggle(trigger, {
				eventType: "focus",
				inCall: function() {
					if (this.val().trim() === initvalue) {
						this.value = "";
					}
					this.css("color", "#333");
				},
				outCall: function() {
					if (this.val().trim() === "") {
						this.value = initvalue;
						this.css("color", "#999");
					}
				}
			});
		}
	}
};