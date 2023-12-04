import Vue from 'vue'

const VueVideoPlayer = require('vue-video-player/dist/ssr')
const HLS = require('videojs-contrib-hls')
Vue.use(VueVideoPlayer)
Vue.use(HLS)
