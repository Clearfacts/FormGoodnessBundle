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
        },
        error: function() {
            container.prepend('<div class="alert alert-warning"><a class="close" data-dismiss="alert" href="#">×</a>Something went wrong with refresh, this info may be outdated. Please refresh the page</div>');
        },
        always: function(){
            container.ttSpin('hide');
        }
    })
};