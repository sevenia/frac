import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    root: '/app/package',
    build: {
        target: 'esnext',
        lib: {
            entry: 'src/Frac.js',
            name: 'frac',
            formats: ['es', 'umd']
        },
        rollupOptions: {
            // Externalize deps that shouldn't be bundled into the library.
            external: ['vue', 'vue-router'],
        },
        sourcemap: true,
    },
    plugins: [vue()],
})
