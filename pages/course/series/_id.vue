<template>
  <div>
    <div class="course-start">
      <div class="_path">
        <ul>
          <li @click="$router.go(-2)">{{ path[0] }} <span> ></span></li>
          <li @click="$router.go(-2)">{{ path[1] }} <span> ></span></li>
          <li>{{ path[2] }}</li>
        </ul>
      </div>

      <div class="_sidebar">
        <div class="_title">
          <p>Введение в курс</p>
        </div>
        <ul v-if="list.length > 0">
          <li v-for="(item, index) in list" :key="index">
            <img
              v-if="item.progress_finished"
              src="@/assets/images/icons/check_success.svg"
              alt=""
            />
            <img v-else src="@/assets/images/icons/material.svg" alt="" />
            <p>
              {{ item['name'] }} <span>{{ item['description'] }}</span>
            </p>
          </li>
          <!--          <li class="active">-->
          <!--            <img src="@/assets/images/icons/play.svg" alt="">-->
          <!--            <p>-->
          <!--              Видео: <span>Course Overview</span> <span>2 мин</span>-->
          <!--            </p>-->
          <!--          </li>-->
          <!--          <li>-->
          <!--            <img src="@/assets/images/icons/material.svg" alt="">-->
          <!--            <p>-->
          <!--              Материал для самостоятельного изучения: <span> Use Discussion Forums to Deepen Your Learning</span> <span>2 мин</span>-->
          <!--            </p>-->
          <!--          </li>-->
        </ul>
      </div>

      <div class="container">
        <Player
          v-if="detail['stream_path'] != null"
          :url="detail['stream_path']"
          :id="detail['id']"
        />
        <Player v-else :url="detail['respond_file_path']" :id="detail['id']" />

        <div class="_next">
          <button
            class="btn-blue"
            v-if="detail.prev_series_or_exam"
            @click="onPrev"
          >
            Назад
          </button>
          <button
            class="btn-blue"
            v-if="detail.next_series_or_exam"
            @click="onNext"
          >
            Дальше
          </button>
        </div>
        <!--        <div class="select">-->
        <!--          <a-select default-value="kz" @change="handleChange">-->
        <!--            <a-select-option value="en">-->
        <!--              English-->
        <!--            </a-select-option>-->
        <!--            <a-select-option value="kz">-->
        <!--              Kazakh-->
        <!--            </a-select-option>-->
        <!--            <a-select-option value="ru">-->
        <!--              Russian-->
        <!--            </a-select-option>-->
        <!--          </a-select>-->
        <!--        </div>-->

        <div class="_info">
          <!--          <p>00:00</p>-->
          <p v-html="detail['name'] || '...'"></p>
        </div>

        <div class="_comment">
          <h3 class="_title">Комментарии</h3>
          <div v-if="isLoading">Loading...</div>
          <div v-else>
            <div class="_list" v-if="reviews.length !== 0">
              <div v-for="(item, index) in reviews" :key="index">
                <commentReviewCard
                  :item="item"
                  @answer="reviewComment"
                  @update="updateComment"
                  @delete="deleteComment"
                  :answer_btn="true"
                />
                <div v-if="!!item.children.length" class="_children">
                  <div v-for="(item_ch, index) in item.children" :key="index">
                    <commentReviewCard
                      :item="item_ch"
                      @answer="reviewComment"
                      @update="updateComment"
                      @delete="deleteComment"
                      :answer_btn="true"
                    />

                    <div v-if="!!item_ch.children" class="_children">
                      <commentReviewCard
                        v-for="(item_ch_1, index) in item_ch.children"
                        :key="index"
                        :item="item_ch_1"
                        @answer="reviewComment"
                        @update="updateComment"
                        @delete="deleteComment"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button class="btn btn-blue" v-if="!modal" @click="modal = true">
              Оставить комментари
            </button>
          </div>
        </div>
      </div>
    </div>
    <CommentModal
      v-if="!!detail"
      :open="modal"
      @close-modal="modal = false"
      :id-series="detail.id"
    />
    <CommentReviewModal
      :open="modal_review"
      @close-modal="modal_review = false"
      :id-series="select_comment"
    />
    <CommentUpdateModal
      v-if='modal_update'
      :open="modal_update"
      @close-modal="modal_update = false"
      :id-series="select_comment"
      :comment="select_update_comment"
    />
  </div>
</template>

<script>
import Player from './../../../components/video-player'
import CommentModal from '@/components/modal/comment'
import CommentReviewModal from '@/components/modal/comment_review'
import CommentUpdateModal from '@/components/modal/comment_update'
import commentReviewCard from '@/components/card/comment_review'

import { mapGetters } from 'vuex'

export default {
  name: 'seriesView',
  data() {
    return {
      modal: false,
      modal_review: false,
      select_comment: null,
      modal_update: false,
      select_update_comment: null,
    }
  },
  components: {
    Player,
    CommentModal,
    CommentReviewModal,
    commentReviewCard,
    CommentUpdateModal,
  },

  async created() {
    await this.$store.dispatch(
      'course_series_reviews/set',
      this.$route.params.id
    )
    await this.$store.dispatch(
      'course_series/set',
      localStorage.getItem('chapters_id')
    )
    await this.$store.dispatch('course_series/setDetail', this.$route.params.id)
  },

  methods: {
    async onNext() {
      localStorage.setItem(
        'chapters_id',
        this.detail.next_series_or_exam.chapter_id
      )

      if (this.detail.next_series_or_exam.series_id) {
        await this.$router.push(
          `/course/series/${this.detail.next_series_or_exam.series_id}`
        )
        return
      }

      await this.$router.push(
        `/course/test/${this.detail.next_series_or_exam.exam_id}`
      )
    },
    async onPrev() {
      localStorage.setItem(
        'chapters_id',
        this.detail.prev_series_or_exam.chapter_id
      )

      if (this.detail.prev_series_or_exam.series_id) {
        await this.$router.push(
          `/course/series/${this.detail.prev_series_or_exam.series_id}`
        )
        return
      }

      await this.$router.push(
        `/course/test/${this.detail.prev_series_or_exam.exam_id}`
      )
    },
    deleteComment(id) {
      this.$axios.delete(`reviews/${id}`).then((response) => {
        console.log(response)
        this.$store.dispatch('course_series_reviews/set', this.$route.params.id)

        this.$notification.success({
          message: 'Ваш комментарий успешно удален',
        })
      })
    },
    reviewComment(id) {
      this.select_comment = id
      this.modal_review = true
    },
    updateComment(data) {
      this.select_update_comment = data
      this.modal_update = true
    },
  },

  computed: {
    ...mapGetters({
      detail: 'course_series/detail',
      list: 'course_series/detail',
      path: 'course_series/path',
      reviews: 'course_series_reviews/data',
      isLoading: 'course_series_reviews/isLoading',
    }),
  },
}
</script>

<style scoped lang="scss">
._children {
  padding-left: 30px;
}

._next {
  width: 100%;
  display: flex;
  padding: 15px 0;

  .btn-blue {
    height: 40px;
    min-width: auto;
    font-weight: normal;
    margin-right: 15px;
  }
}

.select {
  width: 210px;
  margin: 30px 0;
}

.course-start {
  position: relative;
  padding-top: 100px;
}

._sidebar {
  position: fixed;
  top: 150px;
  left: 0;
  background: #ffffff;
  width: 250px;
  height: 100vh;
  border-right: 1px solid #e0e0e0;

  ._title {
    padding: 30px 25px 10px;

    p {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #0b132a;
    }
  }

  ul {
    li {
      list-style: none;
      padding: 15px 25px;
      transition: all 0.3s;
      cursor: pointer;

      display: grid;
      grid-template-columns: 20px 1fr;
      grid-gap: 20px;

      p {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #0b132a;

        span {
          font-weight: 300;

          &:last-child {
            font-size: 14px;
          }
        }
      }

      &:hover,
      &.active {
        background: #ecf0f2;
      }
    }
  }
}

._info {
  //display: grid;
  //grid-template-columns: 50px 1fr;
  //grid-gap: 30px;
  padding-bottom: 100px;
  padding-top: 30px;

  p {
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: #0b132a;
  }
}

._comment {
  padding-bottom: 100px;

  ._title {
    font-size: 30px;
    margin: 0 0 15px;
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
  .course-start {
    padding-top: 15px;
  }

  ._next {
    justify-content: space-between;

    .btn-blue {
      margin: 0;
    }
  }

  .container {
    padding: 15px 30px;
  }
  ._sidebar {
    position: relative;
    width: 90%;
    border: 0;
    background: #ffffff;
    box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
    border-radius: 18px;
    left: 5%;
    height: auto;
    top: 0;
  }

  .course-start ._path {
    position: relative;
    top: 0;
    margin-bottom: 20px;
    z-index: auto;
    border: 0;
  }
}
</style>
