'use strict';

const express = require('express');
const knex = require('../db/knex');
const router = express.Router();

router.route('/users')

  .put((req, res) => {
    res.redirect(`/locations/users/${req.session.userId}`);
  })

  .get((req, res) => {
    knex.select('username', 'email', 'first', 'last').from('users').then(users => {
      res.send(users);
    });
  });

router.route('/groups')
  .post((req, res) => {
    var groupName;
    req.body.forEach(item => {
      if (item.user_id === 'session') {
        item.user_id = req.currentUser.id;
      }
      if (item.hasOwnProperty('name')) {
        groupName = req.body.pop();
      }
    });
    groupName.created_by = req.currentUser.id;
    knex('groups').insert(groupName).returning('id').then(id => {
      req.body.forEach(item => {
        item.group_id = id[0];
      })
      knex('users_groups').insert(req.body).returning('id').then(id => {
        console.log(id);
      });
    });

    res.sendStatus(200);
  })

router.route('/groups/:group_id')

  .get((req, res) => {
    console.log("WE GFOT TO ");
    var groupId = parseInt(req.params.group_id, 10);
    console.log(groupId);
    knex('groups').where('id', groupId)
    .first()
    .then((group)=>{
        knex.select(
          'users.first',
          'users.last',
          'users.username',
          'users.email',
          'users.id',
          'users.current_lat',
          'users.current_lng'
        ).from('users_groups').join('users', function() {
          this.on('users_groups.group_id', '=', group.id)
          .andOn('users.id', '=', 'users_groups.user_id')
        }).whereNot('users.id', req.currentUser.id).then(results => {
          console.log(results);
          res.json(results);
        });
      });
    })


router.route('/users/:user_id')

  .put((req, res) => {
      if (!req.session.isChanged && req.session.userId === req.currentUser.id) {
        knex('users').where('id', req.currentUser.id).update({
          current_lat: req.body.lat,
          current_lng: req.body.lng
        }).then(() => {
          res.send(req.currentUser.username);
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
