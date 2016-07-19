var expect = require('chai').expect;
var proxyquire = require('proxyquire');
var mockito = require('jsmockito').JsMockito;
var mockedShell = mockito.mock(require('shelljs'));
var shell = proxyquire('../../modules/shell', {
    'shelljs': mockedShell
});

describe('shell' ,function() {
    it('getAllSubDirectories gives the list of sub directories for a given main directory', function() {
        var subDirectories = shell.getAllSubDirectories('./test/testDir');
        expect(subDirectories).to.eql([ 'Dir1', 'Dir2', 'Repo1', 'Repo2' ]);
    });

    it('getAllSubDirectories gives empty list when given directory does not have any sub directories', function() {
        var subDirectories = shell.getAllSubDirectories('./test/testDir/Dir1');
        expect(subDirectories).to.eql([]);
    });

    it('hasSubDirectory tells that given sub directory is present in given main directory', function() {
        expect(shell.hasSubDirectory('./test/testDir', 'Repo1')).to.be.true;
    });

    it('hasSubDirectory tells that given sub directory is not present in given main directory', function() {
        expect(shell.hasSubDirectory('./test/testDir', 'NotADirectory')).to.be.false;
    });

    it('hasSubDirectory tells that given file is not a sub directory in given main directory', function() {
        expect(shell.hasSubDirectory('./test/testDir', 'readme.txt')).to.be.false;
    });

    it('isDirectory tells that given directory name is a directory', function() {
        expect(shell.isDirectory('./test/testDir')).to.be.true;
    });

    it('isDirectory tells that given file name is not a directory', function() {
        expect(shell.isDirectory('./test/testDir/readme.txt')).to.be.false;
    });

    it('isDirectory tells that given dummy directory is not a directory', function() {
        expect(shell.isDirectory('./test/testDir/noDirectory')).to.be.false;
    });

    it('runCommand runs the given command in given path', function() {
        var pathToRun = "/path/to/run";
        var command = "command --to --run";
        var expectedResult = { stdout: "This is expected result \n\t from the given command"};
        mockito.when(mockedShell).exec(command).thenReturn(expectedResult);
        var originalResult = shell.runCommand(pathToRun, command);
        mockito.verify(mockedShell.cd)(pathToRun);
        expect(originalResult).to.eql(expectedResult.stdout);
    });
});