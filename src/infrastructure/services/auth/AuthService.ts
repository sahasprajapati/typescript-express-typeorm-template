// import { hashingConfig } from '@base/config/hash';
import { ProviderServiceBase } from '@base/infrastructure/abstracts/ProviderServiceBase';
import { Service } from 'typedi';
import { JWTProvider } from './Providers/JWTProvider';

@Service()
export class AuthService extends ProviderServiceBase {
  provider: JWTProvider;
  public constructor() {
    super();
    this.setDriver('jwt');
  }
  public setDriver(provider: string) {
    switch (provider) {
      case 'jwt':
        this.provider = new JWTProvider();
        break;
      default:
        break;
    }

    return this;
  }

  public sign(payload: object, dataReturn: object): object {
    return this.provider.sign(payload, dataReturn);
  }
  public verify(token: string, cb: (err: any, user: any) => void) {
    this.provider.verify(token, cb);
  }
}
