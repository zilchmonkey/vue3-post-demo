import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ env }) => {
  return {
    plugins: [vue()],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
      modules: {
        generateScopedName:
          env === "production"
            ? "[hash:base64]"
            : "[name]__[local]__[hash:base64]",
      },
    },
  };
});
