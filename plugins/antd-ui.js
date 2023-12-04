import Vue from 'vue'
import Antd from 'ant-design-vue/lib'
import VueMobileDetection from "vue-mobile-detection";

const moment = require('moment')
require('moment/locale/ru')
import VueTheMask from 'vue-the-mask'
Vue.use(VueMobileDetection)
Vue.use(Antd)
Vue.use(require('vue-moment'), {
  moment
});
Vue.component('pagination', require('laravel-vue-pagination'));

Vue.use(VueTheMask)
