'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = errorCatcher;
function errorCatcher(fn) {
    if (!(fn instanceof Function)) {
        throw new Error('Must supply a function');
    }

    return function (req, res, next) {
        var promise = fn(req, res, next);
        if (!promise.catch) return;
        promise.catch(function (err) {
            return next(err);
        });
    };
}