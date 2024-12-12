import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server:{
    port:3000 // add for tauri
  },
  build: {
    chunkSizeWarningLimit: 3500, // Aumentar el límite de advertencia a 1000 KB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Todos los módulos de node_modules irán a un chunk llamado 'vendor'
          }
        },
      },
    },
  },
})
