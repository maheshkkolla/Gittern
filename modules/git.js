var shell = require('./shell'),
    path = require('path'),
    git = require('git-controller');

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
    }
};