const px = 'px'
const ANIMATION_STEP = 10 // ms

export default {
  name: 'vue-h-carousel',
  data () {
    return {
      currentIndex: 0,
      sliding: 0,
      transPos: 0,
      targetIndex: 0
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
    windowSize: {
      default: 5,
      type: Number
    },
    slidingDuration: {
      default: 1000,
      type: Number
    }
  },
  computed: {
    itemStyles () {
      const result = []
      for (let i = 0; i < this.windowSize; i++) {
        result.push({
          left: this.imagePos(i) + px
        })
      }
      return result
    },
    imagesLength () {
      return this.images.length
    },
    slideImages () {
      const wing = Math.floor(this.windowSize / 2)
      const resultPre = []
      const resultPost = []
      for (let i = 0; i < wing; i++) {
        const preIndex = (this.imagesLength + this.currentIndex - i) % this.imagesLength
        const postIndex = (this.imagesLength + this.currentIndex + i + 1) % this.imagesLength
        resultPre.push(this.images[preIndex])
        resultPost.push(this.images[postIndex])
      }
      return resultPre.concat([this.images[this.currentIndex] || {}]).concat(resultPost)
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
    },
    distance () {
      const lastImage = this.imagesLength - 1
      if (this.targetIndex === lastImage && this.currentIndex === 0) return -1
      if (this.targetIndex === 0 && this.currentIndex === lastImage) return 1
      return this.targetIndex - this.currentIndex
    },
    slidingStep () {
      const step = (Math.abs(this.distance) * this.slideWidth) / (this.slidingDuration / ANIMATION_STEP)
      return step * this.normalcdf(this.sliding * this.transPos / this.slideWidth) * 4
    }
  },
  methods: {
    imagePos (i) {
      return this.transPos + this.leftWingWidth + ((i - 2) * this.slideWidth)
    },
    buttonStyle (k) {
      return {
        fontWeight: this.currentIndex === k ? 'bold' : ''
      }
    },
    slide (i) {
      this.go(this.currentIndex + Number(i))
    },
    go (i) {
      // skip if while sliding
      if (this.sliding) return

      this.targetIndex = i
      const distance = i - this.currentIndex
      this.sliding = distance / Math.abs(distance) || 0
      if (this.targetIndex >= this.images.length) {
        this.targetIndex = 0
      } else if (this.targetIndex < 0) {
        this.targetIndex = this.images.length - 1
      }
      if (this.currentIndex !== this.targetIndex) {
        this.startAnimation()
      }
    },
    setSlide (i) {
      this.currentIndex = i
    },
    move () {
      console.log(this.transPos)
      if (Math.abs(this.transPos) >= this.slideWidth) {
        this.transPos = 0
        this.sliding = 0
        this.setSlide(this.targetIndex)
        return
      }
      this.transPos += (-this.sliding * this.slidingStep)
      setTimeout(this.move, ANIMATION_STEP)
    },
    startAnimation () {
      this.transPos = 0
      setTimeout(this.move, ANIMATION_STEP)
    },
    normalcdf (X) {
      // cherry picked from here: http://www.math.ucla.edu/~tom/distributions/normal.html
      const T = 1 / (1 + 0.2316419 * Math.abs(X))
      const D = 0.3989423 * Math.exp(-X * X / 2)
      var Prob = D * T * (0.3193815 + T * (-0.3565638 + T * (1.781478 + T * (-1.821256 + T * 1.330274))))
      if (X > 0) {
        Prob = 1 - Prob
      }
      return Prob
    }
  }
}
