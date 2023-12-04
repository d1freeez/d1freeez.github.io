<template>
  <div>
    <div class="all container">
      <div class="skills">
        <div class="_title"><p>Мои избранные</p></div>
        <div class="_list" v-if="!!course">
          <Card v-for="(item, index) in course" :key="index" :data="item"/>
        </div>
        <div v-else>
          <h3>Нет курсов</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './../../components/card/course'
import { mapGetters } from 'vuex'

export default {
  name: 'my-course-page',
  data () {
    return {
      type: 0
    }
  },
  components: {
    Card
  },

  created () {
    this.$store.dispatch('my_course/setFavoritesCourse', this.type)
  },

  methods: {
  },

  computed: {
    ...mapGetters({
      course: 'my_course/favorites',
    })
  },
}
</script>

<style scoped lang="scss">
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

.skills {
  padding-bottom: 200px;
}

._list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
}


@media screen and (max-width: 550px) {
  ._list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
