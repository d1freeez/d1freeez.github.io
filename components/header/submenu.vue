<template>
  <div>
    <div class="close_element" :class="active ? 'active': ''" @click="onMouse"></div>
    <div class="submenu" :class="active ? 'active': ''" @mouseleave="onMouse">
      <ul v-if="data">
        <li
          v-for="(item, index) in data"
          :key="index"
          @mouseover="onStep_1(index)"
          v-on:click="$router.push('/category/'+item['id'])"
        >
          <p><span> {{ item['name'] }}</span>
            <a-icon type="right"/>
          </p>
        </li>
      </ul>
      <ul v-if="step_1.length > 0">
        <li
          v-for="(item, index) in step_1"
          :key="index"
          @mouseover="onStep_2(index)"
          @click="onLink(item['id'])"
        ><p>{{ item['name'] }}</p></li>
      </ul>
      <!--    <ul v-if="step_2.length > 0">-->
      <!--      <li-->
      <!--        v-for="(item, index) in step_2"-->
      <!--        :key="index"-->
      <!--        @click="onLink(item['id'])"-->
      <!--      ><p>Естественные и технические науки <a-icon type="right"/></p></li>-->
      <!--      <li><p>Социальные науки <a-icon type="right"/></p></li>-->
      <!--      <li><p>Изучение языков <a-icon type="right"/></p></li>-->
      <!--    </ul>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'submenu',
  data () {
    return {
      step_1: [],
      step_2: []
    }
  },
  props: ['active'],
  methods: {
    onMouse () {
      this.$emit('onLeave')
    },

    onLink (id) {
      this.$emit('onLeave')
      this.$router.push(`/category/${id}`)
    },

    onStep_1 (index) {
      this.step_1 = this.data[index]['child_categories']
    },

    onStep_2 (index) {
      this.step_2 = this.step_1[index]['child_categories']
    }
  },
  created () {
    this.$store.dispatch('category/setCategoryNavigation')
  },
  computed: {
    ...mapGetters({
      data: 'category/navigation'
    })
  }
}
</script>

<style scoped lang="scss">
.close_element {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all .3s;
  opacity: 0;
  visibility: hidden;

  &.active {
    opacity: 1;
    z-index: 99;
    visibility: visible;
  }
}

.submenu {
  padding: 10px 0;
  position: absolute;
  top: 60px;
  width: 700px;
  background: #FFFFFF;
  box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
  border-radius: 13px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  visibility: hidden;
  left: 0;
  z-index: -1;
  transition: all .3s;
  opacity: 0;

  &.active {
    z-index: 9999;
    opacity: 1;
    visibility: unset;
  }

  ul {
    li {
      list-style: none;
      padding: 0 15px;
      cursor: pointer;
      transition: all .3s;

      &:hover {
        background: #F9F9F9;

        p {
          color: #F53838;
        }
      }

      i {
        position: absolute;
        right: 0;
        font-size: 14px;
        font-weight: bold;
      }

      p {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 40px;
        color: #0B132A;
        transition: all .3s;
        display: flex;
        align-items: center;
        position: relative;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .submenu {
    width: 100%;

    ul li {

      p {
        padding: 10px 0;
        line-height: 22px;
      }
    }
  }
}
</style>
