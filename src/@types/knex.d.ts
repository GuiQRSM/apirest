// eslint-disable-next-line
import { Knex } from 'knex';

declare module 'knexInstance/types/tables' {
  export interface Tables {
    transactions: {
      id: string;
      title: string;
      amount: number;
      created_at: Date;
    };
  }
}
