<template>
  <div v-if="data">
      <div class="category-card"  @click="onLink(data['id'])">
        <div class="_img">
          <img v-if="data['respond_file_path'] === null" src="@/assets/images/card.png" alt="">
          <img v-else :src="data['respond_file_path']" alt="">
        </div>
        <div class="_title">
          <p>{{data['name'] || '...'}}</p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'category-card',
  props:['data', 'child'],
  methods:{
    onLink(id){
      if(!this.child) this.$router.push(`/category?id=${id}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.category-card{
  cursor: pointer;
  width: 100%;

  &:hover{
    p:after{
      width: 100%;
    }
  }

  ._img{
    width: 100%;
    height: 160px;
    position: relative;
    margin-bottom: 20px;
    border-radius: 9px;
    overflow: hidden;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:after{
      content: '';
      background: linear-gradient(0deg, #0B132A 0%, rgba(11, 19, 42, 0) 73.87%);
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
    }
  }

  p{
    position: relative;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 25px;
    color: #0B132A;
    padding-top: 15px;

    &:after{
      content: '';
      width: 60px;
      height: 3px;
      background: #F53838;
      border-radius: 58px;
      position: absolute;
      top: 0;
      left: 0;
      transition: all .3s;
    }
  }
}
</style>
