import fastify from 'fastify';
import crypto from 'node:crypto';
import { knexInstance } from './database.js';

const app = fastify();

app.get('/hello', async () => {
  const tansactions = await knexInstance('transactions').insert({});
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server is running');
  });
