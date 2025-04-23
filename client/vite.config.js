import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    https: false, // explicitly HTTP
    port: 5173,
    host: true,
  },
  plugins: [react()],
});
