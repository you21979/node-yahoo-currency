var rp = require('request-promise');
var YAHOO_API_URL = 'https://query.yahooapis.com/v1/public/yql';

var queryXchange = exports.queryXchange = function(pairs){
    var q = pairs.map(function(v){return '"' + v + '"'}).join(',');
    var query = 'select * from yahoo.finance.xchange where pair in (' +
            q + ')&format=json&&env=store://datatables.org/alltableswithkeys';
    return rp(YAHOO_API_URL + '?q=' + query).then(JSON.parse);
}
