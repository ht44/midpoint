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
    })

    // AUTH POST TO CREATE NEW ACCOUNT
    .post((req, res) => {
        var hash = bcrypt.hashSync(req.body.cred.password_digest, 10)
        req.body.cred.password_digest = hash
        knex('users').insert(req.body.cred).returning('id').then(function(id) {
<<<<<<< HEAD
            res.redirect(`/users/${id}/edit`);
        })
        // .catch(err => {
        //     console.log(err);
        //     res.send('didn\'t work');
        // });
    });

=======
            console.log(id[0]);
            console.log(typeof id[0]);
            req.session.userId = id[0];
            res.redirect(`/users/${id[0]}/edit`);
        })
    });

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> eb8450d4187b91a454a234732aca29a3f33b3716
  router.route('/:user_id/edit')
  //
    .get((req,res)=>{
      knex('users')
      .where('id', req.params.user_id)
      .first()
      .then(function(user) {
        // request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${user.home_lat},${user.home_lng}&key=${process.env.API_KEY}`, function(error, response, body){
        //   console.log('error:', error);
        //   console.log('statuscode: ', response && response.statusCode);
        //   // console.log('body: ', body);
        //   var parsedBody = JSON.parse(body);
        //   var renderedAddress = parsedBody.results[0].formatted_address;
          // user.address = renderedAddress;
          // console.log(user.address);
          // console.log(typeof user.address);
          res.render('users/edit', {user});
          // })
        })
        })
<<<<<<< HEAD
  //}
    // });
=======
>>>>>>> 6ef1ac8a64e13857a8208e60cd7970cd57b44e13
router.route('/:user_id/edit')
    //
    .get((req, res) => {
        knex('users')
            .where('id', req.params.user_id)
            .first()
            .then(function(user) {
                // request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${user.home_lat},${user.home_lng}&key=${process.env.API_KEY}`, function(error, response, body){
                //   console.log('error:', error);
                //   console.log('statuscode: ', response && response.statusCode);
                //   // console.log('body: ', body);
                //   var parsedBody = JSON.parse(body);
                //   var renderedAddress = parsedBody.results[0].formatted_address;
                // user.address = renderedAddress;
                // console.log(user.address);
                // console.log(typeof user.address);
                res.render('users/edit', {
                    user
                    // res.send('wow')
                    // })
                })
            })
        //}
    });
>>>>>>> d676d144c9d4cd16a0ba140a6dca1716ee74fe50

=======
>>>>>>> eb8450d4187b91a454a234732aca29a3f33b3716

router.route('/new')
    // SIGNUP PAGE
    .get((req, res) => {
        res.render('users/new');
    })

router.route('/:user_id')

    .put((req, res) => {
<<<<<<< HEAD
        knex('users')
            .where('id', req.params.user_id)
=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> eb8450d4187b91a454a234732aca29a3f33b3716
      // console.log(req.body.user.address);
      knex('users')
          .update({
            // username:     req.body.user.username,
            first:        req.body.user.first,
            last:         req.body.user.last,
            img_url:      req.body.user.img_url,
            email:        req.body.user.email,
            home_address: req.body.user.home_address
          })

          .where('id',  req.params.user_id)

          // .first()
          .then((user) => {
            // console.log(user);
            //this is where we convert an address to lat and long
            // request(`https://maps.googleapis.com/maps/api/geocode/json?address=${user.home_address}&key=${process.env.API_KEY}`, function(error, response, body){
            //   console.log('error ', error);
            //   console.log('response ', response);
            //   console.log('body ', body);
            // })
            res.redirect('/midpoint');
            // res.send('this worked for edit')
          }).catch(err => {
            res.send(err);
          })
        })
<<<<<<< HEAD
=======
        // console.log(req.body.user.address);
        knex('users')

>>>>>>> 6ef1ac8a64e13857a8208e60cd7970cd57b44e13
            .update({
                username: req.body.user.username,
                first: req.body.user.first,
                last: req.body.user.last,
                img_url: req.body.user.img_url,
                email: req.body.user.email,
                home_address: req.body.user.home_address
            })
<<<<<<< HEAD
        console.log('users.home_address');
        //   .then((users) => {
        //   console.log(userObj);
        // request(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.user.home_address}&key=${process.env.API_KEY}`, function(error, response, body){

        // res.redirect(`/users/${req.params.user_id}`);
        //   });
    })

=======
            // knex('users')
            .where({
                id: req.params.user_id
            })
            // .first()
            .then(() => {
                //this is where we convert an address to lat and long
                // request(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.user.home_address}&key=${process.env.API_KEY}`, function(error, response, body){

                res.redirect(`/users/${req.params.user_id}`);
            });
    })
>>>>>>> d676d144c9d4cd16a0ba140a6dca1716ee74fe50
=======
>>>>>>> eb8450d4187b91a454a234732aca29a3f33b3716
>>>>>>> 6ef1ac8a64e13857a8208e60cd7970cd57b44e13


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


router.route('/:user_id/groups')
    .get(function(req, res) {
        knex('users_groups')
        .select('user_id', 'group_id')
        .from('users_groups')
        .where('user_id', req.params.user_id)
        .join('groups', 'users_groups.group_id', '=', 'groups.id')
        .select('name')
        .then((groupsJoi)=>{
            console.log(groupsJoi);
            res.render('groups/show', {
                groupsJoi: groupsJoi
            })
        })
    })


module.exports = router;
