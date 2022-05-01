import { User } from '@api/models/Users/user.entity';
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
