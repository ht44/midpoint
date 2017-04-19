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


router.route('/:group_id')
    .get((req, res) => {
        knex('users_groups')
            .select('user_id', 'group_id')
            .from('users_groups')
            .where('group_id', req.params.group_id)
            .join('users', 'users_groups.user_id', '=', 'users.id')
            .select('username')
            .then((allUserinGroup) => {
                knex('groups')
                    .select('name')
                    .where('id', req.params.group_id)
                    .then((groupStuff) => {
                        console.log(allUserinGroup);
                        console.log(groupStuff);
                        // console.log(allUserinGroup, groupStuff);
                        // console.log(allUserinGroup[0].group_id);
                        // console.log(`groups/${allUserinGroup[0].group_id}/edit`);
                        res.render('groups/index', {
                            allUserinGroup: allUserinGroup,
                            groupStuff: groupStuff
                        })

                    })
            })
    })

    .put((req,res)=>{
        knex('groups')
        .update('name', req.body.groupInfo.name)
        .where('id', req.params.group_id)
        .then((groupInfo)=>{
            res.redirect(`/groups/${req.params.group_id}`),
            {
                groupInfo: groupInfo
            }

        })

        // knex('users_groups')
        // .select('user_id', 'group_id')
        // .where('group_id', req.params.group_id)
        // .join('users', 'users_groups.user_id', '=', 'users.id')
        // .select('username', 'firstname')
        // .update({
        //     user_id: req.body,
        //     group_id: req.body
        // })

    })

    .delete((req, res) => {
        knex('groups')
            .where(
                'id', req.params.group_id
            )
            .del()
            .then(() => {
                res.redirect(`/users/${req.currentUser.id}/groups`);
            });
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




router.route('/:group_id/edit')
    .get((req, res) => {
        knex('groups')
            .select('name', 'id')
            .where('id', req.params.group_id)
            .then((groupInfo) => {
                console.log(groupInfo);
                res.render('groups/edit', {
                    groupInfo: groupInfo
                });
            });
    });



module.exports = router;
