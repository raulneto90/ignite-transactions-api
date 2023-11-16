import { FastifyReply, FastifyRequest } from 'fastify';
import { createTransactionBodySchema } from '../interfaces/dtos/create-transaction-dto';
import { randomUUID } from 'crypto';
import { CreateTransactionUseCase } from '../use-cases/create-transaction-use-case';

export class CreateTransactionController {
  async handle(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const body = createTransactionBodySchema.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 7;
      sessionId = randomUUID();
      response.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: THIRTY_DAYS,
      });
    }

    const createTransactionUseCase = new CreateTransactionUseCase();

    await createTransactionUseCase.execute({
      amount: body.amount,
      title: body.title,
      type: body.type,
      sessionId,
    });

    return response.status(201).send();
  }
}
