<template>
  <div class="content">
    <ul class="slider"
      :style="sliderStyle">
      <li class="slider-item"
          :style="itemStyles[k]"
          v-for="(i, k) in slideImages"
          :key="'image-slider-' + k">
        <a :href="i.url" target="_blank">
          <img :src="i.src" :alt="i.alt"/>
        </a>
      </li>
    </ul>
    <div class="arrow arrow-right"
      :style="rightArrowStyle"
      @click="slide(1)">
      &gt;
    </div>
    <div class="arrow arrow-left"
      :style="leftArrowStyle"
      @click="slide(-1)">
      &lt;
    </div>
    <ul class="button">
      <li
        v-for="(i, k) in images"
        @click="go(k)"
        :style="buttonStyle(k)">
        o
      </li>
    </ul>
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
}
.slider-item {
  position: absolute;
}
.arrow {
  position: absolute;
  font-size: 70px;
  font-size-adjust: 0.58;
  cursor: pointer;
}
.button {
  text-align: center;
  margin: auto;
  display:flex;
  list-style: none;
}
.button > li {
  cursor: pointer;
  padding: 10px;
}
</style>

<script src="./vue-h-carousel.js"></script>
