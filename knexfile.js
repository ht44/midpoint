// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://localhost/midpoint'
  },

  test: {
    client: 'pg',
    connection: 'postgresql://localhost/test-midpoint'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations'
    }
  }
  
};
