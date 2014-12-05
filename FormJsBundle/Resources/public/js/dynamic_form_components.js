+function ($) {
    $.fn.triggerDynamicFormElements = function()
    {
        $(this).find('.datepicker').each(function () {
            console.log('found data');
            createDatePicker($(this));
        });

        $(this).find('.timepicker').each(function () {
            createTimePicker($(this));
        });

        $(this).find('select.chosen').chosen();

        $(this).find('.tactics-datetime-group div[class*="col-md-2"]')
            .removeClass('col-xs-2')
            .removeClass('col-sm-2')
            .removeClass('col-md-2')
            .removeClass('col-lg-2')
            .addClass('col-xs-5')
            .addClass('col-sm-5')
            .addClass('col-md-5')
            .addClass('col-lg-5')
            .addClass('no-padding')
        ;

        $(this).find('.form-group .tactics-datetime-group').addClass('col-xs-10 col-md-10 col-lg-10');
    }
}(window.jQuery);