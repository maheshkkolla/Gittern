var fs = require('fs'),
    path = require('path');

module.exports = {
    getAllSubDirectories: function(pathToParent) {
        var self = this;
        return fs.readdirSync(pathToParent).filter(function(directory) {
            return self.isDirectory(path.join(pathToParent, directory));
        });
    },

    hasSubDirectory: function(mainDirectory, subDirectory) {
        var self = this, directoryPath = path.join(mainDirectory, subDirectory);
        if(fs.existsSync(directoryPath)) {
            return self.isDirectory(directoryPath);
        }
        return false;
    },

    isDirectory: function(path) {
        if(fs.existsSync(path))
            return fs.statSync(path).isDirectory();
        return false;
    }
};


