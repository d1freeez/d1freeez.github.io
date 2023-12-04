<template>
  <div class="header"
       :class="$route.name === 'course' || $route.name === 'my-course' || $route.name === 'my-purchases' || $route.name === 'profile' ? 'shadow' : ''"
  >
    <div class="menu">
      <div v-if="this.$store.getters['auth/hasToken']" class="burger" @click="sidebar = !sidebar">
        <span></span><span></span><span></span>
      </div>

      <NuxtLink to="/">
        <div class="logo">
          <img src="@/assets/images/logo.png" alt="">
          <img class="_table" src="@/assets/images/logo_mini.png" alt="">
        </div>
      </NuxtLink>
    </div>


    <div class="container">
      <div class="_select" @mouseover="submenu = true" :class="submenu ? 'active': ''">
        <p>Категории
          <a-icon type="down"/>
        </p>
      </div>
      <div class="_search">
        <Search :height="50"/>
      </div>

      <Submenu :active="submenu" @onLeave="submenu = false"/>
    </div>

    <div class="right-block">
      <NuxtLink to="/my-favorites" class="my-favorites-mobile">
        <img src="@/assets/images/icons/ic-heart-active.svg" alt="">
      </NuxtLink>
      <div class="profile" v-if="this.$store.getters['auth/hasToken'] && data !== null">
        <div class="_img">
          <img v-if="data['respond_file_path'] === null" src="@/assets/images/card.png" alt="">
          <img v-else :src="data['respond_file_path']" alt="">
        </div>
        <p>{{ data['first_name'] }}</p>
        <img src="@/assets/images/icons/right-arrow.png" alt="">

        <ul class="_settings">
          <!--          <NuxtLink to="/profile">-->
          <!--            <li>Мой профиль</li>-->
          <!--          </NuxtLink>-->
          <NuxtLink to="/profile">
            <li>Аккаунт</li>
          </NuxtLink>
          <li @click="Logout">Выход</li>
        </ul>
      </div>

      <div class="auth" v-else>
        <p class="_link _mobile" @click="redirect('/teacher/application')">Преподавайте на Oilama</p>
        <p class="_link" @click="redirect('/auth/login')">Войти</p>
        <p class="_link-red" @click="redirect('/auth/signup')">Регистрация</p>
      </div>
      <!--      <div class="_icon" @click="notification = !notification">-->
      <!--        <img v-if="notification" src="@/assets/images/icons/notification_red.svg" alt="">-->
      <!--        <img v-else src="@/assets/images/icons/notification.svg" alt="">-->
      <!--      </div>-->
    </div>

    <div class="_notification" :class="notification ? 'active' : ''">
      <p class="_title">Уведомления</p>
      <ul>
        <li>lsfd;lksflskdflskfd;slkfd;l kdl;ksf;l ks;ldfs;ldkfl ;skdf;lks ;ldfks;l fks;ldk fsl;fkds;lkdf;sklf sdfs</li>
        <li>lsfd;lksflskdflskfd;slkfd;l kdl;ksf;l ks;ldfs;ldkfl ;skdf;lks ;ldfks;l fks;ldk fsl;fkds;lkdf;sklf sdfs</li>
      </ul>
    </div>

    <Sidebar v-if="this.$store.getters['auth/hasToken'] && !this.$route.path.includes('view')" :active="sidebar"/>
  </div>
</template>

<script>
import Search from '../input/search'
import Sidebar from '../header/sidebar'
import Submenu from '../header/submenu'
import {
  mapGetters
} from 'vuex'

export default {
  name: 'course-header',
  data () {
    return {
      submenu: false,
      sidebar: false,
      notification: false,
      mobile: false,
      teacher: false,
      login: false,
      regis: false,
      reset_password: false
    }
  },
  components: {
    Search,
    Sidebar,
    Submenu
  },

  mounted () {
    if (this.$store.getters['auth/hasToken']) {
      this.$store.dispatch('auth/setUser')
    }
  },
  created () {
    if (this.$store.getters['auth/hasToken']) {
      this.$store.dispatch('auth/setUser')
    }
    this.mobile = window.innerWidth < 600
  },

  computed: {
    ...mapGetters({
      data: 'auth/user'
    })
  },

  methods: {
    Logout () {
      this.$store.dispatch('auth/logout')
    },
    redirect (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

._search {
  margin-left: 20px;
  width: 480px;
}

._select {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(136.1deg, #FF4E50 24.18%, #1A116F 173.45%);;
  border-radius: 10px;
  height: 50px;
  width: 210px;
  position: relative;
  transition: all .3s;
  cursor: pointer;

  &.active {
    background: #fff;
    box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);

    p {
      color: #F53838;
    }
  }

  i {
    position: absolute;
    right: 15px;
    font-size: 14px;
    font-weight: bold;
  }

  p {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    color: #FFFFFF;
    display: flex;
    align-items: center;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  background: #FFFFFF;
  border-bottom: 1px solid #E0E0E0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;

  &.shadow {
    box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
    border-bottom: 0;
  }

  .auth {
    display: flex;
    align-items: center;
    padding: 0 25px;

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

  .menu {
    display: flex;
    align-items: center;
    position: absolute;
    left: 25px;

    .burger {
      display: grid;
      align-items: end;
      margin-right: 30px;
      cursor: pointer;

      span {
        width: 20px;
        height: 3px;
        background: black;
        display: block;
        justify-self: right;

        &:nth-child(2) {
          margin: 5px 0;
          width: 30px;
        }
      }
    }

    > p {
      font-weight: 500;
      font-size: 20px;
      color: #0B132A;
      margin-left: 15px;
      margin-right: 30px;
    }
  }

  .right-block {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;

    ._icon {
      padding: 0 15px;

      img {
        cursor: pointer;
        height: 20px;
      }
    }
  }

  .logo {
    img {
      height: 40px;
      @media (min-width: 1400px) and (max-width: 1600px) {
        height: 25px;
      }

      &._table {
        display: none;
      }
    }
  }

  .profile {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s;
    cursor: pointer;
    height: 95px;
    padding: 0 25px;
    position: relative;

    ._settings {
      position: absolute;
      top: 100%;
      width: 100%;
      background: #FFFFFF;
      box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
      padding: 10px 0;
      z-index: -1;
      opacity: 0;
      transition: all .3s;
      visibility: hidden;

      li {
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 25px;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        color: #0B132A;
        cursor: pointer;
        transition: all .3s;

        &:hover {
          background: #ECF0F3;
        }
      }
    }

    &:hover {
      background: #ECF0F3;

      ._settings {
        z-index: 999;
        opacity: 1;
        visibility: unset;
      }
    }

    ._img {
      margin-right: 15px;

      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    > img {
      height: 10px;
      position: relative;
      transform: rotate(90deg);
    }

    p {
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
      color: #0B132A;
      margin-right: 15px;
    }
  }
}

._notification {
  position: absolute;
  top: calc(100% + 10px);
  right: 10px;
  background: #FFFFFF;
  box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
  border-radius: 13px;
  padding: 20px;
  width: 400px;
  opacity: 0;
  visibility: hidden;
  transition: all .3s;

  &.active {
    z-index: 9999;
    opacity: 1;
  }

  ._title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    color: #0B132A;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;

    li {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 25px;
      color: #0B132A;
      padding-bottom: 15px;
      margin-bottom: 15px;
      border-bottom: 1px solid #C8C8C8;

      &:last-child {
        padding-bottom: 0;
        margin-bottom: 0;
        border: 0;
      }
    }
  }
}

@media screen and (max-width: 1800px) {
  .container {
    width: 100%;
    margin-left: 290px;
    margin-right: 230px;
    max-width: unset;
    padding: 0;
  }
}

@media (min-width: 1025px) and (max-width: 1440px) {
  .header {
    .container {
      margin: 0 215px;
    }

    ._select {
      width: 155px;
    }

    ._search {
      width: 340px;
    }
  }
}

@media screen and (max-width: 1250px) {
  .header {
    .container {
      margin: 0 155px;

      ._search {
        width: 100%;
      }
    }

    .logo {
      img {
        display: none;

        &._table {
          display: block;
        }
      }
    }

    .profile p {
      display: none;
    }
  }

}

.my-favorites-mobile {
  display: none;
}

@media screen and (max-width: 550px) {
  .my-favorites-mobile {
    display: block;
    width: 40px;
    height: 40px;

    img {
      width: 100%;
    }
  }
  .header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: auto;
    background: #FFFFFF;
    box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
    padding: 15px;


    .logo {
      img {
        display: block;

        &._table {
          display: none;
        }
      }
    }

    .right-block,
    .menu {
      position: relative;
      justify-self: flex-start;
    }

    .right-block {
      justify-self: flex-end;
    }

    .profile {

      p,
      > img {
        display: none;
      }

      ._settings {
        width: min-content;
        right: 0;
      }
    }

    > .container {
      grid-row: 2;
      grid-column: 1 / span 2;
      margin: 0;
      padding: 0;
    }
  }

  .menu {
    margin-bottom: 20px;
  }

  .right-block {
    margin-bottom: 20px;
  }

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
