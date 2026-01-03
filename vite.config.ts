import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'; // <--- 1. Import React plugin

export default defineConfig(({ mode }) => {
    // const env = loadEnv(mode, '.', ''); // Not needed if removing API key

    return {
      // 2. Add the React plugin here so .tsx files work
      plugins: [react()], 
      
      base: '/Portfolio-Website/',
      
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },

      // 3. Removed 'define' block to prevent leaking API keys
      // If you MUST use the key, you can add it back, but be warned.
    };
});
