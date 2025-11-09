import { FastifyInstance } from 'fastify';
import z from 'zod';
import { knexInstance } from '../database.js';
import { randomUUID } from 'node:crypto';

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knexInstance('transactions').select();

    return { transactions };
  });

  app.get('/:id', async (request) => {
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionsParamsSchema.parse(request.params);

    const transactions = await knexInstance('transactions').where('id', id).first();

    return { transactions };
  });

  app.get('/summary', async () => {
    const summary = await knexInstance('transactions').sum('amount').first();

    return { summary };
  });

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(request.body);

    await knexInstance('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    });
    return reply.status(201).send();
  });
}
