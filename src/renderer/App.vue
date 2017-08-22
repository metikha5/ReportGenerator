<template>
  <div id="app">
    <div id="content">
    <base-view></base-view>
    </div>
  </div>
</template>

<script>
  import BaseView from './components/base'

  export default {
    name: 'report-generator',
    components: {
      BaseView
    }
  }
</script>

<style>
  @import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
</style>
