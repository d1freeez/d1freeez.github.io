<template>
  <div>
    <div class="all container">
      <div class="skills">
        <div class="_title"><p>Обзор тем и навыков</p></div>
        <Skill v-if="skills.length > 0" :data="skills"/>
      </div>
      <div class="course">
        <div class="_title"><p>Доступные курсы</p></div>
        <div class="_list">
          <Card v-for="(item, index) in course.data" :key="index" :data="item"/>
        </div>
        <pagination :data="course" @pagination-change-page="getResults" :limit="limit"
                    show-disabled>
          <span slot="prev-nav"><svg width="9" height="12" viewBox="0 0 9 12" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
<path d="M8.16016 1.41L3.58016 6L8.16016 10.59L6.75016 12L0.750156 6L6.75016 0L8.16016 1.41Z" fill="#C4CDD5"/>
</svg>
</span>
          <span slot="next-nav"><svg width="9" height="12" viewBox="0 0 9 12" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
<path d="M0.839844 1.41L5.41984 6L0.839844 10.59L2.24984 12L8.24984 6L2.24984 0L0.839844 1.41Z" fill="#C4CDD5"/>
</svg>
</span>
        </pagination>
        <!--        <infinite-loading @infinite="infiniteHandler"> <div slot="no-more"></div> </infinite-loading>-->
        <!--        <Course  v-if="course.length > 0" :data="course"/>-->
      </div>
      <!--      <div class="course">-->
      <!--        <div class="_title"><p>Актуальные курсы</p></div>-->
      <!--        <Course  v-if="course.length > 0" :data="course"/>-->
      <!--      </div>-->
      <!--      <div class="top-course">-->
      <!--        <div class="_title"><p>Самые популярные сертификаты</p></div>-->
      <!--        <Course  v-if="course.length > 0" :data="course"/>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import VueLazyImage from "vue-lazy-images";
import Skill from './../../components/carousel/skills'
import Course from './../../components/carousel/course'
import Card from './../../components/card/course'
import {mapGetters} from 'vuex'
// import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'index',
  layout: 'main',
  data() {
    return {
      page: 1,
      limit: 1,
      course: [],
    }
  },
  components: {
    Skill,
    Course,
    Card,
  },

  created() {
    this.getResults();
    // this.$store.commit('course/setCourseStart')
    // this.$store.dispatch('course/setCourseLaravel', {page: this.page})
    this.$store.dispatch('category/setArray')
  },

  computed: {
    ...mapGetters({
      // course: 'course/dataLaravel',
      isLoading: 'course/isLoading',
      skills: 'category/setArray',
    }),
  },
  methods: {
    getResults(page) {
      if (typeof page === 'undefined') {
        page = 1;
      }
      this.$axios.get('/courses', {
        params: {page: page},
        headers: {
          Authorization: process.env.defaultToken,
        },
      }).then(response => {
        console.log(response.data);
        this.course = response.data.data;
      }).catch(error => {

      })

    },
  }
}
</script>

<style scoped lang="scss">
._list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
}

._title {
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    color: #0b132a;
    margin-bottom: 25px;
    margin-top: 45px;
  }
}

.skills {
  padding-bottom: 80px;
}

.course {
  padding-bottom: 180px;
}

.top-course {
  padding-bottom: 300px;
}

@media screen and (max-width: 550px) {
  .skills {
    padding-bottom: 30px;
  }

  ._list {
    grid-template-columns: 1fr 1fr;
  }
}

</style>
