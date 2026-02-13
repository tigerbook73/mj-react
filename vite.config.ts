/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// import aliases for test and storybook environments
const isTest = process.env.NODE_ENV === "test";
const isStorybook = process.env.STORYBOOK === "true";
const testAliases: Record<string, string> =
  isTest || isStorybook
    ? {
        "socket.io-client": path.resolve(__dirname, "./src/stories/__mocks__/socket.io-client.ts"),
      }
    : {};

console.log("Vite config: isTest =", isTest, ", isStorybook =", isStorybook);

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/react/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      ...testAliases,
    },
  },
  server: {
    proxy: {
      "/socket.io": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist/react",
    write: mode != "dry",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**", "src/common/core/**"],
  },
}));
