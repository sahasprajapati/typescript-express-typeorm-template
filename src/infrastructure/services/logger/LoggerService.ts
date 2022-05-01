import { loggerConfig } from '@base/config/logger';
import { ProviderServiceBase } from '@base/infrastructure/abstracts/ProviderServiceBase';
import { Service } from 'typedi';
import { WinstonProvider } from './Providers/WinstonProvider';

@Service()
export class LoggerService extends ProviderServiceBase {
  public constructor() {
    super();
    this.setDriver(loggerConfig.defaultDriver);
  }

  public setDriver(provider: string) {
    switch (provider) {
      case 'winston':
        this.provider = new WinstonProvider();
        break;
      default:
        break;
    }
    return this;
  }

  public info(message: string, ...meta: any[]) {
    this.provider.info(message, ...meta);
  }
  public warn(message: string, ...meta: any[]) {
    this.provider.warn(message, ...meta);
  }
  public error(message: string, ...meta: any[]) {
    this.provider.error(message, ...meta);
  }
}
