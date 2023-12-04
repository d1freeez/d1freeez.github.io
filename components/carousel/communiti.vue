<template>
  <div class="carousel">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item, index) in data" :key="index"><Card :data="item"/></swiper-slide>

      <div class="button-prev"slot="button-prev">
        <a-icon @click="onPrev" type="arrow-left" />
      </div>
      <div class="button-next" slot="button-next">
        <a-icon @click="onNext" type="arrow-right" />
      </div>
    </swiper>
  </div>
</template>
<script>
import Card from './../card/communiti'

import {Swiper as SwiperClass, Navigation} from 'vue-awesome-swiper'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'

SwiperClass.use([Navigation])
const {directive} = getAwesomeSwiper(SwiperClass)


export default {
  name: 'carousel-communiti',

  props: ['data'],

  data(){
    return {
      page: 0,
      swiperOptions: {
        effect: 'fade',
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: 30,
        navigation: {
          nextEl: '.button-next',
          prevEl: '.button-prev'
        },
        breakpoints: {
          700: {
            slidesPerView: 4,
            spaceBetween: 20
          },
          300: {
            slidesPerView: 1,
            spaceBetween: 20
          }
        }
      }
    }
  },

  directives: {
    swiper: directive
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },

  mounted() {
    this.swiper.slideTo(0, 1000, false)
  },

  components:{
    Card,
  },
  methods: {
    onNext() {
      this.swiper.slideNext();
    },
    onPrev() {
      this.swiper.slidePrev();
    }
  },
};

</script>
