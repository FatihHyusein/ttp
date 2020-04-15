const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const db = require('./db');
const authMiddleware = require('./auth/verify-is-logged');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Cache-control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return next();
});
app.use(compression({
    filter: (req, res) => !req.headers.accept || req.headers.accept.indexOf('image/*') === -1
}));
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', require('./auth/auth.api'));

app.use('/api', authMiddleware, require('./api'));

app.use((req, res) => {
    const { data, toastMessages, confirmMessage, ...restProps } = res.locals;
    if (typeof data === 'undefined') {
        res.status(404).send({ error: 'Api Endpoint Not Found' });
    }

    const response = {
        token: res.token,
        toastMessages: toastMessages || [],
        confirmMessage: confirmMessage || '',
        result: data,
        ...restProps
    };

    res.json(response);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    next(err);
});

app.use((err, req, res, next) => {
    const { statusCode, message, stack } = err;

    !statusCode && process.env.NODE_ENV === 'production'
        ? res.status(500).send({
            error: 'Something failed!',
            token: res.token,
        })
        : res.status(statusCode || 500).send({
            error: message || 'Something failed!',
            stack,
            token: res.token,
        });
});

(async () => {
    const port = process.env.PORT || 4999;

    try {
        const conn = await db.initiateDbConnection();
        console.log('\x1b[32m', `1.Connected to MongoDB: ${conn.s.url.split(':')[2]}\t`, '\x1b[0m');
        http.createServer(app).listen(port, () => {
            console.log('\x1b[32m', `2.Server is running on port ${port}!\t`, '\x1b[0m');
        });
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
})();


