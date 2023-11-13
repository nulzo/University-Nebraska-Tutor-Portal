import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: "0.0.0.0",
    hmr: { clientPort: 4200 },
    strictPort: true,
    port: 4200,
  },
  preview: {
    host: "0.0.0.0",
    port: 4220,
    // watch:
    //   {usePolling: true}
  },
});
