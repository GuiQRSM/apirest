import knex from 'knex';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Knex = import('knex').Knex;

const setupKnex = knex;

export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './db/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
};

export const knexInstance = setupKnex(config);
