<template>
  <div id="app">
    <menu-view></menu-view>
    <transition name="mfade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import MenuView from './menu/menu'

  export default {
    name: 'report-generator',
    components: {
      MenuView
    }
  }
</script>

<style>
  @import '../../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  @import 'assets/custom-bootstrap/css/bootstrap.min.css';
  @import 'assets/main.css';
    /* Transition for the notifications */
  .mfade-enter-active, .mfade-leave-active {
    transition: opacity .3s;
  }
  .mfade-enter, .mfade-leave-to {
    opacity: 0;
  }
</style>
