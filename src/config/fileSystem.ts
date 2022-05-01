import { env } from '@base/utils/env';
import { appConfig } from './app';

export const fileSystemsConfig = {
  local: {
    root: appConfig.appPath + '/public/uploads'
  },
  defaultDisk: env('FILESYSTEM_DEFAULT_DISK', 'local')
};
