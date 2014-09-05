var fx = require('..');
fx.rate(fx.getSupportPair('USD')).then(function(v){
    var w = [v];
    return w;
}).then(function(w){
    return fx.rate(fx.getSupportPair('JPY')).then(function(v){
        w.push(v);
        return w;
    });
}).then(function(w){
    return fx.rate(fx.getSupportPair('EUR')).then(function(v){
        w.push(v);
        return w;
    });
}).then(console.log)
