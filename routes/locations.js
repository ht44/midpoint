'use strict';

'use strict';

const express = require('express');
const knex = require('../db/knex');
const router = express.Router();


router.route('/groups/:group_id')

  .get((req, res) => {
    var groupId = parseInt(req.params.group_id, 10);
    knex.select(
      // 'users_groups.group_id',
      // 'users_groups.user_id',
      // 'users.username',
      'users.id',
      'users.current_lat',
      'users.current_lng'
    ).from('users_groups').join('users', function() {
      this.on('users_groups.group_id', '=', groupId)
      .andOn('users.id', '=', 'users_groups.user_id')
    }).then(results => {
      console.log(results);
      res.json(results);
    });
  });

router.route('/users/:user_id')

  .put((req, res) => {
      console.log(req.body);
      res.sendStatus(200);
  })

  .get(function(req, res) {
    // console.log(req.header);
      knex('users').where('id', req.params.user_id).first().then(result => {
        res.json(result);
      });
  })

module.exports = router;
