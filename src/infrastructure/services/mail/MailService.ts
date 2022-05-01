import { mailConfig } from '@base/config/mail';
import { Service } from 'typedi';
import { IMailInterface, ISmtpProvider } from './Interfaces/MailInterface';
import { SmtpProvider } from './Providers/SmtpProvider';

@Service()
export class MailService implements IMailInterface {
  provider: ISmtpProvider;
  public constructor() {
    this.setDriver(mailConfig.defaultDriver);
  }
  public setDriver(provider: string) {
    switch (provider) {
      case 'smtp':
        this.provider = new SmtpProvider();
        break;
      default:
        break;
    }

    return this;
  }

  public from(value: string) {
    return this.provider.from(value);
  }
  public to(value: string) {
    return this.provider.to(value);
  }
  public subject(value: string) {
    return this.provider.subject(value);
  }
  public text(value: string) {
    return this.provider.text(value);
  }
  public html(value: string) {
    return this.provider.html(value);
  }

  public async send() {
    return await this.provider.send();
  }
}
