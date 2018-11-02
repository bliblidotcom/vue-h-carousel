const px = 'px'
const MOVE_THRESHOLD = 5

const EVENTS = {
  SLIDE_CLICKED: 'slideClicked',
  PAGING_BUTTON_CLICKED: 'pagingButtonClicked',
  ARROW_BUTTON_CLICKED: 'arrowButtonClicked',
  POST_PAGINATION_LABEL_CLICKED: 'postPaginationLabelClicked'
}

export default {
  name: 'vue-h-carousel',
  data () {
    return {
      currentIndex: 0,
      transPos: 0,
      targetIndex: 0,
      isMouseOver: false,
      dragStartPos: 0,
      isClicking: false,
      isDrag: false
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
      default: 0, // 0 for no auto play
      type: Number
    },
    postPaginationLabel: {
      default: '',
      type: String
    }
  },
  watch: {
    // restart cycle when interval changed
    interval () {
      this.startCycle()
    },
    // watch for pixel move, and draw only when the value is not 0
    pixMove (v) {
      if (v === 0) return
      this.createStyles()
    }
  },
  mounted () {
    this.startCycle()
    this.createStyles()
    this.handleTouch()
  },
  destroyed () {
    this.clearCycle()
    this.removeStyles()
    this.removeTouchHandler()
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
    currentImage () {
      return this.images[this.currentIndex] || {}
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
      return resultPre.reverse().concat([this.currentImage]).concat(resultPost)
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
    pixMove () {
      return Math.abs((this.distance * this.slideWidth) + this.transPos)
    },
    innerStyles () {
      return `
      @keyframes slideLeft {
        to { transform: translateX(${this.pixMove}px); }
      }
      @keyframes slideRight {
        to { transform: translateX(${-this.pixMove}px); }
      }`
    }
  },
  methods: {
    imagePos (i) {
      const relPos = i - this.windowWingSize
      return this.transPos + this.leftWingWidth + (relPos * this.slideWidth)
    },
    clearState () {
      this.transPos = 0
    },
    clearInteraction () {
      this.isDrag = false
      this.isClicking = false
      this.mouseOver(false)
    },
    slide (i) {
      this.go(this.currentIndex + Number(i))
    },
    setSlide (i) {
      this.currentIndex = i
      this.clearState()
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
      // need to call setSlide a bit faster than animation ending
      // why 50ms ? .. magic number
      setTimeout(() => {
        if (this.currentIndex === this.targetIndex) return
        this.setSlide(this.targetIndex)
      }, this.slidingDuration - 50)
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
    },
    touchStart (e) {
      this.mouseOver(true)
      this.dragStartPos = e.touches[0].clientX
    },
    touchEnd (e) {
      if (Math.abs(this.transPos) < MOVE_THRESHOLD) {
        this.transPos = 0
        return
      }
      const direction = this.transPos / Math.abs(this.transPos)
      const steps = -direction * Math.ceil(this.transPos / direction / this.slideWidth)
      this.slide(steps)
      setTimeout(() => {
        this.mouseOver(false)
      }, this.slidingDuration)
    },
    touchCancel () {
      this.mouseOver(false)
    },
    touchMove (e) {
      const pos = e.touches[0].clientX
      const distance = pos - this.dragStartPos
      this.transPos = distance
    },
    mouseDown (e) {
      if (e.which === 3 || // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        e.button === 2 // IE, Opera
        ) {
        return
      }
      e.preventDefault()
      this.dragStartPos = e.clientX
      this.isClicking = true
    },
    mouseUp (e) {
      this.isClicking = false
      this.isDrag = false
      if (Math.abs(this.transPos) < MOVE_THRESHOLD) {
        this.transPos = 0
        return
      }
      const direction = this.transPos / Math.abs(this.transPos)
      const steps = -direction * Math.ceil(this.transPos / direction / this.slideWidth)
      this.slide(steps)
    },
    mouseMove (e) {
      if (!this.isClicking) return
      this.isDrag = true
      const pos = e.clientX
      const distance = pos - this.dragStartPos
      this.transPos = distance
    },
    mouseOut () {
      this.clearState()
      this.clearInteraction()
    },
    // handle opening window here
    handleItemUrl (i, e) {
      this.$emit(EVENTS.SLIDE_CLICKED, i)
      this.clearInteraction()
    },
    arrowClick (v) {
      this.$emit(EVENTS.ARROW_BUTTON_CLICKED, {
        currentIndex: this.currentIndex,
        direction: v > 0 ? 'right' : 'left'
      })
      this.slide(v)
    },
    pagingButtonClick (i) {
      this.$emit(EVENTS.PAGING_BUTTON_CLICKED, {
        currentIndex: this.currentIndex,
        targetIndex: this.targetIndex,
        item: this.images[i]
      })
      this.go(i)
    },
    postPaginationLabelClick () {
      this.$emit(EVENTS.POST_PAGINATION_LABEL_CLICKED)
    },
    handleTouch () {
      const wrapper = this.$refs.wrapper
      if (!wrapper) return
      const addEL = wrapper.addEventListener
      addEL('touchstart', this.touchStart)
      addEL('touchend', this.touchEnd)
      addEL('touchcancel', this.touchCancel)
      addEL('touchmove', this.touchMove)
    },
    removeTouchHandler () {
      const wrapper = this.$refs.wrapper
      if (!wrapper) return
      const removeEL = wrapper.removeEventListener
      removeEL('touchstart', this.touchStart)
      removeEL('touchend', this.touchEnd)
      removeEL('touchcancel', this.touchCancel)
      removeEL('touchmove', this.touchMove)
    },
    getUrl (i) {
      if (this.isDrag) return null
      return i.url
    }
  }
}
