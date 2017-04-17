
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", t => {
    t.increments().primary();
    t.string("email").notNullable().unique();
    t.string("password_digest").notNullable();
    t.string("username");
    t.string("first");
    t.string("last");
    t.string('img_url');
    t.decimal("current_lat");
    t.decimal("current_lng");
    t.decimal("home_lat");
    t.decimal("home_lng");
    t.decimal("work_lat");
    t.decimal("work_lng");
    t.timestamps(true,true);
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("users");
};
