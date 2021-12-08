import axios from 'axios'
import getRoutes from './utils/getRoutes'

const dynamicRoutes = () => {
  return axios
    .get(
      'https://techcrunch.com/wp-json/wp/v2/posts?_fields=id,slug&per_page=100&offset=0'
    )
    .then((res) => {
      return res.data.map((post) => `/blog/${post.slug}`)
    })
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
     // SCSS file in the project
     '~/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    scss: [
      '~assets/scss/helpers/_base.scss',
      '~assets/scss/helpers/_variables.scss',
      '~assets/scss/helpers/_mixins.scss',
      '~assets/scss/helpers/_functions.scss'
    ]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    RAVE_KEY_TEST: process.env.RAVE_KEY_TEST,
  },

  sitemap: {
    hostname: '',
    gzip: true,
    path: '/sitemap.xml',
    cacheTime: 1000 * 60 * 60 * 2,
    trailingSlash: true,
    routes: () => {
      return getRoutes()
    },
  },

  generate: {
    routes: dynamicRoutes,
    fallback: true,
  },
}
