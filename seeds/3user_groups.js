
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_groups').insert([
        {user_id: 1, group_id: 1},
        {user_id: 2, group_id: 1},
        {user_id: 3, group_id: 1},
        {user_id: 4, group_id: 1}
      ]);
    });
};
