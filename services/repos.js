var fs = require('fs'),
    path = require('path'),
    sh = require('shelljs');
    require('shelljs/global');

sh.config.silent = true; // Do not print the output of the commands

var getAllDirectories = function(pathToParent) {
    return fs.readdirSync(pathToParent).filter(function(directory) {
        return fs.statSync(path.join(pathToParent, directory)).isDirectory();
    });
};


module.exports = {
    getAll: function(path, callback) {
        var projects = getAllDirectories(path);
        callback(null, projects);
    }
};