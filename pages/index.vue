<template>
  <div class="home">
    <div class="head">
      <div class="container">
        <div class="head-wrapper">
          <div class="head-logo"></div>
          <div class="head-info">
            <h3>Образовательный маркетплейс</h3>
            <p>Получи прямо сейчас доступ к онлайн курсам с еженедельным обновлением</p>
            <div class="head-search">
              <Search @input="(value) => {search = value}"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="title">
        <p>Популярные курсы</p>
        <RouterLink to="/course">Смотреть все курсы
          <a-icon type="right"></a-icon>
        </RouterLink>
      </div>

      <div class="course" v-if="course.length > 0">
        <CourseCard v-for="(item, index) in 8" :data="course[index]" :key="index"/>
      </div>

      <div class="title">
        <p>Обзор тем и навыков</p>
      </div>

      <div class="skills">
        <SkillCarousel v-if="skills.length > 0" :data="skills"/>
      </div>

      <div class="title">
        <p>Отзывы <span v-if="comment.length === 0">Отзывов нет</span></p>
      </div>

      <div class="comment" v-if="comment.length > 0">
        <Comment :data="comment"/>
      </div>
    </div>
    <div class="teaching-app">
      <div class="container">
        <div class="teaching-app_wrapper">
          <img src="./../assets/images/teaching_app.png" class="back_img">
          <div class="teaching-app_title">
            <h3>Вы эксперт?</h3>
            <p>Преподавайте на Oilama</p>
            <button class="btn-red" @click="onTeacherApp">Отправить заявку</button>
          </div>
        </div>
      </div>
    </div>
    <div class="callback">
      <div class="container">
        <div class="callback-block">
          <div class="_info">
            <p>Остались вопросы?</p>
            <span>Оставь заявку и получи подробную консультацию</span>
          </div>
          <div class="_form">
            <div class="input">
              <p>Ваше имя</p>
              <input type="text" placeholder="Имя" v-model="name">
            </div>
            <div class="input">
              <p>Ваш номер</p>
              <the-mask type="tel" mask="+7(###)###-##-##" placeholder="Телефон" v-model="phone"/>
            </div>
            <button class="btn-red" @click="onSubmit">Отправить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryCard from '~/components/card/category'
import CourseCard from '~/components/card/course'
import Search from '~/components/input/search'
import Comment from '~/components/carousel/comment'
import Communiti from '~/components/carousel/communiti'
import SkillCarousel from '~/components/carousel/skills'
import {
  mapGetters
} from 'vuex'

export default {
  layout: 'main',

  data () {
    return {
      name: '',
      phone: '',
      search: '',
      head_active: 1,
      head_text: ['Для дизайнеров', 'Для личного развития', 'Для маркетологов', 'Для предпринимателей',
        'Для программистов', 'Для финансистов', 'Для фотографов', 'Для изучения иностранных языков'
      ],
      swiperOptionsMainPage: {
        effect: 'fade',
        slidesPerView: 5,
        slidesPerGroup: 1,
        spaceBetween: 30,
        breakpoints: {
          700: {
            slidesPerView: 5,
            spaceBetween: 20
          },
          300: {
            slidesPerView: 2,
            spaceBetween: 20
          }
        }
      }
    }
  },

  mounted () {
    setInterval(() => {
      if (this.head_active === 8) {
        this.head_active = 1
      } else {
        this.head_active++
      }
    }, 3000)
  },

  created () {
    this.$store.dispatch('category/set')
    this.$store.dispatch('comment/set')
    this.$store.dispatch('community/set')
    this.$store.dispatch('course/setCourse', { page: 1 })
    this.$store.dispatch('category/setArray')
  },

  computed: {
    ...mapGetters({
      category: 'category/data',
      comment: 'comment/data',
      community: 'community/data',
      course: 'course/data',
      skills: 'category/setArray',
    })
  },

  components: {
    CategoryCard,
    Search,
    Comment,
    Communiti,
    CourseCard,
    SkillCarousel
  },

  methods: {
    onSearch () {
      this.$router.push(`course/search?search=${this.search}`)
    },
    onTeacherApp () {
      this.$router.push('/teacher/application')
    },
    onSubmit () {
      let data = {
        name: this.name,
        phone: '+7' + this.phone
      }

      this.$axios.$post('feedbacks', data, {
        headers: {
          Authorization: process.env.defaultToken
        }
      }).then((response) => {
        this.$notification.success({
          message: response.message,
        })

        this.name = ''
        this.phone = ''
      })
    }
  }
}
</script>
<style>

.content {
  padding-top: 0px !important;
}

@media screen and (max-width: 550px) {
  .content {
    padding-top: 80px !important;
  }

  .content-notauthed {
    padding-top: 0px !important;
  }
}

</style>
<style scoped lang="scss">
.home {
  background: url("../assets/images/main_back.png") no-repeat;
  background-position-y: 210px;
  background-size: cover;
}

.skills {
  padding-bottom: 70px;
}

.teaching-app {
  .container {
    padding-bottom: 70px;
    align-items: center;
  }

  .back_img {
    width: 550px;
    height: auto;
  }

  &_wrapper {
    display: grid;
    grid-template-columns: 550px 1fr;
    grid-gap: 50px;
    align-items: center;
  }

  &_title {
    h3 {
      font-weight: bold;
      font-size: 35px;
      line-height: 44px;
    }

    p {
      font-weight: normal;
      font-size: 20px;
      line-height: 30px;
      padding-bottom: 30px;
    }
  }
}

.head {
  margin: auto;
  position: relative;

  .container {
    padding: 150px 0 70px;
    align-items: center;
  }

  &-logo {
    margin-left: 90px;
    margin-right: 75px;
    margin-top: -44px;
    margin-bottom: 28px;
    width: 335px;
    background: url('./../assets/images/header_logo.png') center;
    background-size: cover;
  }

  &-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    min-height: 305px;
    background: url('./../assets/images/header_back.png');
    background-size: cover;
    border-radius: 10px;
  }

  //&:after{
  //  content: '';
  //  width: 150px;
  //  height: 1300px;
  //  position: absolute;
  //  top: 90px;
  //  left: 0;
  //  background: url('./../assets/images/back_dot.png') center;
  //  background-size: contain;
  //}

  .btn-red {
    margin-top: 25px;
  }

  &-search {
    max-width: 470px;
  }

  .head-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h3 {
      font-style: normal;
      font-weight: bold;
      font-size: 30px;
      line-height: 30px;
      color: #ffffff;
      margin-bottom: 10px;
      max-width: 280px;
    }

    p {
      font-style: normal;
      font-weight: normal;
      max-width: 405px;
      font-size: 18px;
      line-height: 22px;
      color: #ffffff;
      margin-bottom: 28px;
    }
  }

  .head-img {
    position: relative;
    height: 350px;

    p {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      width: 80%;
      height: 100%;
      font-style: normal;
      font-weight: bold;
      font-size: 30px;
      line-height: 36px;
      text-align: center;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 50px 100px;
      background: linear-gradient(0deg, #0B132A 0%, rgba(11, 19, 42, 0) 73.87%);
      filter: drop-shadow(0px 16px 51px rgba(0, 0, 0, 0.12));
      border-radius: 13px;
    }

    @mixin on-circle($item-count, $circle-size, $item-size) {
      position: relative;
      width: $circle-size;
      height: $circle-size;
      border-radius: 50%;
      padding: 0;
      list-style: none;

      > * {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -($item-size / 2);
        width: $item-size;
        height: $item-size;

        $angle: (360 / $item-count);
        $rot: 0;

        @for $i from 1 through $item-count {
          &:nth-of-type(#{$i}) {
            transform: rotate($rot * 1deg) translate($circle-size / 2) rotate($rot * -1deg);
          }

          $rot: $rot+$angle;
        }
      }
    }

    ._icons {
      @include on-circle($item-count: 8, $circle-size: 450px, $item-size: 6em);

      position: absolute;
      top: 0;
      right: 5px;
      width: 100%;
      height: 100%;

      li {
        background: #FFFFFF;
        box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
        border-radius: 15px;
        width: 95px;
        height: 95px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        cursor: pointer;

        &.active {
          top: calc(50% - 15px);
          left: calc(50% - 15px);
          width: 125px;
          height: 125px;
        }
      }

      img {
        display: block;
        width: 80%;
        height: 80%;
        object-fit: contain;
      }
    }

    > img {
      width: 80%;
      height: 100%;
      object-fit: cover;
      border-radius: 13px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }

    .__light {
      img {
        position: absolute;
        box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);

        &:nth-child(1) {
          width: 200px;
          left: 50px;
          top: -100px;
        }

        &:nth-child(2) {
          width: 150px;
          right: 100px;
          top: -75px;
        }

        &:nth-child(3) {
          width: 130px;
          right: -50px;
          top: 75px;
        }

        &:nth-child(4) {
          width: 170px;
          right: -50px;
          bottom: 0;
        }

        &:nth-child(5) {
          width: 135px;
          right: 150px;
          bottom: -50px;
        }

        &:nth-child(6) {
          width: 90px;
          right: 300px;
          bottom: 20px;
        }

        &:nth-child(7) {
          width: 170px;
          left: -10px;
          bottom: 0;
        }

        &:nth-child(8) {
          width: 90px;
          left: 0;
          bottom: 50%;
        }
      }
    }
  }
}

.course {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  padding-bottom: 70px;
}

.type {
  padding-bottom: 240px;
  position: relative;

  &:after {
    content: '';
    width: 120%;
    height: 650px;
    background: url("./../assets/images/map.png");
    background-size: contain;
    position: absolute;
    background-repeat: no-repeat;
    background-position: center;
    top: -140px;
    left: -10%;
  }

  .swiper-slide {
    &:nth-child(2n) {
      ._card {
        background: #0B132A;
      }
    }
  }

  ._card {
    width: 100%;
    height: 150px;
    background: #F53838;
    box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 15px;
    position: relative;
    z-index: 9;
    cursor: pointer;

    img {
      height: 25px;
      margin-bottom: 10px;
    }

    p {
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      color: #FFFFFF;
    }
  }
}

.advantage {
  display: grid;
  grid-template-columns: 600px 1fr;
  grid-gap: 15px;
  margin-top: -25px;
  padding-bottom: 230px;
  align-items: center;

  ._info {
    h4 {
      font-style: normal;
      font-weight: 300;
      font-size: 18px;
      line-height: 28px;
      color: #0B132A;
      margin-bottom: 25px;
    }

    ul {
      li {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 25px;
        color: #0B132A;
        margin-bottom: 15px;
        padding-left: 30px;
        position: relative;
        list-style: none;
        display: flex;
        align-items: center;

        &:after {
          content: '';
          width: 20px;
          height: 20px;
          background-image: url("./../assets/images/icons/check_green.png");
          background-size: contain;
          position: absolute;
          left: 0;
          top: 2px;
        }
      }
    }
  }

  ._img {
    img {
      width: 100%;
    }
  }

  .ant-carousel > > > .slick-slide {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
  }
}

.comment {
  padding-bottom: 60px;
}

.communiti {
  padding-bottom: 90px;
  position: relative;

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: -50px;
    left: 0;
    background: url('./../assets/images/back_communiti.png') center no-repeat;
    background-size: cover;
  }
}

.callback-block {
  padding: 40px;
  background: #FFFFFF;
  box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  display: grid;
  grid-template-columns: 270px 1fr;
  grid-gap: 50px;
  height: 240px;
  margin-bottom: -120px;
  z-index: 8;
  position: relative;
  align-items: center;

  ._info {
    height: max-content;

    p {
      font-style: normal;
      font-weight: 500;
      font-size: 35px;
      line-height: 33px;
      color: #0B132A;
      margin-bottom: 10px;
    }

    span {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 30px;
      color: #4F5665;
    }
  }

  ._form {
    display: grid;
    grid-template-columns: 1fr 1fr 190px;
    grid-gap: 15px;
    align-items: flex-end;

    button {
      min-width: 100%;
    }
  }
}

@media screen and (max-width: 1400px) {
  .head {
    .container {
      padding-left: 100px;
      padding-right: 10px;
    }
  }

  .callback-block {
    grid-gap: 0;
  }
}

@media screen and (max-width: 550px) {
  .home {
    background: transparent;
  }

  .head {
    padding-top: 170px;
    margin-bottom: 30px;

    .head-info {
      grid-area: info;
      align-self: flex-start;
      height: 170px;
      padding: 0 15px;
    }

    .head-search {
      margin-top: 20px;
      margin-right: -150px;
    }

    .head-logo {
      grid-area: logo;
      margin: 0;
      margin-top: 45px;
      max-width: 120px;
      max-height: 110px;
    }

    .head-wrapper {
      grid-template-areas: "info logo";
      padding: 20px 30px;
    }

    .container {
      padding: 15px;

      .head-info {
        height: auto;

        h3 {
          font-size: 30px;
          line-height: normal;
          margin-bottom: 10px;
        }

        p {
          font-size: 16px;
        }
      }

      .head-img {
        grid-row: 1 / span 1;
        transform: scale(0.9);
        margin-bottom: 60px;

        img {
          width: 100%;
          margin: auto;
        }
      }
    }
  }

  .course {
    grid-template-columns: repeat(2, 1fr);
  }

  .callback-block {
    grid-template-columns: 1fr;
    height: auto;

    ._form {
      grid-template-columns: 1fr;

      .btn-red {
        margin-top: 20px;
      }
    }
  }


  .teaching-app {
    .container {
      padding-bottom: 70px;
      align-items: center;
    }

    .back_img {
      display: none;
    }

    &_wrapper {
      grid-template-columns: 1fr;
    }

    &_title {
      h3 {
        font-size: 25px;
      }

      p {
        font-size: 16px;
      }
    }
  }
}
</style>
