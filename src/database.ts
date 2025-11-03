import 'dotenv/config';
import knex from 'knex';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Knex } from 'knex';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL env not found!');
}

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
