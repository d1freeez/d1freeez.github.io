<template>
  <div class="modal login" :class="open ? 'active' : ''">
    <div class="modal-block">
      <div class="_title">
        <p>Сбросить пароль</p>
        <span @click="onClose">+</span>
      </div>
      <div class="input" :class="{'error': error.email}">
        <input type="text" placeholder="Email" v-model="email" @input="() => {
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
  name: 'resetPassword',
  data () {
    return {
      email: '',
      error: {
        email: false
      }
    }
  },
  methods: {
    onClose(){
      this.$emit('close-modal');
    },

    onRegis(){
      this.$emit('open-regis');
    },

    async onSubmit(){
      if(this.email === '' || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
        this.error.email = true;
        return;
      }

      try{
        this.error.email = false;

        await this.$axios.post('auth/reset-password', {
          'email': this.email,
        },{
          headers: {
            Authorization: process.env.defaultToken
          }
        }).then((response) => {
          this.$notification.success({
            message: 'На вашу почту отправлено письмо',
          });

          this.onClose();
        }).catch((error) => {
          this.$notification.error({
            message: 'Такой e-mail не существует',
          });
        });
      }catch (e) {}
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
  .remember{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    p{
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      color: #F53838;
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

  .regis{
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
