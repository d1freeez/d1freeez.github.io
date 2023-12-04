<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="_title">
        <p>Регистрация</p>
      </div>

      <!--      <div class="tab-type">-->
      <!--        <p :class="type === 0 ? 'active' : ''" @click="type = 0">Я ученик</p>-->
      <!--        <p :class="type === 1 ? 'active' : ''" @click="type = 1">Я преподователь</p>-->
      <!--      </div>-->

<!--      <div class="input" :class="error.surname ? 'error' : ''">-->
<!--        <input type="text" placeholder="Фамилия*" v-model="surname">-->
<!--      </div>-->
      <div class="input" :class="error.name ? 'error' : ''">
        <input type="text" placeholder="Полное имя*" v-model="name" @input="() => {
          name === '' ? error.name = true: error.name = false
        }"
        >
      </div>
      <div class="input" :class="error.phone ? 'error' : ''">
        <input type="tel" placeholder="Телефон*" v-model="phone" @input="() => {
          phone === '' ? error.phone = true: error.phone = false
        }"
               v-on:keypress="NumbersOnly"
        />
      </div>
      <div class="input" :class="error.email ? 'error' : ''">
        <input type="text" placeholder="Email*" v-model="email" @input="() => {
          email === '' ? error.email = true: error.email = false
        }"
        >
        <template v-if="error.email">
          <span>Должен быть e-mail</span>
        </template>
      </div>
      <div class="input" :class="error.password ? 'error' : ''">
        <input type="password" placeholder="Пароль*" v-model="password" @input="() => {
          password === '' ? error.password = true: error.password = false
        }"
        >
        <template v-if="error.password && password.length < 6">
          <span>Пароль должен состоять из 6 символов</span>
        </template>
      </div>

      <button class="btn-red" @click="onSubmit">Зарегистрируйся</button>

      <!--      <div class="or"><p>или</p></div>-->

      <a href="https://db.oilama.com/auth/google" class="btn-white d-block">
        <a-icon type="google"/>
        Войти с помощью Google</a>
      <a href="https://db.oilama.com/auth/facebook" class="btn-white d-block">
        <a-icon type="facebook" theme="filled"/>
        Войти с помощью Facebook</a>

      <div class="login-link">
        <p>Есть аккаунт? <span @click="onLogin">Войдите</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'main',
  name: 'signup',
  data () {
    return {
      type: 0,
      name: '',
      email: '',
      phone: '',
      password: '',
      patronymic: '',
      error: {
        surname: false,
        name: false,
        email: false,
        phone: false,
        password: false,
      }
    }
  },
  methods: {
    NumbersOnly (evt) {
      evt = (evt) ? evt : window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()

      } else {
        return true
      }
    },
    onLogin () {
      if (this.$route.query.back_url != null && this.$route.query.back_url != 'underfined') {
        this.$router.push('/auth/login?back_url=' + this.$route.query.back_url)
      } else {
        this.$router.push('/auth/login')
      }
    },

    async onSubmit () {
      let app = this;
      if (this.name === '') {
        this.error.name = true
        return
      }
      if (this.phone === '') {
        this.error.phone = true
        return
      }
      if (this.email === '' || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
        this.error.email = true
        return
      }
      if (this.password === '' || this.password.length < 6) {
        this.error.password = true
        return
      }

      this.error.name = false
      this.error.phone = false
      this.error.email = false
      this.error.password = false

      await this.$axios.post('auth/register', {
        'name': this.name,
        'phone': this.phone,
        'email': this.email,
        'password': this.password,
      }, {
        headers: {
          Authorization: process.env.defaultToken
        }
      }).then((response) => {
        // this.$store.dispatch('auth/setTokenLocal', response.data.access_token);
        // this.$store.dispatch('auth/setUser');

        this.$notification.success({
          message: 'Регистрация',
          description: 'Подтвердите адрес вашей электронной почты',
        })

        this.$router.push({ name: 'auth-login' })
      }).catch(error => {
        const errorMessage = JSON.parse(error.request.response)
        if (errorMessage.errors) {
          console.log(errorMessage);
          Object.keys(errorMessage.errors).forEach(function(key) {
            app.$notification.error({
              message:errorMessage.errors[key],
            })
          });
        }
      })
    }
  },
  props: ['regis']
}
</script>

<style lang="scss" scoped>
.login {
  //height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 140px 0px;

  .d-block {
    //display: block;
    margin: 15px 0px;
  }

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

    span {
      font-weight: bold;
      font-size: 30px;
      position: relative;
      transform: rotate(45deg);
      color: #0B132A;
      line-height: 20px;
      cursor: pointer;
    }

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

.login-link {
  padding-top: 20px;

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
