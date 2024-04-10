import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@types': path.resolve(__dirname, 'src/types'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    define: {
      'process.env.REACT_APP_OMDB_API_KEY': JSON.stringify(env.REACT_APP_OMDB_API_KEY),
    },
  };
});
