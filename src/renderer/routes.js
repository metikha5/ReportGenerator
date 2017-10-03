import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

export default new VueRouter({
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
