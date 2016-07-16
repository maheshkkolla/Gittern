var shell = require('./shell'),
    path = require('path');

module.exports = {
    getAllRepositories: function(mainDirectory) {
        var directories = shell.getAllSubDirectories(mainDirectory);
        return directories.filter(function(directory) {
            return shell.hasSubDirectory(path.join(mainDirectory, directory), '.git');
        });
    }
};