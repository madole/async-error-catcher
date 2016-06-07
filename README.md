## Async Error Catcher

A helper to automatically catch errors thrown within ExpressJS routes and then pass them to the `next` function so they can be picked up by your error handler at the end of the stack.


```
import express, { Router } from 'express';
import catchErrors from 'async-error-catcher';

const app = express();
const router = new Router();

async function route(req, res, next) {
    /* Do something asynchronous */
}

router.get(catchError(route));

app.use(router);

/* Error Handler middleware */
app.use((err, req, res, next) => {
    /* Handle Errors */
});

```

This also works for any middleware or route function that returns a promise.

For a more detailed breakdown, I've explained a bit more on my blog.

http://madole.xyz/error-handling-in-express-with-async-await-routes/
