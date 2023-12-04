<template>
  <div class="overview">
    <div class="_sidebar">
      <div class="_title">
        <p>{{course['name']}}</p>
        <span v-if="chapters_detail['course']">{{ chapters_detail['course']['user']['name'] }}</span>
      </div>
      <ul>
        <li class="active">Обзор</li>

        <ul v-if="chapters.length > 0">
          <li
            v-for="(item, index) in chapters"
            :key="index"
            :class="+item['id'] === + lesson_id ? 'active' : ''"
            @click="selectLesson(item['id'])"
          >{{item['name']}}</li>
        </ul>

<!--        <li>Примечания</li>-->
<!--        <li>Форумы обсуждений</li>-->
      </ul>
    </div>
    <div class="container order-1">
      <div class="content">
        <div class="_title">
          <h3 v-if="!!chapters_detail">{{chapters_detail['name']}}</h3>
          <p v-if="chapters_detail['course']">Автор: {{ chapters_detail['course']['user']['name'] }}</p>
        </div>

        <div class="teacher">
          <p class="_title">The Marketing Process</p>
          <div class="_user">
            <div class="_img">
              <img v-if="author['respond_file_path'] === null" src="@/assets/images/card.png" alt="">
              <img v-else :src="author['respond_file_path']" alt="">
            </div>
            <p>{{ author['name'] }}</p>
          </div>
<!--          <p class="_note" v-if="lesson['chapter']" v-html="lesson['chapter']['description']"></p>-->
        </div>

<!--        <div class="tasks">-->
<!--          <p class="_title">Задачи обучения</p>-->
<!--          <ul v-if="series['chapter']" >-->
<!--            <li v-if="series['chapter']['description']" v-html="series['chapter']['description']"></li>-->
<!--          </ul>-->
<!--          <h3 v-else>Нет данных</h3>-->
<!--        </div>-->

        <div class="introduction">
          <p class="_title">Введение в курс</p>

          <ul v-if="series.length > 0">
            <li v-for="(item, index) in series" :key="index" @click="onLink(item['id'])">
              <div class="_info">
                <img v-if="item.progress_finished" src="@/assets/images/icons/check_success.svg" alt="">
                <img v-else src="@/assets/images/icons/material.svg" alt="">
                <p>{{ item['name'] }}: <span> {{ item['description'] }}</span></p>
              </div>
            </li>
<!--            -->
<!--            <li class="active">-->
<!--              <div class="_info">-->
<!--                <img src="@/assets/images/icons/material.svg" alt="">-->
<!--                <p>Видео: <span> Data, Data Everywhere!</span> <span class="_time">2 мин</span></p>-->
<!--              </div>-->
<!--              <NuxtLink to="/course/open">-->
<!--                <button class="btn-red">Продолжить</button>-->
<!--              </NuxtLink>-->
<!--            </li>-->
<!--            <li>-->
<!--              <div class="_info">-->
<!--                <img src="@/assets/images/icons/play.svg" alt="">-->
<!--                <p>Видео: <span> Data, Data Everywhere!</span> <span class="_time">2 мин</span></p>-->
<!--              </div>-->
<!--            </li>-->
            <li>
              <div class="_info" @click="onTest" v-if="!!exam">
                <img v-if="exam.progress_finished" src="@/assets/images/icons/check_success.svg" alt="">
                <img v-else src="@/assets/images/icons/lock_grey.svg" alt="">
                <p>{{exam.title}}</p>
              </div>
            </li>
          </ul>
          <h3 v-else>Нет материалов</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "overview",
  data(){
    return{
      lesson_id: 0,
      author: {name:''},
    }
  },

  mounted () {
    this.lesson_id = this.$route.params.id;
    this.author = JSON.parse(localStorage.getItem('author'));
  },

  async created () {
    await this.$store.dispatch('course_chapters/set', localStorage.getItem('course_id'));
    await this.$store.dispatch('course_chapters/setDetail', this.$route.params.id);
    await this.$store.dispatch('course_series/set', this.$route.params.id);
  },

  methods:{
    onLink(id){
      this.$router.push(`/course/series/${id}`);
    },

    selectLesson(id){
      localStorage.setItem('chapters_id', id)
      this.$router.push(`/course/lesson/${id}`);
    },

    onTest(id){
      this.$router.push(`/course/test/${this.chapters_detail.id}`);
    }
  },

  computed:{
    ...mapGetters({
      chapters: 'course_chapters/data',
      chapters_detail: 'course_chapters/detail',
      series: 'course_series/data',
      exam: 'course_series/exam',
      course: 'course_chapters/course',
    })
  },
}
</script>

<style scoped lang="scss">
.overview{
  position: relative;
}
.order-1{
  order: 1;
}

._sidebar{
  order: 2;
  position: absolute;
  top: 0;
  left: 0;
  background: #FFFFFF;
  width: 250px;
  height: 100%;
  border-right: 1px solid #E0E0E0;

  ._title{
    padding: 40px 25px 25px;

    p{
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #0B132A;
    }

    span{
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      color: #0B132A;
    }
  }

  ul{
    li{
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

      &.active{
        background: #ECF0F2;
      }
    }

    > ul{
      max-height: 400px;
      overflow: hidden;
      overflow-y: scroll;

      li{
        font-weight: 300;
        font-size: 16px;
        line-height: 27px;
        color: #0B132A;
        padding-left: 40px;
        padding-top: 5px;
        padding-bottom: 5px;
        min-height: 55px;
        height: auto;

        &.active{
          color: #b70003;
          background: white;
        }
      }
    }
  }
}

.content{
  padding-top: 40px;

  ._title{
    margin-bottom: 20px;

    h3{
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 62px;
      color: #0B132A;
    }

    p{
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      color: #0B132A;
    }
  }
}

.introduction{
  padding-bottom: 100px;

  ._title{
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    color: #0B132A;
    margin-bottom: 30px;
  }
  ul{
    list-style: none;
    background: #FFFFFF;
    box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
    border-radius: 13px;
    overflow: hidden;
    padding: 15px 0;

    button{
      height: 40px;
      width: 145px;
      min-width: 145px;
      box-shadow: none;
    }

    li{
      display: flex;
      justify-content: space-between;
      padding: 10px 10px 10px 35px;
      transition: all .3s;
      align-items: center;
      cursor: pointer;

      &:hover, &.active{
        background: #ECF0F3;
      }

      ._info{
        display: grid;
        grid-template-columns: 25px 1fr;
        grid-gap: 15px;
      }

      img{
        width: 25px;
      }

      p{
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        color: #0B132A;

        span{
          font-weight: 300;
          margin-left: 5px;
        }

        ._time{
          font-style: normal;
          font-weight: 300;
          font-size: 14px;
          color: #0B132A;
        }
      }
    }
  }
}

.tasks{
  background: #ECF0F3;
  border-radius: 13px;
  padding: 20px 35px;
  margin-bottom: 55px;

  ._title{
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: rgba(11, 19, 42, 0.6);
    margin-bottom: 10px;
  }

  ul{
    list-style: none;
    li{
      padding-left: 15px;
      position: relative;
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      color: #0B132A;
      margin-bottom: 5px;

      &:after{
        content: '';
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #F53838;
        position: absolute;
        left: 0;
        top: 8px;
      }
    }
  }
}

.teacher{
  border-top: 1px solid #E0E0E0;
  padding: 20px 0 55px;

  .collapse{
    padding-top: 50px;
  }

  ._title{
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 62px;
    color: #0B132A;
  }

  ._user{
    display: grid;
    grid-template-columns: 75px 1fr;
    grid-gap: 25px;
    align-items: center;
    margin-bottom: 20px;

    ._note{
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      color: #0B132A;
    }

    img{
      width: 75px;
      min-width: 75px;
      height: 75px;
      border-radius: 50%;
      object-fit: cover;
    }

    p{
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 62px;
      color: #0B132A;
    }
  }
}

@media screen and (max-width: 1700px) {
  .container{
    width: 100%;
    padding: 0 30px 30px 280px;
    max-width: 100%;
  }
}

@media screen and (max-width: 550px) {
  .overview{
    padding-top: 45px;
    display: grid;
  }

  .container{
    padding: 15px;
  }
  ._sidebar{
    position: relative;
    width: 90%;
    border: 0;
    background: #FFFFFF;
    box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
    border-radius: 18px;
    left: 5%;
    height: auto;
    top: 0;
    margin-bottom: 60px;
  }
}
</style>
