import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import plainText from "vite-plugin-plain-text";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin(), plainText(/.*.yarn$/)],
  css: {
    postcss: {
      map: false,
      plugins: [
        require("stylelint")({}),
        require("postcss-nested"),
        require("autoprefixer"),
      ],
    },
  },
});
