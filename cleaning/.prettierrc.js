module.exports = {
  semi: false,
  singleQuote: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: [
    '^react$',
    '^(@mui|@emotion)',
    '<THIRD_PARTY_MODULES>',
    '^src/',
    '^[./]',
  ],
  importOrderParserPlugins: [
    'typescript',
    'jsx',
    'classProperties',
    'decorators-legacy',
  ],
}
