import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import createSvgSpritePlugin from "vite-plugin-svg-spriter";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "./",
  build: {
    outDir: "docs",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        reg: resolve(__dirname, "pages/reg/index.html"),
      },
      output: {
        // сохраняем структуру ассетов
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split(".").pop();
          if (/css/i.test(ext)) return "assets/css/[name]-[hash][extname]";
          if (/woff2?|ttf|otf/i.test(ext))
            return "assets/fonts/[name]-[hash][extname]";
          if (/png|jpe?g|gif|svg|webp/i.test(ext))
            return "assets/images/[name]-[hash][extname]";
          return "assets/[name]-[hash][extname]";
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
  },
  plugins: [
    ViteImageOptimizer({
      jpg: { quality: 75 },
      png: { quality: 75 },
    }),
    createSvgSpritePlugin({
      svgFolder: "./assets/images/svg",
    }),
    viteStaticCopy({
      targets: [
        { src: "assets/images/**/*", dest: "assets/images" },
        { src: "assets/fonts/**/*", dest: "assets/fonts" },
      ],
    }),
  ],
});
