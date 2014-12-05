+function ($) {
    $.fn.modalForm = function (options) {
        //Trigger the modal form
        var $this = $(this);
        var modalId = Math.floor(Math.random() * (10000 - 1)) + 1
        var defaults = {
            data_url: $this.attr('href'),
            submit_selector: ':submit',
            title: '',
            modal_id: modalId
        };

        var mergedOptions = $.extend(defaults, options);
        $this.click(function(e){
            e.preventDefault();
            buildFormModal(mergedOptions, $(this));
        });

        return $this;
    };

    function handleSubmit(form, trigger, modal)
    {
        form.removeErrors();
        //post the data
        $.post(
            form.attr('action'),
            form.serialize(),
            function(data) {
                if(data.hasOwnProperty('error')) {
                    $(trigger).trigger('modalform.post_error');
                    form.mapErrors(data.error);
                    handleErrors();
                }else {
                    $(trigger).trigger('modalform.post_success');
                    modal.modal('hide');
                    trigger.trigger('modalform.after_modal_hide');
                }
            }
        );
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
            beforeSend: function() {
                container.html('');
            },
            success: function(html) {
                trigger.trigger('modalform.form_html_success');
                container.html(html);
                // if btn of type submit -> preventDefault will not work
                submitBtn = $(submitBtnSelector);
                submitBtn.click(function(e){
                    e.preventDefault();
                    handleSubmit(container.find('form').first(), trigger, $('#' + options.modal_id));
                    return false;
                });
                container.find('form').triggerDynamicFormElements();
                modalDialog.ttSpin('hide', 'isModal');
                submitBtn.removeAttr('disabled');
            }
        });

        //show the modal
        trigger.trigger('modalform.before_modal_show');
        container.closest('.modal').modal('show').bind('hide', function(){$(this).remove();});
        trigger.trigger('modalform.after_modal_show');
        modalDialog.ttSpin('show', 'isModal');
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