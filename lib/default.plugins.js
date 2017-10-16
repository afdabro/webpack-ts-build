'use strict';
/*
    Webpack 2
    Reference:
    https://webpack.js.org/configuration/
*/
const webpack = require('webpack');

/*
    Auto-prefix CSS
    Reference:
    https://github.com/postcss/postcss-loader
*/
const autoprefixer = require('autoprefixer');

/*
    Replaces standard Chunkhash with md5 hash.
    Reference:
    https://github.com/erm0l0v/webpack-md5-hash
*/
const WebpackMd5Hash = require('webpack-md5-hash');

/*
    Plugin to help Html bundling
    Reference:
    https://github.com/jantimon/html-webpack-plugin
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
    Replaces strings with variables within html
    Reference:
    https://github.com/erraX/html-string-replace-webpack-plugin
*/
const HtmlStringReplace = require('html-string-replace-webpack-plugin');

/*
    Uglify JS for es6
    Reference:
    https://stackoverflow.com/questions/42375468/uglify-syntaxerror-unexpected-token-punc
*/
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/*
    Enables SCSS Linting
    See the following link for Rule configuration:
    https://stylelint.io/user-guide/configuration/
    Reference:
    https://github.com/JaKXz/stylelint-webpack-plugin
*/
const StyleLintPlugin = require('stylelint-webpack-plugin');

/*
    GZip Compression
    Reference:
    https://github.com/webpack-contrib/compression-webpack-plugin
*/
const CompressionPlugin = require('compression-webpack-plugin');

const WebpackFilter = require('./webpack.filters');
const extractSass = require('./extract.sass');

const localHost = 'https://localhost:3000';

exports.getDefaultPlugins = (isDev, faviconPath, domainHost) => {
    const webpackFilter = new WebpackFilter(isDev);

    return [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(isDev ? 'development' : 'production'),
            },
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                debug: isDev, minimize: !isDev, postcss: [
                    autoprefixer({
                        browsers: [
                            'last 3 version',
                            'ie >= 10',
                        ],
                    }),
                ],
                tslint: {
                    emitErrors: true,
                    failOnHint: true,
                },
            },
        }),
        webpackFilter.ifDev(new webpack.HotModuleReplacementPlugin()),
        webpackFilter.ifDev(new webpack.NamedModulesPlugin()),
        webpackFilter.ifProd(new WebpackMd5Hash()),
        extractSass,
        webpackFilter.ifProd(new UglifyJsPlugin({
            'uglifyOptions': {
                'mangle': true,
                'warnings': false,
                'ecma': 6,
                'compress': {
                    'conditionals': true,
                    'unused': true,
                    'comparisons': true,
                    'dead_code': true,
                    'evaluate': true,
                    'if_return': true,
                    'join_vars': true,
                },
                'sourceMap': true,
            },
        })),
        new HtmlWebpackPlugin({
            template: 'index.html',
            favicon: faviconPath,
            inject: true,
            minify: {
                removeComments: !isDev,
                collapseWhitespace: !isDev,
                keepClosingSlash: !isDev,
            },
        }),
        new HtmlStringReplace({
            enable: true,
            patterns: [
                {
                    match: /<!-- @host -->/ig,
                    replacement: function(match) {
                        return isDev ? localHost : domainHost;
                    },
                },
            ],
        }),
        new HtmlStringReplace({
            enable: true,
            patterns: [
                {
                    match: /<!-- @wss -->/ig,
                    replacement: function(match) {
                        return isDev ? 'wss://localhost:3000' : '';
                    },
                },
            ],
        }),
        new StyleLintPlugin({
            configFile: '.stylelintrc.json',
            failOnError: true,
            syntax: 'scss',
            quiet: false,
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|html|css)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        // do not emit compiled assets that include errors  
        new webpack.NoEmitOnErrorsPlugin(),
    ].filter(webpackFilter.nullsOut);
};
