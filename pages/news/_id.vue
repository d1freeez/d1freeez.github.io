<template>
  <div>
    <div class="news">
      <div class="container">
        <div class="path">
          <ul>
            <li>Новостной блок <span> ></span></li>
            <li>{{ news.title }}</li>
          </ul>
        </div>
        <div class="_title"><p>{{ news.title }}</p></div>
        <div class="news_block">
          <div class="news_block_list">
            <div class="news_date">{{ news.created_at | moment('D.MM.YYYY') }}</div>
            <div class="news_item">
              <div class="news_item_header">
                <img
                  :src="news.photo_path"
                >
              </div>
              <div class="news_item_content">
                <div class="news_item_title">
                  {{ news.title }}
                </div>
                <div class="news_item_date">{{ news.created_at | moment('D MMMM') }}</div>
                <div class="news_item_description" v-html="news.description">

                </div>
                <div class="news_share_links">
                  <span>Поделится:</span>
                  <a :href="'https://www.facebook.com/sharer.php?u='+cur_url" target="_blank">
                    <img src="@/assets/images/icons/ic-facebook.svg">
                  </a>
                  <a :href="'https://twitter.com/share?url='+cur_url+'&text='+news.title"
                     target="_blank"
                  >
                    <img src="@/assets/images/icons/ic-twitter.svg">
                  </a>
<!--                  <a :href="'https://plus.google.com/share?url='+window.location.href" target="_blank">-->
<!--                    <img src="@/assets/images/icons/ic-instagram.svg">-->
<!--                  </a>-->
                  <a :href="'https://plus.google.com/share?url='+cur_url" target="_blank">
                    <img src="@/assets/images/icons/ic-google.svg">
                  </a>
                  <a :href="'https://vk.com/share.php?url='+cur_url" target="_blank">
                    <img src="@/assets/images/icons/ic-vk.svg">
                  </a>

                </div>
              </div>
            </div>
          </div>
          <div class="news_block_rights">
            <span class="news_block_rights_title">Похожие материалы</span>
            <div class="news_block_rights_items">
              <div class="news_block_rights_item" v-for="(item, index) in news_list.data"
                   v-on:click="clickToNews(item)"
                   v-if="item.id!=news.id"
              >
                <div class="news_block_rights_item_img">
                  <img
                    :src="item.photo_path"
                  >
                </div>
                <div class="news_block_rights_item_title">{{ item.title }}</div>
                <div class="news_block_rights_item_data">{{ item.created_at | moment('D.MM.YYYY') }}</div>

              </div>
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
      news: '',
      news_list: '',
      cur_url:window.location.href,
    }
  },
  created () {
    this.getCategories()
    this.getNews()
    this.getNewsList()
  },
  methods: {
    clickToNews (news) {
      this.$router.push({ path: '/news/' + news.id })
    },
    getNewsList (page, date = null, category = null) {
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
        this.news_list = response.data.data
      }).catch(error => {

      })
    },
    getNews () {
      this.$axios
        .get(`/news/` + this.$route.params.id, {
          headers: {
            Authorization: process.env.defaultToken
          }
        })
        .then((response) => {
          this.news = response.data.data
        })
    },
    getCategories () {

    }
  },
  computed: {},
}
</script>

<style scoped lang="scss">
.path li {
  color: #BFBFBF;
  font-size: 16px;
  font-weight: 500;

  span {
    color: #000;
  }

  &:last-child {
    color: #3A3A3A !important;
  }
}

.news {
  padding-bottom: 100px;

  &_share_links {
    span {
      font-family: Rubik;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 199.69%;
      color: #3A3A3A;
    }

    a {
      img {
        width: 20px;
        height: 20px;
        margin: 0px 7px;
        object-fit: cover;
      }
    }
  }

  &_block {
    display: grid;
    grid-template-columns: 70% 30%;
    grid-gap: 30px;

    &_rights {
      &_title {
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 24px;
        color: #000000;
        margin-bottom: 30px;
        display: block;
      }

      &_item {
        margin-bottom: 15px;
        background: #FFFFFF;
        box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04);
        border-radius: 0px 0px 10px 10px;

        &_title {
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          color: #000000;
          margin: 10px;
          margin-bottom: 0px;
        }

        &_data {
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 21px;
          color: #2D9CDB;
          padding: 10px;
        }

        img {
          width: 100%;
          border-radius: 10px 10px 0px 0px;
        }
      }
    }
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

  &_date {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    color: #2D9CDB;
    margin-bottom: 35px;
  }

  ._title {
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      color: #0B132A;
      //margin-bottom: 25px;
      margin-top: 45px;
      max-width: 500px;
    }
  }
}

@media screen and (max-width: 550px) {
  .course ._list {
    grid-template-columns: 1fr 1fr;
  }
  .news {
    &_block {
      display: block;
    }
  }

}
</style>
