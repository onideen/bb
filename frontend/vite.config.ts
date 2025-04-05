import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import compression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240, // kun filer over 10KB komprimeres
      algorithm: "gzip", // evt. 'brotliCompress'
      ext: ".gz", // Output-fil: .gz
    }),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:1337",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
