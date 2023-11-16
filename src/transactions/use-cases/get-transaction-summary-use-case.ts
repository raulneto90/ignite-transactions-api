import { database } from '../../app/config/database';

interface RequestParams {
  sessionId: string;
}

export class GetTransactionSummaryUseCase {
  async execute({ sessionId }: RequestParams) {
    const summary = await database('transactions')
      .sum('amount', {
        as: 'amount',
      })
      .first()
      .where('session_id', sessionId);

    return summary;
  }
}
