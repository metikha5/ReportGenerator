<template>
  <nav class="navbar navbar-default" id="menu">
    <div class="container-fluid">
      <div class="navbar-header">
        <div>
          <span class="navbar-brand" style="cursor: default">Report generator</span>
        </div>
      </div>

      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav main-nav">
          <li><a href="#" @click="newDefinition"><span class="glyphicon glyphicon-file icon" ></span> New</a></li>
          <li class="divider"></li>
          <li><a href="#" @click="loadFile"><span class="glyphicon glyphicon-folder-open icon"></span> Load</a></li>
          <li class="divider"></li>
          <li><a href="#" @click="saveFile"><span class="glyphicon glyphicon-floppy-disk icon-shift"></span> Save</a></li>
          <li class="divider"></li>
          <li><a href="#" @click="executeGenerator"><span class="glyphicon glyphicon-play icon-shift"></span> Run</a></li>
        </ul>
        <p class="navbar-text small selected-file" v-if="selectedFileDisplay !== ''">{{ selectedFileDisplay }}</p>

        <div class="nav navbar-nav navbar-right">
          <transition name="fade">
            <p class="navbar-text" v-if="notification !== null">
              {{ notification }}
            </p>
          </transition>
        </div>
      </div>

    </div>
  </nav>
</template>

<script>
  import path from 'path'
  import { mapGetters } from 'vuex'

  import EventBus from '../global/event-bus'
  import FileHandler from '../global/file-handler'

  export default {
    name: 'MenuView',
    data() {
      return {
        selectedFileDisplay: ''
      }
    },
    computed: mapGetters(['notification']),
    methods: {
      // TODO: Test each method in details
      loadFile() {
        if (this.$store.state.plot.plots.length !== 0 && this.$store.state.plot.arePlotsModified && FileHandler.selectedFile !== null) {
          this.saveFile(false)
        }

        FileHandler
          .readFile()
          .then((rawPlots) => {
            // Reset app
            EventBus.$emit('basicReset')

            this.$store.commit('createFromList', {rawPlots})
            this.$store.dispatch('notify', {notification: 'File loaded !'})
            this.updateDisplayedFile()
          }, (e) => {
            this.$store.dispatch('notify', {notification: e})
          })
          .then(() => {
            // TODO: TO UPDATE WITH VUEX
            this.$store.commit('resetPlotsModified')
          })
      },

      newDefinition() {
        if (FileHandler.selectedFile !== null && this.$store.state.plot.arePlotsModified) {
          // if (!confirm('Current file has not been saved, you will loose your changes !\nDo you want to continue ?')) {
          //   return
          // }
          // Is it better to auto-save the file or to notify the user ?
          this.saveFile(false)
        }

        // Ask the user to create a new file
        FileHandler.selectedFile = null
        FileHandler.create().then(() => {
          this.updateDisplayedFile()

          // Reset main view
          this.$store.commit('reset')
          EventBus.$emit('basicReset')
        }, (err) => {
          this.$store.dispatch('notify', {notification: err})
        })
      },

      saveFile(notify=true) {
        FileHandler
          .saveFile(this.$store.state.plot.plots.map((p) => p.toJSON()))
          .then(() => {
            this.$store.commit('resetPlotsModified')
            if (notify) {
              this.$store.dispatch('notify', {notification: 'File saved !'})
            }
          }, (err) => {
            if (notify) {
              console.log(err)
              this.$store.dispatch('notify', {notification: err})
            }
          })
      },

      updateDisplayedFile() {
        this.selectedFileDisplay = path.basename(FileHandler.selectedFile)
      },

      executeGenerator() {
        if (FileHandler.selectedFile === null) {
          alert('No definition file selected. Please load or create one.')
          return
        }

        if (this.$store.state.plot.arePlotsModified === true) {
          this.saveFile(false)
        }
        EventBus.$emit('runGeneratorScript')
      }
    }
  }
</script>

<style>
  .main-nav {
    margin-left: 20px;
  }

  .icon {
    margin-right: 8px;
  }

  .icon-shift {
    margin-right: 5px;
    margin-top: 5px;
  }

  .selected-file {
    margin-top: 18px;
  }

  /* Transition for the notifications */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
