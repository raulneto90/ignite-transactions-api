import { database } from '../../app/config/database';

interface RequestParams {
  sessionId: string;
}

export class ListTransactionsUseCase {
  async execute({ sessionId }: RequestParams) {
    const transactions = await database('transactions')
      .select()
      .where('session_id', sessionId);

    return transactions;
  }
}
