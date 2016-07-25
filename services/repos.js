var git = require('../modules/git');
var config = require('../config');
module.exports = {
    getAll: function(mainPath, callback) {
        var projects = git.getAllRepositories(mainPath);
        callback(null, projects);
    },

    getStatus: function(repoPath, callback) {
        var status = git.getRepoStatus(repoPath);
        var stats = git.getBehindAndAhead(repoPath);
        callback(null, status, stats);
    },

    getLogs: function(repoPath, offset, callback) {
        var commitCount = git.getCommitCount(repoPath);
        if(commitCount < offset) offset = 0;
        var logs = git.getRepoLogs(repoPath, offset, 30);
        var url = git.getGitHubUrl(repoPath);
        callback(null, logs, commitCount, url);
    },

    pullRebase: function(repoPath, callback) {
        if(git.pullRebase(repoPath)) {
            callback(null, { message: config.success.gitPull });
        } else {
            callback({ message: config.errors.gitPull }, null);
        }
    },

    stashAndPull: function(repoPath, callback) {
        if(git.stash(repoPath)) {
            this.pullRebase(repoPath, callback);
        } else {
            callback({ message: config.errors.gitStash }, null);
        }
    }
};