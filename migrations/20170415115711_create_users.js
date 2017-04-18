
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", t => {
    t.increments().primary();
    t.string("email").notNullable().unique();
    t.string("password_digest").notNullable();
    t.string("username");
    t.string("first");
    t.string("last");
    t.string('img_url');
    t.decimal("current_lat", 9, 7);
    t.decimal("current_lng", 9, 7);
    t.string("home_address");
    t.decimal("home_lat", 9, 7);
    t.decimal("home_lng", 9, 7);
    t.decimal("work_lat", 9, 7);
    t.decimal("work_lng", 9, 7);
    t.timestamps(true,true);
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("users");
};
