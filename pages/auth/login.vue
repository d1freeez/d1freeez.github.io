<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="_title">
        <p>Войти</p>
      </div>
      <div class="input" :class="{'error': error.email}">
        <input type="text" placeholder="Email" v-model="email" @input="() => {
          email === '' ? error.email = true: error.email = false
        }"
        >
      </div>
      <div class="input" :class="{'error': error.password}">
        <input type="password" placeholder="Пароль" v-model="password" @input="() => {
          password === '' ? error.password = true: error.password = false
        }"
        >
        <template v-if="error.password && password.length < 6">
          <span>Пароль должен состоять из 6 символов</span>
        </template>
      </div>

      <div class="remember">
        <div class="checkbox">
          <input type="checkbox" name="remember" id="remember" v-model="remember">
          <label for="remember">Запомнить меня</label>
        </div>

        <p @click="redirect('/auth/reset')">Забыли пароль?</p>
      </div>

      <button class="btn-red" @click="onSubmit">Войти</button>

      <!--      <div class="or"><p>или</p></div>-->

      <!--      <button class="btn-white"><a-icon type="google" /> Войти с помощью Google</button>-->
      <!--      <button class="btn-white"><a-icon type="facebook" theme="filled" /> Войти с помощью Facebook</button>-->

      <div class="regis">
        <p>Нет аккаунта? <span @click="redirect('/auth/signup')">Зарегистрируйся</span></p>
      </div>
      <div class="regis link">
        <p><span @click="redirect('/teacher/application')">Преподавайте на Oilama</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  layout: 'main',
  data () {
    return {
      email: '',
      password: '',
      remember: false,
      error: {
        email: false,
        password: false
      }
    }
  },
  mounted () {
    if (this.$store.getters['auth/hasToken']) {
      this.$store.dispatch('auth/setUser')
      this.redirect('/')
    }
  },
  methods: {
    redirect (route) {
      this.$router.push(route)
    },

    async onSubmit () {
      if (this.email === '') {
        this.error.email = true
        return
      } else if (this.password === '' || this.password.length < 6) {
        this.error.password = true
        return
      }

      this.error.email = false
      this.error.password = false

      await this.$axios.post('auth/login', {
        'email': this.email,
        'password': this.password,
      }, {
        headers: {
          Authorization: process.env.defaultToken
        }
      }).then((response) => {
        if (this.remember) {
          this.$store.dispatch('auth/setTokenLocal', response.data.access_token)
        } else {
          localStorage.clear()
          this.$store.dispatch('auth/setTokenLocal', response.data.access_token)
        }

        this.$store.dispatch('auth/setUser')

        this.$notification.success({
          message: 'Авторизация',
          description: 'Вы успешно авторизовались',
        })
        if (this.$route.query.back_url != null && this.$route.query.back_url != 'underfined') {
          this.redirect(this.$route.query.back_url)
        } else {
          this.redirect('/')
        }
      }).catch((error) => {
        const errorMessage = JSON.parse(error.request.response)
        this.$notification.error({
          message: errorMessage.message,
        })
      })
    }
  },
  props: ['login']
}
</script>

<style lang="scss" scoped>
.login {
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px 0px;

  &-wrapper {
    padding: 25px 40px;
    background: #FFFFFF;
    border-radius: 13px;
    width: 465px;
    box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
  }

  ._title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    p {
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      color: #0B132A;
    }
  }

  .input {
    margin-bottom: 20px;
  }
}

input {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  color: #0B132A;

  &::placeholder {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 400;
    color: #0B132A;
  }
}


.remember {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  p {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #F53838;
    cursor: pointer;
  }
}

button {
  width: 100%;

  &.btn-white {
    font-family: Montserrat;
    font-weight: 400;
    margin-bottom: 15px;
  }
}

.or {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 35px 0;

  p {
    font-family: Montserrat;
    font-weight: 400;
    font-size: 18px;
    color: #0B132A;
    position: relative;
    display: flex;
    align-items: center;

    &:before {
      content: '';
      position: absolute;
      left: -100px;
      width: 90px;
      height: 1px;
      background: #ABABAB;
    }

    &:after {
      content: '';
      position: absolute;
      right: -100px;
      width: 90px;
      height: 1px;
      background: #ABABAB;
    }
  }
}

.regis {
  padding-top: 20px;

  &.link {
    display: none;
  }

  p {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    color: #0B132A;

    span {
      font-weight: 700;
      transition: all .3s;
      cursor: pointer;

      &:hover {
        color: #F53838;
      }
    }
  }
}


@media screen and (max-width: 550px) {
  .login {
    height: calc(100vh - 155px);
    margin-top: 155px;
  }

  .regis.link {
    display: block;
  }
}
</style>
