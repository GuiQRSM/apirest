import knex from 'knex';

const setupKnex = knex;

export const config = {
  client: 'sqlite3',
  connection: {
    filename: './tmp/app.db',
  },
  useNullAsDefault: true,
};

export const knexInstance = setupKnex(config);
