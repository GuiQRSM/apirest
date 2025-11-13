import { expect, test } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

test('o usuário consegue criar uma nova transação', async () => {
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'New Transaction',
      amount: 5000,
      type: 'credit',
    })
    .expect(201);
});
