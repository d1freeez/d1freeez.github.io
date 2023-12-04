<template>
  <div class="view-category">
    <div class="container">
      <div class="title">
        <p>Категории</p>
      </div>
      <div class="category" v-if="category">
        <CategoryCard v-for="(item, index) in category" :data="item" :key="index" :child="true"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CategoryCard from '@/components/card/category'

export default {
  name: 'index',
  layout: 'main',

  created () {
    if(this.$route.query.id){
      this.$store.dispatch('category/setById', this.$route.query.id );
    }else{
      this.$store.dispatch('category/set');
    }
  },

  computed: {
    ...mapGetters({
      category: 'category/data_by_id',
    })
  },

  components: {
    CategoryCard
  },
}
</script>

<style scoped lang="scss">
.view-category{
  padding-top: 80px;
  padding-bottom: 180px;
}
.category{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  padding-bottom: 180px;
}

@media screen and (max-width: 550px) {
  .category{
    grid-template-columns: 1fr 1fr;
  }
}
</style>
