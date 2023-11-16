import { database } from '../../app/config/database';

interface RequestParams {
  id: string;
  sessionId: string;
}

export class GetTransactionByIdUseCase {
  async execute({ id, sessionId }: RequestParams) {
    const transaction = await database('transactions')
      .select()
      .where({
        session_id: sessionId,
        id,
      })
      .first();

    return transaction;
  }
}
