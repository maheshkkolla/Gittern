$(function() {
    $('ul.tabs li a.tab_link').click(function(event) {
        var selfElement = $(event.target);
        var tabContentId = "#" + selfElement.attr('data-content');
        var url = selfElement.attr('data-url');
        var projectPath = getSelectedRepoPath();
        if(selfElement.attr('data-no-ajax') || !projectPath) {
            refreshTabWithOutAjax(tabContentId);
        } else {
            callAndRefreshTab(tabContentId, url, {path: projectPath});
        }
    });

    $('ul.tabs li a.tab_link')[0].click();
});

var callAndRefreshTab = function(tabContentId, url, queryParams, done) {
    $(tabContentId).html("Loading...");
    getTabContent(url, queryParams).done(function(content) {
        refreshTab(tabContentId, content);
        if(done) done();
    });
};

var getTabContent = function(url, queryParams) {
    return new Ajax({
        url: url,
        type: 'GET'
    }).setQueryParams(queryParams).call();
};


var closeAllTabs = function(tabContentId) {
    $(tabContentId).siblings('.tab_content')
        .css('display', 'none');
};

var refreshTabWithOutAjax = function(tabContentId) {
    closeAllTabs(tabContentId);
    $(tabContentId).css('display', 'block');
};

var refreshTab = function(tabContentId, content) {
    closeAllTabs(tabContentId);
    $(tabContentId).html(content);
    $(tabContentId).css('display', 'block');
};
