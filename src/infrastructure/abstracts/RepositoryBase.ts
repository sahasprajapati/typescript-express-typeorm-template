import { dataSource } from '@base/database/data-source';
import { EntityTarget, Repository } from 'typeorm';

export abstract class RepositoryBase<T> extends Repository<T> {
  constructor(entity: EntityTarget<T>) {
    super(entity, dataSource.manager, dataSource.createQueryRunner());
  }
}
