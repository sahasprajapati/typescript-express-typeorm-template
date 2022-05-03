import { User } from '@api/models/Users/user.entity';
import { UserRepository } from '@api/repositories/Users/UserRepository';
import { UserCreateRequest } from '@api/requests/Users/UserCreateRequest';
import {
  EventDispatcher,
  EventDispatcherInterface
} from '@base/decorators/EventDispatcher';
import { ServiceBase } from '@base/infrastructure/abstracts/ServiceBase';
import { Service } from 'typedi';
import { FindOneOptions } from 'typeorm';

@Service()
export class UserService extends ServiceBase {
  constructor(
    private repository: UserRepository,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {
    super();
  }

  public async getAll() {
    return await this.repository.find();
  }

  public async findOneByEmail(email: string) {
    return await this.repository.findOne({
      where: { email: email }
    });
  }
  public async create(userOptions: UserCreateRequest) {
    const user = await this.repository.createUser(userOptions);

    this.eventDispatcher.dispatch('onUserCreate', { email: 's@s.com' });
    return user;
  }
}
