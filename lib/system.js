"use strict";
var LimitRequestPromise = require('limit-request-promise');
var lp = exports.lp = new LimitRequestPromise(1, 1);
