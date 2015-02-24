#!/usr/bin/env node

var app = require('./app');

app.get('/', function (req, res, next) {
    res.render('layout.html', {
        title: 'dummy page',
        content: 'dummy content'
    });
});

app.get('/error', function (req, res, next) {
    var err = new Error("I’m a teapot");
    err.status = 418;

    res.render('error.html', {
        error: err
    });
});

app.listen(parseInt(process.env.PORT) || 62003);
