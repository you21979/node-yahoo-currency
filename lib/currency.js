var api = require('./api');
var getSupportCurrency = exports.getSupportCurrency = function(){
    return ['USD','EUR','JPY','AUD','GBP','NZD','CHF','ZAR','CNY','BTC'];
}
var getSupportPair = exports.getSupportPair = function(base){
    return getSupportCurrency().filter(function(v){ return v !== base }).map(function(v){return v + base});
}
var ticker = exports.ticker = function(pairs){
    return api.queryXchange(pairs).then(function(v){
        if(v.query['yahoo:count'] !== pairs.length) throw new Error('query error');
        return v.query.results.rate;
    });
}
var rate = exports.rate = function(pairs){
    return ticker(pairs).
        reduce(function(v1, v2){
            v1[v2['id']] = v2['Rate'];
            return v1;
        }, {});
}
