import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import createSvgSpritePlugin from "vite-plugin-svg-spriter";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "./",
  build: {
    outDir: "docs",
    assetsDir: "assets",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "pages/about/index.html"),
        contacts: resolve(__dirname, "pages/contacts/index.html"),
      },
    },
  },
  plugins: [
    ViteImageOptimizer({
      jpg: { quality: 75 },
      png: { quality: 75 },
    }),
    createSvgSpritePlugin({
      // исходники иконок для спрайта
      svgFolder: "./assets/images/svg",
      // при необходимости можно задать имя/путь спрайта опциями плагина
    }),
    // Копируем статические ассеты как есть в docs/, чтобы они точно попали в билд
    viteStaticCopy({
      targets: [
        { src: "assets/images/**/*", dest: "assets/images" },
        { src: "assets/fonts/**/*", dest: "assets/fonts" },
      ],
    }),
  ],
});
