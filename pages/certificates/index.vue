<template>
  <div class="certificates_page">
    <h3 class="_title">Мои сертификаты</h3>

    <template v-if="data">
      <div class="_list" v-if="data.length">
        <div class="_card" v-for="(item, index) in data" :key="index" v-if="item.course">
          <p>{{ item.course.name }}</p>
          <a :href="item.path" target="_blank"
            ><img src="@/assets/images/icons/download.svg" alt=""
          /></a>
        </div>
      </div>
      <div v-else>
        <h3>Нет сертификатов</h3>
      </div>
    </template>

    <template v-else>
      <a-spin size="large" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'McvCertificates',
  mounted() {
    this.$store.dispatch('certificate/set')
  },
  computed: {
    ...mapGetters({
      data: 'certificate/data',
    }),
  },
}
</script>

<style scoped lang="scss">
.certificates_page {
  padding: 30px 30px 30px 100px;

  ._title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    color: #0b132a;
    margin: 0 0 25px;
  }

  ._card {
    margin-bottom: 20px;
    background: #ffffff;
    box-shadow: 0px 24px 32px rgba(0, 0, 0, 0.04),
      0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04),
      0px 0px 1px rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    padding: 15px;
    display: grid;
    grid-template-columns: 1fr 15px;
    grid-gap: 30px;

    p {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;
      color: #28456e;
    }

    img {
      width: 15px;
      height: 15px;
      object-fit: contain;
    }
  }
}

@media screen and (max-width: 550px) {
  .certificates_page {
    padding: 30px;
  }
}
</style>
