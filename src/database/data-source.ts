import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { dbConfig } from '@config/db';
const options: DataSourceOptions = {
  type: 'postgres',
  host: dbConfig.dbHost,
  port: parseInt(dbConfig.dbPort),
  username: dbConfig.dbUsername,
  password: dbConfig.dbPassword,
  database: dbConfig.dbDatabase,
  entities: dbConfig.dbEntities.split(','),
  migrations: dbConfig.dbMigrations.split(','),

  logging: dbConfig.allowLogging === 'true',
  synchronize: dbConfig.allowSynchronization === 'true',

  //   entities: [User],
  //   migrations: [],
  subscribers: []
};
export const dataSource = new DataSource(options);
