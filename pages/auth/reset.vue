<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="_title">
        <p>Сбросить пароль</p>
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


      <div class="login-link">
        <p>Спомнили? <span @click="onLogin">Войдите</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'main',
    data() {
      return {
        email: '',
        error: {
          email: false
        }
      }
    },
    methods: {
      onLogin() {
        this.$router.push('/auth/login')
      },

      async onSubmit() {
        if (this.email === '' || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
          this.error.email = true;
          return;
        }

        try {
          this.error.email = false;

          await this.$axios.post('auth/reset-password', {
            'email': this.email,
          }, {
            headers: {
              Authorization: process.env.defaultToken
            }
          }).then((response) => {
            this.$notification.success({
              message: 'На вашу почту отправлено письмо',
            });

            this.$router.push({
                name: 'auth-login'
            })
          }).catch((error) => {
            this.$notification.error({
              message: 'Такой e-mail не существует',
            });
          });
        } catch (e) {}
      }
    },
  }
</script>

<style scoped lang="scss">
  .login {
    height: calc(100vh - 80px);
    display: flex;
    justify-content: center;
    align-items: center;

    &-wrapper {
      padding: 25px 40px;
      background: #FFFFFF;
      border-radius: 13px;
      width: 465px;
      box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
    }

    ._title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      p {
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        color: #0B132A;
      }
    }

    .input {
      margin-bottom: 20px;
    }
  }

  input {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 400;
    color: #0B132A;

    &::placeholder {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 400;
      color: #0B132A;
    }
  }

  .remember {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    p {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      color: #F53838;
    }
  }

  button {
    width: 100%;

    &.btn-white {
      font-family: Montserrat;
      font-weight: 400;
      margin-bottom: 15px;
    }
  }

  .or {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 35px 0;

    p {
      font-family: Montserrat;
      font-weight: 400;
      font-size: 18px;
      color: #0B132A;
      position: relative;
      display: flex;
      align-items: center;

      &:before {
        content: '';
        position: absolute;
        left: -100px;
        width: 90px;
        height: 1px;
        background: #ABABAB;
      }

      &:after {
        content: '';
        position: absolute;
        right: -100px;
        width: 90px;
        height: 1px;
        background: #ABABAB;
      }
    }
  }

  .regis {
    padding-top: 20px;

    p {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      color: #0B132A;

      span {
        font-weight: 700;
        transition: all .3s;
        cursor: pointer;

        &:hover {
          color: #F53838;
        }
      }
    }
  }

  .login-link {
    padding-top: 20px;

    p {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      color: #0B132A;

      span {
        font-weight: 700;
        transition: all .3s;
        cursor: pointer;

        &:hover {
          color: #F53838;
        }
      }
    }
  }

  @media screen and (max-width: 550px) {
    .login {
      height: calc(100vh - 155px);
      margin-top: 155px;
    }

    .regis.link {
      display: block;
    }
  }
</style>
