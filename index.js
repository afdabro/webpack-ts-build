// TODO: describe 
/*
const options = {
    'isDev': isDev,
    'faviconPath': 'assets/favicon.ico',
    'domainHost': domainHost,
    'sourcePath': sourcePath,
    'appLoader': './appLoader',
    'buildPath': buildPath,
    'appPlugins': appPlugins
};*/

/**
* Generates a default webpack configuration based on the options provided.
* @param {object} options - configuration options.
* @return {object} default webpack configuration
*/
module.exports = function defaultWebpack(options) {
    const defaultWebpack = loadClass('default.webpack');
    return defaultWebpack(options);
};

/**
 * Executes a production build using the webpack configuration.
 * @param {object} webpackConfig - webpack configuratin.
 */
module.exports = function buildProd(webpackConfig) {
    const buildProd = loadClass('build.prod');
    buildProd(webpackConfig);
};

/**
 * Starts a developer server using the webpack configuration.
 * @param {object} webpackConfig - webpack configuratin.
 * @param {string} contentBase - base content path.
 */
module.exports = function devServer(webpackConfig, contentBase) {
    const devServer = loadClass('dev.server');
    devServer(webpackConfig, contentBase);
};

/**
 * Load the given class.
 * @param {string} className Name of class to default
 * @return {function|object} Class constructor or exports
 * @private
 */
function loadClass(className) {
    let Class = Classes[className];

    if (Class !== undefined) {
      return Class;
    }

    // This uses a switch for static require analysis
    switch (className) {
      case 'default.webpack':
        Class = require('./lib/default.webpack');
        break;
      case 'build.prod':
        Class = require('./lib/build.prod');
        break;
      case 'dev.server':
        Class = require('./lib/dev.server');
        break;
      default:
        throw new Error('Cannot find class \'' + className + '\'');
    }

    // Store to prevent invoking require()
    Classes[className] = Class;

    return Class;
  }
