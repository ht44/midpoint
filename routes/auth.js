'use strict';

const express = require('express');
const knex = require('../db/knex');
const router = express.Router();

router.route("/login")
  .post((req, res) => {
    var login = req.body.login;
    res.send(login);
  })


module.exports = router;
