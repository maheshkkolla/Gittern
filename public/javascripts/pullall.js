$(function() {
    $('button.pullAllRebase').click(function(event) {
        var repos = $('div.pullAllReposList .pullAllRepo');
        pullAll("/repos/repo/pullRebase", repos);
    });
    $('button.stashAndPullAll').click(function(event) {
        var repos = $('div.pullAllReposList .pullAllRepo');
        pullAll("/repos/repo/stashAndPull", repos);
    });
});

var pullAll = function(url, repoElements) {
    repoElements.each(function(index, repoEle) {
        var repo = $(repoEle);
        var statusEle = repo.children('span.status');
        statusEle.removeClass('red green').html("Pulling...");
        new Ajax({
            url: url,
            type: 'GET'
        }).setQueryParams({path: repo.attr('data-projectPath')}).call()
        .done(function(result) {
            if(result.error)
                statusEle.html('Failed').addClass('red');
            else
                statusEle.html('Success').addClass('green');
        });
    });
};