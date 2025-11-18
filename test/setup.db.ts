import { knex } from 'knex';
import { config } from '../src/database.js';

export const db = knex(config.test);

export async function resetDatabase() {
  await db.migrate.rollback(undefined, true);
  await db.migrate.latest();
}
