'use strict';

const express = require('express');
const knex = require('../db/knex');
const router = express.Router();
require('dotenv').load();

router.route('/')
  .get((req, res) => {
    knex('users_groups')
      .leftJoin('groups', 'users_groups.group_id', 'groups.id')
      .where({
        user_id: req.currentUser.id
      })
      .then((groups)=> {
        res.render('statics/map', {
          apiKey: process.env.API_KEY,
          groups: groups
        });
      })
  });


module.exports = router;
