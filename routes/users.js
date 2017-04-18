'use strict'

const express = require('express');
const knex = require('../db/knex');
const router = express.Router();
const bcrypt = require('bcryptjs');
const request = require('request');
require('dotenv').load()

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
        var hash = bcrypt.hashSync(req.body.cred.password_digest, 10)
        req.body.cred.password_digest = hash
        knex('users').insert(req.body.cred).returning('id').then(function(id){
            res.redirect(`/users/${id}/edit`);
        })
          // .catch(err => {
          //     console.log(err);
          //     res.send('didn\'t work');
          // });
    });

  router.route('/:user_id/edit')
  //
    .get((req,res)=>{
      knex('users')
      .where('id', req.params.user_id)
      .first()
      .then(function(user) {
        request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${user.home_lat},${user.home_lng}&key=${process.env.API_KEY}`, function(error, response, body){
          console.log('error:', error);
          console.log('statuscode: ', response && response.statusCode);
          // console.log('body: ', body);
          var parsedBody = JSON.parse(body);
          var renderedAddress = parsedBody.results[0].formatted_address;
          user.address = renderedAddress;
          console.log(user.address);
          console.log(typeof user.address);
          res.render('users/edit', {
            user
            // res.send('wow')
          })
        })
        })
  //}
    });


  router.route('/new')
          // SIGNUP PAGE
    .get((req, res) => {
              res.render('users/new');
    })

  router.route('/:user_id')

    .put((req, res) => {
      knex('users')
          .update({
            username:     req.body.user.username,
            first:        req.body.user.first,
            last:         req.body.user.last,
            img_url:      req.body.user.img_url,
            current_lat:  req.body.user.current_lat,
            current_lng:  req.body.user.current_lng,
            home_lat:     req.body.user.home_lat,
            home_lng:     req.body.user.home_lng,
            work_lat:     req.body.user.work_lat,
            work_lng:     req.body.user.work_lng
          })
          .where({
            id: req.params.user_id
          })
          .then(() => {
            res.redirect(`/users/${req.params.user_id}`);
          });
        })


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
    .get(function(req, res) {
      console.log(req.header);
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
            .select('id', 'email')
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
