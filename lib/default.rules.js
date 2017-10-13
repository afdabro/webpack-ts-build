'use strict';
const WebpackFilter = require('./webpack.filters');
const extractSass = require('./extract.sass');

module.exports.getDefaultRules = (isDev) => {
    const webpackFilter = new WebpackFilter(isDev);
    return [
        {
            enforce: 'pre',
            test: /\.(tsx|ts)$/,
            loader: 'tslint-loader',
            exclude: /node_modules/,
        },
        webpackFilter.ifProd({
            test: /\.(tsx|ts)$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        }),
        webpackFilter.ifDev(
            {
                test: /\.(tsx|ts)$/,
                loaders: [
                    'react-hot-loader/webpack',
                    'ts-loader',
                ],
                exclude: /node_modules/,
            }
        ),
        {
            test: /\.scss$/,
            loader: extractSass.extract({
                use: [{
                    loader: 'css-loader',
                }, {
                    loader: 'sass-loader',
                },
                ],
                fallback: 'style-loader',
            }),
        },
        {
            test: /\.css$/,
            loader: 'css-loader',
        },
        {
            test: /\.(ttf|eot|svg)$/,
            loader: 'url-loader?limit=100000',
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=4096&mimetype=application/font-woff',
        },
        {
            test: /\.(jpe?g|png|gif|ico)$/i,
            loader: 'file-loader?name=images/[name].[ext]',
        },
        // https://github.com/webpack-contrib/raw-loader
        {
            test: /\.md$/,
            use: 'raw-loader',
        },
        webpackFilter.ifDev({
            enforce: 'pre',
            test: /\.(tsx|ts|js)$/,
            use: 'source-map-loader',
        }),
    ].filter(webpackFilter.nullsOut);
};
