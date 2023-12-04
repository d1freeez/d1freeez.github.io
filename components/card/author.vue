<template>
  <div class="_card" v-if="!!author">
    <div class="_img">
      <img
        v-if="author['respond_file_path'] === null"
        src="@/assets/images/card.png"
        alt=""
      />
      <img v-else :src="author['respond_file_path']" alt="" />
    </div>
    <div class="_info">
      <NuxtLink :to="'/teacher/' + author['id']">
        <p>{{ author['name'] }}</p>
      </NuxtLink>
      <div class="teacher-course">
        <img src="@/assets/images/icons/certificate.svg" alt="" />
        <p>{{ author['courses_count'] }} <span>курсов</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'authorCard',
  props: {
    author: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
._card {
  display: grid;
  grid-template-columns: 125px 1fr;
  grid-gap: 30px;
  align-items: center;
  margin-bottom: 30px;
  box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
  padding: 15px;
  border-radius: 10px;

  ._img {
    img {
      min-width: 125px;
      width: 125px;
      height: 125px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  ._info {
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      color: #0b132a;
      margin-bottom: 5px;
    }

    a p {
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        color: #f53838;
      }
    }

    span {
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 20px;
      color: rgba(11, 19, 42, 0.6);
    }

    .teacher-course {
      display: flex;
      align-items: center;
      margin-top: 5px;

      img {
        width: 20px;
        margin-right: 10px;
        margin-right: 10px;
      }

      p {
        margin-bottom: 0;
        font-size: 16px;
      }
    }
  }
}
</style>
