import { createApp } from 'vue'
import router from './router'
import store from './store'
import i18n from './i18n'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import './assets/scss/variable.scss'

import App from './App.vue'
import './index.css'
import 'animate.css'

// console.log(import.meta.env)
createApp(App).use(router).use(store).use(i18n).use(ElementPlus).mount('#app')
