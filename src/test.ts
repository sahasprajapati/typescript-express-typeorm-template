import { loadEventDispatcher } from '@utils/load-event-dispatcher';
import { EventDispatcher } from 'event-dispatch';
// import { appConfig } from '@config/app';
// // import { loadEventDispatcher } from '@utils/load-event-dispatcher';
// function loadEventDispatcher() {
//   const patterns = appConfig.appPath + appConfig.eventsDir;

//   glob(patterns, (err: any, files: string[]) => {
//     for (const file of files) {
//       //   console.log(file);
//       require(file);
//     }
//   });
// }

// const patterns = appConfig.appPath + appConfig.eventsDir;
// let fil;
// glob(patterns, (err: any, files: string[]) => {
//   for (const file of files) {
//     console.log(file);
//     require(`${file}`);
//   }
//   fil = files;
//   console.log(files);
//   files.map((file) => require(file));
//   const f = ['/home/sahas/projects/multer/src/api/events/Users/UserEvent.ts'];
//   f.map((a) => require(a));
// });
// console.log('patt', glob.sync(patterns));

// const f = glob.sync(patterns);
// f.map((a) => require(a));
// const f = ['/home/sahas/projects/multer/src/api/events/Users/UserEvent.ts'];
// f.map((a) => require(a));

// require('./api/events/Users/UserEvent');
// loadEventDispatcher();
// require('/home/sahas/projects/multer/src/api/events/Users/UserEvent.ts');
// note that all your subscribers must be imported somewhere in the app, so they are getting registered
// on node you can also require the whole directory using [require all](https://www.npmjs.com/package/require-all) package

// import './subscriber/UserEventSubscriber';
loadEventDispatcher();
const eventDispatcher = new EventDispatcher();
eventDispatcher.dispatch('onUserCreate', { email: 's@s.com' });
// eventDispatcher.dispatch('onStatusUpdate', 'hello world');
