var CONSTANT = require('./constant');
var lp = require('./system').lp;

var createGetOption = function(url){
    return {
        url : url,
        timeout : Math.floor(CONSTANT.OPT_TIMEOUT_SEC * 1000),
    }
}

var query = function(url){
    return lp.req(createGetOption(url)).then(JSON.parse)
}

var queryXchange = exports.queryXchange = function(pairs){
    var w = pairs.map(function(v){return '"' + v + '"'}).join(',');
    var param = [
        'select * from yahoo.finance.xchange where pair in (' + w + ')',
        'format=json',
        'env=store://datatables.org/alltableswithkeys'
    ].join('&');
    return query(CONSTANT.YAHOO_API_URL + '?q=' + param);
}
