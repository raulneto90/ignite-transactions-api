import { knex, Knex } from 'knex';
import { env } from './env';

export const databaseConfig: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/app/infraestructure/database/migrations',
  },
};

export const database = knex(databaseConfig);
