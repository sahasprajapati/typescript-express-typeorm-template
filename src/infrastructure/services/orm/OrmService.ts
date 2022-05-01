import { ProviderServiceBase } from '@base/infrastructure/abstracts/ProviderServiceBase';
import { Service } from 'typedi';
import { TypeormProvider } from './Provider/TypormProvider';
import {
  EntityTarget,
  FindManyOptions,
  FindOptionsWhere,
  ObjectID,
  SaveOptions
} from 'typeorm';

@Service()
export class TypeormService extends ProviderServiceBase {
  provider: TypeormProvider;
  public constructor() {
    super();
    this.setDriver('typeorm');
  }
  public setDriver(provider: string) {
    switch (provider) {
      case 'typeorm':
        this.provider = new TypeormProvider();
        break;
      default:
        break;
    }

    return this;
  }
  public setRepository(entity: EntityTarget<unknown>) {
    this.provider.setRepository(entity);
  }

  public async find(options?: FindManyOptions<unknown> | undefined) {
    return this.provider.find(options);
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
    return this.provider.delete(criteria);
  }

  public async save(
    entities: unknown[],
    options: SaveOptions & {
      reload: false;
    }
  ) {
    return this.provider.save(entities, options);
  }
}
