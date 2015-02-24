#!/usr/bin/env node

var app = require('./app');

app.listen(parseInt(process.env.PORT) || 62003);
