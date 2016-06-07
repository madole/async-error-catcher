export default function errorCatcher(fn) {
    if (!(fn instanceof Function)) {
        throw new Error('Must supply a function');
    }

    return (req, res, next) => {
        const promise = fn(req, res, next);
        if (promise.catch) {
            promise.catch(err => next(err));
        }
    };
}
