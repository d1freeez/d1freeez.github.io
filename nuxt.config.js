export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  mode: 'spa',
  ssr: false,

  head: {
    title: 'Oilama',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=550px, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'facebook-domain-verification',
        content: 'lufognjesdz23s4t2pshf6xtga26wy'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png'
      }
    ],
    script: [
      { src: 'https://widget.cloudpayments.ru/bundles/cloudpayments' }
    ],
  },
  // server: {
  //   port: 8000, // default: 3000
  //   host: '0.0.0.0' // default: localhost
  // },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'ant-design-vue/dist/antd.css',
    '@/scss/main.scss',
    'video.js/dist/video-js.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/scrollactive',
    '@/plugins/slider-swiper',
    {
      src: '@/plugins/vue-scroll-reveal',
      ssr: false
    },
    {
      src: '@/plugins/player-plugin',
      ssr: false
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['nuxt-facebook-pixel-module', {
      /* module options */
      track: 'PageView',
      pixelId: '3932984320152967',
      autoPageView: true,
      disabled: false,
      pixels: [
        {
          pixelId: '63932984320152967',
          routes: [
            '/course/_id/congrulations'
          ]
        }
      ]
    }],
    ['@nuxtjs/html-minifier', {
      log: 'once',
      logHtml: true
    }]
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'https://db.oilama.com/api/v1'
  },

  env: {
    defaultToken: 'JtBkN9!_R$aqkmKZ'
  },
  build: {
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        removeComments: true,
        preserveLineBreaks: false,
        collapseWhitespace: true
      }
    },
  },

  generate: {
    fallback: true
  }
}
