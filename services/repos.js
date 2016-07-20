var git = require('../modules/git');
var config = require('../config');
module.exports = {
    getAll: function(path, callback) {
        var projects = git.getAllRepositories(path);
        callback(null, projects);
    },

    getStatus: function(path, callback) {
        var status = git.getRepoStatus(path);
        var stats = git.getBehindAndAhead(path);
        callback(null, status, stats);
    },

    getLogs: function(path, offset, callback) {
        var commitCount = git.getCommitCount(path);
        if(commitCount < offset) offset = 0;
        var logs = git.getRepoLogs(path, offset, 30);
        var url = git.getGitHubUrl(path);
        callback(null, logs, commitCount, url);
    },

    pullRebase: function(path, callback) {
        git.pullRebase(path, callback);
    },

    stashAndPull: function(path, callback) {
        if(git.stash(path)) {
            this.pullRebase(path, callback);
        } else {
            callback({ message: config.errors.gitStash }, null);
        }
    }
};