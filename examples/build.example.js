'use strict';
const config = require('./webpack.example');
const buildProd = require('../index').buildProd;

buildProd(config);
