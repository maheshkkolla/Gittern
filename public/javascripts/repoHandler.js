$(function() {
    $('.reposList .repo').click(function(event) {
        var self = $(event.target);
        changeSelectedRepo(self);
        $('ul.tabs li a.tab_link')[0].click();
    });


});

var getSelectedRepoPath = function() {
    return $('.reposList .repo.selected').attr('data-projectPath');
};

var changeSelectedRepo = function(selectedRepo) {
    selectedRepo.siblings('button.repo.selected').removeClass('selected');
    selectedRepo.addClass('selected');
};

