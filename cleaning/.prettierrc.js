module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  tabWidth: 2,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: ['^react$', '^@mui', '<THIRD_PARTY_MODULES>', '^src/', '^[./]'],
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  parser: 'typescript',
}
