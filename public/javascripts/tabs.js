$(function() {
    $('ul.tabs li a.tab_link').click(function(event) {
        var selfElement = $(event.target);
        var tabContentId = "#" + selfElement.attr('data-content');
        closeAllTabs(tabContentId);
        $(tabContentId).css('display', 'block');
    });


});

var closeAllTabs = function(tabContentId) {
    $(tabContentId).siblings('.tab_content')
        .css('display', 'none');
};

var refreshTab = function(tabContentId, content) {
    var tabContentId = "#" + tabContentId;
    closeAllTabs(tabContentId);
    $(tabContentId).html(content);
    $(tabContentId).css('display', 'block');
};
