
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
        {name: 'shitty friends I dont want to see', created_by: 5},
        {name: 'Sky Diving Buddies', created_by: 14},
        {name: 'Music Club', created_by: 9},
        {name: 'Whisky Crew', created_by: 15},
        {name: 'Christmas Family', created_by: 8},
        {name: 'Cup Collector', created_by: 14},
        {name: 'Spoon Collectors', created_by: 18},
        {name: 'Kanye West Club', created_by: 7},
        {name: 'Comic Book Club', created_by: 16},
        {name: 'Computer Nerds', created_by: 13}
      ]);
    });
};
