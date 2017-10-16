'use strict';
const config = require('./webpack.example');
const devServer = require('../index').devServer;

devServer(config, './bin');
