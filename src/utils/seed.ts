import { dataSource } from '@base/database/data-source';
import userFactory from '@base/database/factories/User/user.factory';
import RoleSeeder from '@base/database/seeds/User/role.seeder';
import UserSeeder from '@base/database/seeds/User/user.seeder';
import { runSeeder, runSeeders } from 'typeorm-extension';
(async () => {
  await dataSource.initialize();

  //   await runSeeder(dataSource, RoleSeeder, {});
  await runSeeder(dataSource, UserSeeder, {
    factories: ['src/database/seeds/**/*.factory{.ts,.js}']
  });
  //   await runSeeders(dataSource, {
  //     seeds: ['src/database/seeds/**/*.seeder{.ts,.js}'],
  //     factories: ['src/database/factories/**/*.factory{.ts,.js}']
  //   });
  console.log('sd');
})();
