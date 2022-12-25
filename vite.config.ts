import { defineConfig } from "vite";

export default defineConfig({
  base: "/vite-app-task-list/",
  define: {
    global: "window",
  },
});
