// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primeuix/themes/aura";
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/kinde",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "nuxt-headlessui",
    "@morev/vue-transitions/nuxt",
    "@primevue/nuxt-module",
    '@vue-email/nuxt',
    'nuxt-nodemailer',
  ],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
  headlessui: {
    prefix: "H",
  },
  plugins: [
    '~/plugins/primevue.js'
  ],
  icon: {
    customCollections: [
      {
        prefix: "my-icons",
        dir: "./public/my-icons",
      },
    ],
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: ".p-dark",
        },
      },
      ripple: true,
    },
    autoImport: true,
  },
  
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      dir: 'email-templates',
    },
    nodemailer: {
      host: process.env.SMTP_HOST,
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
      port: 465,
      service: 'Gmail'
    }
  },
  ssr: true,
});