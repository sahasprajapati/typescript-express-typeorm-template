import { hashingConfig } from '@base/config/hash';
import { ProviderServiceBase } from '@base/infrastructure/abstracts/ProviderServiceBase';
import { Service } from 'typedi';
import { BcryptProvider } from './Providers/BcryptProvider';

@Service()
export class HashService extends ProviderServiceBase {
  provider: BcryptProvider;
  public constructor() {
    super();
    this.setDriver(hashingConfig.defaultDriver);
  }
  public setDriver(provider: string) {
    switch (provider) {
      case 'bcrypt':
        this.provider = new BcryptProvider();
        break;
      default:
        break;
    }

    return this;
  }

  public async make(data: string, salrOrRounds: string | number = 10) {
    return await this.provider.make(data, salrOrRounds);
  }

  public async compare(data: string, encrypted: string) {
    return await this.provider.compare(data, encrypted);
  }
}
