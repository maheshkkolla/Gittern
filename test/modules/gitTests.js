var config = require('../../config');
var proxyquire = require('proxyquire');
var JsHM = require('jshamcrest').JsHamcrest.Matchers;
var mockito = require('jsmockito').JsMockito;
var expect = require('chai').expect;
var mockedShell = mockito.mock(require('../../modules/shell'));
var mockedGitC = mockito.mockFunction();
var mockedParser = mockito.mock(require('../../modules/parser'));
var git = proxyquire('../../modules/git', {
    './shell': mockedShell,
    'gitty': mockedGitC,
    './parser': mockedParser
});

describe('git' ,function() {
    it('getAllRepositories gives the list of directories that has .git directory', function() {
        var mainDirPath = "";
        var subDirs = ["Dir1", "Repo1"];
        mockito.when(mockedShell).getAllSubDirectories(mainDirPath).thenReturn(subDirs);
        mockito.when(mockedShell).hasSubDirectory("Dir1").thenReturn(false);
        mockito.when(mockedShell).hasSubDirectory("Repo1").thenReturn(true);
        var repos = git.getAllRepositories(mainDirPath);
        expect(repos).to.eql(['Repo1']);
    });

    it('getAllRepositories gives the empty list if there are no repos', function() {
        var mainDirPath = "";
        var subDirs = ["Dir1", "Dir2"];
        mockito.when(mockedShell).getAllSubDirectories(mainDirPath).thenReturn(subDirs);
        mockito.when(mockedShell).hasSubDirectory("Dir1").thenReturn(false);
        mockito.when(mockedShell).hasSubDirectory("Dir2").thenReturn(false);
        var repos = git.getAllRepositories(mainDirPath);
        expect(repos).to.eql([]);
    });

    it('getRepoStatus gives the status of the given repository', function() {
        var repoPath = "/dummy/path/here";
        var status = {staged:[{}] , unstaged:[{}], untracked: ['/file1', 'file2']};
        var gitS = mockito.mock({ statusSync: function(){} });
        mockito.when(mockedGitC)(repoPath).thenReturn(gitS);
        mockito.when(gitS).statusSync().thenReturn(status);
        var resultStatus = git.getRepoStatus(repoPath);
        expect(resultStatus).to.eql(status);
    });

    it("getRepoLogs gives the logs of specified number from specified offset", function() {
        var repoPath = "/dummay/path/here";
        var offset = 10, limit = 10;
        var command = config.git.logs.command(offset, limit);
        var logs = "Some logs here\n one more log here";
        var parsedLogs = [{message: "Commit1"},{message: "Commit2"}];
        mockito.when(mockedShell).runCommand(repoPath, command).thenReturn(logs);
        mockito.when(mockedParser).parseGitLogs(logs).thenReturn(parsedLogs);
        var originalLogs = git.getRepoLogs(repoPath, offset, limit);
        expect(originalLogs).to.eql(parsedLogs);
    });

    it("getCommitCount gives the count of the commits in the given repository", function() {
        var repoPath = "/dummay/path/here";
        var command = config.git.logs.countCmd;
        var commitCount = 12345;
        mockito.when(mockedShell).runCommand(repoPath, command).thenReturn(commitCount);
        expect(git.getCommitCount(repoPath)).to.equal(commitCount);
    });

    it("getGitHubUrl gives the git hub url for a given repo", function() {
        var repoPath = "/dummy/repo/path/here";
        var command = config.git.urlCmd;
        var gitHubUrl = "git@github.com:user/project.git";
        var parsedUrl = "github.com/user/project";
        mockito.when(mockedShell).runCommand(repoPath, command).thenReturn(gitHubUrl);
        mockito.when(mockedParser).parseGitHubUrl(gitHubUrl).thenReturn(parsedUrl);
        var resultUrl = git.getGitHubUrl(repoPath);
        expect(resultUrl).to.eql(parsedUrl);
    });

    it("pullRebase pull the repository with rebase flag on", function() {
        var repoPath = "/dummy/repo/path/here";
        var callbackForPull = mockito.mockFunction();
        var gitS = mockito.mock({ pull: function(){} });
        mockito.when(mockedGitC)(repoPath).thenReturn(gitS);
        mockito.when(gitS).pull().then(function() {
            arguments[3](null);
        });
        git.pullRebase(repoPath, callbackForPull);
        mockito.verify(callbackForPull)(null);
    });
});