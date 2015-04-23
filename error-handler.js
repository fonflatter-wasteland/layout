/**
 * Handles all occurring errors by displaying error page and dumping stack
 * trace to log.
 */
module.exports = function(err, req, res, next) {
  'use strict';

  console.error(err.stack);

  if (err.status) {
    res.status(err.status);
  } else {
    res.status(500);
  }

  res.render('error.html', {
    message: err.message,
  });
};
