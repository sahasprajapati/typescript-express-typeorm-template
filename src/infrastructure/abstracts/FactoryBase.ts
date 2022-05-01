import { DataSource } from 'typeorm';

export abstract class FactoryBase {
  abstract run(dataSource: DataSource): Promise<any>;
}
