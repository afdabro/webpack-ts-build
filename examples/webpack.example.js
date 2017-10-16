'use strict';
const defaultWebpack = require('../index').defaultWebpack;

/*
    Paths
*/
const path = require('path');
const buildPath = path.join(__dirname, './bin');
const sourcePath = path.join(__dirname, './src');
const domainHost = '';

module.exports = (isDev) => {
    const appPlugins = [];

    const options = {
        'isDev': isDev,
        'faviconPath': 'assets/favicon.ico',
        'domainHost': domainHost,
        'sourcePath': sourcePath,
        'appLoader': './appLoader',
        'buildPath': buildPath,
        'appPlugins': appPlugins,
    };

    return defaultWebpack(options);
};
