import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
// TODO: Bootstrap modal not working, use  https://fr.vuejs.org/v2/examples/modal.html ?
import BootstrapVue from 'bootstrap-vue'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.config.productionTip = false

// TODO: Move router in a separated file
const router = new VueRouter({
  mode: 'hash',
  routes: [{
    name: 'base',
    path: '/',
    component: require('./base/base.vue')
  }, {
    name: 'settings',
    path: '/settings',
    component: require('./settings/settings.vue')
  }]
})

/* eslint-disable no-new */
new Vue({
  store: require('./stores').default,
  router,
  components: { App: require('./App.vue') },
  template: '<App/>'
}).$mount('#app')
