// /** Lines below are already loaded in /test/helpers/entry.js
// import Vue from 'vue'
// import plugin from './index'
// import 'babel-polyfill' // promise and etc ...
//
// Vue.config.productionTip = false
// Vue.use(plugin)
//
// window.Vue = Vue
// Vue.config.debug = true
// */

import VueHZoom from './libs/VueHCarousel.vue'

new window.Vue({
  el: 'app',
  data () {
    return {
      label: '<a href="/promosi">Lihat Semua Promo</a>',
      images: [
        {
          url: 'http://abc.com',
          src: 'assets/banner-main-1.png',
          alt: 'image 1'
        },
        {
          url: 'http://abc.com',
          src: 'assets/banner-main-2.png',
          alt: 'image 2'
        },
        {
          url: 'http://abc.com',
          src: 'assets/banner-main-3.png',
          alt: 'image 3'
        },
        {
          url: 'http://abc.com',
          src: 'assets/banner-main-4.png',
          alt: 'image 4'
        },
        {
          url: 'http://abc.com',
          src: 'assets/banner-main-5.png',
          alt: 'image 5'
        },
        {
          url: 'http://abc.com',
          src: 'assets/banner-main-6.png',
          alt: 'image 6'
        }
      ]
    }
  },
  template: `
  <vue-h-zoom :images="images"
    :width="840"
    :height="280"
    :leftWingWidth="200"
    :rightWingWidth="200"
    :interval="3000"
    :slidingDuration="1000"
    :postPaginationLabel="label">
  </vue-h-zoom>`,
  components: { VueHZoom }
})
