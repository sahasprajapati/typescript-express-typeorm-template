// import { fileSystemsConfig } from '@base/config/fileSystem';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
export class MulterProvider {
  private upload: multer.Multer;
  constructor(storageType: string) {
    this.setStorage(storageType);
  }

  public setStorage(storageType: string) {
    let storage;
    switch (storageType) {
      case 'aws':
        {
          const s3 = new aws.S3({});
          storage = multerS3({
            s3: s3,
            bucket: 'some-bucket',
            metadata: function (req, file, cb) {
              cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
              cb(null, Date.now().toString());
            }
          });
        }
        break;

      default:
        storage = multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, '/tmp/my-uploads');
          },
          filename: function (req, file, cb) {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + uniqueSuffix);
          }
        });
        break;
    }
    this.upload = multer({ storage });
    return this;
  }
  public singleFile(key: string) {
    return this.upload.single(key);
  }

  public multipleFiles(key: string, noOfFiles: number) {
    return this.upload.array(key, noOfFiles);
  }
}
