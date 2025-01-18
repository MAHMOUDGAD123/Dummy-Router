import path from "path";
import { defineConfig, type UserConfig } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      minify: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      loader: {
        ".html": "text",
      },
    },
  },
  esbuild: {
    format: "esm",
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
  build: {
    minify: "esbuild",
  },
  preview: {},
  server: {
    hmr: true,
  },
  plugins: [ViteMinifyPlugin()],
} satisfies UserConfig);
