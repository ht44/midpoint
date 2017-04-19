
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
        {name: 'shitty friends I dont want to see', created_by: 1},
        {name: 'Sky Diving Buddies', created_by: 3},
        {name: 'Music Club', created_by: 3},
        {name: 'Whisky Crew', created_by: 3},
        {name: 'Christmas Family', created_by: 3},
        {name: 'Cup Collector', created_by: 3},
        {name: 'Spoon Collectors', created_by: 3},
        {name: 'Kanye West Club', created_by: 3},
        {name: 'Comic Book Club', created_by: 3},
        {name: 'Computer Nerds', created_by: 3}
      ]);
    });
};
