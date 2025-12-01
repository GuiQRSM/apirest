import knex from 'knex';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Knex } from 'knex';
import { env } from './env/index.js';

const setupKnex = knex;

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
};

export const knexInstance = setupKnex(config);
