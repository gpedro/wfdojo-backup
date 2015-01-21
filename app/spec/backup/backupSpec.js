var path = require('path');
var Backup = require('../../src/backup');

describe('Backup', function() {

  var fixturesEqualPath,
      fixturesNotEqualPath,
      equalBackup,
      notEqualBackup;

  beforeEach(function() {
    fixturesEqualPath = path.resolve(__dirname, '../fixtures/equal');
    fixturesNotEqualPath = path.resolve(__dirname, '../fixtures/notEqual');

    equalBackup = new Backup(fixturesEqualPath);
    notEqualBackup = new Backup(fixturesNotEqualPath);
  });

  it('should throw exceptions when invalid directory', function() {
    expect(function() {
      new Backup('wrongPath');
    }).toThrowError('This directory doesn\'t seem to exist');

    expect(function() {
      new Backup(path.resolve(__dirname, '../fixtures/equal/1.txt'));
    }).toThrowError('This directory doesn\'t seem to be valid');
  });

  it('should return files array after construction of the object', function() {
    expect(equalBackup.files).toEqual(['1.txt', '2.txt']);
  });

  it('should encrypt files', function() {
    expect(equalBackup.encryptFiles()).toEqual(['e59ff97941044f85df5297e1c302d260', 'e59ff97941044f85df5297e1c302d260']);
  });

  it('should throw exception when dectect equal files', function() {
    expect(function() {
      equalBackup.checkFiles();
    }).toThrowError('It has been detected equal files');

    expect(function() {
      notEqualBackup.checkFiles();
    }).not.toThrowError();
  });

});
