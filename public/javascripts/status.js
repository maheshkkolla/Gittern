$(function() {
    $('.status .pullRebase').click(function(event) {
        showMessage('Loading...');
        var path = getSelectedRepoPath();
        new Ajax({
            url: '/repos/repo/pullRebase',
            type: 'GET'
        }).setQueryParams({path: path}).call()
        .done(function(status) {
            if(status.error) pullError();
            else pullSuccess(path);
        });
    });
});

var showMessage = function(content) {
    var element = $('.status .message');
    element.html(content);
    element.removeClass('hidden');
};

var pullError = function() {
    showMessage("Error occurred during git pull.");
};

var pullSuccess = function(path) {
    callAndRefreshTab('status', '/repos/repo/status', {path: path}, function() {
        showMessage("Pull success");
    });
};