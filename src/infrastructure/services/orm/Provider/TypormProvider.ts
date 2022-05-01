import { dataSource } from '@base/database/data-source';
import {
  EntityTarget,
  FindManyOptions,
  FindOptionsWhere,
  ObjectID,
  Repository,
  SaveOptions
} from 'typeorm';

export class TypeormProvider {
  private datasource = dataSource;
  private repository?: Repository<any>;

  public setRepository(entity: EntityTarget<unknown>) {
    this.repository = dataSource.getRepository(entity);
    return this.repository;
  }

  public async find(options?: FindManyOptions<unknown> | undefined) {
    if (!this.repository) throw new Error('Repository not initialized');

    return this.repository.find(options);
  }

  public async delete(
    criteria:
      | string
      | number
      | string[]
      | Date
      | ObjectID
      | number[]
      | Date[]
      | ObjectID[]
      | FindOptionsWhere<unknown>
  ) {
    if (!this.repository) throw new Error('Repository not initialized');

    return this.repository.delete(criteria);
  }

  public async save(
    entities: unknown[],
    options: SaveOptions & {
      reload: false;
    }
  ) {
    if (!this.repository) throw new Error('Repository not initialized');

    return this.repository.save(entities, options);
  }
}
