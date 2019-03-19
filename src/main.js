import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import ElementUi from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/reset.scss'

Vue.config.productionTip = false

sync(store, router)

Vue.use(ElementUi, { locale })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
