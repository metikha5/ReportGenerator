import Vue from 'vue'
import Vuex from 'vuex'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'

import Tooltip from 'vue-directive-tooltip'
import 'vue-directive-tooltip/css/index.css'
require('vue2-animate/dist/vue2-animate.min.css')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.use(Vuex)
Vue.use(Notifications, { velocity })
Vue.use(Tooltip)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store: require('./stores').default,
  router: require('./routes').default,
  components: { App: require('./App.vue') },
  template: '<App/>'
}).$mount('#app')
