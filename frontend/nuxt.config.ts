// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],

  app: {
    head: {
      htmlAttrs: {
        dir: "rtl",
        lang: "fa",
      },
    },
  },

  runtimeConfig: {
    public: {
      apiBase: "http://localhost:8000/api",
    },
  },

  build: {
    transpile: ["vue-toastification"],
  },

  modules: [
    "@formkit/nuxt",
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
});
