var proxyquire  =  require('proxyquire');
var mockito = require('jsmockito').JsMockito;
//var expect = require('chai').expect;
var path = require('path');
var mockedGit = null;
var repos = null;

describe('Repos service' ,function() {
    beforeEach(function() {
        mockedGit = mockito.mock(require('../../modules/git'));
        repos = proxyquire('../../services/repos', {'../modules/git': mockedGit});
    });

    it('getAll gives the list of repositories in a given directory', function() {
        var mainDirPath = "this is main directory path";
        var resultRepos = ['Repo1', 'Repo2'];
        var reposCallback = mockito.mockFunction();
        mockito.when(mockedGit).getAllRepositories(mainDirPath).thenReturn(resultRepos);
        repos.getAll(mainDirPath, reposCallback);
        mockito.verify(reposCallback)(null, resultRepos);
    });

    it('getStatus gives the status of the given repository', function() {
        var repoPath = "/dummy/path";
        var status = {staged:[], unstaged:[], untracked:[]};
        var reposCallback = mockito.mockFunction();
        mockito.when(mockedGit).getRepoStatus(repoPath).thenReturn(status);
        repos.getStatus(repoPath, reposCallback);
        mockito.verify(reposCallback)(null, status);
    });

    it('getLogs gets the logs of the given repo', function() {
        var repoPath = "/dummy/path";
        var offset = 10;
        var count = 100, url = 'github.com/user/project';
        var logs = [{id:"1234", message:"some message"},{id:"0987654", message:"some message"}];
        var reposCallback = mockito.mockFunction();
        mockito.when(mockedGit).getCommitCount(repoPath).thenReturn(count);
        mockito.when(mockedGit).getRepoLogs(repoPath, offset, 30).thenReturn(logs);
        mockito.when(mockedGit).getGitHubUrl(repoPath).thenReturn(url);
        repos.getLogs(repoPath, offset, reposCallback);
        mockito.verify(reposCallback)(null, logs, count, url);
    });

    it("pullRebase pulls the given repository", function() {
        var repoPath = "/dummy/path";
        var callback = mockito.mockFunction();
        mockito.when(mockedGit).pullRebase(repoPath).thenReturn(true);
        repos.pullRebase(repoPath, callback);
        mockito.verify(callback)(null);
    });

    it("stashAndPull first stashs the changes in repo and then pulls the repo", function() {
        var repoPath = "/dummy/path";
        var callback = mockito.mockFunction();
        mockito.when(mockedGit).stash(repoPath).thenReturn(true);
        mockito.when(mockedGit).pullRebase(repoPath).thenReturn(true);
        repos.stashAndPull(repoPath, callback);
        mockito.verify(callback)(null);
    });

    it("stashAndPull will not pull if error at stashing", function() {
        var repoPath = "/dummy/path";
        var callback = mockito.mockFunction();
        mockito.when(mockedGit).stash(repoPath).thenReturn(false);
        repos.stashAndPull(repoPath, callback);
        mockito.verify(callback)();
        mockito.verifyZeroInteractions(mockedGit.pullRebase);
    });
});