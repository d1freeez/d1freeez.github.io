<template>
  <div>
    <div class="course">
      <div class="container">
        <div class="_title">
          <p>Поиск: {{ this.$route.params.id }}</p>
        </div>

        <div class="_list" v-if="course.length > 0">
          <Card v-for="(item, index) in course" :key="index" :data="item" />
        </div>

        <div v-else>
          <h3>Нет курсов</h3>
        </div>
      </div>
      <div class="container">
        <div class="_title">
          <p>Автор</p>
        </div>

        <div class="_list" v-if="authors.length > 0">
          <CardAuthor v-for="(item, index) in authors" :key="index" :author="item" />
        </div>

        <div v-else>
          <h3>Нет авторов</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from '~/components/card/course'
  import CardAuthor from '~/components/card/author'
  import {
    mapGetters
  } from 'vuex'

  export default {
    layout: 'main',
    name: "search_category",
    components: {
      Card,
      CardAuthor
    },

    mounted() {
      this.$store.dispatch('search_course/setSearch', this.$route.params.id);
    },

    computed: {
      ...mapGetters({
        course: 'search_course/courses',
        authors: 'search_course/authors'
      })
    },
  }
</script>

<style scoped lang="scss">
  .course {
    padding-bottom: 100px;

    .container {
      margin-bottom: 50px;
    }

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
