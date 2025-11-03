import { FastifyInstance } from 'fastify';
import { knexInstance } from '../src/database.js';
import crypto from 'node:crypto';

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/hello', async () => {
    const tansactions = await knexInstance('transactions')
      .insert({
        id: crypto.randomUUID(),
        title: 'Transações de teste',
        amount: 1000,
      })
      .returning('*');

    return tansactions;
  });
}
