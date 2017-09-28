<template>
  <div id="app">
    <menu-view></menu-view>
    <base-view></base-view>
  </div>
</template>

<script>
  import MenuView from './menu/menu'
  import BaseView from './base/base'

  export default {
    name: 'report-generator',
    components: {
      MenuView,
      BaseView
    }
  }
</script>

<style>
  @import '../../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  @import 'assets/custom-bootstrap/css/bootstrap.min.css';
  @import 'assets/main.css';
</style>
