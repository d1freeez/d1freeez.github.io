<template>
  <div class="header">
    <NuxtLink to="/">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="">
      </div>
    </NuxtLink>
    <div class="auth" v-if="!this.$store.getters['auth/hasToken']">
      <p class="_link _mobile" @click="teacher = true">Преподавайте на Oilama</p>
      <p class="_link" @click="login = true">Войти</p>
      <p class="_link-red" @click="regis = true">Регистрация</p>
    </div>
    <div class="auth" v-else>
      <NuxtLink to="/profile/settings">
        <p class="_link-red">Профиль</p>
      </NuxtLink>
    </div>

    <Login :login="login" @onEvent="teacher = true, login = false" @close-modal="login = false"
           @open-regis="function(){login = false; regis = true}"
           @open-reset="function(){login = false; reset_password = true}"
    />
    <Regis :regis="regis" @close-modal="regis = false" @open-login="function(){regis = false; login = true}"/>
    <ResetPassword :open="reset_password" @close-modal="reset_password = false"/>
    <Teacher :open="teacher" @close-modal="teacher = false"/>
  </div>
</template>

<script>
import Login from '../modal/login'
import Regis from '../modal/regis'
import Teacher from '../modal/teacher'
import ResetPassword from '../modal/reset_password'

export default {
  name: 'header',
  data () {
    return {
      teacher: false,
      login: false,
      regis: false,
      reset_password: false
    }
  },
  components: {
    Login,
    Regis,
    ResetPassword,
    Teacher
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 130px;
  padding: 0 65px;

  .logo {
    img {
      height: 45px;
      @media (min-width: 1400px) and (max-width: 1600px) {
        height: 25px;
      }
    }
  }

  .auth {
    display: flex;
    align-items: center;

    ._link {
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      color: #0B132A;
      margin-right: 35px;
      cursor: pointer;
      transition: all .3s;

      &:first-child {
        font-weight: 400;
      }

      &:hover {
        color: #F53838;
      }
    }

    ._link-red {
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      color: #F53855;
      height: 45px;
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #F53855;
      box-sizing: border-box;
      border-radius: 50px;
      transition: all .3s;
      cursor: pointer;

      &:hover {
        //background: linear-gradient(136.1deg, #FF4E50 24.18%, #1A116F 173.45%);
        //color: #fff;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  ._mobile {
    display: none;
  }

  .header {
    padding: 20px;

    .auth {
      display: grid;
      margin-top: -15px;

      ._link {
        font-size: 18px;
        line-height: 62px;
        background: -webkit-linear-gradient(136.1deg, #FF4E50 24.18%, #FF4E50 173.45%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
        height: 42px;
        text-align: right;
      }

      ._link-red {
        display: none;
      }
    }
  }
}
</style>
