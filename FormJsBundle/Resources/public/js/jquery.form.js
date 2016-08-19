+function ($) {
    $.fn.mapErrors = function (errors, title) {
        var form = $(this);
        var errorTitle = title ? title : 'There are some errors, please correct them below.';
        var error = $([
            '<div class="alert alert-block alert-danger">',
            '<button class="close" data-dismiss="alert" type="button">&times;</button>',
            '<i class="fa fa-warning"></i>&nbsp',
            '<strong>' + errorTitle + '</strong>',
            '</div>'
        ].join(''));

        form.prepend(error);

        $.each(errors, function(index, value) {

            if(form.attr('id') == index) {
                form.find('.alert-block').append('<br/>' + value);
            }
            else if(form.find('#' + index).length > 0) {
                form.find('#' + index)
                    .addClass('error')
                    .closest('.form-group')
                    .addClass('has-error');
            }
            //This fixes errors for date and datetime fields, field was not found by index alone
            else if($('#' + index + '_form_group').length > 0) {
                $('#' + index + '_form_group')
                    .addClass('has-error')
                    .find('label')
                    .next('div')
                    .append('<span class="help-block help-block-error"><br /><br />' + value + '</span>');
            } else {
                form.find('.alert-block').append('<br/>' + value);
            }


            form.find('label[for="' + index + '"]')
                .next('div')
                .append('<span class="help-block help-block-error">' + value + '</span>');
        });
    }

    $.fn.removeErrors = function () {
        var form = $(this);

        form.find('.form-group.has-error').removeClass('has-error');
        form.find('div.alert.alert-danger').remove();
        form.find('span.help-block-error').remove();
    }
}(window.jQuery);