import Vue from 'vue'
import VueRouter from 'vue-router'
import Paginate from 'vuejs-paginate'
import App from './App.vue'


Vue.use(VueRouter)
Vue.component('paginate', Paginate)

import router from './router/index'
import store from './store/index'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
