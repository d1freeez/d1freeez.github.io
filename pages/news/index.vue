<template>
  <div>
    <div class="news">
      <div class="container">
        <div class="_title"><p>Новостной блок</p></div>

        <div class="news_block">
          <div class="news_block_list">
            <div class="news_item" v-for="(item, index) in news.data">
              <div class="news_item_header">
                <img
                  :src="item.photo_path"
                >
                <router-link :to="'/'" class="news_item_header_btn">{{ item.category.name }}</router-link>
              </div>
              <div class="news_item_content">
                <div class="news_item_title">
                  {{ item.title }}
                </div>
                <div class="news_item_date">{{ item.created_at | moment('D MMMM') }}</div>
                <div class="news_item_description" v-html="item.short_description">

                </div>
                <div class="news_item_btns">
                  <router-link class="news_item_btn" :to="'/news/'+item.id"> Подробнее</router-link>
                </div>
              </div>
            </div>


            <pagination :data="news" @pagination-change-page="getNews" :limit="limit"
                        show-disabled
            >
          <span slot="prev-nav"><svg width="9" height="12" viewBox="0 0 9 12" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
          >
<path d="M8.16016 1.41L3.58016 6L8.16016 10.59L6.75016 12L0.750156 6L6.75016 0L8.16016 1.41Z" fill="#C4CDD5"/>
</svg>
</span>
              <span slot="next-nav"><svg width="9" height="12" viewBox="0 0 9 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg"
              >
<path d="M0.839844 1.41L5.41984 6L0.839844 10.59L2.24984 12L8.24984 6L2.24984 0L0.839844 1.41Z" fill="#C4CDD5"/>
</svg>
</span>
            </pagination>
          </div>
          <div class="news_block_filter">
            <div class="news_filter_list">
              <div class="news_filter_title">Категории</div>
              <ul class="news_filter_list_ul">
                <li v-on:click="getNews();category='';date=''" :class="category==''?'active':''">Все категории</li>
                <li v-for="cat in categories " v-on:click="getNews(page,date,cat.id);category=cat.id"
                    :class="category==cat.id?'active':''"
                >{{ cat.name }}
                </li>
              </ul>
            </div>
            <div class="news_filter_list">
              <div class="news_filter_title">Дата</div>
              <ul class="news_filter_list_ul">
                <li v-on:click="getNews();category='';date=''" :class="date==''?'active':''">За все время</li>
                <li v-on:click="getNews(page,'year'); date='year'" :class="date=='year'?'active':''">За год</li>
                <li v-on:click="getNews(page,'month'); date='month'" :class="date=='month'?'active':''">За месяц</li>
                <li v-on:click="getNews(page,'week'); date='week'" :class="date=='week'?'active':''">За неделю</li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/card/course'
import { mapGetters } from 'vuex'

export default {
  name: 'news',
  layout: 'main',
  components: {
    Card,
  },
  data () {
    return {
      categories: '',
      news: {},
      limit: 1,
      page: 1,
      date: '',
      category: '',
    }
  },
  created () {
    this.getCategories()
    this.getNews()
  },
  methods: {
    getNews (page, date = null, category = null) {
      if (typeof page === 'undefined') {
        page = 1
      }
      this.$axios.get('/news', {
        params: {
          page: page,
          per: date,
          category_id: category
        },
        headers: {
          Authorization: process.env.defaultToken,
        },
      }).then(response => {
        this.news = response.data.data
      }).catch(error => {

      })
    },
    getCategories () {
      this.$axios
        .get(`/news-categories`, {
          headers: {
            Authorization: process.env.defaultToken
          }
        })
        .then((response) => {
          this.categories = response.data.data
        })
    }
  },
  computed: {}
  ,
}
</script>

<style scoped lang="scss">
.news {
  padding-bottom: 100px;

  &_block {
    display: grid;
    grid-template-columns: 70% 30%;
    grid-gap: 30px;
  }

  &_filter {
    &_list {
      margin-bottom: 40px;

      &_ul {
        font-family: Rubik;
        font-style: normal;
        font-size: 16px;

        .active {
          color: #F53838;
          font-weight: bold;

        }

        li {
          margin-bottom: 5px;
          cursor: pointer;
        }
      }
    }

    &_title {
      font-style: normal;
      font-weight: bold;
      font-size: 22px;
      line-height: 24px;
      color: #000000;
      margin-bottom: 10px;

    }

  }

  &_block_filter {
    background: #F7F9FA;
    border-radius: 10px;
    height: fit-content;
    display: block;
    padding: 25px 30px;
  }

  &_item {
    background: #FFFFFF;
    box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    margin-bottom: 40px;

    &_content {
      padding: 30px;
    }

    &_header {
      position: relative;

      img {
        width: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      &_btn {
        position: absolute;
        right: 25px;;
        top: 25px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 10px;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: #000000;
        padding: 10px 20px;

      }
    }

    &_title {
      font-style: normal;
      font-weight: 500;
      font-size: 22px;
      color: #000000;
    }

    &_date {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 21px;
      color: #2D9CDB;
    }

    &_description {
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      color: #000000;
      padding: 10px 0px;
    }

    &_btn {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: #000000;
    }
  }


  ._list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
  }

  ._title {
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      color: #0B132A;
      margin-bottom: 25px;
      margin-top: 45px;
    }
  }
}

@media screen and (max-width: 550px) {
  .course ._list {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
