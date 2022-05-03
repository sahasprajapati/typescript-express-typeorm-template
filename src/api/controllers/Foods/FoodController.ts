import { FoodService } from '@api/services/Foods/FoodService';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { Body, Get, JsonController, Param, Post } from 'routing-controllers';
import { Service } from 'typedi';

@JsonController('/foods')
@Service()
export class FoodController extends ControllerBase {
  constructor(private service: FoodService) {
    super();
  }

  @Get()
  public async getAll() {
    return await this.service.getAll();
  }

  @Get('/post/:id')
  show(@Param('id') postId: string) {
    return `Showing post ${postId}`;
  }

  //   @Post('/add')
  //   store(@Body() sth: HelloWorldPost) {
  //     return {
  //       type: typeof sth,
  //       isHelloWorldPost: sth.constructor.name,
  //       body: sth
  //     };
  //   }
}
