
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users_groups", t => {
    t.increments().primary();
    t.integer('user_id').notNullable().references('id').inTable('users').onDelete('cascade');
    t.integer('group_id').notNullable().references('id').inTable('groups').onDelete('cascade');
    t.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_groups');
};
