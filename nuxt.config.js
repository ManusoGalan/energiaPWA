export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'iLuz',
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
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components/',
    { path: '~/components/icons/', prefix: '' }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: false,
    meta: {
      name: 'iLuz',
      lang: 'es',
      theme_color: '#fcd34d'
    },
    manifest: {
      name: 'iLuz',
      lang: 'es',
      start_url: '/',
      icons: [
        {
          "src": "/images/icon64x64.png",
          "type": "image/png",
          "sizes": "64x64",
          "purpose": "maskable"
        },
        {
          "src": "/images/icon120x120.png",
          "type": "image/png",
          "sizes": "120x120",
          "purpose": "maskable"
        },
        {
          "src": "/images/icon144x144.png",
          "type": "image/png",
          "sizes": "144x144",
          "purpose": "maskable"
        },
        {
          "src": "/images/icon152x152.png",
          "type": "image/png",
          "sizes": "152x152",
          "purpose": "maskable"
        },
        {
          "src": "/images/icon192x192.png",
          "type": "image/png",
          "sizes": "192x192",
          "purpose": "maskable"
        },
        {
          "src": "/images/icon384x384.png",
          "type": "image/png",
          "sizes": "384x384",
          "purpose": "maskable"
        },
        {
          "src": "/images/icon512x512.png",
          "type": "image/png",
          "sizes": "512x512",
          "purpose": "maskable"
        }
      ]
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  ssr: false
}
