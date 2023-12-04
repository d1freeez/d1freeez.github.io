<template>
  <div>
    <div v-if="data !== null">
      <div class="header">
        <div class="container">
          <div class="_img-bkg">
            <!--            <img v-if="data['respond_file_path'] === null" src="@/assets/images/card.png" alt=""/>-->
            <!--            <img v-else :src="data['respond_file_path']" alt=""/>-->
          </div>

          <div class="path">
            <ul>
              <li>Обзор <span> ></span></li>
              <li>{{ category['name'] }}</li>
            </ul>
          </div>

          <div class="_info">
            <div class="info_header" :class="teaser==null?'teaser-empty':''">
              <div class="info_header_trailer">
                <template v-if="teaser!=null">
                  <iframe width="100%" height="100%"
                          :src="teaser.youtube_link"
                          title="YouTube video player"
                          frameborder="0" allowfullscreen
                  ></iframe>
                </template>
                <div class="__star" v-if="teaser!=null">
                  <a-rate v-model="rate" @change="onRate"/>
                  <p>{{ data['evaluations_average'] }}</p>
                </div>
              </div>
              <div class="info_header_right">
                <div>
                  <div class="_author">
                    <div class="_img">
                      <img v-if="author['respond_file_path'] === null" src="@/assets/images/card.png" alt=""/>
                      <img v-else :src="author['respond_file_path']" alt=""/>
                    </div>
                    <p>{{ author['name'] }}</p>
                  </div>
                  <div class="info_header_title">
                    <h1>{{ data['name'] }}</h1>
                    <p v-html="data['short_description']"></p>
                  </div>
                </div>

              </div>
            </div>


            <!--            <h3>{{ data['name'] }}</h3>

            <div class="_info-desc">
              <div class="__star">
                <a-rate v-model="rate" @change="onRate"/>
                <p>{{ data['evaluations_average'] }}</p>
              </div>
              <div class="__count" v-if="1+1==4">
                <span>Оценок: {{ data['evaluations_count'] }}</span>
                <span>&#x2219;</span>
                <span>Комментариев: {{ data['reviews_count'] }}</span>
              </div>
            </div>

            <div class="_author">
              <div class="_img">
                <img v-if="author['respond_file_path'] === null" src="@/assets/images/card.png" alt=""/>
                <img v-else :src="author['respond_file_path']" alt=""/>
              </div>
              <p>{{ author['name'] }}</p>
            </div>-->
          </div>
        </div>
      </div>
      <div class="content">
        <div class="nav-tabs" :style="`top: ${hasToken ? 80 : 0}px`">
          <div class="container">
            <scrollactive class="tabs my-nav" :offset="150" :duration="800" bezier-easing-value=".5,0,.35,1">
              <a href="#about" class="scrollactive-item active">О проекте</a>
              <a href="#teacher" class="scrollactive-item">Преподаватели</a>
              <a href="#programma" class="scrollactive-item">Программа курса</a>
              <a href="#comment" class="scrollactive-item">Комментарии</a>
              <a href="#question" class="scrollactive-item">Часто задаваемые вопросы</a>
            </scrollactive>
          </div>
        </div>
        <template v-if="$isMobile()">
          <div class="attach_fixed_block">
            <div class="container">
              <div class="container_block">
                <div class="course_left">
                  <div class="about" id="about">
                    <div class="about_block">
                      <div class="_text">
                        <h3>О проекте</h3>
                        <p v-html="data['description']"></p>
                      </div>
                    </div>
                  </div>
                  <div class="learn">
                    <p class="_title">Чему вы научитесь</p>

                    <ul>
                      <li v-for="(item, index) in data['knowledge']" :key="index" v-html="item['description']"></li>
                    </ul>
                  </div>
                  <div class="skills">
                    <p class="_title">ПРИОБРЕТАЕМЫЕ НАВЫКИ</p>

                    <ul class="tags" v-if="!!skills">
                      <li v-for="(item, index) in skills" :key="index">
                        {{ item['name'] }}
                      </li>
                    </ul>
                  </div>
                  <div class="teacher" id="teacher">
                    <p class="_title">Преподаватель</p>
                    <div class="_card">
                      <div class="_img">
                        <img v-if="author['respond_file_path'] === null" src="@/assets/images/card.png" alt=""/>
                        <img v-else :src="author['respond_file_path']" alt=""/>
                      </div>
                      <div class="_info"
                      >
                        <NuxtLink :to="'/teacher/' + author['id']">
                          <p>{{ author['name'] }}</p>
                        </NuxtLink>
                        <div class="teacher-course">
                          <img src="@/assets/images/icons/certificate.svg" alt=""/>
                          <p>{{ author['courses_count'] }} <span>курсов</span></p>
                        </div>
                      </div>
                    </div>
                    <p class="teacher-course-description" v-html="data['teacher_information']"></p>
                  </div>
                  <div class="programma" id="programma">
                    <p class="_title">Программа курса</p>
                    <p class="_subtitle">
                      <!--              Оценка контента <span>{{ data['evaluations_count'] }}</span>-->
                    </p>

                    <div class="_card">
                      <div v-for="(item, index) in chapters" :key="index" class="_week">
                        <div class="_day">
                          <span>Неделя</span>
                          <p>{{ index + 1 }}</p>
                        </div>
                        <div class="_info">
                          <!--                  <div class="_status">-->
                          <!--                    <img src="@/assets/images/icons/clock-red.svg" alt="">-->
                          <!--                    <p>2 ч. на завершение</p>-->
                          <!--                  </div>-->
                          <h4>{{ item['name'] }}</h4>
                          <p v-html="
                      item['description'] === null ? '...' : item['description']
                    "
                          ></p>
                          <!--                  <span>10 видео ((всего 35 мин.)), 2 материалов для самостоятельного изучения, 3 тестов</span>-->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="comment" id="comment">
                    <p class="_title">
                      {{ reviews.length === 0 ? 'Комментариев нет' : 'Комментарии' }}
                    </p>

                    <template v-if="comment_show">
                      <div class="textarea">
                        <textarea name="" id="" cols="30" rows="10" v-model="comment_text"></textarea>
                      </div>
                      <button class="btn-blue" @click="handlerComment">Оставить</button>
                    </template>
                    <template v-else>
                      <button v-if="hasToken" class="btn-red" @click="comment_show = true">Оставить комментарий</button>
                    </template>

                    <div class="_list" v-if="reviews.length !== 0">
                      <div v-for="(item, index) in reviews" :key="index" class="_card">
                        <div class="_user">
                          <div class="_img">
                            <img v-if="item['user']===null||item['user']['respond_file_path'] === null"
                                 src="@/assets/images/card.png" alt=""
                            />
                            <img v-else :src="item['user']['respond_file_path']" alt=""/>
                          </div>
                          <div class="_info">
                            <div class="_date">
                              <img src="@/assets/images/icons/calendar.svg" alt=""/>
                              <span>{{
                                  item['created_at'] | moment('d MMMM yyyy , hh:mm')
                                }}</span>
                            </div>
                            <p v-if="item['user']">{{ item['user']['name'] }}</p>
                          </div>
                        </div>
                        <div class="_note">
                          <p v-html="item['review']"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="question" id="question">
                    <p class="_title">Часто задаваемые вопросы</p>

                    <div class="collapse">
                      <a-collapse expand-icon-position="right">
                        <a-collapse-panel v-for="(item, index) in question" :key="index" :header="item['question']">
                          <p v-html="item['answer']"></p>
                        </a-collapse-panel>
                      </a-collapse>
                    </div>
                  </div>
                </div>
                <vue-sticky-sidebar class="_ticket" containerSelector=".attach_fixed_block" stickyClass="ticket-fixed">
                  <div class="_card">
                    <div class="_price">
                      <div>

                        <template v-if="data['has_discount']">

                          {{
                            data['discount_price'] === null || data['discount_price'] === 0
                              ? 'Участвовать бесплатно'
                              : parseInt(data['discount_price']) + ' $'
                          }}
                          <br>
                          <span class="discount" v-if="data['has_discount']">{{
                              data['rounded_price'] === null || data['rounded_price'] === 0
                                ? 'Участвовать бесплатно'
                                : parseInt(data['rounded_price']) + ' $'
                            }}</span>
                        </template>
                        <template v-else>
                          {{
                            data['rounded_price'] === null || data['rounded_price'] === 0
                              ? 'Бесплатно'
                              : parseInt(data['rounded_price']) + ' $'
                          }}

                        </template>
                      </div>

                      <div @click="addFav()">
                        <template v-if="favBool">
                          <svg id="color" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512"
                               xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="m11.466 22.776c.141.144.333.224.534.224s.393-.08.534-.224l9.594-9.721c4.001-4.053 1.158-11.055-4.532-11.055-3.417 0-4.985 2.511-5.596 2.98-.614-.471-2.172-2.98-5.596-2.98-5.672 0-8.55 6.984-4.531 11.055z"
                              fill="#f44336"
                            />
                          </svg>
                        </template>
                        <template v-else>
                          <svg id="regular" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24"
                               width="512"
                               xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="m11.466 22.776c.141.144.333.224.534.224s.393-.08.534-.224l9.594-9.721c2.491-2.523 2.491-6.63 0-9.154-1.21-1.226-2.819-1.901-4.532-1.901s-3.321.675-4.531 1.9l-1.065 1.08-1.065-1.079c-1.21-1.226-2.819-1.901-4.531-1.901-1.713 0-3.322.675-4.532 1.901-2.491 2.524-2.491 6.631 0 9.153zm-8.527-17.822c.926-.937 2.157-1.454 3.464-1.454 1.308 0 2.538.517 3.463 1.455l1.599 1.62c.281.285.786.285 1.067 0l1.599-1.621c.928-.937 2.158-1.454 3.465-1.454 1.308 0 2.538.517 3.464 1.454 1.917 1.943 1.917 5.104 0 7.048l-9.06 9.181-9.061-9.182c-1.917-1.942-1.917-5.104 0-7.047z"
                            />
                          </svg>
                        </template>

                      </div>
                    </div>
                    <!--                <div class="_date">Начинается {{ data['start_date'] | moment('D MMMM') }}</div>-->
                    <div class="_btn">
                      <template v-if="!!data['purchased']">
                        <button class="buy" @click="onOpen(data.id, data['name'])">
                          <p>Открыть</p>
                        </button>
                      </template>
                      <template v-else>
                        <button class="buy" @click="onBye(data.id, data['name'])">
                          Поступить на курс
                        </button>
                      </template>
                    </div>
                    <div class="_desc">
                      <div class="_img">
                        <img src="@/assets/images/icons/certificate.svg" alt="">
                      </div>
                      <p>Сертификат, ссылками на который можно делиться с другими людьми <span>Получите сертификат по завершении</span>
                      </p>
                    </div>
                    <div class="_desc">
                      <div class="_img">
                        <img src="@/assets/images/icons/earth.svg" alt="">
                      </div>
                      <p>100% онлайн<span>Начните сейчас и учитесь по собственному графику.</span></p>
                    </div>
                    <div class="_desc" v-if="1+1==3">
                      <div class="_img">
                        <img src="@/assets/images/icons/translate.svg" alt="">
                      </div>
                      <p>
                        Английский<span>Субтитры: Французский, Португальский (бразильский), Русский, Английский, Испанский</span>
                      </p>
                    </div>
                  </div>
                </vue-sticky-sidebar>
              </div>
            </div>
            <div class="container">
              <div class="course" v-if="course.length > 0">
                <p class="_title">Похожие курсы</p>
                <Course :data="course.slice(0, 8)"/>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="container">
            <div class="container_block">
              <div class="course_left">
                <div class="about" id="about">
                  <div class="about_block">
                    <div class="_text">
                      <h3>О проекте</h3>
                      <p v-html="data['description']"></p>
                    </div>
                  </div>
                </div>
                <div class="learn">
                  <p class="_title">Чему вы научитесь</p>

                  <ul>
                    <li v-for="(item, index) in data['knowledge']" :key="index" v-html="item['description']"></li>
                  </ul>
                </div>
                <div class="skills">
                  <p class="_title">ПРИОБРЕТАЕМЫЕ НАВЫКИ</p>

                  <ul class="tags" v-if="!!skills">
                    <li v-for="(item, index) in skills" :key="index">
                      {{ item['name'] }}
                    </li>
                  </ul>
                </div>
                <div class="teacher" id="teacher">
                  <p class="_title">Преподаватель</p>
                  <div class="_card">
                    <div class="_img">
                      <img v-if="author['respond_file_path'] === null" src="@/assets/images/card.png" alt=""/>
                      <img v-else :src="author['respond_file_path']" alt=""/>
                    </div>
                    <div class="_info"
                    >
                      <NuxtLink :to="'/teacher/' + author['id']">
                        <p>{{ author['name'] }}</p>
                      </NuxtLink>
                      <div class="teacher-course">
                        <img src="@/assets/images/icons/certificate.svg" alt=""/>
                        <p>{{ author['courses_count'] }} <span>курсов</span></p>
                      </div>
                    </div>
                  </div>
                  <p class="teacher-course-description" v-html="data['teacher_information']"></p>
                </div>
                <div class="programma" id="programma">
                  <p class="_title">Программа курса</p>
                  <p class="_subtitle">
                    <!--              Оценка контента <span>{{ data['evaluations_count'] }}</span>-->
                  </p>

                  <div class="_card">
                    <div v-for="(item, index) in chapters" :key="index" class="_week">
                      <div class="_day">
                        <span>Неделя</span>
                        <p>{{ index + 1 }}</p>
                      </div>
                      <div class="_info">
                        <!--                  <div class="_status">-->
                        <!--                    <img src="@/assets/images/icons/clock-red.svg" alt="">-->
                        <!--                    <p>2 ч. на завершение</p>-->
                        <!--                  </div>-->
                        <h4>{{ item['name'] }}</h4>
                        <p v-html="
                      item['description'] === null ? '...' : item['description']
                    "
                        ></p>
                        <!--                  <span>10 видео ((всего 35 мин.)), 2 материалов для самостоятельного изучения, 3 тестов</span>-->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="comment" id="comment">
                  <p class="_title">
                    {{ reviews.length === 0 ? 'Комментариев нет' : 'Комментарии' }}
                  </p>

                  <template v-if="comment_show">
                    <div class="textarea">
                      <textarea name="" id="" cols="30" rows="10" v-model="comment_text"></textarea>
                    </div>
                    <button class="btn-blue" @click="handlerComment">Оставить</button>
                  </template>
                  <template v-else>
                    <button v-if="hasToken" class="btn-red" @click="comment_show = true">Оставить комментарий</button>
                  </template>

                  <div class="_list" v-if="reviews.length !== 0">
                    <div v-for="(item, index) in reviews" :key="index" class="_card">
                      <div class="_user">
                        <div class="_img">
                          <img v-if="item['user']===null||item['user']['respond_file_path'] === null"
                               src="@/assets/images/card.png" alt=""
                          />
                          <img v-else :src="item['user']['respond_file_path']" alt=""/>
                        </div>
                        <div class="_info">
                          <div class="_date">
                            <img src="@/assets/images/icons/calendar.svg" alt=""/>
                            <span>{{
                                item['created_at'] | moment('d MMMM yyyy , hh:mm')
                              }}</span>
                          </div>
                          <p v-if="item['user']">{{ item['user']['name'] }}</p>
                        </div>
                      </div>
                      <div class="_note">
                        <p v-html="item['review']"></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="question" id="question">
                  <p class="_title">Часто задаваемые вопросы</p>

                  <div class="collapse">
                    <a-collapse expand-icon-position="right">
                      <a-collapse-panel v-for="(item, index) in question" :key="index" :header="item['question']">
                        <p v-html="item['answer']"></p>
                      </a-collapse-panel>
                    </a-collapse>
                  </div>
                </div>
              </div>
              <vue-sticky-sidebar class="_ticket" containerSelector=".container_block" stickyClass="ticket-fixed">
                <div class="_card">
                  <div class="_price">
                    <div>
                      <template v-if="data['has_discount']">

                        {{
                          data['discount_price'] === null || data['discount_price'] === 0
                            ? 'Участвовать бесплатно'
                            : parseInt(data['discount_price']) + ' $'
                        }}
                        <br>
                        <span class="discount" v-if="data['has_discount']">{{
                            data['rounded_price'] === null || data['rounded_price'] === 0
                              ? 'Участвовать бесплатно'
                              : parseInt(data['rounded_price']) + ' $'
                          }}</span>
                      </template>
                      <template v-else>
                        {{
                          data['rounded_price'] === null || data['rounded_price'] === 0
                            ? 'Бесплатно'
                            : parseInt(data['rounded_price']) + ' $'
                        }}

                      </template>
                    </div>
                    <div @click="addFav()">
                      <template v-if="favBool">
                        <svg id="color" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512"
                             xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m11.466 22.776c.141.144.333.224.534.224s.393-.08.534-.224l9.594-9.721c4.001-4.053 1.158-11.055-4.532-11.055-3.417 0-4.985 2.511-5.596 2.98-.614-.471-2.172-2.98-5.596-2.98-5.672 0-8.55 6.984-4.531 11.055z"
                            fill="#f44336"
                          />
                        </svg>
                      </template>
                      <template v-else>
                        <svg id="regular" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512"
                             xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m11.466 22.776c.141.144.333.224.534.224s.393-.08.534-.224l9.594-9.721c2.491-2.523 2.491-6.63 0-9.154-1.21-1.226-2.819-1.901-4.532-1.901s-3.321.675-4.531 1.9l-1.065 1.08-1.065-1.079c-1.21-1.226-2.819-1.901-4.531-1.901-1.713 0-3.322.675-4.532 1.901-2.491 2.524-2.491 6.631 0 9.153zm-8.527-17.822c.926-.937 2.157-1.454 3.464-1.454 1.308 0 2.538.517 3.463 1.455l1.599 1.62c.281.285.786.285 1.067 0l1.599-1.621c.928-.937 2.158-1.454 3.465-1.454 1.308 0 2.538.517 3.464 1.454 1.917 1.943 1.917 5.104 0 7.048l-9.06 9.181-9.061-9.182c-1.917-1.942-1.917-5.104 0-7.047z"
                          />
                        </svg>
                      </template>

                    </div>
                  </div>
                  <!--                <div class="_date">Начинается {{ data['start_date'] | moment('D MMMM') }}</div>-->
                  <div class="_btn">
                    <template v-if="!!data['purchased']">
                      <button class="buy" @click="onOpen(data.id, data['name'])">
                        <p>Открыть</p>
                      </button>
                    </template>
                    <template v-else>
                      <button class="buy" @click="onBye(data.id, data['name'])">
                        Поступить на курс
                      </button>
                    </template>
                  </div>
                  <div class="_desc">
                    <div class="_img">
                      <img src="@/assets/images/icons/certificate.svg" alt="">
                    </div>
                    <p>Сертификат, ссылками на который можно делиться с другими людьми <span>Получите сертификат по завершении</span>
                    </p>
                  </div>
                  <div class="_desc">
                    <div class="_img">
                      <img src="@/assets/images/icons/earth.svg" alt="">
                    </div>
                    <p>100% онлайн<span>Начните сейчас и учитесь по собственному графику.</span></p>
                  </div>
                  <div class="_desc" v-if="1+1==3">
                    <div class="_img">
                      <img src="@/assets/images/icons/translate.svg" alt="">
                    </div>
                    <p>
                      Английский<span>Субтитры: Французский, Португальский (бразильский), Русский, Английский, Испанский</span>
                    </p>
                  </div>
                </div>
              </vue-sticky-sidebar>
            </div>
          </div>
          <div class="container">
            <div class="course" v-if="course.length > 0">
              <p class="_title">Похожие курсы</p>
              <Course :data="course.slice(0, 8)"/>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div v-else>
      <h1>Loading ...</h1>
    </div>


    <modal ref="modalName" v-if="teaser!=null">
      <template v-slot:header>
        <h1>Трейлер</h1>
      </template>
      <template v-slot:body>
        <iframe width="100%" height="400" :src="teaser.youtube_link"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
        ></iframe>
      </template>

      <template v-slot:footer>
      </template>
    </modal>
  </div>
</template>

<script>
import Course from './../../../components/carousel/course'
import Modal from './../../../components/modal/modal-window'
import vueStickySidebar from 'vue-sticky-sidebar'

import {
  mapGetters
} from 'vuex'

export default {
  name: 'viewCourse',
  layout: 'main',
  data () {
    return {
      favBool: false,
      show: false,
      loading: false,
      rate: 0,
      comment_show: false,
      comment_text: '',
      teaser: null,
    }
  },

  mounted () {
    this.$store.dispatch('my_course/setFavoritesCourse', 0)
    this.$axios
      .get(`/courses/${this.$route.params.id}/trailer`, {
        headers: {
          Authorization: process.env.defaultToken
        }
      })
      .then((response) => {
        this.teaser = response.data.data

      })
    this.rate = this.data?.evaluations_average || 0
    this.$store.dispatch('course/setDetails', [
      this.$route.params.id,
      JSON.parse(localStorage.getItem('user')),
    ])
    this.$store.dispatch('course/setCourse', { page: 1 })
    // this.$store.commit('course/setPrice', 400)
    // progress['price'] = 400
    // this.$store.commit('setCourse', progress)
    // let fav_arr = []
    // for (var i = 0; i < this.favorites.length; i++) {
    //   fav_arr.push(this.favorites[i].id)
    // }
    // if (fav_arr.includes(this.data.id)) {
    //   this.favBool = true
    // } else {
    //   this.favBool = false
    // }
  },
  methods: {
    addFav () {
      this.$axios
        .post(`courses/${this.data.id}/favourite`)
        .then((response) => {
          if (response.data.message == 'Курс добавлен в избранные') {
            this.favBool = true
          } else {
            this.favBool = false
          }
          this.comment_text = ''
          this.$notification.success({
            message: response.data.message,
          })
          this.comment_show = false
        })
    },
    getData () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    handlerComment () {
      this.$axios
        .post(`courses/${this.data.id}/reviews`, {
          review: this.comment_text,
        })
        .then((response) => {
          this.comment_text = ''
          this.$notification.success({
            message: 'Отзыв успешно создан',
          })
          this.comment_show = false
          this.$store.dispatch('course/setDetails', [
            this.$route.params.id,
            JSON.parse(localStorage.getItem('user')),
          ])
        })
    },
    onRate (event) {
      if (this.hasToken) {
        this.$axios
          .post('evaluations', {
            course_id: this.data.id,
            number: event,
          })
          .then((response) => {
            this.$notification.success({
              message: 'Оценка поставлена',
            })
          })
      } else {
        this.$router.push('/auth/signup')
      }
    },
    onOpen (id, name) {
      localStorage.setItem('lessonName', name)
      localStorage.setItem('author', JSON.stringify(this.author))
      this.$router.push(`/course/chapters/${id}`)
    },
    onBye (id, name) {
      if (this.hasToken) {
        if (this.data['price'] || this.data['price'] > 0) {

          this.onPay()
        } else {
          this.$axios
            .post('paid-courses', {
              course_id: this.data.id,
            })
            .then((response) => {
              localStorage.setItem('lessonName', name)
              localStorage.setItem('author', JSON.stringify(this.author))
              this.$router.push(`/course/chapters/${id}`)
            })
        }
      } else {
        this.$router.push('/auth/signup?back_url=' + '/course/' + this.data.id)
        this.$notification.error({
          message: 'Для того чтобы начать обучаться на Oilama Вам необходимо пройти регистрацию',
        })
      }
    },
    onSuccessPay () {
      this.$axios
        .post('paid-courses', {
          course_id: this.data.id,
        })
        .then((response) => {
          localStorage.setItem('lessonName', this.data.name)
          localStorage.setItem('author', JSON.stringify(this.author))
          this.$router.push(`/course/${this.data.id}/congrulations`)
        })
    },
    onPay () {
      let price = this.data['has_discount'] ? this.data['discount_price'] : this.data['rounded_price']
      if (price === null || price === 0) {
        this.onSuccessPay()
      } else {
        this.$axios.get('convert', {
          params: {
            amount: price,
          },
          headers: {
            Authorization: process.env.defaultToken,
          },
        }).then(response => {
          price = response.data.data.amount
          this.onPayCloudPayments(price)
        }).catch(error => {

        })
      }
    },
    onPayCloudPayments (price) {
      let widget = new cp.CloudPayments()
      widget.pay(
        'auth', // или 'charge'
        {
          //options
          publicId: 'pk_e5eddb5a74e4719fd502fb992cbc2', //id из личного кабинета
          description: 'Оплата курса в oilama.com', //назначение
          amount: +price, //сумма
          currency: 'KZT', //валюта
          invoiceId: '', //номер заказа  (необязательно)
          accountId: this.author.email, //идентификатор плательщика (необязательно)
          skin: 'mini', //дизайн виджета (необязательно)
          data: {
            myProp: 'myProp value',
          },
        }, {
          onSuccess: (options) => {
            // success
            this.onSuccessPay()
          },
          onFail: (reason, options) => {
            // fa
            this.$notification.error({
              message: 'Оплата не прошла',
            })
          },
          onComplete: (paymentResult, options) => {
            //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
          },
        }
      )
    }
  },
  computed: {
    ...mapGetters({
      data: 'course/details',
      course: 'course/data',
      author: 'course/author',
      category: 'course/category',
      chapters: 'course/chapters',
      reviews: 'course/reviews',
      skills: 'course/course_skills',
      question: 'course/question',
      hasToken: 'auth/hasToken',
      user: 'auth/user',
      favorites: 'my_course/favorites',
    }),
  },
  watch: {
    favorites (old_val, new_val) {
      let fav_arr = []
      for (var i = 0; i < old_val.length; i++) {
        fav_arr.push(old_val[i].id)
      }
      if (fav_arr.includes(parseInt(this.$route.params.id))) {
        this.favBool = true
      } else {
        this.favBool = false
      }

    }
  },
  components: {
    Course,
    Modal,
    'vue-sticky-sidebar': vueStickySidebar
  },
}
</script>
<style scoped lang="scss">
.attach_fixed_block {
  position: sticky;
}

._ticket {
  ._price {
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    color: #0B132A;
    line-height: 1;
    display: grid;
    grid-template-columns: 85% 10%;

    svg {
      width: 100%;
      height: auto;
    }

    .discount {
      text-decoration: line-through;
      color: #ff5722;
    }
  }

  ._date {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    color: #0B132A;
  }

  .buy {
    width: 100%;
    text-align: center;
    background: linear-gradient(136.1deg, #FF4E50 24.18%, #1A116F 173.45%);
    border-radius: 10px;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    color: #FFFFFF;
    padding: 12px;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 40px;
  }
}

.info {
  &_header {
    display: grid;
    grid-template-columns: 30% 70%;
    grid-gap: 30px;
    padding-bottom: 100px;

    &_title {
      max-width: 770px;

      h1 {
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        color: #FFFFFF;
      }

      p {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #FFFFFF;
      }
    }

    &_trailer {
      max-width: 400px;
      max-height: 220px;;
    }
  }
}

.path {
  z-index: 1000;
  margin-top: 80px;
}

.teacher-course-description {
  margin-top: 20px;
}

.btn-list {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 9;
  padding-bottom: 45px;
}

.btn-teaser {
  border: 0;
  padding: 15px;
  background: #ffffff;
  border-radius: 5px;
  text-align: center;
  position: relative;
  z-index: 9;
  /* margin-bottom: 45px; */
  cursor: pointer;
  margin-left: 20px;
}

.overflow-hidden {
  overflow: hidden;
}

.header {
  position: relative;
  z-index: 0;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(89.91deg,
      #0b132a 25.2%,
      rgba(11, 19, 42, 0) 101.77%);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    z-index: 9;
  }

  ._img-bkg {
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  ._info {
    //padding-top: 30px;
    position: relative;
    z-index: 9;

    ._info-desc {
      display: flex;
      align-items: flex-end;

      .__count {
        display: flex;
        align-items: center;

        span {
          font-family: Montserrat;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 22px;
          color: #ffffff;
          margin-right: 10px;
        }
      }
    }

    .__star {
      display: flex;
      align-items: flex-end;
      margin-right: 20px;
      margin-top: 20px;

      p {
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        color: #ffc107;
        margin-left: 10px;
        line-height: 24px;
      }
    }

    h3 {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      color: #ffffff;
      margin-bottom: 5px;
    }
  }

  ._author {
    display: flex;
    align-items: center;
    //padding-top: 20px;
    padding-bottom: 20px;

    ._img {
      border: 5px solid rgba(255, 255, 255, 0.25);
      border-radius: 50%;
      width: 55px;
      height: 55px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    p {
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 25px;
      color: #ffffff;
      margin-left: 15px;
    }
  }

  .buy {
    border: 0;
    padding: 15px;
    background: #ffffff;
    border-radius: 5px;
    text-align: center;
    position: relative;
    z-index: 9;
    //margin-bottom: 45px;
    cursor: pointer;

    p {
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      color: #0b132a;
    }

    span {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      display: block;
      color: #0b132a;

      &.discount {
        font-size: 14px;
        margin: 0px;
        line-height: 5px;
        text-decoration: line-through;
        color: #faad14;

        &-banner {
          position: absolute;
          left: -10px;
          top: 10px;
          color: #fff;
          background: #52c41a;
          padding: 0px 5px;
          border-radius: 5px;
          transform: rotate(
              -30deg
          );
        }
      }
    }
  }
}

.container_block {
  display: grid;
  grid-template-columns:70%  30%;
  grid-gap: 30px;
  //padding-bottom: 100px;

  ._card {
    padding: 25px 15px;
    background: #ffffff;
    box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
    border-radius: 13px;
    margin-top: 30px;
    height: max-content;

    ._desc {
      display: flex;
      margin-bottom: 25px;

      &:last-child {
        margin-bottom: 0;
      }

      ._img {
        min-width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(245, 56, 56, 0.1);

        img {
          width: 20px;
        }
      }

      p {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 27px;
        color: #0b132a;
        padding-left: 15px;

        span {
          display: block;
          font-weight: 300;
          font-size: 16px;
          line-height: 24px;
          margin-top: 7px;
        }
      }
    }
  }
}

.about {
  padding: 60px 0;
  //display: grid;
  //grid-template-columns: 1fr 380px;
  //grid-gap: 30px;
  &_block {

  }

  ._text {
    p {
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      color: #0b132a;
    }

    h3 {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      color: #0b132a;
      margin-bottom: 20px;
    }
  }

  ._card {
    padding: 25px 15px;
    background: #ffffff;
    box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
    border-radius: 13px;
    margin-top: 30px;
    height: max-content;

    ._desc {
      display: flex;
      margin-bottom: 25px;

      &:last-child {
        margin-bottom: 0;
      }

      ._img {
        min-width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(245, 56, 56, 0.1);

        img {
          width: 20px;
        }
      }

      p {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 27px;
        color: #0b132a;
        padding-left: 15px;

        span {
          display: block;
          font-weight: 300;
          font-size: 16px;
          line-height: 24px;
          margin-top: 7px;
        }
      }
    }
  }
}

.learn {
  padding: 15px 30px;
  background: #ecf0f3;
  border-radius: 13px;
  margin-bottom: 30px;

  ._title {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: rgba(11, 19, 42, 0.6);
    margin-bottom: 15px;
  }
}

.skills {
  margin-bottom: 45px;

  ._title {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: rgba(11, 19, 42, 0.6);
  }
}

.teacher {
  padding-top: 30px;
  padding-bottom: 60px;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 30px;

  ._title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 62px;
    color: #0b132a;
    margin-bottom: 30px;
  }

  ._card {
    display: grid;
    grid-template-columns: 125px 1fr;
    grid-gap: 30px;
    align-items: center;

    ._img {
      img {
        min-width: 125px;
        width: 125px;
        height: 125px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    ._info {
      p {
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        color: #0b132a;
        margin-bottom: 5px;
      }

      a p {
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          color: #f53838;
        }
      }

      span {
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 20px;
        color: rgba(11, 19, 42, 0.6);
      }

      .teacher-course {
        display: flex;
        align-items: center;
        margin-top: 5px;


        img {
          width: 20px;
          margin-right: 10px;
          margin-right: 10px;
        }

        p {
          margin-bottom: 0;
          font-size: 16px;
        }
      }
    }
  }
}

.programma {
  margin-bottom: 75px;

  ._title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    color: #0b132a;
    margin-bottom: 5px;
  }

  ._subtitle {
    margin-bottom: 25px;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 27px;
    color: #0b132a;

    span {
      font-weight: bold;
    }
  }

  ._card {
    padding: 75px 50px;
    background: #ffffff;
    box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
    border-radius: 13px;

    ._week {
      display: grid;
      grid-gap: 90px;
      grid-template-columns: 70px 1fr;
      padding-bottom: 30px;
      margin-bottom: 40px;
      border-bottom: 1px solid #e0e0e0;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border: 0;
      }

      ._day {
        text-align: center;

        span {
          font-style: normal;
          font-weight: 300;
          font-size: 18px;
          line-height: 27px;
          color: #0b132a;
          margin-bottom: 25px;
          display: block;
        }

        p {
          font-style: normal;
          font-weight: 300;
          font-size: 50px;
          line-height: 27px;
          color: #0b132a;
        }
      }

      ._status {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        img {
          width: 25px;
          margin-right: 10px;
        }

        p {
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          text-transform: lowercase;
          color: #f53838;
        }
      }

      ._info {
        h4 {
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 27px;
          color: #0b132a;
          margin-bottom: 10px;
        }

        > p {
          font-style: normal;
          font-weight: 300;
          font-size: 16px;
          line-height: 24px;
          color: #0b132a;
          margin-bottom: 10px;
        }

        > span {
          font-style: normal;
          font-weight: 300;
          font-size: 16px;
          text-transform: lowercase;
          display: block;
          color: #6c717f;
        }
      }
    }
  }
}

.comment {
  margin-bottom: 45px;

  ._title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 62px;
    color: #0b132a;
  }

  .textarea {
    margin-bottom: 15px;
  }

  .btn-red,
  .btn-blue {
    width: 225px;
    padding: 0;
    margin-bottom: 65px;
  }

  ._card {
    padding-bottom: 20px;
    margin-bottom: 25px;
    border-bottom: 1px solid #e0e0e0;

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border: 0;
    }

    ._user {
      display: grid;
      grid-template-columns: 55px 1fr;
      grid-gap: 15px;
      align-items: center;

      ._img {
        border-radius: 50%;
        border: 5px solid rgba(11, 19, 42, 0.25);
        overflow: hidden;
        width: 55px;
        height: 55px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      ._info {
        ._date {
          display: flex;
          align-items: center;

          img {
            height: 18px;
          }

          span {
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.1px;
            color: #6c717f;
            margin-left: 5px;
          }
        }

        p {
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 24px;
          letter-spacing: 0.1px;
          color: #0b132a;
        }
      }
    }

    ._note {
      padding-top: 10px;

      p {
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 24px;
        color: #0b132a;
        padding-bottom: 15px;
      }
    }
  }
}

.question {
  padding-bottom: 70px;

  ._title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 62px;
    color: #0b132a;
    margin-bottom: 20px;
  }
}

.course {
  padding-bottom: 200px;

  ._title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 62px;
    color: #0b132a;
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 560px) {

  .info_header {
    padding-top: 80px;
  }
  header ._info {
    padding-top: 60px;
  }
  .path {
    display: none;
  }
  .about {
    padding-top: 20px;

    &_block {
      grid-template-columns:unset;
    }

    ._text {
      order: 2;
    }

    ._ticket {
      order: 1;
    }
  }

  .info {
    &_header {
      display: block;

      &_trailer {
        max-width: 100%;
        height: 400px;
      }
    }
  }
  .header {
    margin-top: 110px;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(89.91deg,
        #0b132a 25.2%,
        #0b132a 101.77%);
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      z-index: 9;
    }

    .buy {
      width: 100%;
    }

    ._author {
      margin-top: 80px;
    }

    ._info {
      ._info-desc {
        display: block;

        .__star {
          margin-bottom: 10px;
        }
      }
    }
  }

  .programma ._card {
    padding: 15px;

    ._week {
      grid-template-columns: 1fr;
      grid-gap: 10px;

      ._day {
        text-align: left;
        display: flex;
        align-items: flex-end;
        flex-flow: row-reverse;
        justify-content: flex-end;

        p {
          font-size: 30px;
        }

        span {
          margin: 0 0 0 10px;
          line-height: 22px;
        }

        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>

<style>

.content {
  padding-top: 0px !important;
}

@media screen and (max-width: 550px) {
  .content {
    padding-top: 80px !important;
  }

  .ticket-fixed .inner-wrapper-sticky {
    padding-bottom: 0px !important;
    margin-bottom: 0px !important;
  }
}

.ticket-fixed .inner-wrapper-sticky {
  margin-top: 150px;
}

@media screen and (max-width: 560px) {
  .teaser-empty .info_header_trailer {
    display: none;
  }

  ._ticket {
    order: 1;

  }

  ._ticket ._price {
    /*display: block; !important;*/
  }

  .course_left {
    order: 2;
  }

  .container_block {
    grid-template-columns: repeat(1, 1fr) !important;
  }

  .ticket-fixed .inner-wrapper-sticky {
    margin-top: 150px;
    bottom: 0 !important;
    top: unset !important;
  }

  .inner-wrapper-sticky ._desc {
    display: none !important;
  }

  .ticket-fixed .inner-wrapper-sticky {
    z-index: 1000;
  }
}

.teaser-empty {
  display: block !important;
}

.ticket-fixed .inner-wrapper-sticky {
  overflow: inherit;
  margin-bottom: 150px;
  padding-bottom: 150px;
}
</style>
