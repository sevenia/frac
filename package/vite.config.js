import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    root: '/app/package',
    build: {
        lib: {
            entry: 'src/Frac.js',
            formats: ['es', 'cjs'],
            name: 'frac',
            fileName: (format) => `frac.${format}.js`,
        },
        rollupOptions: {
            // Externalize deps that shouldn't be bundled into the library.
            external: ['vue', 'vue-router'],
        },
        sourcemap: true,
        // Reduce bloat from legacy polyfills.
        target: 'esnext',
        // Leave minification up to applications.
        minify: false,
    },
    plugins: [vue()],
})
