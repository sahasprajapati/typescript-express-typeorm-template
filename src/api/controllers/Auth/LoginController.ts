import { LoginRequest } from '@api/requests/Auth/LoginRequest';
import { LoginService } from '@api/services/Auth/LoginService';
import { ControllerBase } from '@infrastructure/abstracts/ControllerBase';
import { Body, JsonController, Post } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';

@Service()
@OpenAPI({
  tags: ['Auth']
})
@JsonController('/login')
export class LoginController extends ControllerBase {
  public constructor(private loginService: LoginService) {
    super();
  }

  @Post()
  public async login(@Body() user: LoginRequest) {
    return await this.loginService.login(user);
  }
}
