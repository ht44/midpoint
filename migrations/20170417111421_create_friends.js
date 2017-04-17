
exports.up = function(knex, Promise) {
  return knex.schema.createTable("friends", t => {
    t.increments().primary();
    t.integer('requested').notNullable().references('id').inTable('users').onDelete('cascade');
    t.integer('accepted').notNullable().references('id').inTable('users').onDelete('cascade');
    t.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('friends');
};
