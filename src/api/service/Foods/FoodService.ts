import { FoodRepository } from '@api/repositories/Foods/FoodRepository';
import { UserRepository } from '@api/repositories/Users/UserRepository';
import { ServiceBase } from '@base/infrastructure/abstracts/ServiceBase';
import { Service } from 'typedi';

@Service()
export class FoodService extends ServiceBase {
  constructor(private repository: FoodRepository) {
    super();
  }

  public async getAll() {
    return await this.repository.find();
  }
}
