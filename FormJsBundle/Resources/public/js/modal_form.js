+function ($) {
    $.fn.modalForm = function (options) {
        //Trigger the modal form
        var $this = $(this);

        var modalId = Math.floor(Math.random() * (10000 - 1)) + 1

        $this.click(function(e){
            var defaults = {
                data_url: $(this).attr('href'),
                request_data: function(){},
                submit_selector: ':submit',
                title: '',
                modal_id: modalId,
                cache: false
            };

            var mergedOptions = $.extend(defaults, options);

            e.preventDefault();
            buildFormModal(mergedOptions, $(this));

            $(this).addClass('no-modal-form');
        }).addClass('no-modal-form');

        return $this;
    };

    function handleSubmit(options)
    {
        var defaults = {};
        var settings = $.extend(defaults, options);
        $.each(['form', 'trigger', 'modal'], function(index, requiredSetting) {
            if(settings[requiredSetting] == undefined)
            {
                throw new Error(requiredSetting + ' option must be set.')
            }
        });

        settings.form.removeErrors();
        if(settings.confirmationMessage && confirm(settings.confirmationMessage)) {
            //post the data
            $.post(
                settings.form.attr('action'),
                settings.form.serialize(),
                function(data) {
                    if(data.hasOwnProperty('error')) {
                        $(settings.trigger).trigger('modalform.post_error', data);
                        settings.form.mapErrors(data.error, settings.error_msg);
                        handleErrors();
                    }else {
                        $(settings.trigger).trigger('modalform.post_success', data);
                        settings.modal.modal('hide');
                        settings.trigger.trigger('modalform.after_modal_hide');
                    }
                },
                'json'
            );
        }
    }

    function buildFormModal(options, trigger)
    {
        buildHtmlContainer(options.title, options.modal_id);
        var modalDialog = $('#' + options.modal_id + ' .modal-dialog');
        var container = $('#' + options.modal_id + ' .modal-body');
        var submitBtnSelector = '#' + options.modal_id + ' .modal-body ' + options.submit_selector;
        var submitBtn = $(submitBtnSelector);

        //get the form
        $.ajax({
            url: options.data_url,
            method: "GET",
            data: options.request_data(),
            cache: options.cache,
            beforeSend: function() {
                container.html('');
                trigger.trigger('modalform.before_modal_show');
            },
            success: function(html) {
                container.html(html);
                trigger.trigger('modalform.form_html_success');
                // if btn of type submit -> preventDefault will not work
                submitBtn = $(submitBtnSelector);
                submitBtn.click(function(e){
                    e.preventDefault();
                    handleSubmit({
                        form: container.find('form').first(),
                        trigger: trigger,
                        modal: $('#' + options.modal_id),
                        error_msg: options.error_msg,
                        confirmationMessage: options.confirmationMessage
                    });
                    return false;
                });
                container.find('form').triggerDynamicFormElements();
                if(typeof modalDialog.ttSpin == 'function') {
                    modalDialog.ttSpin('hide', 'isModal');
                }
                submitBtn.removeAttr('disabled');
            },
            complete: function() {
                trigger.trigger('modalform.after_modal_show');
            }
        });

        //show the modal
        container.closest('.modal').modal({backdrop: 'static'});
        container.closest('.modal').modal('show').bind('hide.bs.modal', function(){$(this).remove();});
        if(typeof modalDialog.ttSpin == 'function') {
            modalDialog.ttSpin('show', 'isModal');
        }
        submitBtn.attr('disabled', 'disabled');
    }
    
    function buildHtmlContainer(title, id)
    {
        $('body').append(
            '<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog modal-lg">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>' +
                            '<h4 class="modal-title" id="myModalLabel">' + title + '</h4>' +
                        '</div>' +
                        '<div class="modal-body">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }


}(window.jQuery);