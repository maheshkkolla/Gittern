var config = require('../config');
module.exports = {
    parseGitLogs: function(gitLogs) {
        var commits = gitLogs.split(config.git.logs.newLineSeparator);
        commits.pop(); // Remove the last empty one
        return commits.map(function(log) {
            var logDetails = log.split(config.git.logs.colSeparator);
            return {
                id: logDetails[0].replace('\n',''),
                author: logDetails[1],
                message: logDetails[2]
            };
        });
    }
};