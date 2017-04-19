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



router.route('/:group_id/delete')
    .get(function(req, res) {
      console.log('you got in~!~~!!!~~');
        knex('groups')
            .select('group_id')
            .where(
                'group_id', req.params.group_id
            )
            .first()
            .then(function(group) {
                res.render('groups/delete', {
                    group
                });
            });
    })

router.route('/:group_id')


.delete((req, res) => {
    knex('groups')
        .where(
            'id', req.params.group_id
        )
        .del()
        .then(() => {
            res.render('./');
        });
})




module.exports = router;
