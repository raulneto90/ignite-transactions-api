import { FastifyReply, FastifyRequest } from 'fastify';
import { ListTransactionsUseCase } from '../use-cases/list-transactions-use-case';

export class ListTransactionsController {
  async handle(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const { sessionId } = request.cookies;

    const listTransactionsUseCase = new ListTransactionsUseCase();

    const transactions = await listTransactionsUseCase.execute({
      sessionId: sessionId as string,
    });

    return response.send({ transactions });
  }
}
