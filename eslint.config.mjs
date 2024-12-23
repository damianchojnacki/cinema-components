import stylistic from '@stylistic/eslint-plugin'
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: [
            '.rollup.cache/**',
            '.storybook/**',
            'storybook-static/**',
            'dist/**',
            'node_modules/**',
            'coverage/**',
            'tailwind.config.js',
            'postcss.config.cjs',
            'eslint.config.mjs',
            'vite.config.js',
        ],
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            react: reactPlugin,
            'react-hooks': hooksPlugin,
        },
        rules: {
            ...reactPlugin.configs['jsx-runtime'].rules,
            ...hooksPlugin.configs.recommended.rules,
            "react-hooks/exhaustive-deps": 'off'
        },
    },
    stylistic.configs.customize({
        indent: 2,
        quotes: 'single',
        semi: false,
        jsx: true,
        arrowParens: true,
    }),
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        rules: {
            "@typescript-eslint/ban-ts-comment": "off",
            '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
            '@stylistic/operator-linebreak': ['error', 'none'],
            '@stylistic/multiline-ternary': "off",
        }
    }
]
