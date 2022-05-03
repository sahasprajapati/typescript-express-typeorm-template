import { Multer } from 'multer';
import { Service } from 'typedi';
import { MulterProvider } from './Provider/MulterProvider';

@Service()
export class MulterService {
  private provider: MulterProvider;

  public constructor() {
    this.setDriver('multer');
  }

  public setDriver(provider: string) {
    switch (provider) {
      case 'multer':
        this.provider = new MulterProvider('disk');
        break;

      default:
        break;
    }

    return this;
  }

  public setStorage(storageType: string) {
    this.provider.setStorage(storageType);
  }
  public singleFile(key: string) {
    return this.provider.singleFile(key);
  }

  public multipleFiles(key: string, noOfFiles: number) {
    return this.provider.multipleFiles(key, noOfFiles);
  }
}
