var proxyquire  =  require('proxyquire');
var mockito = require('jsmockito').JsMockito;
var expect = require('chai').expect;
var mockedShell = mockito.mock(require('../../modules/shell'));
var mockedGitC = mockito.mockFunction();
var git = proxyquire('../../modules/git', {
    './shell': mockedShell,
    'git-controller': mockedGitC
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
});