import glob from 'glob';
import { appConfig } from '@base/config/app';

// note that all your subscribers must be imported somewhere in the app, so they are getting registered
// on node you can also require the whole directory using [require all](https://www.npmjs.com/package/require-all) package

/**
 * This loads all the created subscribers into the project, so we do not have to import them manually.
 */
export function loadEventDispatcher() {
  const patterns = appConfig.appPath + appConfig.eventsDir;

  //   glob(patterns, (err: any, files: string[]) => {
  // });
  const files = glob.sync(patterns);
  files.map((file) => require(file));
}
