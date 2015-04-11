suite('layout', function() {
  'use strict';

  var expect = require('chai').expect;
  var request = require('supertest');

  var app = require('../app');

  test('dummy content', function(next) {
    request(app)
      .get('/dummy')
      .expect(200)
      .expect(/dummy page/)
      .end(next);
  });

  test('error with status', function(next) {
    request(app)
      .get('/teapot-error')
      .expect(418)
      .expect(/I’m a teapot/)
      .end(next);
  });

  test('error without status', function(next) {
    request(app)
      .get('/error')
      .expect(500)
      .expect(/Custom error/)
      .end(next);
  });

  test('non-existent page', function(next) {
    request(app)
      .get('/non-existent')
      .expect(404)
      .expect(/Not Found/)
      .end(next);
  });

  test('reqistering app after layout', function() {
    var express = require('express');
    var parentApp = express();
    parentApp.use(app);
    expect(function() {
      parentApp.use(express());
    }).to.throw(/must be app.use\(\)d last/);
  });
});
