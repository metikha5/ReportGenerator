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
  import { existsSync } from 'fs'

  export default {
    name: 'report-generator',
    components: {
      MenuView
    },
    computed: mapGetters(['arePlotsModified', 'databasePath']),
    mounted() {
      // Prevent to quit if current sheet is not saved
      if (process.env.NODE_ENV !== 'development') {
        window.onbeforeunload = (e) => {
          if (this.arePlotsModified) {
            let answer = confirm('Your current file has not been saved, do you really want to close the application ?')
            e.returnValue = answer

            if (answer) {
              require('electron').remote.getCurrentWindow().destroy()
            }
          }
        }
      }

      // Init database
      if (existsSync(this.databasePath)) {
        this.$store.dispatch('initSuggestions', {databasePath: this.databasePath})
      } else {
        this.$notify({
          type: 'warn',
          duration: 60000,
          title: 'Oh no...',
          text: `No valid database set, we will not be able to help you building your report !
          <br/>
          <a href="#/settings">Select a database now</a>`
        })
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
