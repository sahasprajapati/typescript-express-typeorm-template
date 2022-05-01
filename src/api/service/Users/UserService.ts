import { UserRepository } from '@api/repositories/Users/UserRepository';
import { ServiceBase } from '@base/infrastructure/abstracts/ServiceBase';
import { Service } from 'typedi';

@Service()
export class UserService extends ServiceBase {
  constructor(private repository: UserRepository) {
    super();
  }

  public async getAll() {
    return await this.repository.find();
  }
}
