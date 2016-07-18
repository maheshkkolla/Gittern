$(function() {
    $('.reposList .repo').click(function(event) {
        var self = $(event.target);
        changeSelectedRepo(self);
        var projectPath = self.attr('data-projectPath');
        new Ajax({
            url: '/repos/repo/status',
            type: 'GET'
        }).setQueryParams({path: projectPath}).call()
        .done(function(status) {
            refreshTab('status', status);
        });
    });
});

var changeSelectedRepo = function(selectedRepo) {
    selectedRepo.siblings('button.repo.selected').removeClass('selected');
    selectedRepo.addClass('selected');
};

