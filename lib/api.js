var rp = require('request-promise');
var CONSTANT = require('./constant');

var queryXchange = exports.queryXchange = function(pairs){
    var q = pairs.map(function(v){return '"' + v + '"'}).join(',');
    var query = [
        'select * from yahoo.finance.xchange where pair in (' + q + ')',
        'format=json',
        'env=store://datatables.org/alltableswithkeys'
    ].join('&');
    return rp(CONSTANT.YAHOO_API_URL + '?q=' + query).then(JSON.parse);
}
