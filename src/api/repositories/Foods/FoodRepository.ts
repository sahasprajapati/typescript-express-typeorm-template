import { Food } from '@api/models/Foods/food.entity';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import { Service } from 'typedi';

@Service()
export class FoodRepository extends RepositoryBase<Food> {
  constructor() {
    super(Food);
  }
}
