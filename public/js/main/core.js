$(document).ready(function() {

    $('#dateStart').Zebra_DatePicker({
        direction: true,
        pair: $('#datepicker-example7-end')
    });

    $('#dateEnd').Zebra_DatePicker({
        direction: true
    });

});