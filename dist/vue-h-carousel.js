!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("vue-h-carousel",[],e):"object"==typeof exports?exports["vue-h-carousel"]=e():t["vue-h-carousel"]=e()}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default={name:"vue-h-carousel",data:function(){return{currentIndex:0,transPos:0,targetIndex:0,isMouseOver:!1,dragStartPos:0,isClicking:!1,isDrag:!1}},props:{images:{default:[],type:Array},width:{default:100,type:Number},height:{default:300,type:Number},rightWingWidth:{default:0,type:Number},leftWingWidth:{default:0,type:Number},padding:{default:16,type:Number},slidingDuration:{default:1e3,type:Number},interval:{default:0,type:Number},postPaginationLabel:{default:"",type:String}},watch:{interval:function(){this.startCycle()},pixMove:function(t){0!==t&&this.createStyles()}},mounted:function(){this.startCycle(),this.createStyles(),this.handleTouch()},destroyed:function(){this.clearCycle(),this.removeStyles(),this.removeTouchHandler()},computed:{animationDuration:function(){return 0!==this.sliding?Number(this.slidingDuration)/1e3+"s":""},animationName:function(){return 0===this.sliding?"":this.sliding>0?"slideRight":"slideLeft"},itemStyles:function(){for(var t=[],e=0;e<this.windowSize;e++)t.push({left:this.imagePos(e)+"px",width:this.slideWidth+"px",animationDuration:this.animationDuration,animationName:this.animationName});return t},imagesLength:function(){return this.images.length},windowSize:function(){return 2*this.imagesLength+1},windowWingSize:function(){return Math.floor(this.windowSize/2)},currentImage:function(){return this.images[this.currentIndex]||{}},slideImages:function(){for(var t=[],e=[],n=0;n<this.windowWingSize;n++){var i=(this.imagesLength+this.currentIndex-n-1)%this.imagesLength,r=(this.imagesLength+this.currentIndex+n+1)%this.imagesLength;t.push(this.images[i]),e.push(this.images[r])}return t.reverse().concat([this.currentImage]).concat(e)},slideWidth:function(){return this.width+this.padding},totalWidth:function(){var t=!!this.leftWingWidth+!!this.rightWingWidth;return this.width+this.leftWingWidth+this.rightWingWidth+t*this.padding},sliderStyle:function(){return{width:this.totalWidth+"px",height:this.height+"px",overflow:"hidden"}},distance:function(){var t=this.imagesLength-1;return this.targetIndex===t&&0===this.currentIndex?-1:0===this.targetIndex&&this.currentIndex===t?1:this.targetIndex-this.currentIndex},sliding:function(){return this.distance/Math.abs(this.distance)||0},pixMove:function(){return Math.abs(this.distance*this.slideWidth+this.transPos)},innerStyles:function(){return"\n      @keyframes slideLeft {\n        to { transform: translateX("+this.pixMove+"px); }\n      }\n      @keyframes slideRight {\n        to { transform: translateX("+-this.pixMove+"px); }\n      }\n      "}},methods:{imagePos:function(t){var e=t-this.windowWingSize;return this.transPos+this.leftWingWidth+e*this.slideWidth},clearState:function(){this.transPos=0,this.isDrag=!1},slide:function(t){this.go(this.currentIndex+Number(t))},setSlide:function(t){this.currentIndex=t,this.clearState()},go:function(t){var e=this;this.sliding||(this.targetIndex=t,this.targetIndex>=this.images.length?this.targetIndex=0:this.targetIndex<0&&(this.targetIndex=this.images.length-1),setTimeout(function(){e.currentIndex!==e.targetIndex&&e.setSlide(e.targetIndex)},this.slidingDuration-50))},clearCycle:function(){try{clearInterval(this.intervalId)}catch(t){}},startCycle:function(){var t=this;this.clearCycle(),this.interval<1||setInterval(function(){t.isMouseOver||t.slide(1)},this.interval)},removeStyles:function(){var t=this.$refs.innerStyle;try{t.removeChild(t.childNodes[0])}catch(t){}},createStyles:function(){var t=this.$refs.innerStyle;if(t){this.removeStyles();var e=window.document.createElement("style");e.type="text/css",e.appendChild(window.document.createTextNode(this.innerStyles)),t.appendChild(e)}},mouseOver:function(t){this.isMouseOver=t},touchStart:function(t){this.mouseOver(!0),this.dragStartPos=t.touches[0].clientX},touchEnd:function(t){var e=this;if(Math.abs(this.transPos)<5)return void(this.transPos=0);var n=this.transPos/Math.abs(this.transPos),i=-n*Math.ceil(this.transPos/n/this.slideWidth);this.slide(i),setTimeout(function(){e.mouseOver(!1)},this.slidingDuration)},touchCancel:function(){this.mouseOver(!1)},touchMove:function(t){var e=t.touches[0].clientX,n=e-this.dragStartPos;this.transPos=n},mouseDown:function(t){t.preventDefault(),this.dragStartPos=t.clientX,this.isClicking=!0},mouseUp:function(){if(Math.abs(this.transPos)<5)return void(this.transPos=0);var t=this.transPos/Math.abs(this.transPos),e=-t*Math.ceil(this.transPos/t/this.slideWidth);this.slide(e),this.isClicking=!1},mouseMove:function(t){if(this.isClicking){this.isDrag=!0;var e=t.clientX,n=e-this.dragStartPos;this.transPos=n}},handleItemUrl:function(t,e){e.preventDefault(),this.isDrag||window.open(t)},handleTouch:function(){var t=this.$refs.wrapper;if(t){var e=t.addEventListener;e("touchstart",this.touchStart),e("touchend",this.touchEnd),e("touchcancel",this.touchCancel),e("touchmove",this.touchMove)}},removeTouchHandler:function(){var t=this.$refs.wrapper;if(t){var e=t.removeEventListener;e("touchstart",this.touchStart),e("touchend",this.touchEnd),e("touchcancel",this.touchCancel),e("touchmove",this.touchMove)}}}}},function(t,e){t.exports=function(t,e,n,i,r,s){var a,o=t=t||{},u=typeof t.default;"object"!==u&&"function"!==u||(a=t,o=t.default);var c="function"==typeof o?o.options:o;e&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),r&&(c._scopeId=r);var d;if(s?(d=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},c._ssrRegister=d):i&&(d=i),d){var l=c.functional,h=l?c.render:c.beforeCreate;l?(c._injectStyles=d,c.render=function(t,e){return d.call(e),h(t,e)}):c.beforeCreate=h?[].concat(h,d):[d]}return{esModule:a,exports:o,options:c}}},function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"content",on:{mouseover:function(e){t.mouseOver(!0)},mouseleave:function(e){t.mouseOver(!1)}}},[i("div",{staticClass:"slider",style:t.sliderStyle},[i("div",{ref:"wrapper",staticClass:"slider-wrapper"},t._l(t.slideImages,function(e,n){return i("div",{key:"image-slider-"+n,staticClass:"slider-item",style:t.itemStyles[n],attrs:{draggable:"true"},on:{mousedown:t.mouseDown,mouseup:t.mouseUp,mousemove:t.mouseMove}},[i("a",{attrs:{target:"_blank"},on:{click:function(n){t.handleItemUrl(e.url,n)}}},[i("img",{attrs:{src:e.src,alt:e.alt}})])])})),t._v(" "),i("div",{staticClass:"slider-navigation"},[i("div",{staticClass:"arrow arrow-right",on:{click:function(e){t.slide(1)}}},[i("img",{attrs:{src:n(7),alt:""}})]),t._v(" "),i("div",{staticClass:"arrow arrow-left",on:{click:function(e){t.slide(-1)}}},[i("img",{attrs:{src:n(6),alt:""}})])])]),t._v(" "),i("div",{staticClass:"slider-pagination"},[i("ul",{staticClass:"button"},[t._l(t.images,function(e,n){return i("li",{key:n,class:{"active-slide":t.targetIndex===n},on:{click:function(e){t.go(n)}}},[i("span",{staticClass:"button-circle"})])}),t._v(" "),i("li",{staticClass:"see-all",domProps:{innerHTML:t._s(t.postPaginationLabel)}})],2)]),t._v(" "),i("div",{ref:"innerStyle"})])},r=[];i._withStripped=!0;var s={render:i,staticRenderFns:r};e.a=s},function(t,e,n){var i=n(4);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(9)("52d54a17",i,!1,{})},function(t,e,n){e=t.exports=n(5)(!1),e.push([t.i,"\n.content[data-v-1826360c] {\n  position: relative;\n}\n.slider[data-v-1826360c] {\n  position: relative;\n  list-style: none;\n  padding: 0px;\n  margin: 0 auto;\n}\n.slider-item[data-v-1826360c] {\n  position: absolute;\n}\n.slider-item img[data-v-1826360c] {\n  display: inline-block;\n  vertical-align: middle;\n}\n.slider-pagination[data-v-1826360c] {\n  position: absolute;\n  bottom: -40px;\n  left: 0;\n  right: 0;\n  width: 100%;\n  text-align: center;\n  z-index: 20;\n}\n.arrow[data-v-1826360c] {\n  position: absolute;\n  cursor: pointer;\n  top: 50%;\n  transform: translate(0, -50%);\n  background-color: #fff;\n  line-height: 0;\n  padding: 20px 5px;\n}\n.arrow img[data-v-1826360c] {\n  width: 22px;\n}\n.arrow-right[data-v-1826360c] {\n  right: 0;\n  box-shadow: -2px 2px 4px 0 rgba(0, 0, 0, 0.2);\n}\n.arrow-left[data-v-1826360c] {\n  left: 0;\n  box-shadow: -2px 2px 4px 0 rgba(0, 0, 0, 0.2);\n}\n.button[data-v-1826360c] {\n  text-align: center;\n  margin: auto;\n  list-style: none;\n  padding: 0;\n}\n.button > li[data-v-1826360c] {\n  cursor: pointer;\n  padding: 10px;\n  display: inline-block;\n}\n.button-circle[data-v-1826360c] {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background-color: #cccccc;\n}\n.active-slide .button-circle[data-v-1826360c] {\n  background-color: #0096d9;\n}\n.see-all[data-v-1826360c] {\n  font-size: 14px;\n  font-weight: 600;\n  font-style: normal;\n  font-stretch: normal;\n  line-height: 1.43;\n  letter-spacing: normal;\n  color: #0096d9;\n  font-family: inherit;\n}\n",""])},function(t,e){function n(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var s=i(r);return[n].concat(r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"})).concat([s]).join("\n")}return[n].join("\n")}function i(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var i=n(e,t);return e[2]?"@media "+e[2]+"{"+i+"}":i}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},r=0;r<this.length;r++){var s=this[r][0];"number"==typeof s&&(i[s]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&i[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAJFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACmWAJHAAAAC3RSTlMAvY8J0/TmlnVpOzAqL2IAAABCSURBVCjPY0AATscFDChAe7cDCp9p9+5gNAW7C9AUbDRAUyA82BRwoCtgQyjAFMDUgjAUxdrBrqQAT1QiIhsjOQAA3Xg8N9NM+rsAAAAASUVORK5CYII="},function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAJFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACmWAJHAAAAC3RSTlMAvY8J0/TmlnVpOzAqL2IAAABBSURBVCjPYwACLpEJDCiAZfcmVAHT3bsVUATYd6MpYZZGV2I42JU0oCtJwCuA0IJpKMLawaYAFFEYUYk7sjGSAwC/LTzrWVgC5QAAAABJRU5ErkJggg=="},function(t,e,n){"use strict";function i(t){u||n(3)}Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),s=n.n(r);for(var a in r)["default","default"].indexOf(a)<0&&function(t){n.d(e,t,function(){return r[t]})}(a);var o=n(2),u=!1,c=n(1),d=i,l=c(s.a,o.a,!1,d,"data-v-1826360c",null);l.options.__file="src/libs/VueHCarousel.vue",e.default=l.exports},function(t,e,n){function i(t){for(var e=0;e<t.length;e++){var n=t[e],i=d[n.id];if(i){i.refs++;for(var r=0;r<i.parts.length;r++)i.parts[r](n.parts[r]);for(;r<n.parts.length;r++)i.parts.push(s(n.parts[r]));i.parts.length>n.parts.length&&(i.parts.length=n.parts.length)}else{for(var a=[],r=0;r<n.parts.length;r++)a.push(s(n.parts[r]));d[n.id]={id:n.id,refs:1,parts:a}}}}function r(){var t=document.createElement("style");return t.type="text/css",l.appendChild(t),t}function s(t){var e,n,i=document.querySelector("style["+v+'~="'+t.id+'"]');if(i){if(p)return A;i.parentNode.removeChild(i)}if(m){var s=f++;i=h||(h=r()),e=a.bind(null,i,s,!1),n=a.bind(null,i,s,!0)}else i=r(),e=o.bind(null,i),n=function(){i.parentNode.removeChild(i)};return e(t),function(i){if(i){if(i.css===t.css&&i.media===t.media&&i.sourceMap===t.sourceMap)return;e(t=i)}else n()}}function a(t,e,n,i){var r=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=y(e,r);else{var s=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(s,a[e]):t.appendChild(s)}}function o(t,e){var n=e.css,i=e.media,r=e.sourceMap;if(i&&t.setAttribute("media",i),g.ssrId&&t.setAttribute(v,e.id),r&&(n+="\n/*# sourceURL="+r.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n(10),d={},l=u&&(document.head||document.getElementsByTagName("head")[0]),h=null,f=0,p=!1,A=function(){},g=null,v="data-vue-ssr-id",m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n,r){p=n,g=r||{};var s=c(t,e);return i(s),function(e){for(var n=[],r=0;r<s.length;r++){var a=s[r],o=d[a.id];o.refs--,n.push(o)}e?(s=c(t,e),i(s)):s=[];for(var r=0;r<n.length;r++){var o=n[r];if(0===o.refs){for(var u=0;u<o.parts.length;u++)o.parts[u]();delete d[o.id]}}}};var y=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var n=[],i={},r=0;r<e.length;r++){var s=e[r],a=s[0],o=s[1],u=s[2],c=s[3],d={id:t+":"+r,css:o,media:u,sourceMap:c};i[a]?i[a].parts.push(d):n.push(i[a]={id:a,parts:[d]})}return n}}])});