var proxyquire  =  require('proxyquire');
var mockito = require('jsmockito').JsMockito;
var expect = require('chai').expect;
var mockedShell = mockito.mock(require('../../modules/shell'));
var git = proxyquire('../../modules/git', {'./shell': mockedShell});

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
});