import { FastifyInstance } from 'fastify';
import z from 'zod';

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    });

    const body = createTransactionBodySchema.parse(request.body);

    return body;
  });
}
