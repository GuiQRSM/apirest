import { knexInstance } from '../src/database.js';

export async function transactionsRoutes(app) {
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
