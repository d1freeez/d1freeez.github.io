<template>
  <div class="modal login" :class="open ? 'active' : ''">
    <div class="modal-block">
      <div class="_title">
        <p>Обновить пароль</p>
        <span @click="onClose">+</span>
      </div>
      <div class="input" :class="{'error': error.old_password}">
        <input type="text" placeholder="Старый пароль" v-model="old_password" @input="() => {
          old_password.length < 6 ? error.old_password = true: error.old_password = false
        }">
        <template v-if="error.old_password && password.length < 6">
          <span>Пароль должен состоять из 6 символов</span>
        </template>
      </div>
      <div class="input" :class="{'error': error.password}">
        <input type="text" placeholder="Новый пароль" v-model="password" @input="() => {
          password.length < 6 ? error.password = true: error.password = false
        }">
        <template v-if="error.password && password.length < 6">
          <span>Пароль должен состоять из 6 символов</span>
        </template>
      </div>
      <div class="input" :class="{'error': error.email}">
        <input type="text" placeholder="Повторите новый пароль" v-model="confirm_password" @input="() => {
          confirm_password === password ? error.confirm_password = false : error.confirm_password = true
        }">
        <template v-if="error.confirm_password">
          <span>Пароли не совпадают</span>
        </template>
      </div>

      <button class="btn-red" @click="onSubmit">Обновить</button>
    </div>
  </div>
</template>


<script>
export default {
  name: 'resetPassword',
  data () {
    return {
      old_password: '',
      password: '',
      confirm_password: '',
      error: {
        old_password: false,
        password: false,
        confirm_password: false,
      }
    }
  },
  methods: {
    onClose(){
      this.$emit('close-modal');
    },

    async onSubmit(){
      if(!this.old_password.length){
        this.error.old_password = true;
        return;
      }
      if(!this.password.length){
        this.error.password = true;
        return;
      }
      if(!this.confirm_password.length || this.confirm_password !== this.password){
        this.error.confirm_password = true;
        return;
      }


      if(this.old_password.length && this.password.length && this.confirm_password.length){
        this.error.old_password = false;
        this.error.password = false;
        this.error.confirm_password = false;

        await this.$axios.put('user/update-password', {
          'old_password': this.old_password,
          'password': this.password,
          'password_confirmation': this.confirm_password,
        }).then((response) => {
          this.$notification.success({
            message: 'Ваш пароль успешно обновлен',
          });

          this.onClose();
        }).catch((response) => {
          this.$notification.error({
            message: 'Старый пароль не совпадает',
          });
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
