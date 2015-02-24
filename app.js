var express = require('express');

var logger = require('morgan');
var nunjucks = require('nunjucks');
var path = require('path');

var app = express();

nunjucks.configure(path.join(__dirname, 'views'), {
    express: app,
    autoescape: true
});

app.use(logger('dev'));

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));

app.get('/', function(req, res, next) {
    res.render('layout.html', {
        title: 'dummy page',
        content: 'dummy content'
    });
});

module.exports = app;
