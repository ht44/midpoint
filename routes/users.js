'use strict'

const express = require('express');
const knex = require('../db/knex');
const router = express.Router();

router.route('/')
    //index all users ** for admin only **
    .get(function(req, res) {
        knex('users')
            .then(function(users) {
                res.render('users/index', {
                    users
                })
            })
        // res.send('yomamma')
    })

    // AUTH POST TO CREATE NEW ACCOUNT
    .post((req, res) => {
      res.send(req.body.cred)
    });


router.route('/new')
  // SIGNUP PAGE
  .get((req, res) => {
    res.render('users/new');
  })

router.route('/:user_id')

    .delete((req, res) => {
        knex('users')
            .where(
                'id', req.params.user_id
            )
            .del()
            .then(() => {
                res.redirect('/users');
            });
    })

    // EDIT PROFILE / UPDATE LOCATION, RESPOND W STATUS CODE BC SENDING LATLNG
    .put((req, res) => {
        console.log(req.body);
        res.sendStatus(200);
    })

    .get(function(req, res) {
        knex('users')
            .where('id', req.params.user_id)
            .first()
            .then(function(dude) {
                res.render('users/show', {
                    dude
                });
            });
    });

router.route('/:user_id/delete')
    .get(function(req, res) {
        knex('users')
            .select('id')
            .where(
                'id', req.params.user_id
            )
            .first()
            .then(function(user) {
                res.render('users/delete', {
                    user
                });
            });
    })

module.exports = router;
