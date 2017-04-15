
exports.up = function(knex, Promise) {
  return knex.schema.createTable("groups", t => {
    t.increments().primary();
    t.string("name").notNullable();
    t.integer("created_by").notNullable().references('id').inTable("users").onDelete('cascade');
    t.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("groups");
};
