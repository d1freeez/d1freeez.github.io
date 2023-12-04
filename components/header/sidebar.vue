<template>

  <div
    v-if="$route.name === 'index' || $route.name === 'course' || $route.name === 'course-id' || $route.name === 'my-course'|| $route.name === 'my-favorites' || $route.name === 'my-purchases' || $route.name === 'profile' || $route.name === 'certificates'"
  >

    <div class="sidemenu" :class="active ? 'active' : ''">
      <ul>
        <NuxtLink to="/course" active-class="active" exact>
          <li>
            <img v-if="$route.name === 'course'" src="@/assets/images/icons/side_1_active.svg" alt="">
            <img v-else src="@/assets/images/icons/side_1.svg" alt="">
            <p>Все курсы</p>
          </li>
        </NuxtLink>
        <NuxtLink to="/my-favorites" active-class="active" exact>
          <li>
            <img v-if="$route.name === 'my-favorites'" src="@/assets/images/icons/ic-heart-active.svg" alt="">
            <img v-else src="@/assets/images/icons/ic-heart.svg" alt="">
            <p>Избранные</p>
          </li>
        </NuxtLink>
        <NuxtLink to="/my-course" active-class="active" exact>
          <li>
            <img v-if="$route.name === 'my-course'" src="@/assets/images/icons/side_2_active.svg" alt="">
            <img v-else src="@/assets/images/icons/side_2.svg" alt="">
            <p>Мои курсы</p>
          </li>
        </NuxtLink>
        <NuxtLink to="/my-purchases" active-class="active" exact>
          <li>
            <img v-if="$route.name === 'my-purchases'" src="@/assets/images/icons/side_3_active.svg" alt="">
            <img v-else src="@/assets/images/icons/side_3.svg" alt="">
            <p>Мои покупки</p>
          </li>
        </NuxtLink>
        <NuxtLink to="/certificates" active-class="active" exact>
          <li>
            <img v-if="$route.name === 'certificates'" src="@/assets/images/icons/side_4_active.svg" alt="">
            <img v-else src="@/assets/images/icons/side_4.svg" alt="">
            <p>Мои сертификаты</p>
          </li>
        </NuxtLink>

        <li @click="support = true">
          <img src="@/assets/images/icons/send.png" alt="">
          <p>Служба поддержки</p>
        </li>
      </ul>
    </div>

    <SupportModal :open="support" @close-modal="support = false"/>
  </div>

</template>

<script>

import SupportModal from '../modal/support'

export default {
  name: 'sidebar',
  props: ['active'],
  data () {
    return {
      support: false,
      sidemenu: 1,
    }
  },
  components: {
    SupportModal
  }
}
</script>

<style scoped lang="scss">
.sidemenu {
  position: fixed;
  top: 80px;
  left: 0;
  height: 100vh;
  width: 70px;
  background: #FFFFFF;
  box-shadow: 0px 54px 51px rgba(0, 0, 0, 0.12);
  z-index: 999;
  transition: all .3s;
  overflow: hidden;

  &.active {
    left: 0;
    width: 280px;

    ul li img {
      margin-right: 15px;
    }
  }

  ul {
    .active {
      li {
        background: #F9F9F9;

        p {
          color: #F53838;
        }
      }
    }
  }

  ul {
    li {
      list-style: none;
      height: 60px;
      padding: 0 25px;
      display: flex;
      align-items: center;
      transition: all .3s;
      cursor: pointer;

      &:hover {
        background: #F9F9F9;
      }

      img {
        margin-right: 30px;
        width: 20px;
        min-width: 20px;
        transition: all .3s;
      }

      p {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 62px;
        align-items: center;
        color: #0B132A;
        display: flex;
        white-space: nowrap;
      }
    }
  }
}


@media screen and (max-width: 550px) {
  .sidemenu {
    top: 224px;
    left: -280px;
    width: 280px;

    &.active {
      left: 0;
    }

    ul li img {
      margin-right: 15px;
    }
  }
}
</style>
