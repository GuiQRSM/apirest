import { FastifyInstance } from 'fastify';
import { knexInstance } from '../src/database.js';

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/transactions', async () => {
    const tansactions = await knexInstance('transactions').where('amount', 1000).select('*');

    return tansactions;
  });
}
