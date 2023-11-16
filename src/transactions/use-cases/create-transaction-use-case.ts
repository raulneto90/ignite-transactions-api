import { randomUUID } from 'crypto';
import { database } from '../../app/config/database';

interface RequestParams {
  title: string;
  amount: number;
  type: string;
  sessionId: string;
}

export class CreateTransactionUseCase {
  async execute({ amount, title, type, sessionId }: RequestParams) {
    try {
      await database('transactions').insert({
        id: randomUUID(),
        title: title,
        amount: type === 'credit' ? amount : amount * -1,
        session_id: sessionId,
      });
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating transaction');
    }
  }
}
