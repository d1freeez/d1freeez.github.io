<template>
  <div class="course-card" @click="onLink(data['id'])">
    <div class="_img">
      <div class="__author" v-if="data.user">
        <img class="author" :src="data.user['respond_file_path']" alt="">
      </div>
      <img v-if="data['respond_file_path']" :src="data['respond_file_path']" alt="">
      <img v-else src="@/assets/images/card.png" alt="">
    </div>
    <div class="_content">
      <div class="_info">
        <h4>{{ data['name'] || '...' }}</h4>
        <p v-if="data['user']">{{ data['user']['name'] || '...' }}</p>
      </div>
      <div class="_star">
        <a-rate v-model="+data['evaluations_average']" disabled/>
        <p>{{ parseInt(data['evaluations_average']) || 0 }}</p>
      </div>
      <div class="_type" v-if="data['has_discount']" :class="data['has_discount']?'_discount':''">
        <p> {{
            data['discount_price'] === null || data['discount_price'] === 0 ? 'Бесплатный курс' : parseInt(data['discount_price']) + ' ₸'
          }}</p>
      </div>
      <div class="_type" :class="data['has_discount']?'_discount_disabled':''">
        <p> {{
            data['price'] === null || data['price'] === 0 ? 'Бесплатный курс' : parseInt(data['price']) + ' ₸'
          }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'course-card',
  props: ['data'],
  data () {
    return {
      rate: 3
    }
  },

  methods: {
    onLink (id) {
      localStorage.setItem('course_id', id),
        this.$router.push(`/course/${id}`)
    }
  }
}
</script>

<style scoped lang="scss">
.course-card {
  background: #FFFFFF;
  //box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
  border-radius: 13px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid;
  border-color: rgba(0,0,0,0.12);

  ._img {
    position: relative;
    height: 160px;
    width: 100%;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .__author {
      position: absolute;
      top: 15px;
      left: 25px;
      border-radius: 50%;
      border: 2px solid #fff;
      width: 60px;
      height: 60px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  ._content {
    padding: 20px;
  }

  ._type {
    height: 35px;
    background: #FFC107;
    border-radius: 9px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;

    p {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      color: #0B132A;
    }
  }

  ._discount {
    margin-bottom: 5px;
    background: #52c41a;

    p {
      color: #fff;
    }

    &_disabled {
      text-decoration: line-through;
    }
  }

  ._star {
    display: flex;
    align-items: center;
    padding: 15px 0;

    .ant-rate-star:not(:last-child) {
      margin-right: 5px;
    }

    p {
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      color: #0B132A;
      margin-left: 10px;
      margin-top: 5px;
    }
  }

  ._info {
    h4 {
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 25px;
      color: #0B132A;
      margin-bottom: 5px;
      font-family: Montserrat;
    }

    p {
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 25px;
      color: #0B132A;
    }
  }
}

</style>
