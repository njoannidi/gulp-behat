(function() {
  var gutil, os, spawn, through;

  gutil = require('gulp-util');

  os = require('os');

  spawn = require('child_process').spawn;

  through = require('through');

  module.exports = function(opts) {
    var behatCommand, behatOpts, option, value;
    if (typeof opts === 'undefined') {
      opts = {};
    }
    if (opts.exec) {
      behatCommand = opts.exec;
      delete opts.exec;
    } else {
      behatCommand = './vendor/bin/behat';
      if (os.platform === 'win32') {
        behatCommand = behatCommand.replace(/[\/]/g, '\\');
      }
    }
    if (typeof behatCommand === !'string') {
      throw new gutil.PluginError('gulp-behat-stream', 'Invalid Behat Command. Expecting string.');
    }
    behatOpts = [];
    for (option in opts) {
      value = opts[option];
      if (typeof value === 'string' && value.length > 0) {
        behatOpts.push("--" + option + "=" + value);
      } else {
        behatOpts.push("--" + option);
      }
    }
    return through(function(file) {
      return this.queue(file);
    }, function() {
      var behat, stream;
      stream = this;
      behat = spawn(behatCommand, behatOpts);
      behat.stdout.on('data', function(chunk) {
        return stream.emit('message', chunk);
      });
      return behat.stderr.on('data', function(chunk) {
        return stream.emit('error', chunk);
      });
    });
  };

}).call(this);
