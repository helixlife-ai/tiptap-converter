import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from './prettier.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'prettier',
      'plugin:tailwindcss/recommended',
    ],
    plugins: ['tailwindcss', 'unused-imports', 'prettier'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      'prettier/prettier': ['warn', prettierConfig],
      'react/jsx-key': 'off',
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'react-hooks/exhaustive-deps': 'off',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          ignoreRestSiblings: true,
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'none',
          argsIgnorePattern: '^_',
        },
      ],
    },
    settings: {
      tailwindcss: {
        callees: ['cn', 'cva', 'withCn'],
        config: 'tailwind.config.js',
      },
      next: {
        rootDir: ['./'],
      },
    },
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        parser: '@typescript-eslint/parser',
      },
    ],
  }),
];

export default eslintConfig;
