'use strict';

/*
    Extract text from bundle
    Reference:
    https://github.com/webpack-contrib/extract-text-webpack-plugin
*/
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: false,
});
