<template>
  <div class="content"
       @mouseover="mouseOver(true)"
       @mouseleave="mouseOver(false)">
    <div class="slider"
      :style="sliderStyle">
      <div class="slider-wrapper" ref="wrapper">
        <div class="slider-item"
            :style="itemStyles[k]"
            v-for="(i, k) in slideImages"
            :key="'image-slider-' + k"
             draggable="true"
             @mousedown="mouseDown"
             @mouseup="mouseUp"
             @mousemove="mouseMove">
          <a @click="handleItemUrl(i.url, $event)" target="_blank">
            <img :src="i.src" :alt="i.alt"/>
          </a>
        </div>
      </div>
      <div class="slider-navigation">
        <div class="arrow arrow-right"
          @click="slide(1)">
          <img src="assets/arrowright.png" alt=""/>
        </div>
        <div class="arrow arrow-left"
          @click="slide(-1)">
          <img src="assets/arrowleft.png" alt=""/>
        </div>
      </div>
    </div>
    <div class="slider-pagination">
      <ul class="button">
        <li
          v-for="(i, k) in images"
          @click="go(k)"
          :class="{'active-slide': currentIndex === k}" :key="k">
          <span class="button-circle"></span>
        </li>
        <li class="see-all" v-html="postPaginationLabel"></li>
      </ul>
    </div>
    <div ref="innerStyle"></div>
  </div>
</template>

<style scoped>
.content {
  position: relative;
}
.slider {
  position: relative;
  list-style: none;
  padding: 0px;
  margin: 0 auto;
}
.slider-item {
  position: absolute;
}
.slider-item img {
  display: inline-block;
  vertical-align: middle;
}
.slider-pagination {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  z-index: 20;
}
.arrow {
  position: absolute;
  cursor: pointer;
  top: 50%;
  transform: translate(0, -50%);
  background-color: #fff;
  line-height: 0;
  padding: 20px 5px;
}
.arrow img {
  width: 22px;
}
.arrow-right {
  right: 0;
  box-shadow: -2px 2px 4px 0 rgba(0, 0, 0, 0.2);
}
.arrow-left {
  left: 0;
  box-shadow: -2px 2px 4px 0 rgba(0, 0, 0, 0.2);
}
.button {
  text-align: center;
  margin: auto;
  list-style: none;
  padding: 0;
}
.button > li {
  cursor: pointer;
  padding: 10px;
  display: inline-block;
}
.button-circle {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #cccccc;
}
.active-slide .button-circle {
  background-color: #0096d9;
}
.see-all {
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #0096d9;
  font-family: inherit;
}
</style>

<script src="./vue-h-carousel.js"></script>
