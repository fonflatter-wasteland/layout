var express = require('express');

var logger = require('morgan');
var nunjucks = require('nunjucks');
var path = require('path');

var app = express();

app.use(logger('dev'));

app.locals.views = path.join(__dirname, 'views');

var viewLoader = new nunjucks.FileSystemLoader(app.locals.views);
var viewEnv = new nunjucks.Environment(viewLoader, {autoescape: true});
viewEnv.express(app);

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));

app.get('/', function (req, res, next) {
    res.render('layout.html', {
        title: 'dummy page',
        content: 'dummy content'
    });
});

module.exports = app;
