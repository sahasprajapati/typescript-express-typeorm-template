import { DataSource } from 'typeorm';

// export abstract SeederBase {
//        async run(
//     dataSource: DataSource,
//     ...factory: any[]
//   ): Promise<any>
// }

export abstract class SeederBase {
  abstract run(dataSource: DataSource): Promise<any>;
}
