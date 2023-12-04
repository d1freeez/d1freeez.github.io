<template>
  <div class="settings">
    <div class="container">
      <h3 class="_title">Настройки</h3>

      <div class="block">
        <ul class="_tab">
          <li :class="page === 0 ? 'active' : ''" @click="page = 0">
            <img v-if="page === 0" src="@/assets/images/icons/user_red.svg" alt="">
            <img v-else src="@/assets/images/icons/user.svg" alt="">
            Аккаунт</li>
<!--          <li :class="page === 1 ? 'active' : ''" @click="page = 1">-->
<!--            <img v-if="page === 1" src="@/assets/images/icons/notification_red.svg" alt="">-->
<!--            <img v-else src="@/assets/images/icons/notification.svg" alt="">-->
<!--            Настройки уведомлений</li>-->
        </ul>

        <div v-if="page === 0"  class="_form">
          <h3 class="_title">Аккаунт</h3>
          <div class="grid" v-if="data" style="--column: 2">
            <div class="input">
              <p>Фамилия</p>
              <p v-if="!edit" class="_input-text">{{data['surname'] || ''}}</p>
              <input v-else type="text" placeholder="Фамилия" v-model="surname" @input="onChange">
            </div>
            <div class="input">
              <p>Имя</p>
              <p v-if="!edit" class="_input-text">{{data['first_name'] || ''}}</p>
              <input v-else type="text" placeholder="Имя" v-model="name" @input="onChange">
            </div>
            <div class="input">
              <p>Отчество</p>
              <p v-if="!edit" class="_input-text">{{data['patronymic'] || ''}}</p>
              <input v-else type="text" placeholder="Отчество" v-model="patronymic" @input="onChange">
            </div>
            <div class="input">
              <p>Электронный адрес</p>
                <p v-if="!edit" class="_input-text">{{data['email'] || ''}}</p>
              <input v-else type="text" placeholder="Электронный адрес" v-model="email"  @input="onChange">
            </div>
            <div class="input">
              <p>Телефон</p>
                <p v-if="!edit" class="_input-text">{{data['phone'] || ''}}</p>
              <the-mask type="tel" mask="+7(###)###-##-##"  v-else placeholder="Телефон" v-model="phone"  @input="onChange" />
            </div>
          </div>

          <div class="group_btn">
            <button class="btn-blue" v-if="!edit" @click="()=>{edit = !edit; onResetUserDate()}">Редактировать профиль</button>
            <button class="btn-green" v-else :class="disabled ? 'disabled' : ''" :disabled="disabled" @click="onSubmit">Сохранить</button>

            <button class="btn-white" @click="update_modal = true">Обновить пароль</button>
          </div>

          <div class="_delete">
            <p>Удалить аккаунт</p>
            <span>Если вы удалите свой аккаунт, ваши персональные данные будут удалены с серверов Oilama, а все ваши действия, связанные с курсом, будут обезличены. Кроме того, будут удалены все полученные вами сертификаты. Это действие невозможно отменить!</span>
          </div>

          <button class="btn-red" @click="onConfirm">Удалить</button>
        </div>

        <div v-if="page === 1"  class="_form">
          <h3 class="_title">Настройки уведомлений</h3>

          <div class="checkbox">
            <input type="checkbox" name="" id="check_1">
            <label for="check_1">Еженедельные индивидуальные рекомендации по курсам</label>
          </div>

          <div class="checkbox">
            <input type="checkbox" name="" id="check_2">
            <label for="check_2">Еженедельные уведомления об акциях, новых курсах и программах, а также специальных мероприятиях</label>
          </div>

          <div class="checkbox">
            <input type="checkbox" name="" id="check_3">
            <label for="check_3">Информация о программах получения дипломов бакалавра и магистра онлайн</label>
          </div>

          <div class="checkbox">
            <input type="checkbox" name="" id="check_4">
            <label for="check_4">Опросы, к участию в которых мы высылаем приглашения, помогут нам улучшить материалы Coursera и сделать сайт удобнее для вас</label>
          </div>

          <button class="btn-green" style="margin-top: 30px;">Сохранить</button>
        </div>
      </div>
    </div>
    <UpdatePassword :open="update_modal" @close-modal="update_modal = false"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UpdatePassword from '@/components/modal/update_password'


export default {
name: "settings",
  data(){
    return{
      page: 0,
      email: '',
      name: '',
      surname: '',
      patronymic: '',
      phone: '',
      disabled: true,
      edit: false,
      update_modal: false
    }
  },

  components:{
    UpdatePassword
  },

  computed:{
    ...mapGetters({
      data: 'auth/user'
    })
  },

  methods:{
    onResetUserDate(){
      this.name = this.data.first_name;
      this.email = this.data.email;
      this.surname = this.data.surname;
      this.patronymic = this.data.patronymic;
      this.phone = this.data.phone;
    },

    onChange(){
      if(this.name !== this.data.first_name){
        this.disabled = false;
      }else if(this.email !== this.data.email){
        this.disabled = false;
      }else if(this.phone !== this.data.phone){
        this.disabled = false;
      }else if(this.surname !== this.data.surname){
        this.disabled = false;
      }else if(this.patronymic !== this.data.patronymic){
        this.disabled = false;
      }else{
        this.disabled = true;
      }
    },

    onSubmit(){
      if(!this.disabled) this.$axios.put('user', {
        name: this.name,
        phone: '+7' + this.phone,
        surname: this.surname,
        patronymic: this.patronymic,
        email: this.email
      }).then(response => {
        this.$store.dispatch('auth/setUser');
        this.disabled = true;
        this.edit = false;
        this.$notification.success({
          message: response.data.message,
        });
      })
    },

    onDelete(){
      console.log('delete')
      this.$axios.delete('user').then(response => {
        this.$store.dispatch('auth/logout');

        this.$notification.success({
          message: response.data.message,
        });
      })
    },
    onConfirm(){
      const key = `open${Date.now()}`;
      this.$notification.info({
        message: 'Точно хотите удалить аккаунт',
        btn: h => {
          return h(
            'a-button',
            {
              props: {
                type: 'danger',
                size: 'small',
              },
              on: {
                click: () => {
                  this.$notification.close(key)
                  this.onDelete()
                },
              },
            },
            'Да',
          );
        },
        key,
        onClose: close,
      });
    }
  },
}
</script>

<style scoped lang="scss">

.group_btn{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  width: max-content;
}

.block{
  display: grid;
  grid-template-columns: 320px 1fr;
  grid-gap: 20px;
  padding-bottom: 100px;

  ._tab{
    li{
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 27px;
      color: #0B132A;
      margin-bottom: 25px;
      display: flex;
      align-items: center;
      cursor: pointer;

      img{
        width: 25px;
        height: 25px;
        margin-right: 15px;
      }

      &.active{
        color: #F53838;
      }
    }
  }

  ._form{
    padding: 30px;
    background: #FFFFFF;
    box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
    border-radius: 13px;

    .checkbox{
      margin-bottom: 15px;
    }

    ._title{
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      color: #0B132A;
      margin-bottom: 20px;
    }
  }

  ._input-text{
    width: 100%;
    height: 60px;
    padding: 15px;
    background: #ECF0F3;
    border-radius: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    color: #0B132A;
    display: flex;
    align-items: center;
    margin: 0;
  }

  .grid{
    margin-bottom: 25px;
  }

  ._delete{
    margin-top: 35px;
    padding-top: 30px;
    border-top: 1px solid #DFDFDF;

    p{
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      color: #000000;
      margin-bottom: 5px;
    }

    span{
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      color: #000000;
      display: block;
      margin-bottom: 20px;
    }
  }
}

.settings {
  padding-top: 40px;
  padding-bottom: 100px;

  ._title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    align-items: center;
    color: #0B132A;
    margin-bottom: 55px;
  }
}

@media screen and (max-width: 550px) {
  .group_btn{
    grid-template-columns: 1fr;
    width: 100%;
  }

  .settings{
    h3._title{
      display: none;
    }
  }

  button{
    width: 100%;
  }

  .block{
    display: block;

    .grid{
      grid-template-columns: 1fr;
    }

    ._tab{
      display: none;
    }
  }
}
</style>
