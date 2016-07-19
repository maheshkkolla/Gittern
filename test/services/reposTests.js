var proxyquire  =  require('proxyquire');
var mockito = require('jsmockito').JsMockito;
//var expect = require('chai').expect;
var mockedGit = mockito.mock(require('../../modules/git'));
var repos =   proxyquire('../../services/repos', {'../modules/git': mockedGit});

describe('Repos service' ,function() {
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
});