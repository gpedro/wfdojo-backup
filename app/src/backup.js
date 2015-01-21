var fs = require('fs');
var crypto = require('crypto');

function Backup(dir) {
  if (!fs.existsSync(dir)) {
    throw new Error('This directory doesn\'t seem to exist');
  }

  var fileStat = fs.statSync(dir);

  if (!fileStat.isDirectory()) {
    throw new Error('This directory doesn\'t seem to be valid');
  }

  this.dir = dir;
  this.files = this.readFiles();
}

Backup.prototype.readFiles = function() {
  return fs.readdirSync(this.dir);
};

Backup.prototype.encryptFiles = function(callback) {
  var self = this;
  var encryptedFiles = [];

  this.files.forEach(function(file) {
    var chkSum = crypto.createHash('md5');

    chkSum.update(fs.readFileSync(self.dir + '/' + file));
    encryptedFiles.push(chkSum.digest('hex'));
  });

  return encryptedFiles;
};

Backup.prototype.checkFiles = function() {
  var self = this;
  var files = this.encryptFiles();

  files.forEach(function(file1, index1) {

    files.forEach(function(file2, index2) {
      if (file1 === file2 && index1 !== index2) {
        var err = new Error('It has been detected equal files');

        err.files = [self.dir + '/' + self.files[index1], self.dir + '/' + self.files[index2]];

        throw err;
      }
    });

  });
};

module.exports = Backup;
