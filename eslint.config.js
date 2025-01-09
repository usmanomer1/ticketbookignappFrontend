import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off', // ✅ Turn off the rule that causes errors in JSX
    'no-undef': 'off', // ✅ Disable the 'react' is not defined error
  },
  ignorePatterns: ['vite.config.js'], // ✅ Ignore the Vite config file
});
