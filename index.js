#!/usr/bin/env node

var app = require('./app');

app.get('/', function (req, res, next) {
    res.render('layout.html', {
        title: 'dummy page',
        content: 'dummy content'
    });
});

app.listen(parseInt(process.env.PORT) || 62003);
