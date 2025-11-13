import { expect, test } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

test('o usuário consegue criar uma nova transação', () => {
  await request(app.server);
});
