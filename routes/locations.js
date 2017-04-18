'use strict';

const express = require('express');
const knex = require('../db/knex');
const router = express.Router();

router.route('/users')
  .put((req, res) => {
    res.redirect(`/locations/users/${req.session.userId}`);
  });

router.route('/groups')
  .post((req, res) => {
    console.log(req.body);
    res.sendStatus(200);
  })

router.route('/groups/:group_id')

  .get((req, res) => {
    var groupId = parseInt(req.params.group_id, 10);
    knex.select(
      // 'users_groups.group_id',
      // 'users_groups.user_id',
      // 'users.img_url',
      'users.email',
      'users.id',
      'users.current_lat',
      'users.current_lng'
    ).from('users_groups').join('users', function() {
      this.on('users_groups.group_id', '=', groupId)
      .andOn('users.id', '=', 'users_groups.user_id')
    }).whereNot('users.id', req.currentUser.id).then(results => {
      console.log(results);
      res.json(results);
    });
  });

router.route('/users/:user_id')

  .put((req, res) => {
      if (!req.session.isChanged && req.session.userId === req.currentUser.id) {
        knex('users').where('id', req.currentUser.id).update({
          current_lat: req.body.lat,
          current_lng: req.body.lng
        }).then(() => {
          res.sendStatus(200);
        });
      } else {
        console.log('nope');
      }
  })

  .get(function(req, res) {
      knex.select('id', 'username', 'current_lat', 'current_lng', 'email')
      .from('users')
      .where('username', req.params.user_id).first().then(result => {
        res.json(result);
      }).catch(err => {
          console.log(err);
      });
  });

module.exports = router;
