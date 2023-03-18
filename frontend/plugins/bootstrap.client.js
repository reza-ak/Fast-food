import bootstrap from "bootstrap/dist/js/bootstrap.bundle"

export default defineNuxtPlugin(nuxtApp => {
  return nuxtApp.provide("bootstrap", bootstrap)
})