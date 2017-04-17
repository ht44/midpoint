
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_groups').insert([
        {user_id: 1, group_id: 1},
        {user_id: 5, group_id: 1},
        {user_id: 3, group_id: 1},
        {user_id: 4, group_id: 1},
        {user_id: 5, group_id: 2},
        {user_id: 6, group_id: 2},
        {user_id: 7, group_id: 2},
        {user_id: 8, group_id: 2}
      ]);
    });
};
