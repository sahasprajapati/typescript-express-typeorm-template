import { ProviderServiceBase } from '@base/infrastructure/abstracts/ProviderServiceBase';
import { SmtpProvider } from '../Providers/SmtpProvider';
export type ISmtpProvider = SmtpProvider;
export interface IMailInterface extends ProviderServiceBase {
  provider: ISmtpProvider;

  from(value: string): ISmtpProvider;

  to(value: string): ISmtpProvider;

  subject(value: string): ISmtpProvider;

  text(value: string): ISmtpProvider;

  html(value: string): ISmtpProvider;

  send(): Promise<any>;
}
