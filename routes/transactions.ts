import { FastifyInstance } from 'fastify';
import z from 'zod';
import { knexInstance } from '../src/database.js';
import { randomUUID } from 'node:crypto';

export async function transactionsRoutes(app: FastifyInstance) {
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
