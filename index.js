/**
 * @author bmcclure
 */

var deploytool = require('deploytool');
var ssh = require('deploytool-ssh');

module.exports = {
  name: 'ssh-checkout',
  'tag': 'deployment',
  init: function () {},
  deploy: function(environment, commit, callback) {
    deploytool.environment.init(environment, {
      type: 'ssh-checkout',
      remoteBranch: '',
      remote: 'origin',
      remotePath: '',
      commands: []
    });


    var config = environment.config;
    config.remoteBranch = config.remoteBranch || config.branch;

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
