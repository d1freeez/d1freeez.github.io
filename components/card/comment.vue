<template>
  <div class="comment-card">
    <div class="_head">
      <img v-if="data['user']['respond_file_path'] === null" src="@/assets/images/card.png" alt="">
      <img v-else :src="data['user']['respond_file_path']" alt="">
      <div class="__name" v-if="data['user']">
        <p>{{data['user']['name']}}</p>
        <span>{{data['created_at'].split('T')[0]}}</span>
      </div>
    </div>
    <div class="_comment">
      <p v-html="data['review']"></p>
    </div>
  </div>
</template>

<script>
export default {
name: "comment-card",
  props: ['data']
}
</script>

<style scoped lang="scss">
.comment-card{
  height: 230px;
  padding: 30px;
  border: 2px solid #DDDDDD;
  box-sizing: border-box;
  border-radius: 10px;
  transition: all .3s;
  cursor: pointer;

  &:hover{
    border-color: #F53838;
  }

  ._head{
    display: grid;
    grid-template-columns: 50px 1fr;
    grid-gap: 20px;
    margin-bottom: 20px;
    align-items: center;

    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }

    .__name{
      p{
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        color: #0B132A;
        line-height: 20px;
      }

      span{
        display: block;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 30px;
        color: #4F5665;
      }
    }
  }

  ._comment{
    max-height: 100px;
    overflow: hidden;
    overflow-y: scroll;

    p{
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      color: #0B132A;
    }
  }
}

</style>
