import Vue from 'vue'
// TODO: Bootstrap modal not working, use  https://fr.vuejs.org/v2/examples/modal.html ?
import BootstrapVue from 'bootstrap-vue'

import App from './App'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(BootstrapVue)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
