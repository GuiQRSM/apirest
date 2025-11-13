import { expect, test } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

test('o usuário consegue criar uma nova transação', () => {
  const responseStatusCode = 201;

  expect(responseStatusCode).toEqual(201);
});
