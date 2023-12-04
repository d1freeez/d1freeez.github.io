<template>
  <div class="_card_review">
    <div class="_user" v-if='!!item.user'>
      <div class="_img">
        <img
          v-if="item['user']['respond_file_path'] === null"
          src="@/assets/images/card.png"
          alt=""
        />
        <img v-else :src="item['user']['respond_file_path']" alt="" />
      </div>
      <div class="_info_card">
        <div class="_date">
          <img src="@/assets/images/icons/calendar.svg" alt="" />
          <span>{{ item['created_at'] | moment('d MMMM yyyy , hh:mm') }}</span>
        </div>
        <p>{{ item['user']['name'] }}</p>
      </div>
    </div>
    <div class="_note">
      <p v-html="item['review']"></p>
    </div>
    <div class='_file' v-if='!!item.attachment'>
      <div v-for='(file,index) in item.attachment' :key='index'>
        <a :href='file.url' target='_blank' class='btn btn-link'><a-icon type='link' /> {{file.name}}</a>
      </div>
    </div>
    <div class='_group'>
      <button
        v-if='answer_btn'
        class="btn btn-link"
        @click="$emit('answer', item.id)"
      >
        Ответить
      </button>
      <button
        v-if='user.id === item.user.id'
        class="btn btn-link_green"
        @click="$emit('update', item)"
      >
        Редактировать
      </button>

      <button
        v-if='user.id === item.user.id'
        class="btn btn-link_red"
        @click="$emit('delete', item.id)"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'comment_review',
  props: ['item', 'answer_btn'],
  computed:{
    ...mapGetters({
      user: 'auth/user'
    })
  }
}
</script>

<style scoped lang="scss">
._card_review {
  padding-bottom: 20px;
  margin-bottom: 25px;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
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

    ._info_card {
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
    padding: 10px 0;
    p {
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      color: #0b132a;
    }
  }

  ._file{
    padding: 15px 0;

    a{
      display: grid;
      grid-template-columns: 15px 1fr;
      grid-gap: 10px;
      align-items: center;
    }
  }

  ._group{
    display: flex;
    align-items: center;

    .btn{
      margin-right: 10px;
    }
  }
}
</style>
