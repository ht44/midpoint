'use strict';

const express = require('express');
const knex = require('../db/knex');
const router = express.Router();

router.route('/login')
  .get((req, res) => {
    res.render('auth/login');
  })

router.route('/register')
  .get((req, res) => {
    res.render('auth/register');
  });

module.exports = router;
