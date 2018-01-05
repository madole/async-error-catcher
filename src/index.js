export default function asyncErrorCatcher(fn) {
    if (!(fn instanceof Function)) {
        throw new Error('Must supply a function');
    }

    return (req, res, next, ...rest) => {
        const promise = fn(req, res, next, ...rest);
        if (!promise || !promise.catch) return;
        promise.catch(err => next(err));
    };
}
