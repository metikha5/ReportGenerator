import Vue from 'vue'
import Vuex from 'vuex'
// TODO: Bootstrap modal not working, use  https://fr.vuejs.org/v2/examples/modal.html ?
import BootstrapVue from 'bootstrap-vue'

import App from './App'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store: require('./stores').default,
  components: { App },
  template: '<App/>'
}).$mount('#app')
