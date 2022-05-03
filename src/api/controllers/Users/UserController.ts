import { UserRole } from '@api/enums/UserRole.enum';
import { UserCreateRequest } from '@api/requests/Users/UserCreateRequest';
import { UserService } from '@api/services/Users/UserService';

import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { AuthCheck } from '@infrastructure/middlewares/Auth/AuthCheck';
import { HasRole } from '@infrastructure/middlewares/Auth/HasRole';
import {
  Body,
  Get,
  HttpCode,
  JsonController,
  Post,
  UseBefore
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';

@OpenAPI({
  security: [{ bearerAuth: [] }]
})
@JsonController('/users')
@UseBefore(AuthCheck)
// @UseBefore(validateBodyMiddleware())
@Service()
export class UserController extends ControllerBase {
  constructor(private userService: UserService) {
    super();
  }

  @Get()
  public async getAll() {
    return await this.userService.getAll();
  }

  @Post()
  @UseBefore(HasRole([UserRole.ADMIN]))
  @HttpCode(201)
  public async create(@Body() user: UserCreateRequest) {
    return await this.userService.create(user);
  }
}
