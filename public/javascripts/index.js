var Ajax = function(options) {
    this.options = options || {};
};

Ajax.prototype = {
    setUrl: function(url) {
        this.options.url = url;
        return this;
    },

    setType: function(type) {
        this.options.type = type;
        return this;
    },

    setData: function(data) {
        this.options.contentType = 'application/json';
        this.options.data = JSON.stringify(data);
        return this;
    },

    setQueryParams: function(params) {
        var allParams = Object.keys(params).map(function(key) {
            return key.concat("=").concat(params[key]);
        });
        this.options.url = this.options.url.concat("?").concat(allParams.join("&"));
        return this;
    },

    setUrlParams: function(params) {
        var self = this;
        Object.keys(params).forEach(function(key) {
            self.options.url = self.options.url.replace(key, params[key]);
        });
        return this;
    },

    call: function() {
        return $.ajax(this.options);
    }
};