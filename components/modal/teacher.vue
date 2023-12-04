<template>
  <div class="modal regis" :class="open ? 'active' : ''">
    <div class="modal-block">
      <div class="_title">
        <p>Заявка</p>
        <span @click="onClose">+</span>
      </div>
      <div class="input" :class="error.surname ? 'error' : ''">
        <input type="text" placeholder="Фамилия*" v-model="surname">
      </div>
      <div class="input" :class="error.name ? 'error' : ''">
        <input type="text" placeholder="Имя*" v-model="name" @input="() => {
          name === '' ? error.name = true: error.name = false
        }">
      </div>
      <div class="input">
        <input type="text" placeholder="Отчество" v-model="patronymic">
      </div>
      <div class="input" :class="error.phone ? 'error' : ''">
        <input type="text" placeholder="Телефон*" v-model="phone" @input="() => {
          phone === '' ? error.phone = true: error.phone = false
        }">
      </div>
      <div class="input" :class="error.email ? 'error' : ''">
        <input type="text" placeholder="Email*" v-model="email" @input="() => {
          email === '' ? error.email = true: error.email = false
        }">
        <template v-if="error.email">
          <span>Должен быть e-mail</span>
        </template>
      </div>

      <button class="btn-red" @click="onSubmit">Отправить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Teacher',
  data(){
    return {
      type: 0,
      name: '',
      email: '',
      phone: '',
      surname: '',
      patronymic: '',
      error: {
        surname: false,
        name: false,
        email: false,
        phone: false,
      }
    }
  },
  methods: {
    onClose(){
      this.$emit('close-modal');
    },

    onLogin(){
      this.$emit('open-login');
    },

    async onSubmit(){
      if(this.surname === ''){
        this.error.surname = true;
        return;
      }
      if(this.name === ''){
        this.error.name = true;
        return;
      }
      if(this.phone === ''){
        this.error.phone = true;
        return;
      }
      if(this.email === '' || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)){
        this.error.email = true;
        return;
      }

      try{
        this.error.name = false;
        this.error.phone = false;
        this.error.email = false;
        this.error.surname = false;

        await this.$axios.post('teaching-apps', {
          'name': this.name,
          'surname': this.surname,
          'phone': this.phone,
          'patronymic': this.patronymic,
          'email': this.email,
        },{
          headers: {
            Authorization: process.env.defaultToken
          }
        }).then((response) => {

          this.$notification.success({
            message: 'Ваша заявка принята, в ближайшее время мы позвоним Вам, либо напишем на электронную почту!',
          });

          this.onClose();
        });
      }catch (e) {
        this.$notification.error({
          message: 'Заявка не отправлена',
        });
      }
    }
  },
  props:['open']
}
</script>

<style scoped lang="scss">
  input{
    font-family: Montserrat;
    font-style: normal;
    font-weight: 400;
    color: #0B132A;

    &::placeholder{
      font-family: Montserrat;
      font-style: normal;
      font-weight: 400;
      color: #0B132A;
    }
  }

  button{
    width: 100%;

    &.btn-white{
      font-family: Montserrat;
      font-weight: 400;
      margin-bottom: 15px;
    }
  }

  .or{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 35px 0;

    p{
      font-family: Montserrat;
      font-weight: 400;
      font-size: 18px;
      color: #0B132A;
      position: relative;
      display: flex;
      align-items: center;

      &:before{
        content: '';
        position: absolute;
        left: -100px;
        width: 90px;
        height: 1px;
        background: #ABABAB;
      }

      &:after{
        content: '';
        position: absolute;
        right: -100px;
        width: 90px;
        height: 1px;
        background: #ABABAB;
      }
    }
  }

  .login{
    padding-top: 20px;
    p{
      font-family: Montserrat;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      color: #0B132A;

      span{
        font-weight: 700;
        transition: all .3s;
        cursor: pointer;

        &:hover{
          color: #F53838;
        }
      }
    }
  }
</style>
