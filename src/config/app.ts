import { toBool } from '@base/utils/to-bool';
import { env } from '@utils/env';

function getAppPath() {
  let currentDir = __dirname;
  currentDir = currentDir.replace('/config', '');
  return currentDir;
}
export const appConfig = {
  name: env('APP_NAME'),
  appPort: env('APP_PORT'),
  appPath: getAppPath(),
  url: env('APP_URL'),
  routePrefix: env('APP_ROUTE_PREFIX'),

  cronJobsEnabled: toBool(env('ENABLE_CRON_JOBS')),

  controllerDir: env('CONTROLLERS_DIR'),
  middlewareDir: env('MIDDLEWARES_DIR'),
  cronJobDir: env('CRON_JOBS_DIR')
};
