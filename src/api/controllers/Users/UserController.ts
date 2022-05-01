import { UserService } from '@api/service/Users/UserService';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { Body, Get, JsonController, Param, Post } from 'routing-controllers';
import { Service } from 'typedi';

interface HelloWorldPost {
  message: string;
}
@JsonController('/users')
@Service()
export class UserController extends ControllerBase {
  constructor(private userService: UserService) {
    super();
  }

  @Get()
  public async getAll() {
    return await this.userService.getAll();
  }

  @Get('/post/:id')
  show(@Param('id') postId: string) {
    return `Showing post ${postId}`;
  }

  @Post('/add')
  store(@Body() sth: HelloWorldPost) {
    return {
      type: typeof sth,
      isHelloWorldPost: sth.constructor.name,
      body: sth
    };
  }
}
