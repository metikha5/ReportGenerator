<template>
  <div id="app">
    <menu-view></menu-view>
    <div class="content">
      <transition name="mfade" mode="out-in">
        <router-view></router-view>
      </transition>
      <notifications :animation-type="'velocity'" :max="4" :group= "'default'" style="cursor: pointer" />
      <database-notification :animation-type="'velocity'" :position="'bottom right'" :max="1" :group="'invalidDatabase'">
        <router-link slot="link" :to="{name: 'settings'}">Select a database now</router-link>
      </database-notification>
    </div>
  </div>
</template>

<script>
  import MenuView from './menu/menu'
  import { mapGetters } from 'vuex'
  import { globalNotifications } from './mixins'
  import databaseNotification from './global/db-notification'

  export default {
    name: 'report-generator',
    mixins: [globalNotifications],
    components: {
      MenuView,
      databaseNotification
    },
    computed: mapGetters(['arePlotsModified', 'databasePath', 'isDatabaseValid']),
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
      if (this.isDatabaseValid()) {
        this.$store.dispatch('initSuggestions', {databasePath: this.databasePath})
      } else {
        this.notifyInvalidDatabase()
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
  .content .btn-xs {
    font-size: 0.9em;
  }
  .content {
    font-size: 0.9em;
  }
</style>
