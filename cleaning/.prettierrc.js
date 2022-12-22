module.exports = {
  semi: false,
  singleQuote: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: ['^react$', '^@mui', '<THIRD_PARTY_MODULES>', '^src/', '^[./]'],
  importOrderParserPlugins: [
    'typescript',
    'jsx',
    'classProperties',
    'decorators-legacy',
  ],
}
