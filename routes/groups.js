'use strict';

const express = require('express');
const knex = require('../db/knex');
const router = express.Router({mergeParams: true});

router.route('/')
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
