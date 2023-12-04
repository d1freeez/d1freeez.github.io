<template>
  <div class="overview">
    <div class="_sidebar" v-if="course">
      <div class="_title">
        <p>{{ course['name'] }}</p>
        <span>{{ author['name'] }}</span>
      </div>
      <ul>
        <li class="active">Обзор</li>

        <ul>
          <li v-for="(item, index) in chapters" :key="index" @click="onSelectLesson(item)">{{ item['name'] }}</li>
        </ul>

        <!--        <li>Примечания</li>-->
        <!--        <li>Форумы обсуждений</li>-->
      </ul>
    </div>
    <div class="container order-1">
      <div class="content">
        <div class="_title">
          <h3>{{ course['name'] }}</h3>
          <p>Автор: {{ author['name'] }}</p>
        </div>

        <div class="lineprogress">
          <ul>
            <!--            <li style="padding-top: 34px;">-->
            <!--              <p>Начать</p>-->
            <!--            </li>-->
            <li v-for="(item, index) in chapters" :key="index">
              <div class="_lock" :class="{'check': item.finished}">
                <img v-if="item.finished" src="@/assets/images/icons/check_white.svg" alt="">
                <img v-else src="@/assets/images/icons/lock.svg" alt="">
              </div>
              <p>{{ item['name'] }}</p>
            </li>
            <!--            <li>-->
            <!--              <div class="_lock">-->
            <!--                <img src="@/assets/images/icons/lock.svg" alt="">-->
            <!--              </div>-->
            <!--              <p>Конец 07.12</p>-->
            <!--            </li>-->
          </ul>
        </div>

        <div class="week" v-if="!!chapters_detail">
          <p>{{ chapters_detail['name'] }}</p>

          <div class="_card" v-if="chapters_detail">
            <span v-html="chapters_detail.description" v-if="!!chapters_detail.description"></span>
            <button class="btn-red" @click="onOpen(chapters_detail.id)">Начать</button>
          </div>
        </div>

        <div class="teacher">
          <p class="_title">Преподаватель</p>
          <div class="_user">
            <div class="_img">
              <img v-if="author['respond_file_path'] === null" src="@/assets/images/card.png" alt="">
              <img v-else :src="author['respond_file_path']" alt="">
            </div>
            <NuxtLink :to="'/teacher/' + author['id']">
              <p>{{ author['name'] }}</p>
            </NuxtLink>
          </div>
          <p class="_note" v-if="chapters_detail.course" v-html="chapters_detail.course.short_description || '...'"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'overview',
  data () {
    return {
      author: { name: '' },

    }
  },

  mounted () {
    let course_id = this.$route.params.id
    this.$axios.$get('courses/' + course_id + '/chapters').then(response => {
    }).catch(error => {
      let app = this
      console.log(error.response.status)
      if (error.response.status == 403 || error.response.status == 401) {
        // app.$router.push({ path: '/course' })
      }
    })
    this.$store.dispatch('course_chapters/set', course_id)
    this.author = JSON.parse(localStorage.getItem('author'))

  },

  methods: {
    onSelectLesson (data) {
      this.$store.dispatch('course_chapters/setLocalDetail', data)
    },
    onOpen (id) {
      localStorage.setItem('chapters_id', id)
      this.$router.push(`/course/lesson/${id}`)
    }
  },

  watch: {
    chapters () {
      this.$store.dispatch('course_chapters/setDetail', this.chapters[0].id)
    }
  },

  computed: {
    ...mapGetters({
      course: 'course_chapters/course',
      chapters: 'course_chapters/data',
      chapters_detail: 'course_chapters/detail'
    })
  },
}
</script>

<style scoped lang="scss">
.overview {
  position: relative;
}

._sidebar {
  position: absolute;
  top: 0;
  left: 0;
  background: #FFFFFF;
  width: 250px;
  height: 100%;
  border-right: 1px solid #E0E0E0;

  ._title {
    padding: 40px 25px 25px;

    p {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #0B132A;
    }

    span {
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      color: #0B132A;
    }
  }


  ul {
    li {
      list-style: none;
      height: 55px;
      padding: 025px;
      display: flex;
      align-items: center;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 27px;
      color: #0B132A;
      transition: all .3s;
      cursor: pointer;

      &:hover, &.active {
        background: #ECF0F2;
      }
    }

    > ul {
      max-height: 400px;
      overflow: hidden;
      overflow-y: scroll;

      li {
        font-weight: 300;
        font-size: 16px;
        line-height: 27px;
        color: #0B132A;
        padding-left: 40px;
        padding-top: 5px;
        padding-bottom: 5px;
        min-height: 55px;
        height: auto;

      }
    }
  }
}

.content {
  //padding-top: 40px;

  ._title {
    margin-bottom: 20px;

    h3 {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 62px;
      color: #0B132A;
    }

    p {
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      color: #0B132A;
    }
  }
}

.lineprogress {
  position: relative;
  display: flex;
  margin-bottom: 65px;
  padding-top: 25px;
  padding-bottom: 25px;
  z-index: 0;

  ul {
    display: flex;
    list-style: none;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    overflow-x: scroll;
    padding-bottom: 25px;

    li {
      position: relative;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      padding-right: 40px;
      text-align: center;
      min-width: 170px;
      position: relative;

      &:first-child {
        //&::before{
        //  content: '';
        //  position: absolute;
        //  left: 60px;
        //  top: 8px;
        //  width: 15px;
        //  height: 15px;
        //  border-radius: 50%;
        //  background: #F53838;
        //}

        &:after {
          width: calc(200% + 10px);
          left: calc(50% - 10px);
        }
      }

      &:nth-child(2) {
        &:after {
          left: -70%;
          width: calc(250% + 40px);
        }
      }

      &:last-child {
        &:after {
          right: 55%;
          left: auto;
          width: calc(150% + 10px);
        }
      }

      &:after {
        content: '';
        position: absolute;
        top: 15px;
        left: 0;
        width: calc(100% + 40px);
        height: 2px;
        background: #F53838;
      }

      ._lock {
        margin-bottom: 5px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #DBDBDB;
        text-align: center;
        position: relative;
        z-index: 9;

        &.check {
          background: rgba(39, 174, 96, 1);
        }

        img {
          width: 18px;
          object-fit: contain;
        }
      }

      p {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #0B132A;
      }
    }
  }
}

.week {
  margin-bottom: 50px;

  > p {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 62px;
    color: #0B132A;
    margin-bottom: 10px;
  }

  ._card {
    background: #FFFFFF;
    box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
    border-radius: 13px;
    padding: 20px 30px;

    p {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
      color: #0B132A;
      margin-bottom: 10px;
    }

    span {
      display: block;
      margin-bottom: 20px;
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      color: #0B132A;
    }
  }
}

.teacher {
  border-top: 1px solid #E0E0E0;
  padding: 20px 0 100px;

  .collapse {
    padding-top: 50px;
  }

  ._title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 62px;
    color: #0B132A;
  }

  ._user {
    display: grid;
    grid-template-columns: 75px 1fr;
    grid-gap: 25px;
    align-items: center;
    margin-bottom: 20px;

    ._note {
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      color: #0B132A;
    }

    a p {
      cursor: pointer;
      transition: all .3s;

      &:hover {
        color: #F53838;
      }
    }

    img {
      width: 75px;
      min-width: 75px;
      height: 75px;
      border-radius: 50%;
      object-fit: cover;
    }

    p {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 62px;
      color: #0B132A;
    }
  }
}

@media screen and (max-width: 1700px) {
  .container {
    width: 100%;
    padding: 30px 30px 30px 280px;
    max-width: 100%;
  }
}

@media screen and (max-width: 550px) {
  .overview {
    padding-top: 45px;
    display: grid;
  }

  .container {
    padding: 15px;

  }
  .order-1 {
    order: 1;
  }

  ._sidebar {
    order: 2;
    position: relative;
    width: 90%;
    border: 0;
    background: #FFFFFF;
    box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
    border-radius: 18px;
    left: 5%;
    height: auto;
    top: 0;
    margin-bottom: 80px;

  }
}
</style>
