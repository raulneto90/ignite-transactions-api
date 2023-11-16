import { FastifyReply, FastifyRequest } from 'fastify';
import { getTransactionParamsSchema } from '../interfaces/dtos/get-transaction-by-id-dto';
import { GetTransactionByIdUseCase } from '../use-cases/get-transaction-by-id-use-case';

export class GetTransactionByIdController {
  async handle(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const { sessionId } = request.cookies;

    const { id } = getTransactionParamsSchema.parse(request.params);

    const getTransactionByIdUseCase = new GetTransactionByIdUseCase();

    const transaction = await getTransactionByIdUseCase.execute({
      id,
      sessionId: sessionId as string,
    });

    return response.send({ transaction });
  }
}
