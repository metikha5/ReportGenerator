<template>
  <div id="app">
    <menu-view></menu-view>
    <base-view></base-view>
    <script-execution></script-execution>
  </div>
</template>

<script>
  import MenuView from './components/menu'
  import BaseView from './components/base'
  import scriptExecution from './components/scriptExecution'

  export default {
    name: 'report-generator',
    components: {
      MenuView,
      BaseView,
      scriptExecution
    }
  }
</script>

<style>
  @import '../../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  @import 'assets/custom-bootstrap/css/bootstrap.min.css';
  @import 'assets/main.css';
</style>
