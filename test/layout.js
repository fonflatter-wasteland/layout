suite('layout', function() {
  'use strict';

  var request = require('supertest');

  var app = require('../app');

  test('with dummy content', function(next) {
    request(app)
      .get('/layout')
      .expect(200)
      .expect(/dummy page/)
      .end(next);
  });

  test('with error', function(next) {
    request(app)
      .get('/error')
      .expect(418)
      .expect(/I’m a teapot/)
      .end(next);
  });

  test('with non-existent page', function(next) {
    request(app)
      .get('/non-existent')
      .expect(404)
      .expect(/Not Found/)
      .end(next);
  });
});
