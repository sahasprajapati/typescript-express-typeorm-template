import { RegisterRequest } from '@api/requests/Auth/RegisterRequest';
import { RegisterService } from '@api/services/Auth/RegisterService';
import { ControllerBase } from '@infrastructure/abstracts/ControllerBase';
import { Body, JsonController, Post } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';

@Service()
@OpenAPI({
  tags: ['Auth']
})
@JsonController('/register')
export class RegisterController extends ControllerBase {
  public constructor(private registerService: RegisterService) {
    super();
  }

  @Post()
  public async register(@Body() user: RegisterRequest) {
    return await this.registerService.register(user);
  }
}
