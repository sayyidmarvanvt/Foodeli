import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://foodeli-backend-55b2.onrender.com/",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
