const px = 'px'

export default {
  name: 'vue-h-carousel',
  data () {
    return {
      currentIndex: 0,
      transPos: 0,
      targetIndex: 0,
      isMouseOver: false
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
    },
    slidingDuration: {
      default: 1000,
      type: Number
    },
    interval: {
      default: 0, // no auto play
      type: Number
    },
    postPaginationLabel: {
      default: '',
      type: String
    },
    prePaginationLabel: {
      default: '',
      type: String
    }
  },
  watch: {
    interval () {
      this.startCycle()
    },
    distance (v) {
      // if distance is 0 (target reached), do not update style
      if (v === 0) return
      this.createStyles()
    }
  },
  mounted () {
    this.startCycle()
    this.createStyles()
  },
  destroyed () {
    this.clearCycle()
    this.removeStyles()
  },
  computed: {
    animationDuration () {
      return this.sliding !== 0
        ? (Number(this.slidingDuration) / 1000 + 's')
        : ''
    },
    animationName () {
      return this.sliding === 0
        ? ''
        : this.sliding > 0
        ? 'slideRight'
        : 'slideLeft'
    },
    itemStyles () {
      const result = []
      for (let i = 0; i < this.windowSize; i++) {
        result.push({
          left: this.imagePos(i) + px,
          width: this.slideWidth + px,
          animationDuration: this.animationDuration,
          animationName: this.animationName
        })
      }
      return result
    },
    imagesLength () {
      return this.images.length
    },
    windowSize () {
      return (this.imagesLength * 2) + 1
    },
    windowWingSize () {
      return Math.floor(this.windowSize / 2)
    },
    slideImages () {
      const resultPre = []
      const resultPost = []
      for (let i = 0; i < this.windowWingSize; i++) {
        const preIndex = (this.imagesLength + this.currentIndex - i - 1) % this.imagesLength
        const postIndex = (this.imagesLength + this.currentIndex + i + 1) % this.imagesLength
        resultPre.push(this.images[preIndex])
        resultPost.push(this.images[postIndex])
      }
      return resultPre.reverse().concat([this.images[this.currentIndex] || {}]).concat(resultPost)
    },
    slideWidth () {
      return this.width + this.padding
    },
    totalWidth () {
      const paddingCount = !!this.leftWingWidth + !!this.rightWingWidth
      return this.width + this.leftWingWidth + this.rightWingWidth + (paddingCount * this.padding)
    },
    sliderStyle () {
      return {
        width: this.totalWidth + px,
        height: this.height + px,
        overflow: 'hidden'
      }
    },
    distance () {
      const lastImage = this.imagesLength - 1
      if (this.targetIndex === lastImage && this.currentIndex === 0) return -1
      if (this.targetIndex === 0 && this.currentIndex === lastImage) return 1
      return this.targetIndex - this.currentIndex
    },
    sliding () {
      return this.distance / Math.abs(this.distance) || 0
    },
    innerStyles () {
      const percentage = Math.abs(this.distance) * 100
      return `
      @keyframes slideLeft {
        to { transform: translateX(${percentage}%); }
      }
      @keyframes slideRight {
        to { transform: translateX(${-percentage}%); }
      }
      `
    }
  },
  methods: {
    imagePos (i) {
      const relPos = i - this.windowWingSize
      return this.transPos + this.leftWingWidth + (relPos * this.slideWidth)
    },
    buttonStyle (k) {
      return this.currentIndex === k ? 'active-slide' : ''
    },
    slide (i) {
      this.go(this.currentIndex + Number(i))
    },
    setSlide (i) {
      this.currentIndex = i
    },
    go (i) {
      // skip while sliding
      if (this.sliding) return

      this.targetIndex = i
      if (this.targetIndex >= this.images.length) {
        this.targetIndex = 0
      } else if (this.targetIndex < 0) {
        this.targetIndex = this.images.length - 1
      }
      setTimeout(() => {
        this.setSlide(this.targetIndex)
      }, this.slidingDuration)
    },
    clearCycle () {
      try {
        clearInterval(this.intervalId)
      } catch (e) {
      }
    },
    startCycle () {
      this.clearCycle()
      if (this.interval < 1) return

      setInterval(() => {
        if (this.isMouseOver) return
        this.slide(1)
      }, this.interval)
    },
    removeStyles () {
      const ref = this.$refs.innerStyle
      try {
        ref.removeChild(ref.childNodes[0])
      } catch (e) {
      }
    },
    createStyles () {
      const ref = this.$refs.innerStyle
      if (!ref) return
      this.removeStyles()
      const style = window.document.createElement('style')
      style.type = 'text/css'
      style.appendChild(window.document.createTextNode(this.innerStyles))
      ref.appendChild(style)
    },
    mouseOver (v) {
      this.isMouseOver = v
    }
  }
}
