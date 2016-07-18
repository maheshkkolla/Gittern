var git = require('../modules/git');
module.exports = {
    getAll: function(path, callback) {
        var projects = git.getAllRepositories(path);
        callback(null, projects);
    },

    getStatus: function(path, callback) {
        var status = git.getRepoStatus(path);
        callback(null, status);
    }
};