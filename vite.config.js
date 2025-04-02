import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: process.env.PORT || 10000
  },
  server: {
    host: true,
    port: process.env.PORT || 10000
  }
});
