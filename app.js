const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require("dotenv").config()

const indexRouter = require('./routes/index');
const movie = require('./routes/movie');
const director = require('./routes/director');

const app = express();

const db = require('./helpers/db')();

app.set('api_secret_key', process.env.API_SECRET_KEY)

const verifyToken = require('./middleware/verify-token')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', verifyToken)
app.use('/api/movies', movie);
app.use('/api/directors', director);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({error: {message: err.message, code: err.code}});
});

module.exports = app;
