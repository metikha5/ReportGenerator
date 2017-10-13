<template>
  <div id="app">
    <menu-view></menu-view>
    <transition name="mfade" mode="out-in">
      <router-view></router-view>
    </transition>
    <notifications animation-type="velocity" :max="4" style="cursor: pointer" />
  </div>
</template>

<script>
  import MenuView from './menu/menu'
  import { mapGetters } from 'vuex'

  export default {
    name: 'report-generator',
    components: {
      MenuView
    },
    computed: mapGetters(['arePlotsModified']),
    mounted() {
      if (process.env.NODE_ENV !== 'development') {
        window.onbeforeunload = (e) => {
          if (this.arePlotsModified) {
            var answer = confirm('Your current file has not been saved, do you really want to close the application ?')
            e.returnValue = answer

            if (answer) {
              require('electron').remote.getCurrentWindow().destroy()
            }
          }
        }
      }
    }
  }
</script>

<style>
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
