import ModuleAlias from 'module-alias';
export function fixModuleAlias(dirName: string) {
  ModuleAlias.addAliases({
    '@base': dirName,
    '@config': dirName + '/config',
    '@infrastructure': dirName + '/infrastructure',
    '@utils': dirName + '/utils',
    '@types': dirName + '/@types',
    '@api': dirName + '/api'
  });
}
