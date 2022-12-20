module.exports = {
  env: { browser: true, es2021: true, node: true },
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: ['react'],
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-invalid-void-type': 'warn',
    '@typescript-eslint/no-dynamic-delete': 'warn',

    'multiline-ternary': 'off',
    'comma-dangle': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/require-array-sort-compare': 'off',
  },
}
