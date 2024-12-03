import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts"
import { coverageConfigDefaults } from 'vitest/config'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: '@', replacement: resolve(__dirname, 'src') },
        ],
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'Cinema',
            fileName: 'cinema',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                'next/link',
                'next/router',
            ],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'React',
                    'react/jsx-runtime': 'ReactJsxRuntime',
                    'react-dom': 'ReactDOM',
                    'next/link': 'NextLink',
                    'next/router': 'NextRouter',
                },
            },
            plugins: [
                dts(),
            ]
        },
    },
    test: {
        include: ['**/*.test.ts', '**/*.test.tsx'],
        environment: 'jsdom',
        coverage: {
            exclude: ['src/stories', '*.config*',  ...coverageConfigDefaults.exclude]
        }
    }
})