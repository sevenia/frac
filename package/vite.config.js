import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    root: '/app/package',
    build: {
        target: 'esnext',
        lib: {
            entry: 'src/Frac.js',
            name: 'frac',
            formats: ['es', 'umd'],
        },
        rollupOptions: {
            // Externalize deps that shouldn't be bundled into the library.
            external: ['vue', 'vue-router'],
        },
        sourcemap: true,
        minify: false,
    },
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
