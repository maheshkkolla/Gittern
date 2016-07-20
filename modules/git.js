var shell = require('./shell'),
    path = require('path'),
    config = require('../config'),
    parser = require('./parser');
    git = require('gitty');

module.exports = {
    getAllRepositories: function(mainDirectory) {
        var directories = shell.getAllSubDirectories(mainDirectory);
        return directories.filter(function(directory) {
            return shell.hasSubDirectory(path.join(mainDirectory, directory), '.git');
        });
    },

    getRepoStatus: function(repoPath) {
        var repo = git(repoPath);
        return repo.statusSync();
    },

    getRepoLogs: function(repoPath, offset, limit) {
        var command = config.git.logs.command(offset, limit);
        return parser.parseGitLogs(shell.runCommand(repoPath,command));
    },

    getCommitCount: function(repoPath) {
        return shell.runCommand(repoPath, config.git.logs.countCmd);
    },

    getGitHubUrl: function(repoPath) {
        return parser.parseGitHubUrl(shell.runCommand(repoPath, config.git.urlCmd));
    },

    getBehindAndAhead: function(repoPath) {
        return parser.parseBehindAndAhead(shell.runCommand(repoPath, config.git.behindAndAheadCmd));
    },

    pullRebase: function(repoPath, callback) {
        var repo = git(repoPath);
        repo.pull('', '', ['--rebase'], function(error) {
            if(error) callback(null, { error: true });
            else callback(null, { success: true });
        });
    }
};