<template>
  <div class="carousel" v-if="data.length > 0">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item, index) in data" :key="index"><Card :data="item"/></swiper-slide>

      <div class="button-prev"slot="button-prev">
        <a-icon @click="onPrev" type="arrow-left" />
      </div>
      <div class="button-next" slot="button-next">
        <a-icon @click="onNext" type="arrow-right" />
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import Card from './../card/course'

import {Swiper as SwiperClass, Pagination, Navigation} from 'vue-awesome-swiper'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'

SwiperClass.use([Pagination, Navigation])
const {directive} = getAwesomeSwiper(SwiperClass)

export default {
  name: 'carousel-course',

  props: ['data'],

  data(){
    return {
      page: 0,
      swiperOptions: {
        spaceBetween: 30,
        navigation: {
          nextEl: '.button-next',
          prevEl: '.button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
        },
        breakpoints: {
          700: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          300: {
            slidesPerView: 1,
            spaceBetween: 20,
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
<style scoped>
.ant-carousel >>> .slick-dots {
  bottom: -10px;
  text-align: left;
  left: 50px;
}

.ant-carousel >>> .slick-dots button{
  margin-right: 15px;
  background: #DDE0E4;
  width: 15px;
  height: 15px;
  border-radius: 50px;
}

.ant-carousel >>> .slick-dots li{
  margin: 0;
}

.ant-carousel >>> .slick-dots li.slick-active button{
  width: 45px;
  background: #F53838;
}

._list{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
}


.ant-carousel >>> .custom-slick-arrow {
  width: 60px;
  height: 60px;
  font-size: 25px;
  border: 2px solid #F53838;
  color: #F53838;
  border-radius: 50%;
  display: flex !important;
  align-items: center;
  justify-content: center;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  /*opacity: 0.5;*/
  transition: all .3s;
  background: #F53838;
  color: #fff;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
