'use strict';

const express = require('express');
const knex = require('../db/knex');
const router = express.Router();
require('dotenv').load();

router.route('/')
  .get((req, res) => {
    console.log(req.session);
    res.render('statics/map', {apiKey: process.env.API_KEY});
  });

module.exports = router;
