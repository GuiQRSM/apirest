import fastify from 'fastify';
import crypto from 'node:crypto';
import { knexInstance } from './database.js';
import { env } from '../env/index.js';

const app = fastify();

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

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server is running');
  });
