var rp = require('request-promise');
var parser = require('xml2json');
var YAHOO_API_URL = 'https://query.yahooapis.com/v1/public/yql';

var queryXchange = exports.queryXchange = function(pairs){
    var q = pairs.map(function(v){return '"' + v + '"'}).join(',');
    var query = 'select * from yahoo.finance.xchange where pair in (' +
            q + ')&env=store://datatables.org/alltableswithkeys';
    return rp(YAHOO_API_URL + '?q=' + query).then(parser.toJson).then(JSON.parse);
}
