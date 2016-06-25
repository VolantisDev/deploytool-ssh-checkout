/**
 * @author bmcclure
 */

var deploytool = require('deploytool');
var ssh = require('deploytool-ssh');

module.exports = {
  deploy: function(environment, commit, callback) {
    if (typeof environment === 'string') {
      environment = deploytool.environment.load(environment);
    }

    environment.applyDefaults({
      type: 'ssh-checkout',
      remoteBranch: '',
      remote: 'origin',
      remotePath: '',
      commands: []
    });

    var config = environment.config;
    environment.config.remoteBranch = environment.config.remoteBranch || environment.config.branch

    if (!config.remotePath) {
      callback(new Error('remotePath must be specified'));

      return;
    }

    var checkoutCommand = commit || '-B ' + config.branch + ' ' + config.remote + '/' + config.branch;

    environment.config.commands = [
      'git -C "' + config.dir + '" fetch',
      'git -C "' + config.dir + '" checkout ' + checkoutCommand
    ];

    ssh.deploy(environment, commit, callback);
  }
};
