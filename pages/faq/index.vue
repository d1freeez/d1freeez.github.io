<template>
  <div>
    <div class="faq faq_padding">
      <div class="container">
        <div class="_title"><p>FAQ</p></div>
        <nav class="faq faq_tabs tabs my-nav">
          <div class="faq_items">
            <a href="#" @click="openThisTeacher()" class="scrollactive-item active "
               :class="active_tab=='teachers'?'is-active':''"
            >Для преподавателей</a>
            <a href="#" @click="openThisStudent()" class="scrollactive-item"
               :class="active_tab=='students'?'is-active':''"
            >Для студентов</a>
          </div>
        </nav>
        <div class="faq_contents" v-if="active_tab=='teachers'">
          <div class="faq_item" v-for="(item, index) in teachers" @click="openTeacher(item,index)"
               :class="item.show == true ? 'active' : '' "
          >
            <div class="faq_item_border"></div>
            <div class="faq_item_header">{{ item.question }}</div>
            <div class="faq_item_content">
              <div v-html="item.answer"></div>
            </div>
          </div>
        </div>
        <div class="faq_contents" v-if="active_tab=='students'">
          <div class="faq_item" v-for="(item, index) in students" @click="openStudent(item,index)"
               :class="item.show == true ? 'active' : '' "
          >
            <div class="faq_item_border"></div>
            <div class="faq_item_header">{{ item.question }}</div>
            <div class="faq_item_content">
              <div v-html="item.answer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Locally

export default {
  layout: 'main',
  data () {
    return {
      active_tab: 'teachers',
      students: '',
      teachers: '',
    }
  },
  created () {
    this.getStudents()
    this.getTeachers()
  },
  methods: {
    openThisTeacher () {
      event.preventDefault()
      this.active_tab = 'teachers'
    },
    openThisStudent () {
      event.preventDefault()
      this.active_tab = 'students'

    },
    openTeacher (item, index) {
      let app = this
      app.teachers[index].question = app.teachers[index].question + ' '
      app.teachers[index].show = app.teachers[index].show == true ? false : true
    },
    openStudent (item, index) {
      let app = this
      app.students[index].question = app.students[index].question + ' '
      app.students[index].show = app.students[index].show == true ? false : true
    },
    getStudents () {
      this.$axios.get('/site-faqs', {
        params: {
          category: 'students'
        },
        headers: {
          Authorization: process.env.defaultToken,
        },
      }).then(response => {
        this.students = response.data.data
      }).catch(error => {

      })
    },
    getTeachers () {
      let app = this
      this.$axios.get('/site-faqs', {
        params: {
          category: 'teachers'
        },
        headers: {
          Authorization: process.env.defaultToken,
        },
      }).then(response => {
        app.teachers = response.data.data
        for (var i = 0; i < this.teachers.length; i++) {
          this.teachers[i].show = false
        }
      }).catch(error => {

      })
    },
  },
  components: {},
}
</script>

<style scoped lang="scss">

.faq_item.active {
  .faq_item_content {
    display: block;
  }
}

.faq {
  //padding-bottom: 100px;

  &_tabs {
    margin-bottom: 70px;
  }

  &_items {
    display: flex;
    border-bottom: 1px solid #E0E0E0;
    width: 100%;
  }

  &_item {
    background: #FFFFFF;
    box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
    border-radius: 13px;
    display: block;
    position: relative;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    margin-bottom: 30px;
    cursor: pointer;

    &_header {
      display: block;
      padding: 30px;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
      color: #0B132A;
    }


    &_content {
      display: none;
      padding: 0px 30px;
      padding-bottom: 30px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 27px;
      color: #0B132A;
    }

    &_border {
      height: 6px;
      width: 100%;
      background: linear-gradient(136.1deg, #FF4E50 24.18%, #1A116F 173.45%);
      position: absolute;
      width: 100%;
      border-radius: 15px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0px;
    }

  }

  &_tabs {
    display: flex;

    a {
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      color: #0B132A;
      border-bottom: 5px solid #fff;
      padding: 0 15px;
      height: 75px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all .3s;

      &:first-child {
        padding-left: 0;
      }

      &.is-active {
        border-color: #F53838;
        color: #F53838;
      }
    }
  }


  ._title {
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      color: #0B132A;
      margin-top: 100px;
    }
  }
}

@media screen and (max-width: 550px) {
  .faq_padding {
    margin-top: 50px;
    display: block;
    padding-top: 50px;
  }
}
</style>
