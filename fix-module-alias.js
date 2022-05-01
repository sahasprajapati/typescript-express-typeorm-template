/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { addAliases } = require('module-alias');
let folder = '';

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV == 'production') {
  folder = 'dist';
} else {
  folder = 'src';
}

addAliases({
  '@base': __dirname + '/' + folder,
  '@config': __dirname + '/' + folder + '/config',
  '@infrastructure': __dirname + '/' + folder + '/infrastructure',
  '@utils': __dirname + '/' + folder + '/utils',
  '@types': __dirname + '/' + folder + '/@types',
  '@api': __dirname + '/' + folder + '/api'
});
