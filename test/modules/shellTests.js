var expect = require('chai').expect;
var shell = require('../../modules/shell');

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
});