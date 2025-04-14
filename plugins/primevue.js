// plugins/primevue.js
import { defineNuxtPlugin } from '#app'
import AnimateOnScroll from 'primevue/animateonscroll'

export default defineNuxtPlugin((nuxtApp) => {
  // Register the AnimateOnScroll directive
  nuxtApp.vueApp.directive('animateonscroll', AnimateOnScroll)
  
  // Note: PrimeVue is already installed via the module, 
  // so you don't need to use(PrimeVue) again
})