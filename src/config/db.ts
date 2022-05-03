import { env } from '@utils/env';

export const dbConfig = {
  postgres: {
    type: env('DB_TYPE'),
    host: env('DB_HOST'),
    port: env('DB_PORT'),
    database: env('DB_DATABASE'),
    username: env('DB_USERNAME'),
    password: env('DB_PASSWORD'),
    entities: env('DB_ENTITIES'),
    migrations: env('DB_MIGRATIONS'),
    allowLogging: env('DB_LOGGING'),
    allowSynchronization: env('DB_SYNCHRONIZE'),
    seeds: env('TYPEORM_SEEDING_SEEDS'),
    factories: env('TYPEORM_SEEDING_FACTORIES')
  },
  redis: {
    host: env('REDIS_HOST', 'localhost'),
    port: parseInt(env('REDIS_PORT', '6379')),
    password: env('REDIS_PASSWORD')
  }
};
