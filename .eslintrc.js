module.exports = {
   root: true,
   parser: '@babel/eslint-parser',
   env: {
      browser: true,
      jest: true,
   },
   extends: ['eslint:recommended', 'plugin:react/recommended'],
   overrides: [
      {
         files: ['**/*.spec.js', '**/*.spec.jsx', '**/*.test'],
         env: {
            jest: true,
         },
      },
   ],
   parserOptions: {
      sourceType: 'module',
      babelOptions: {
         presets: ['@babel/preset-react'],
      },
   },
   plugins: ['react'],
   rules: {
      indent: ['error', 3, { SwitchCase: 1 }],
   },
}
