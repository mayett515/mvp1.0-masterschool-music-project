import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    host: true,
    port: process.env.PORT || 10000,
    allowedHosts: [
      "mvp1-0-masterschool-music-project.onrender.com",
      "localhost",
    ],
  },
  server: {
    host: true,
    port: process.env.PORT || 10000,
    allowedHosts: [
      "mvp1-0-masterschool-music-project.onrender.com",
      "localhost",
    ],
  },
});
