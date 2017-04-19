'use strict';

const express = require('express');
const knex = require('../db/knex');
const router = express.Router({
    mergeParams: true
});

router.route('/')
    .get((req, res) => {
        knex('users_groups')
            .select('user_id', 'group_id')
            .from('users_groups')
            .where('user_id', req.params.user_id)
            .join('groups', 'users_groups.group_id', '=', 'groups.id')
            .select('name')
            .then((groupsJoi) => {
                console.log(groupsJoi);
                res.render('groups/show', {
                    groupsJoi: groupsJoi
                })
            })
    })

router.route('/new')
    .get((req, res) => {
        knex('users')
            .whereNot('users.id', req.params.user_id)
            .then((allUserButYou) => {
                console.log(allUserButYou)
                res.render('groups/new', {
                    allUserButYou: allUserButYou
                })

            })
    })
    .post((req, res) => {
        knex('groups')
            .insert({
                name: req.body.name,
                created_by: req.params.user_id
            })

    })



module.exports = router;
