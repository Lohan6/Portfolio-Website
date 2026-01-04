import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Sets the base path for assets. './' ensures assets are loaded relatively,
  // which is required for GitHub Pages deployment (user.github.io/repo/).
  base: './',
  build: {
    target: 'esnext', // Supports top-level await and modern ESM features
    outDir: 'dist',
  },
  esbuild: {
    // Ensure TSX is handled correctly
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  }
});