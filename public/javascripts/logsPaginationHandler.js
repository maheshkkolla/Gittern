$(function() {
    $('.logsPaginationSelection').change(function(event) {
        var offset = $(event.target).val();
        reRenderLogs(offset);
    });

    $('button.prevLogs').click(function() {
        var offset = parseInt($('.logsPaginationSelection').val()) - 30;
        reRenderLogs(offset);
    });

    $('button.nextLogs').click(function() {
        var offset = parseInt($('.logsPaginationSelection').val()) + 30;
        reRenderLogs(offset);
    });
});

var reRenderLogs = function(offset) {
    var projectPath = getSelectedRepoPath();
    callAndRefreshTab('#logs', '/repos/repo/logs', { path: projectPath, offset: offset});
};