'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = asyncErrorCatcher;
function asyncErrorCatcher(fn) {
    if (!(fn instanceof Function)) {
        throw new Error('Must supply a function');
    }

    return function (req, res, next) {
        for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
            rest[_key - 3] = arguments[_key];
        }

        var promise = fn.apply(undefined, [req, res, next].concat(rest));
        if (!promise || !promise.catch) return;
        promise.catch(function (err) {
            return next(err);
        });
    };
}