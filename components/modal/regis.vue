<template>
  <div class="modal regis" :class="regis ? 'active' : ''">
    <div class="modal-block">
      <div class="_title">
        <p>Регистрация</p>
        <span @click="onClose">+</span>
      </div>

<!--      <div class="tab-type">-->
<!--        <p :class="type === 0 ? 'active' : ''" @click="type = 0">Я ученик</p>-->
<!--        <p :class="type === 1 ? 'active' : ''" @click="type = 1">Я преподователь</p>-->
<!--      </div>-->

      <div class="input" :class="error.surname ? 'error' : ''">
        <input type="text" placeholder="Фамилия*" v-model="surname">
      </div>
      <div class="input" :class="error.name ? 'error' : ''">
        <input type="text" placeholder="Имя*" v-model="name" @input="() => {
          name === '' ? error.name = true: error.name = false
        }">
      </div>
      <div class="input" :class="error.phone ? 'error' : ''">
        <the-mask type="tel" mask="+7(###)###-##-##" placeholder="Телефон*" v-model="phone" @input="() => {
          phone === '' ? error.phone = true: error.phone = false
        }" />
      </div>
      <div class="input" :class="error.email ? 'error' : ''">
        <input type="text" placeholder="Email*" v-model="email" @input="() => {
          email === '' ? error.email = true: error.email = false
        }">
        <template v-if="error.email">
          <span>Должен быть e-mail</span>
        </template>
      </div>
      <div class="input" :class="error.password ? 'error' : ''">
        <input type="password" placeholder="Пароль*" v-model="password" @input="() => {
          password === '' ? error.password = true: error.password = false
        }">
        <template v-if="error.password && password.length < 6">
          <span>Пароль должен состоять из 6 символов</span>
        </template>
      </div>

      <button class="btn-red" @click="onSubmit">Зарегистрируйся</button>

<!--      <div class="or"><p>или</p></div>-->

<!--      <button class="btn-white"><a-icon type="google" /> Войти с помощью Google</button>-->
<!--      <button class="btn-white"><a-icon type="facebook" theme="filled" /> Войти с помощью Facebook</button>-->

      <div class="login">
        <p>Есть аккаунт? <span @click="onLogin">Войдите</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data(){
    return {
      type: 0,
      name: '',
      email: '',
      phone: '',
      password: '',
      surname: '',
      patronymic: '',
      error: {
        surname: false,
        name: false,
        email: false,
        phone: false,
        password: false,
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
      if(this.password === '' || this.password.length < 6){
        this.error.password = true;
        return;
      }

      this.error.name = false;
      this.error.phone = false;
      this.error.email = false;
      this.error.password = false;

      await this.$axios.post('auth/register', {
        'name': this.name,
        'surname': this.surname,
        'phone': '+7' + this.phone,
        'email': this.email,
        'password': this.password,
      },{
        headers: {
          Authorization: process.env.defaultToken
        }
      }).then((response) => {
        // this.$store.dispatch('auth/setTokenLocal', response.data.access_token);
        // this.$store.dispatch('auth/setUser');

        this.$notification.success({
          message: 'Регистрация',
          description: 'Подтвердите адрес вашей электронной почты',
        });

        this.onClose();
        // this.$router.push({name: 'course'})
      }).catch(error => {
        const errorMessage = JSON.parse(error.request.response)
        if(errorMessage.errors) errorMessage.errors.email.forEach(e => {
          this.$notification.error({
            message: e,
          });
        })
      })
    }
  },
  props:['regis']
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
