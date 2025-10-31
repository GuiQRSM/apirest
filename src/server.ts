import fastify from 'fastify';
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
