<template>
  <div class="body">
    <Header />
    <div class="_content">
      <Nuxt />
    </div>
    <Footer />
    <!-- Yandex.Metrika counter -->
    <script type="text/javascript" >
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(82960072, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true,
        ecommerce:"dataLayer"
      });
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/82960072" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!-- /Yandex.Metrika counter -->
  </div>

</template>

<script>
import Header from '../components/header/course-header'
import Footer from '../components/footer'

  export default {
    data(){
      return {}
    },
    components: {
      Header,
      Footer
    },

    created () {
      this.$fb.enable();
      this.$axios.setHeader('Authorization', `Bearer ${this.$store.getters['auth/token']}`)
    }
  }
</script>

<style scoped>
._content{
  min-height: calc(100vh - 250px);
}

.body{
  padding-top: 80px;
  /*transform: scale(0.8);*/
  /*width: 125vw;*/
  /*background: #ccc;*/
  /*transform-origin: top left;*/
  /*height: 125vh;*/
}

@media screen and (max-width: 550px) {
  .body{
    padding-top: 175px;
  }
}
</style>
