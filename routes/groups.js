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
            .select('name', 'user_id', 'group_id')
            .then((groupsJoi) => {
                // console.log(groupsJoi);
                res.render('groups/show', {
                    groupsJoi: groupsJoi
                })
            })
    })

    .put((req, res) => {
        knex('groups')
            .where('id', req.params.group_id)
            .join('users_groups', 'groups.id', '=', users_groups.group_id)

    })


router.route('/:group_id/edit')
    .get((req, res) => {
        knex('users_groups')
            .select('user_id', 'group_id')
            .from('users_groups')
            .where('group_id', req.params.group_id)
            .join('users', 'users_groups.user_id', '=', 'users.id')
            .select('username')
            .where('users.id', req.params.user_id)
            .then((allUserinGroup) => {
                knex('groups')
                    .select('name')
                    .where('id', req.params.group_id)
                // var allUserinGroup
                    .then((groupStuff) => {
                        // console.log(allUserinGroup, groupStuff);
                        console.log(allUserinGroup[0].group_id);
                        console.log(`groups/${allUserinGroup[0].group_id}/edit`);
                        res.render('groups/edit', {
                            allUserinGroup: allUserinGroup,
                            groupStuff: groupStuff
                        })

                    })
            })
    })




// router.route('/new')
//     .get((req, res) => {
//         knex('users')
//             .whereNot('users.id', req.params.user_id)
//             .then((allUserButYou) => {
//                 console.log(allUserButYou)
//                 res.render('groups/new', {
//                     allUserButYou: allUserButYou
//                 })
//
//             })
//     })
//     .put((req, res) => {
//         knex('groups')
//             .insert({
//                 name: req.body.name,
//                 created_by: req.params.user_id
//             })
//
//     })



module.exports = router;
