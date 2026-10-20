import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({
    tsconfigPath: './tsconfig.json',
    rollupTypes: true
  })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MaritimeTimeline',
      formats: ['es', 'cjs'],
      fileName: 'maritime-timeline'
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'maritime-ui', 'dayjs', 'dayjs/plugin/localizedFormat', 'dayjs/plugin/utc'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'maritime-ui': 'MaritimeUI',
          dayjs: 'dayjs'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});