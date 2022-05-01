export abstract class ProviderServiceBase {
  provider: any;
  abstract setDriver(provider: string): any;
}
