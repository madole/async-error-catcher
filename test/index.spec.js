import test from 'ava';
import catchErrors from '../src/index';

test('errorCatcher', async t => {
    function route() {
        return Promise.reject('x');
    }

    const routeWithCatcher = catchErrors(route);
    const req = {};
    const res = {};
    const next = err => {
        if (err) {
            t.pass('Err has been called');
        } else {
            t.fail('no error passed');
        }
    };

    routeWithCatcher(req, res, next);
});

test('should throw error if no fn passed in', t => {
    t.throws(catchErrors, Error);
});

test('should throw error if object instead of a function is passed in', t => {
    t.throws(() => catchErrors({}), Error);
});

test('should not throw error if function is passed in and it resolves', async t => {
    function route() {
        return Promise.resolve('x');
    }

    const routeWithCatcher = catchErrors(route);
    const req = {};
    const res = {};
    const next = () => {
        t.fail('no error passed');
    };

    routeWithCatcher(req, res, next);
});

test('should not throw error if non async function is passed in', t => {
    function route() {
        return true;
    }
    const routeWithCatcher = catchErrors(route);
    const req = {};
    const res = {};
    const next = () => {
        t.fail('no error passed');
    };
    routeWithCatcher(req, res, next);
});

test('should not throw error if non async function is passed in and returns nothing', t => {
    function route() {}
    const routeWithCatcher = catchErrors(route);
    const req = {};
    const res = {};
    const next = () => {
        t.fail('no error passed');
    };
    routeWithCatcher(req, res, next);
});

test('should handle extra route parameters', async t => {
    function route(req, res, next, param) {
        t.is(param, 'param');
        return Promise.resolve('x');
    }

    const routeWithCatcher = catchErrors(route);
    const req = {};
    const res = {};
    const next = () => {
        t.fail('no error passed');
    };

    routeWithCatcher(req, res, next, 'param');
});
