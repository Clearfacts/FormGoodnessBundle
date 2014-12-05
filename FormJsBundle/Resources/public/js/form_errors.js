jQuery(document).ready(function(){
    handleErrors();
});

function handleErrors()
{
    showErrorPaneOnErrors();
    countAndDisplayErrorsInTabHeaders();
    navigateToFirstErrorTab();
    navigateToFirstErrorField();

    function showErrorPaneOnErrors() {
        if($('.error').length > 0) {
            showErrorPanel();
        }
    }

    function countAndDisplayErrorsInTabHeaders() {
        var errorCounts = getErrorsPerTab();

        $.each(errorCounts, function(tabId, errorCount){
            $('a[href="#' + tabId + '"]').append('<span class="label label-danger">' + errorCount + '</span> ').addClass('error-link');
        });
    }

    function navigateToFirstErrorTab() {
        var errorsPerTab = getErrorsPerTab();
        var tabId = Object.keys(errorsPerTab)[0];

        if(tabId) {
            $('a[href="#' + tabId + '"]').click();
        }
    }

    function navigateToFirstErrorField() {
            setTimeout(function() {$('.error').first().focus() }, 1000);
    }

    function showErrorPanel() {
        var paneHtml = '' +
            '<div class="alert alert-block alert-danger">' +
                '<a class="close" data-dismiss="alert" href="#">×</a>' +
                    '<strong><i style="color: #953B39" class="fa fa-warning"></i>&#32;There are some errors, please correct these.</strong> '
            '</div>'
        ;

        $('#content').prepend(paneHtml);
    }

    function getErrorsPerTab() {
        var errorCounts = {};

        $('.error').each(function(){
            if($('this').closest('.tab-pane')) {
                if(errorCounts[$(this).closest('.tab-pane').attr('id')]) {
                    errorCounts[$(this).closest('.tab-pane').attr('id')] += 1;
                }
                else {
                    errorCounts[$(this).closest('.tab-pane').attr('id')] = 1;
                }
            }
        });

        return errorCounts;
    }
}


