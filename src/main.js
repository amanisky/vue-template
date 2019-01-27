import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import corePlugin from './plugin'

Vue.use(corePlugin)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
