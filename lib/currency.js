var api = require('./api');
var CONSTANT = require('./constant');

var calcReverseRate = exports.calcReverseRate = function(rate){
    return 1 / rate;
}
var getSupportCurrency = exports.getSupportCurrency = function(){
    return CONSTANT.SUPPORT_CURRENCY;
}
var getSupportPair = exports.getSupportPair = function(base){
    return getSupportCurrency().filter(function(v){ return v !== base }).map(function(v){return v + base});
}
var ticker = exports.ticker = function(pairs){
    return api.queryXchange(pairs).then(function(v){
        if(v.query['count'] !== pairs.length) throw new Error('query error');
        return v.query.results.rate;
    });
}
var rate = exports.rate = function(pairs){
    return ticker(pairs).
        reduce(function(v1, v2){
            v1[v2['id']] = parseFloat(v2['Rate']);
            return v1;
        }, {});
}
var calcRate = function(keycurrency, target, rates){
    var reverse = calcReverseRate(rates[target + keycurrency]);
    var r = Object.keys(rates).
        map(function(v){return v.split(keycurrency).shift()}).
        filter(function(v){return v !== target}).
        reduce(function(ctx, v){
            ctx[v + target] = reverse * rates[v + keycurrency];
            return ctx;
        }, {})
    r[keycurrency + target] = reverse;
    return r;
}

var fullRate = exports.fullRate = function(){
    var keycurrency = 'USD';
    return rate(getSupportPair(keycurrency)).then(function(rates){
        getSupportCurrency().
            filter(function(v){return v !== keycurrency}).
            map(function(v){
                return calcRate(keycurrency, v, rates);
            }).forEach(function(v){
                Object.keys(v).forEach(function(k){rates[k]=v[k]});
            });
        return rates;
    })
}
