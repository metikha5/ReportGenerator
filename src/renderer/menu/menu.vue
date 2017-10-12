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
          <li class="divider"></li>
          <li><router-link :to="{name: 'settings'}"  class="pull-right"><span class="glyphicon glyphicon glyphicon-cog icon-shift"></span> Settings</router-link></li>
        </ul>
        <div class="navbar-text white-divider" v-if="selectedFileDisplay !== ''">&nbsp;</div>
        <p class="navbar-text small selected-file" v-if="selectedFileDisplay !== ''">{{ selectedFileDisplay }}</p>

        <div class="nav navbar-nav navbar-right">
          <transition name="fadeUp">
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
  import logger from '../logging'

  export default {
    name: 'MenuView',
    data() {
      return {
        selectedFileDisplay: ''
      }
    },
    computed: mapGetters(['notification', 'plotsEmpty', 'arePlotsModified', 'plots', 'areSettingsValid']),
    methods: {
      loadFile() {
        if (!this.plotsEmpty && this.arePlotsModified && FileHandler.selectedFile !== null) {
          if (!confirm('Current file has not been saved, you will loose your changes !\nDo you want to continue ?')) {
            return
          }
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
            logger.error(`Error while loading file: ${FileHandler.selectedFile}\n${e}`)
            this.$store.dispatch('notify', {notification: e})
          })
          .then(() => {
            this.$store.commit('resetPlotsModified')
          })
      },

      newDefinition() {
        if (FileHandler.selectedFile !== null && this.arePlotsModified) {
          if (!confirm('Current file has not been saved, you will loose your changes !\nDo you want to continue ?')) {
            return
          }
        }

        // Ask the user to create a new file
        FileHandler.selectedFile = null
        FileHandler.create().then(() => {
          this.updateDisplayedFile()

          // Reset main view
          this.$store.commit('reset')
          this.$store.commit('resetPlotsModified')
          EventBus.$emit('basicReset')
        }, (err) => {
          logger.error(`Error while creating new file: ${err}`)
          this.$store.dispatch('notify', {notification: err})
        })
      },

      saveFile(notify=true) {
        FileHandler
          .saveFile(this.plots.map((p) => p.toJSON()))
          .then(() => {
            this.$store.commit('resetPlotsModified')
            if (notify) {
              this.$store.dispatch('notify', {notification: 'File saved !'})
            }
          }, (err) => {
            if (notify) {
              logger.error(`Error saving file: ${FileHandler.selectedFile} ->\n${err}`)
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

        console.log(this.areSettingsValid)
        if (!this.areSettingsValid) {
          alert('Error found in settings: please visit the settings section to fix it')
          // this.$router.push({name: 'settings'})  // TODO: not correctly working ... unable to find the source of the problem
          return
        }

        if (this.arePlotsModified === true) {
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
    margin-top: 20px;
  }

  .white-divider {
    border-left: solid 1px #c4c4c4;
    height: 30px;
    margin-left: 0;
    margin-right: -5px;
  }
</style>
