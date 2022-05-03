import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { dbConfig } from '@config/db';
const options: DataSourceOptions = {
  type: 'postgres',
  host: dbConfig.postgres.host,
  port: parseInt(dbConfig.postgres.port),
  username: dbConfig.postgres.username,
  password: dbConfig.postgres.password,
  database: dbConfig.postgres.database,
  entities: dbConfig.postgres.entities.split(','),
  migrations: dbConfig.postgres.migrations.split(','),

  logging: dbConfig.postgres.allowLogging === 'true',
  synchronize: dbConfig.postgres.allowSynchronization === 'true',

  //   entities: [User],
  //   migrations: [],
  subscribers: []
};
export const dataSource = new DataSource(options);
