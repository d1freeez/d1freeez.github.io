<template>
  <div class="carousel">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <div class="_list">
          <div class="_card" v-for="(item, index) in data" @click="onLink(item['id'])">
            <img v-if="item['respond_file_path'] === null" src="@/assets/images/card.png" alt="">
            <img v-else :src='item["respond_file_path"]' alt="images">
            <p>{{ item['name'] || '...' }}</p>
          </div>
        </div>
      </swiper-slide>
      <div class="button-prev" slot="button-prev">
        <a-icon @click="onPrev" type="arrow-left"/>
      </div>
      <div class="button-next" slot="button-next">
        <a-icon @click="onNext" type="arrow-right"/>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import Card from './../card/comment'
import {Swiper as SwiperClass, Pagination, Navigation} from 'vue-awesome-swiper'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'

SwiperClass.use([Pagination, Navigation])
const { directive } = getAwesomeSwiper(SwiperClass)

export default {
  name: 'carousel-skills',

  props: ['data'],

  data () {
    return {
      page: 0,
      swiperOptions: {
        effect: 'fade',
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 30,
        navigation: {
          nextEl: '.button-next',
          prevEl: '.button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },

  directives: {
    swiper: directive
  },

  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },

  mounted () {
    this.swiper.slideTo(0, 1000, false)
  },

  components: {
    Card,
  },
  methods: {
    onNext () {
      this.swiper.slideNext()
    },
    onPrev () {
      this.swiper.slidePrev()
    },
    onLink (id) {
      this.$router.push(`/category/${id}`)
    }
  },
}
</script>
<style scoped>
.carousel{
  margin-bottom: 20px;
}
._list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
}

._list ._card:first-child {
  grid-row: 1 / span 2;
  height: 100%;
}

._card {
  width: 100%;
  height: 210px;
  position: relative;
  padding: 25px;
  border-radius: 13px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
}

._card:hover p {
  color: #F53838;
}

._card img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

._card p {
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #FFFFFF;
  position: relative;
  z-index: 9;
  transition: all .3s
}

._card:after {
  content: '';
  background: linear-gradient(0deg, #0B132A 0%, rgba(11, 19, 42, 0) 73.87%);
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
}


@media screen and (max-width: 550px) {
  ._list {
    grid-template-columns: 1fr;
  }

  ._list ._card {
    height: 150px;
  }

  ._list ._card:first-child {
    grid-row: auto;
    height: 150px;
  }
}
</style>
