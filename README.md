# vue-h-zoom


[![codecov](https://codecov.io/gh/bliblidotcom/vue-h-carousel/branch/master/graph/badge.svg)](https://codecov.io/gh/bliblidotcom/vue-h-carousel)
[![npm](https://img.shields.io/npm/v/vue-h-carousel.svg)](https://www.npmjs.com/package/vue-h-carousel)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Vue Carousel

## Installation

```js
npm i --save-dev vue-h-carousel
```

## About
// TODO

### Browser

Include the script file, then install the component with `Vue.use(VueHCarousel);` e.g.:

```html
<script type="text/javascript" src="node_modules/vuejs/dist/vue.min.js"></script>
<script type="text/javascript" src="node_modules/vue-h-carousel/dist/vue-h-carousel.min.js"></script>
<script type="text/javascript">
  Vue.use(VueHCarousel);
</script>
```

### Module

```js
import VueHCarousel from 'vue-h-carousel';
```

## Usage

Use in template for example as:

```html
<vue-h-carousel images=""></vue-h-carousel>
```

## Important notes

To be able to import image locally, you need to register the vue-h-carousel tag to the vue loader, add this to your
webpack config:

``` js
{
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    loaders: {
    },
    // other vue-loader options go here
    transformToRequire: {
      'vue-h-carousel': ['image', 'image-full']
    }
  }
},
```

## Parameters

| Attribute        | Type                                            | Default              | Description      |
| :---             | :---:                                           | :---:                | :---             |
| image            | String | - | Image to be displayed in thumbnail. Used also in the carousel if imageFull param is not given (required) |

## Preview

<p align="center">
  <img src="https://raw.githubusercontent.com/bliblidotcom/vue-h-carousel/master/docs/vue-h-carousel-preview.jpg">
</p>


## :copyright: License

[MIT](http://opensource.org/licenses/MIT)
