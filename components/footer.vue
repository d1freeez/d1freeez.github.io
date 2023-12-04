<template>
  <div class="footer" :style="`padding-top: ${!main ? '35' : '180'}px`">
    <div class="container">
      <div class="_logo">
        <img src="@/assets/images/logo_white.png" alt=""/>
        <p class="footer_text footer_text_p"></p>
        <p>
        <ul class="footer_links">
          <li>
            <router-link :to="'/about'">О компании</router-link>
          </li>
          <li>
            <router-link :to="'/faq'">F.A.Q</router-link>
          </li>
          <li>
            <router-link :to="'/news'">Новостной блок</router-link>
          </li>
          <li>
            <router-link :to="'/course/60'">Как начать вести курсы или “для преподавателей”</router-link>
          </li>
        </ul>
        </p>
      </div>
      <div class="_social">
        <ul>
          <!--          <li><a-icon type="facebook" theme="filled" /></li>-->
          <!--          <li><a-icon type="twitter" /></li>-->
          <a
            href="https://instagram.com/oilama_com?utm_medium=copy_link"
            target="_blank"
          >
            <li>
              <a-icon type="instagram"/>
            </li
            >
          </a>
          <a href="mailto:manager@oilama.com" target="_blank">
            <li>
              <a-icon type="mail"/>
            </li
            >
          </a>
        </ul>
        <p>ТОО «PayDay Service» All rights reserved ©2020 </p>
        <!--        <a target="_blank" href="/pay.pdf">Безопасность онлайн платежей</a>-->
<!--        <br/>-->
        <router-link :to="'/terms-of-use'"
        >Пользовательское соглашение
        </router-link>
        <br/>
        <!--        <a target="_blank" href="/agreement.pdf"-->
        <!--        >Пользовательское соглашение</a-->
        <!--        >-->
      </div>
    </div>
  </div>
</template>

<script>
import Typed from 'typed.js'

export default {
  name: 'Mcvfooter',
  data () {
    return {}
  },
  props: ['main'],

  mounted () {
    new Typed('.footer_text', {
      strings: [
        'Получи сертификацию по своей специальности онлайн',
        'Освой новую профессию с нуля',
        'Развивайся, учись и зарабатывай!',
        'Получай международные сертификаты дома',
        'Сделай первый шаг к своей мечте',
        'Не думай, действуй!',
      ],
      typeSpeed: 90,
      loop: true,
      showCursor: false,
    })
  },
}
</script>

<style scoped lang="scss">
.footer_text_p {
  height: 35px;
}

.footer {

  padding-bottom: 40px;
  padding-top: 180px;
  background: url('./../assets/images/footer.png') bottom;
  background-size: cover;
  position: relative;

  &_links {
    a {
      color: #fff;
    }
  }

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  ._logo {
    img {
      height: 40px;
      margin-bottom: 20px;
    }

    p {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 30px;
      color: #ffffff;
    }
  }

  ._social {
    ul {
      display: flex;
      align-items: center;

      li {
        margin-right: 20px;
        width: 35px;
        height: 35px;
        box-shadow: 0px 13px 18px rgba(17, 19, 35, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #d44356;
        font-size: 14px;
        border-radius: 50%;
        transition: all 0.3s;
        cursor: pointer;
        background: #ffffff;

        &:hover {
        }
      }

      margin-bottom: 30px;
    }

    p,
    a {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 30px;
      text-align: end;
      color: #ffffff;
    }
  }
}

@media screen and (max-width: 550px) {
  ._logo {
    width: 70%;
    //height: 125px;
    p {
      min-height: 50px;
    }
  }

  .footer_text_p {
    height: 45px !important;
    display: block;
    margin-bottom: 10px;
  }
}
</style>
