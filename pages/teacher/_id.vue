<template>
  <div>
    <div class="teacher">
      <div class="container">
        <div class="_card" v-if="!!author">
          <div class="_img">
            <img v-if="author['respond_file_path'] === null" src="@/assets/images/card.png" alt="">
            <img v-else :src="author['respond_file_path']" alt="">
          </div>
          <div class="_info">
            <p>{{author['name']}}</p>
            <div class="teacher-course">
              <img src="@/assets/images/icons/certificate.svg" alt="">
              <p>{{author['courses_count']}} <span>курсов</span></p>
            </div>
          </div>
        </div>

        <div class="course" v-if="course.length > 0">
          <p class="_title">Курсы</p>
          <Course :data="course"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Course from './../../components/carousel/course'

export default {
  name: "teacher-profile",

  components:{Course},

  created () {
    this.$store.dispatch('teacher/set', this.$route.params.id);
  },

  computed:{
    ...mapGetters({
      author: 'teacher/data',
      course: 'teacher/course',
    })
  },
}
</script>

<style scoped lang="scss">
.teacher{
  padding-top: 130px;
  padding-bottom: 100px;

  ._title{
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 62px;
    color: #0B132A;
    margin-bottom: 30px;
  }

  ._card{
    display: grid;
    grid-template-columns: 125px 1fr;
    grid-gap: 30px;
    align-items: center;
    padding-bottom: 100px;

    ._img{
      img{
        min-width: 125px;
        width: 125px;
        height: 125px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    ._info{
      p{
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        color: #0B132A;
        margin-bottom: 5px;
      }

      a p{
        cursor: pointer;
        transition: all .3s;

        &:hover{
          color: #F53838;
        }
      }

      span{
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 20px;
        color: rgba(11, 19, 42, 0.6);
      }

      .teacher-course{
        display: flex;
        align-items: center;
        margin-top: 5px;

        img{
          width: 20px;
          margin-right: 10px;
          margin-right: 10px;
        }

        p{
          margin-bottom: 0;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
