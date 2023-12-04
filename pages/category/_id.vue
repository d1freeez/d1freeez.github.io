<template>
  <div>
    <div class="course">
      <div class="container">
        <div class="_title"><p>{{ category['name'] }}</p></div>

        <template v-if="category.child_categories.length>=1">
          <courses :data="category.child_categories"/>
        </template>
        <div class="_list" v-if="course.length > 0">
          <Card v-for="(item, index) in course" :key="index" :data="item"/>
        </div>
        <!---->
        <div v-else>
          <h3>Нет курсов</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/card/course'
import { mapGetters } from 'vuex'
import Courses from './../../components/carousel/courses'

export default {
  name: 'id_category',
  layout: 'main',
  components: {
    Card,
    Courses
  },
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('category/setCourseByCategory', this.$route.params.id)
    this.$store.dispatch('category/setCategoryDetail', this.$route.params.id)
  },

  computed: {
    ...mapGetters({
      course: 'category/data_by_category',
      category: 'category/data_detail',
    })
  },
}
</script>

<style scoped lang="scss">
.course {
  padding-bottom: 100px;

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
      color: #0B132A;
      margin-bottom: 25px;
      margin-top: 45px;
    }
  }
}

@media screen and (max-width: 550px) {
  .course ._list {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
