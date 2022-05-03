import { User } from '@api/models/Users/user.entity';
import { UserCreateRequest } from '@api/requests/Users/UserCreateRequest';
import { dataSource } from '@base/database/data-source';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import { TypeormService } from '@infrastructure/services/orm/OrmService';
import { Service } from 'typedi';
// import { UserRepository } from '../Foods/FoodRepository';

@Service()
export class UserRepository extends RepositoryBase<User> {
  constructor() {
    super(User);
  }

  async createUser(data: UserCreateRequest) {
    const user = new User();
    user.username = data.username;
    user.password = data.password;
    user.role = data.role;
    user.email = data.email;
    return await this.save(user);
  }
}

// export class UserRepository {
//   constructor(private service: TypeormService) {
//     service.setRepository(User);
//   }
//   async find() {
//     // dataSource.getRepository(User).find();
//     return this.service.find();
//   }
//   async create() {
//     const user = dataSource.getRepository(User).create();
//     user.username = 'admin';
//     user.email = 'admin@gmail.com';
//     user.password = 'admin';

//     dataSource.getRepository(User).save(user);
//   }
// }
