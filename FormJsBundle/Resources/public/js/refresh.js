/**
 * Created by Jeroen on 5/12/2014.
 */

$.fn.refreshContainer = function (url) {
    var container = $(this);
    $.ajax({
        url: url,
        beforeSend: function(){
            container.ttSpin('show')
        },
        success: function(html) {
            container.html(html);
            container.trigger('refresh.finished');
        },
        error: function() {
            container.prepend('<div class="alert alert-warning"><a class="close" data-dismiss="alert" href="#">×</a>Something went wrong with refresh, this info may be outdated. Please refresh the page</div>');
            container.trigger('refresh.finished');
        },
        always: function(){
            container.ttSpin('hide');
        }
    });

    return container;
};