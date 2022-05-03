import { InvalidCredentials } from '@api/exceptions/Auth/InvalidCredentials';
import { UserRepository } from '@api/repositories/Users/UserRepository';
import { LoginRequest } from '@api/requests/Auth/LoginRequest';
import { AuthService } from '@infrastructure/services/auth/AuthService';
import { HashService } from '@infrastructure/services/hash/HashService';
import { Service } from 'typedi';
import { UserService } from '../Users/UserService';

@Service()
export class LoginService {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private hashService: HashService
  ) {
    //
  }

  public async login(data: LoginRequest) {
    const user = await this.userService.findOneByEmail(data.email);

    if (!user) {
      throw new InvalidCredentials();
    }

    if (!(await this.hashService.compare(data.password, user.password))) {
      throw new InvalidCredentials();
    }

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
