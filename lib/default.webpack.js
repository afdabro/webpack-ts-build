'use strict';

const webpackPlugins = require('./default.plugins');
const webpackRules = require('./default.rules');
const appEntry = require('./appEntry');

module.exports = (options) => {
    console.log(`isDev: ${options.isDev}`);
    const defaultPlugins = webpackPlugins.getDefaultPlugins(
        options.isDev, options.faviconPath, options.domainHost);

    return {
        devtool: options.isDev ? 'inline-source-map' : 'source-map',
        target: 'web',
        context: options.sourcePath,
        entry: appEntry(
            options.isDev, options.appLoader, options.webpackPublicPath),
        output: {
            path: options.buildPath,
            publicPath: '/',
            filename: '[name].[hash].js',
        },
        performance: {
            hints: false,
        },
        plugins: defaultPlugins.concat(options.appPlugins),
        module: {
            rules: webpackRules.getDefaultRules(options.isDev),
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.scss', 'css'],
        },
    };
};
