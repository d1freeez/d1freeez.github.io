<template>
  <div>
    <div>
      <HeaderAuth></HeaderAuth>
      <div class="content"
           :class="auth==true?'content-auth':'content-notauthed'"
           :style="`min-height: calc(100vh - ${this.$route.path === '' || this.$route.path === '/' ? '335' : '155'}px);
    padding-top: ${this.$route.path === '' || this.$route.path === '/' || !this.$store.getters['auth/hasToken'] ? '60' : '80'}px;
    `"
      >
        <Nuxt/>
      </div>
      <Footer :main="this.$route.path === '' || this.$route.path === '/'"/>
    </div>
  </div>
</template>

<script>

import Header from '@/components/header/header'
import HeaderAuth from '@/components/header/course-header'
import Footer from '~/components/footer'
import { mapGetters } from 'vuex'

export default {
  created () {
    this.$fb.enable()
    if (this.$store.getters['auth/hasToken']) {
      this.$axios.setHeader('Authorization', `Bearer ${this.$store.getters['auth/token']}`)
    }
  },
  mounted () {
    this.$fb.enable()
    if (this.$store.getters['auth/hasToken']) {
      this.$axios.setHeader('Authorization', `Bearer ${this.$store.getters['auth/token']}`)
    }
  },
  components: {
    Header,
    HeaderAuth,
    Footer
  },
  computed: {
    ...mapGetters({
      auth: 'auth/hasToken'
    })
  },
}
</script>

<style scoped lang="scss">
.content {
  min-height: calc(100vh - 335px);
}

@media screen and (max-width: 550px) {
  .content {
    //padding-top: 25px !important;
  }
}
</style>
