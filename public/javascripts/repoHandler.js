$(function() {
    $('.reposList .repo').click(function(event) {
        var projectPath = $(event.target).attr('data-projectPath');
        new Ajax({
            url: '/repos/repo/status',
            type: 'GET'
        }).setQueryParams({path: projectPath}).call()
        .done(function(status) {
            refreshTab('status', status);
        })
        .fail(function() {

        });
    });
});

