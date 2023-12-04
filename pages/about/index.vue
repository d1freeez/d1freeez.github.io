<template>
  <div>
    <div class="about">
      <img src="@/assets/images/about-right-absolute.svg" alt="" class="about_left_absolute">
      <div class="container">
        <div class="_title"><p>О компании</p></div>
        <div class="about_block">
          <div class="about_block_content">
            <h1>OILAMA</h1>
            <p>Задача организации, в особенности же сложившаяся структура организации способствует подготовки и
              реализации
              существенных финансовых и административных условий. С другой стороны новая модель организационной
              деятельности способствует подготовки и реализации позиций, занимаемых участниками в отношении поставленных
              задач. Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское
              обеспечение
              нашей деятельности обеспечивает широкому кругу (специалистов) участие в формировании модели развития.
              Равным
              образом начало повседневной работы по формированию позиции представляет собой интересный эксперимент
              проверки дальнейших направлений развития. С другой стороны рамки и место обучения кадров позволяет оценить
              значение соответствующий условий активизации. Идейные соображения высшего порядка, а также постоянное
              информационно-пропагандистское обеспечение нашей деятельности требуют определения и уточнения систем
              массового участия.
            </p>
          </div>
          <div class="about_block_image">
            <img src="@/assets/images/about-right.png" alt="">
          </div>
        </div>
        <img src="@/assets/images/about-bg.svg" class="about_right_absolute">

      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'about',
  layout: 'main',
  components: {},
  data () {
    return {}
  },
  created () {
    this.getCategories()
    this.getNews()
  },
  methods: {
    getNews () {
      this.$axios
        .get(`/news-categories`, {
          headers: {
            Authorization: process.env.defaultToken
          }
        })
        .then((response) => {
          this.categories = response.data.data.categories
        })
    },
    getCategories () {

    }
  },
  computed: {},
}
</script>

<style scoped lang="scss">
.about {
  padding-top: 70px;
  padding-bottom: 100px;
  position: relative;

  &_left {
    &_absolute {
      position: absolute;
      top: 20%;
      left: 0;
      width: 150px;
    }
  }

  &_right {
    &_absolute {
      position: absolute;
      top: 10%;
      right: 0;
    }
  }

  &_block {
    display: grid;
    grid-template-columns: 55% 45%;
    grid-gap: 30px;

    &_image {
      img {
        width: 100%;
      }
    }

    &_content {
      p {
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 24px;
        color: #000000;
      }
    }
  }

  ._title {

    p {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      color: #0B132A;
      margin-bottom: 25px;
      margin-top: 45px;
    }
  }
}

@media screen and (max-width: 550px) {
  .about {
    padding-top: 140px;
  }
  .about_block {
    display: block;
  }
  .course ._list {
    grid-template-columns: 1fr 1fr;
  }
  .about_left_absolute {
    display: none;
  }
  .about_right_absolute {
    display: none;
  }
}
</style>
