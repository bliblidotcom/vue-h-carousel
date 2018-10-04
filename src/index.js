/* @flow */
import plugin from './libs/VueHCarousel.vue'

module.exports = {
  install: function (Vue, options) {
    Vue.component('vue-h-carousel', plugin)
  }
}
