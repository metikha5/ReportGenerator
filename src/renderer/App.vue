<template>
  <div id="app">
    <menu-view></menu-view>
    <base-view></base-view>
    <python-generator></python-generator>
  </div>
</template>

<script>
  import MenuView from './menu/menu'
  import BaseView from './base/base'
  import PythonGenerator from './build/python-generator'

  export default {
    name: 'report-generator',
    components: {
      MenuView,
      BaseView,
      PythonGenerator
    }
  }
</script>

<style>
  @import '../../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  @import 'assets/custom-bootstrap/css/bootstrap.min.css';
  @import 'assets/main.css';
</style>
