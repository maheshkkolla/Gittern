$(function() {
    $('ul.tabs li a.tab_link').click(function(event) {
        var selfElement = $(event.target);
        var tabContentId = "#" + selfElement.attr('data-content');
        var url = selfElement.attr('data-url');
        var projectPath = getSelectedRepoPath();
        callAndRefreshTab(tabContentId, url, {path: projectPath});
    });
});

var callAndRefreshTab = function(tabContentId, url, queryParams) {
    getTabContent(url, queryParams).done(function(content) {
        refreshTab(tabContentId, content);
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

var refreshTab = function(tabContentId, content) {
    closeAllTabs(tabContentId);
    $(tabContentId).html(content);
    $(tabContentId).css('display', 'block');
};
