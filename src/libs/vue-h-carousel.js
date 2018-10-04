const px = 'px'

export default {
  name: 'vue-h-carousel',
  data () {
    return {
      currentIndex: 0
    }
  },
  props: {
    images: {
      default: [],
      type: Array
    },
    width: {
      default: 100,
      type: Number
    },
    height: {
      default: 300,
      type: Number
    },
    rightWingWidth: {
      default: 0,
      type: Number
    },
    leftWingWidth: {
      default: 0,
      type: Number
    },
    padding: {
      default: 16,
      type: Number
    }
  },
  computed: {
    totalWidth () {
      return this.width + this.leftWingWidth + this.rightWingWidth
    },
    sliderStyle () {
      return {
        width: this.totalWidth + px,
        height: this.height + px,
        overflow: 'hidden'
      }
    },
    rightArrowStyle () {
      return {
        left: (this.totalWidth - 20) + px,
        top: ((this.height / 2) - 30) + px
      }
    },
    leftArrowStyle () {
      return {
        left: 0 + px,
        top: ((this.height / 2) - 30) + px
      }
    }
  },
  methods: {
    itemStyle (i, k) {
      return {
        left: ((k - this.currentIndex) * (this.width + this.padding)) + px
      }
    },
    buttonStyle (k) {
      return {
        fontWeight: this.currentIndex === k ? 'bold' : ''
      }
    },
    slide (i) {
      this.currentIndex = this.currentIndex + Number(i)
      if (this.currentIndex >= this.images.length) {
        this.currentIndex = 0
      } else if (this.currentIndex < 0) {
        this.currentIndex = this.images.length - 1
      }
    },
    go (i) {
      this.currentIndex = i
    }
  }
}
