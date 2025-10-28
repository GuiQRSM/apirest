import knex from 'knex';

const setupKnex = knex;

export const knexInstance = setupKnex({
  client: 'sqlite3',
  connection: {
    filename: './tmp/app.db',
  },
});
