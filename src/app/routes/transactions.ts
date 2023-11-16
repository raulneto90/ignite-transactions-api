import { FastifyInstance } from 'fastify';
import { checkSessionIdExists } from './middlewares/check-session-id-exists';
import { CreateTransactionController } from '../../transactions/controllers/create-transaction.controller';
import { GetTransactionByIdController } from '../../transactions/controllers/get-transaction-by-id.controller';
import { GetTransactionSummaryController } from '../../transactions/controllers/get-transaction-summary.controller';
import { ListTransactionsController } from '../../transactions/controllers/list-transactions.controller';

const createTransactionController = new CreateTransactionController();
const getTransactionByIdController = new GetTransactionByIdController();
const getTransactionSummaryController = new GetTransactionSummaryController();
const listTransactionsController = new ListTransactionsController();

export async function transactionsRouter(app: FastifyInstance) {
  app.post('/', createTransactionController.handle);

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    getTransactionByIdController.handle,
  );

  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    listTransactionsController.handle,
  );

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    getTransactionSummaryController.handle,
  );
}
