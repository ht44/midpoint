'use strict';

const knex = require('../db/knex');

module.exports = (req, res, next) => {
  if (req.session.userId) {
    knex('users').where('id', req.session.userId).first().then(user => {
      res.locals.currentUser = user;
      req.currentUser = user;
      next();
    })
  } else {
    next();
  }
}
