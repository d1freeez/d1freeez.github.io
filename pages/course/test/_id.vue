<template>
  <div class="test_page">
    <template v-if="data">
      <div class="_group _first">
        <h2 class="_title">{{ data.title }}</h2>

        <button class="btn-blue" @click="onNext">Далее</button>
      </div>

      <div class="_list">
        <div
          class="_questions"
          v-for="(question, index) in questions"
          :key="index"
        >
          <p>{{ question.title || '...' }}</p>
          <div class="_answer">
            <a-radio-group>
              <a-radio
                :value="answer.id"
                v-for="answer in question.answers"
                :key="answer.id"
                class="radio"
                @change="onChange(answer.question_id, answer.id)"
              >
                <div
                  v-html="answer.description"
                  :class="
                    isSubmit &&
                    question_answer[answer.question_id] === answer.id
                      ? answer.correct
                        ? '_success'
                        : '_error'
                      : ''
                  "
                ></div>
              </a-radio>
            </a-radio-group>
          </div>
        </div>
      </div>

      <div class="_group">
        <button class="btn-blue" @click="onPrev">Назад</button>
        <button class="btn-blue" @click="Submit">Закончить</button>
      </div>
    </template>

    <template v-else>
      <a-spin size="large" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'McvTest',
  data() {
    return {
      question_answer: {},
      isSubmit: false,
    }
  },
  mounted() {
    this.$store.dispatch('course_test/set', this.$route.params.id)
  },
  computed: {
    ...mapGetters({
      data: 'course_test/data',
      series: 'course_series/detail',
    }),
    questions() {
      return this.data.questions
    },
  },
  methods: {
    async onPrev() {
      localStorage.setItem(
        'chapters_id',
        this.data.prev_series_or_exam.chapter_id
      )

      await this.$router.push(
        `/course/series/${this.data.prev_series_or_exam.series_id}`
      )
    },
    onChange(question, id) {
      this.$set(this.question_answer, question, id)
      // if(Object.keys(this.question_answer).length === this.questions.length) this.disabled_button = false;
      this.isSubmit = false
    },

    onNext() {
      localStorage.setItem(
        'chapters_id',
        this.data.next_series_or_exam.chapter_id
      )

      if (this.data.next_series_or_exam.series_id) {
        this.$router.push(
          `/course/series/${this.data.next_series_or_exam.series_id}`
        )
        return
      }

      this.$router.push(`/course/test/${this.data.next_series_or_exam.exam_id}`)
    },

    Submit() {
      if (Object.keys(this.question_answer).length === this.questions.length) {
        this.isSubmit = true
        let _answer = Object.entries(this.question_answer).map((e) => e[1])
        this.$store
          .dispatch('course_test/finished', [
            this.data.id,
            {
              answers: _answer,
              finished: 1,
            },
          ])
          .then((response) => {
            this.$notification.success({
              message: response,
            })

            if(!this.data.next_series_or_exam) return

            localStorage.setItem(
              'chapters_id',
              this.data.next_series_or_exam.chapter_id
            )

            if (this.data.next_series_or_exam.series_id) {
              this.$router.push(
                `/course/series/${this.data.next_series_or_exam.series_id}`
              )
              return
            }

            this.$router.push(
              `/course/test/${this.data.next_series_or_exam.exam_id}`
            )
            // this.$router.go(-2)
          })
          .catch((error) => {
            console.log(error)
            this.$notification.warning({
              message: error,
            })
            // localStorage.setItem('chapters_id', this.data.next_series_or_exam.chapter_id)
            //
            // if(this.data.next_series_or_exam.series_id){
            //   this.$router.push(`/course/series/${this.data.next_series_or_exam.series_id}`);
            //   return;
            // }
            //
            // this.$router.push(`/course/test/${this.data.next_series_or_exam.exam_id}`);
          })
      } else {
        this.$notification.error({
          message: 'Ответьте на все вопросы',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
._group {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &._first {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 10px;
    align-items: flex-start;

    .btn-blue {
      height: 40px;
      min-width: auto;
      padding: 0 20px;
    }
  }
}
.test_page {
  padding: 30px 30px 100px;

  ._title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    color: #0b132a;
    margin-bottom: 45px;
  }

  ._questions {
    margin-bottom: 20px;
    > p {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      color: #0b132a;
      margin-bottom: 10px;
    }
  }

  ._answer {
    padding: 20px;
    background: #ecf0f3;

    .radio {
      display: flex;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
