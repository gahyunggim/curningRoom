import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": import.meta.env,
  },
  build: {
    target: "es2022", // 또는 'modules' (최신 브라우저를 타겟팅)
  },
});
