Deploytool-ssh-checkout
==========

A Deploytool deployment type for running git checkout on a remote server

## Installation

    npm install deploytool-ssh-checkout --save

## Usage

    var deploytool = require('deploytool');

    deploytool.deploy('production', 'e8ac002dc64111fce77c9c9d12c28c13c3f98aa2');

## Contributing

Take care to follow the same patterns as other Deploytool modules.

Don't extend Deplyotool itself to add new deployment types. Simply create new modules
prefixed with **deploytool-** that has a "deploy" method in it.
