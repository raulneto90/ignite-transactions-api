import { FastifyRequest, FastifyReply } from 'fastify';
import { GetTransactionSummaryUseCase } from '../use-cases/get-transaction-summary-use-case';

export class GetTransactionSummaryController {
  async handle(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const { sessionId } = request.cookies;
    const getTransactionSummaryUseCase = new GetTransactionSummaryUseCase();

    const summary = await getTransactionSummaryUseCase.execute({
      sessionId: sessionId as string,
    });

    return response.send({ summary });
  }
}
