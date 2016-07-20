var git = require('../modules/git');
module.exports = {
    getAll: function(path, callback) {
        var projects = git.getAllRepositories(path);
        callback(null, projects);
    },

    getStatus: function(path, callback) {
        var status = git.getRepoStatus(path);
        callback(null, status);
    },

    getLogs: function(path, offset, callback) {
        var commitCount = git.getCommitCount(path);
        if(commitCount < offset) offset = 0;
        var logs = git.getRepoLogs(path, offset, 30);
        var url = git.getGitHubUrl(path);
        callback(null, logs, commitCount, url);
    }
};