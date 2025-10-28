import { knex as setupKnex } from 'knex';

export const kmex = setupKnex({
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db',
  },
});
