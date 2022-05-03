import { InvalidCredentials } from '@api/exceptions/Auth/InvalidCredentials';
import { RegisterFailedException } from '@api/exceptions/Auth/RegisterFailed';
import { User } from '@api/models/Users/user.entity';
import { UserRepository } from '@api/repositories/Users/UserRepository';
import { LoginRequest } from '@api/requests/Auth/LoginRequest';
import { UserCreateRequest } from '@api/requests/Users/UserCreateRequest';
import {
  EventDispatcher,
  EventDispatcherInterface
} from '@base/decorators/EventDispatcher';
import { AuthService } from '@infrastructure/services/auth/AuthService';
import { HashService } from '@infrastructure/services/hash/HashService';
import { Service } from 'typedi';
import { UserService } from '../Users/UserService';

@Service()
export class RegisterService {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) {
    //
  }

  public async register(data: UserCreateRequest) {
    let user: User | null = await this.userService.create(data);

    user = await this.userService.findOneByEmail(user.email);

    if (!user) {
      throw new RegisterFailedException();
    }

    this.eventDispatcher.dispatch('onUserRegister', user);

    return this.authService.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      { user: { id: user.id, email: user.email, role: user.role } }
    );
  }
}
