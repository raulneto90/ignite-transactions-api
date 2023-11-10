import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { database } from '../database';
import { randomUUID } from 'crypto';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function transactionsRouter(app: FastifyInstance) {
  app.post('/', async (request, response) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    });

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

    try {
      await database('transactions').insert({
        id: randomUUID(),
        title: body.title,
        amount: body.type === 'credit' ? body.amount : body.amount * -1,
        session_id: sessionId,
      });
    } catch (error) {
      throw new Error('Error while creating transaction');
    }

    return response.status(201).send();
  });

  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, response) => {
      const { sessionId } = request.cookies;

      const transactions = await database('transactions')
        .select()
        .where('session_id', sessionId);

      return response.send({ transactions });
    },
  );

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, response) => {
      const { sessionId } = request.cookies;

      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getTransactionParamsSchema.parse(request.params);

      const transaction = await database('transactions')
        .select()
        .where({
          session_id: sessionId,
          id,
        })
        .first();

      return response.send({ transaction });
    },
  );

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, response) => {
      const { sessionId } = request.cookies;
      const summary = await database('transactions')
        .sum('amount', {
          as: 'amount',
        })
        .first()
        .where('session_id', sessionId);

      return response.send({ summary });
    },
  );
}
