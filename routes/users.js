<<<<<<< HEAD
'use strict'
=======
'use strict';

>>>>>>> f91dce4783589f6ce3c053ea6cbf5018ebf02269
const express = require('express');
const knex = require('../db/knex');
const router = express.Router();

<<<<<<< HEAD
router.route('/')
//index all users ** for admin only **
.get(function(req,res){
  knex('users')
  .then(function(users){
    res.render('users/index', {
      users
    })
  })
  // res.send('yomamma')
})

router.route('/new')
.post(function(req,res){
  res.render('users/new')
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

.get(function(req,res){
  knex('users')
  .where('id', req.params.user_id)
  .first()
  .then(function(dude){
    res.render('users/show', {
      dude
    });
  });
});

router.route('/:user_id/delete')
.get(function(req, res){
		knex('users')
			.select('id')
			.where(
				'id', req.params.user_id
			)
			.first()
			.then(function(user){
				res.render('users/delete', {
					user
				});
			});
		})






module.exports=router;
=======

router.route('/:user_id')
  .put((req, res) => {
    console.log(req.body);
    res.sendStatus(200);
  });

module.exports = router;
>>>>>>> f91dce4783589f6ce3c053ea6cbf5018ebf02269
