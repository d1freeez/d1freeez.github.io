<template>
  <div class="profile">
    <div class="container">
      <h3 class="_title">Мой профиль</h3>

      <div class="_user">
        <div class="_info">
          <img src="@/assets/images/card.png" alt="">
          <p>Геннадий Сапог</p>
        </div>

        <NuxtLink to="/profile/settings">
          <button class="btn-red">Редактировать профиль</button>
        </NuxtLink>
      </div>

<!--      <div class="_skills">-->
<!--        <h4 class="_title">Опыт работы и образование</h4>-->

<!--        <ul>-->
<!--          <li>-->
<!--            <p>Assistant Web Designer</p>-->
<!--            <span>Начальник отдела / руководитель · Полная занятость (не менее 35 часов в неделю)</span>-->
<!--          </li>-->
<!--          <li>-->
<!--            <p>Уровень образования</p>-->
<!--            <span>Магистр</span>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped lang="scss">
.profile{
  padding-top: 40px;
  padding-bottom: 100px;

  ._title{
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    align-items: center;
    color: #0B132A;
    margin-bottom: 20px;
  }

  ._user{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 45px;

    ._info{
      display: grid;
      grid-template-columns: 120px 1fr;
      grid-gap: 20px;
      align-items: center;

      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
      }

      p{
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        color: #0B132A;

        span{
          display: block;
          font-weight: 300;
          font-size: 18px;

          &:last-child{
            font-size: 14px;
          }
        }
      }
    }
  }

  ._skills{
    padding: 30px;
    background: #FFFFFF;
    box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
    border-radius: 13px;

    ._title{
      font-style: normal;
      font-weight: 500;
      font-size: 22px;
      line-height: 25px;
      color: #0B132A;
      margin-bottom: 35px;
    }

    ul{
      list-style: none;

      li{
        margin-bottom: 20px;
        padding-bottom: 25px;
        border-bottom: 1px solid #DFDFDF;

        &:last-child{
          margin-bottom: 0;
          padding-bottom: 0;
          border: 0;
        }

        p{
          font-style: normal;
          font-weight: normal;
          font-size: 20px;
          line-height: 25px;
          color: #0B132A;
          margin-bottom: 5px;
        }

        span{
          display: block;
          font-style: normal;
          font-weight: 300;
          font-size: 18px;
          line-height: 25px;
          color: #0B132A;
        }
      }
    }
  }
}
</style>
