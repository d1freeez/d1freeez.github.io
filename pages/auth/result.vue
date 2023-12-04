<template>
  <div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      user: ''
    }
  },
  methods: {
    redirect (route) {
      this.$router.push(route)
    },
  },
  mounted () {
    if (this.$route.query.token != 'underfined' && this.$route.query.token != null) {
      localStorage.clear()
      this.$store.dispatch('auth/setTokenLocal', this.$route.query.token)
      this.$store.dispatch('auth/setUser')
      this.$notification.success({
        message: 'Авторизация',
        description: 'Вы успешно авторизовались',
      })
      this.redirect('/')
    }
  },
}
</script>

