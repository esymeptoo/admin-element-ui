import Vue from 'vue'
import Vuex from 'vuex'

import profile from './profile'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    profile,
  },
  strict: true,
  plugins: [
    store => {
      console.log(store.state)
    },
  ],
})

export default store
