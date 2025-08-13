import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import createSvgSpritePlugin from "vite-plugin-svg-spriter";
export default defineConfig({
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        index: resolve("index.html"),
        about: resolve(__dirname, "pages/about/index.html"),
        contacts: resolve(__dirname, "pages/contacts/index.html"),
      },
    },
  },
  plugins: [
    ViteImageOptimizer({
      jpg: {
        quality: 75,
      },
      png: {
        quality: 75,
      },
    }),
    createSvgSpritePlugin({
      svgFolder: "./assets/images/svg/",
    }),
  ],
});
