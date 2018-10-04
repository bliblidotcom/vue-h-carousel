import Vue from 'vue'
import VueHCarousel from '@/libs/VueHCarousel.vue'

describe('VueHCarousel', () => {
  let vm

  beforeEach(() => {
    vm = new (Vue.extend(VueHCarousel))({
      propsData: {
        image: '/abc.jpg'
      }
    })
    vm.$mount()
  })
})

