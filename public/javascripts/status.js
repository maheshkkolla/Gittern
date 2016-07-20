$(function() {
    $('.status .pullRebase').click(function(event) {
        pullRequest('/repos/repo/pullRebase');
    });

    $('.status .stashAndPull').click(function() {
        pullRequest('/repos/repo/stashAndPull');
    });
});

var pullRequest = function(url) {
    showMessage('Loading...');
    var path = getSelectedRepoPath();
    new Ajax({
        url: url,
        type: 'GET'
    }).setQueryParams({path: path}).call()
    .done(function(status) {
        if(status.error) pullError(status.error);
        else pullSuccess(status);
    });
};

var showMessage = function(content) {
    var element = $('.status .message');
    element.html(content);
    element.removeClass('hidden');
};

var pullError = function(error) {
    showMessage(error.message);
};

var pullSuccess = function(success) {
    callAndRefreshTab('status', '/repos/repo/status', {path: getSelectedRepoPath()}, function() {
        showMessage(success.message);
    });
};