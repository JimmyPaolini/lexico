module.exports = {
  semi: false,
  singleQuote: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: [
    '^react$',
    '^next/',
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
