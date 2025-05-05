import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173, // Make sure the port matches the one you're using
    strictPort: true, // Prevents the server from using another port
  },
});
