var expect = require('chai').expect;
var parser = require('../../modules/parser');
var config = require('../../config');

describe('Parser', function() {
    it('parseGitLogs prases git logs and returns json format', function() {
        var id1 = "sahgd13", id2 = "ghj45678";
        var author1 = "Author1", author2 = "Author2";
        var commit1 = "Commit1", commit2 = "comm't2 ' `kjn";
        var date1 = "Date1", date2 = "Date2";
        var log1 = id1+config.git.logs.colSeparator+author1+config.git.logs.colSeparator+commit1+config.git.logs.colSeparator+date1;
        var log2 = id2+config.git.logs.colSeparator+author2+config.git.logs.colSeparator+commit2+config.git.logs.colSeparator+date2;
        var logs = log1+config.git.logs.newLineSeparator+log2+config.git.logs.newLineSeparator;
        var parsedLogs = parser.parseGitLogs(logs);
        expect(parsedLogs.length).to.equal(2);
        expect(parsedLogs).to.eql([
            {
                id: id1,
                author: author1,
                message: commit1,
                date: date1
            },{
                id: id2,
                author: author2,
                message: commit2,
                date: date2
            }
        ]);
    });

    it("parseGitHubUrl parses the git remote url", function() {
        var url = "git@github.com:user/Project.git";
        var parsedUrl = parser.parseGitHubUrl(url);
        expect(parsedUrl).to.eql("github.com/user/Project");
    });
});