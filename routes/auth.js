'use strict';

const express = require('express');
const knex = require('../db/knex');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.route('/logout')

  .get((req, res) => {
    req.session = null;
    delete res.locals.currentUser;
    delete req.currentUser;
    res.redirect('/');
  });

router.route('/login')
  .get((req, res) => {
    res.render('auth/login', {
      message: 'PlEASE LOGIN'
    });
  })

  .post((req, res) => {
    knex('users').where('email', req.body.cred.email).first().then(user => {
      if (user) {
        var isUser = bcrypt.compareSync(req.body.cred.password, user.password_digest);
        if (isUser) {
          req.session.userId = user.id;
          res.redirect('/midpoint');
        } else {
          res.render('auth/login', {
            message: 'WRONG PASSWORD'
          });
        }
      } else {
        res.redirect('/auth/register');
      }
    }).catch(err => {
      res.send(err);
    });
  });

router.route('/register')
  .get((req, res) => {
    res.render('auth/register', {
      message: 'Create an Account'
    });
  })

  .post((req, res) => {
    res.redirect('users/new');
  })

module.exports = router;
