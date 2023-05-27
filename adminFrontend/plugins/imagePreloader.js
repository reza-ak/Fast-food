export default defineNuxtPlugin((nuxtApp) => {
  // create vue directive 
  // 'img' is actually 'v-img' like v-for or v-if
  // The first parameter in the following function (el) is the element to which the directive is given and the second parameter (url) is the directive input.
  nuxtApp.vueApp.directive('img', function(el, url) {
    let img = new Image();
    img.src = url.value
    img.onload = function () {
      el.src = url.value
      el.classList.add("fade-in-image")
    }
  })
})