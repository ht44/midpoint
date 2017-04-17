
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('groups').insert([
        {name:'work friends', created_by: 1},
        {name:'drinking buddies', created_by: 2},
        {name: 'bowling team', created_by: 3},
        {name: 'book club', created_by: 4},
        {name: 'shitty friends I dont want to see', created_by: 5}

      ]);
    });
};
