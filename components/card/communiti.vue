<template>
  <div>
    <a target="_blank" :href="data['link']">
      <div class="communiti-card">
        <img v-if="data['respond_file_path'] !== null" :src="data['respond_file_path']" alt="">
        <img v-else src="@/assets/images/icons/commun_1.png" alt="">

        <div class="_info">
          <p>{{data['name'] || '...'}}</p>
            <span>Перейти в телеграм <img src="@/assets/images/icons/arrow_right.png" alt=""></span>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'comuniti-card',

  props:['data'],

  data(){
    return {}
  }
}
</script>

<style scoped lang="scss">
.communiti-card{
  box-shadow: 0px 16px 51px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  min-height: 220px;
  width: 100%;
  transition: all .3s;
  cursor: pointer;
  position: relative;
  top: 0;
  background: #FFFFFF;

  &:hover{
    ._info{
      p{
        color: #F53838;
      }
    }
  }

  > img{
    width: 140px;
    height: 140px;
    object-fit: contain;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
  }

  ._info{
    padding: 15px 25px;

    p{
      margin-bottom: 10px;
      font-style: normal;
      font-weight: bold;
      font-size: 22px;
      line-height: 24px;
      color: #0B132A;
      max-lines: 2;
    }

    span{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 30px;
      color: #0B132A;

      img{
        width: 18px;
      }
    }
  }
}
</style>
