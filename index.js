'use strict';

require('harmony-reflect');


var promiseProxy = function(promise) {
    return new Proxy(promise, {
        get: function(target, property) {
            if (property === 'then') {
                return target.then.bind(target);
            } else {
                return promiseProxy(
                    target.then(function(resolved) {
                        return resolved[property];
                    })
                );
            }
        },

        apply: function(target, thisArg, argsArray) {
            return promiseProxy(
                target.then(function(resolved) {
                    return resolved.apply(thisArg, argsArray);
                })
            );
        }
    });
}

var p = promiseProxy(
    new Promise(function(resolve) {
        setTimeout(function() {
            resolve({ 
                a: {
                    b: 23,
                    q: function() {
                        console.log('The duck says moo');
                    }
                }
            });
        },1000);
    })
);

p.a.then(function(a) {
    console.log(`a is ${a}`);
});

p.a.q();
