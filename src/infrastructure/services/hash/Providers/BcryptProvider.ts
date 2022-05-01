import { hashingConfig } from '@base/config/hash';
import bcrypt from 'bcrypt';

export class BcryptProvider {
  private bcrypt = bcrypt;
  private defaultRounds = hashingConfig.defaultRounds;

  public async make(
    data: string,
    salrOrRounds: string | number = this.defaultRounds
  ) {
    return await this.bcrypt.hash(data, salrOrRounds);
  }

  public async compare(data: string, encrypted: string) {
    return await this.bcrypt.compare(data, encrypted);
  }
}
