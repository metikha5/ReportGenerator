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
        <p class="navbar-text small selected-file" v-if="selectedFileDisplay !== ''">
          <span v-if="arePlotsModified" @mouseover="overFilename = true" @mouseout="overFilename = false">
            <b>{{ selectedFileDisplay }}</b> <span v-if="overFilename">(file not saved)</span>
          </span>
          <span v-else>{{ selectedFileDisplay }}</span>
        </p>
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
        selectedFileDisplay: '',
        overFilename: false
      }
    },
    computed: mapGetters(['plotsEmpty', 'arePlotsModified', 'plots', 'areSettingsValid']),
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
            this.$notify({type: 'success', title: 'File loaded !', text: `${path.basename(FileHandler.selectedFile)} has correctly been loaded`})
            this.updateDisplayedFile()
          }, (e) => {
            logger.error(`Error while loading file: ${FileHandler.selectedFile}\n${e}`)
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
        })
      },

      saveFile(notify=true) {
        FileHandler
          .saveFile(this.plots.map((p) => p.toJSON()))
          .then(() => {
            this.$store.commit('resetPlotsModified')
            if (notify) {
              this.$notify({type: 'success', title: 'File saved !', text: `${this.selectedFileDisplay} has correctly been saved`})
            }
          }, (err) => {
            if (notify) {
              logger.error(`Error saving file: ${FileHandler.selectedFile} ->\n${err}`)
            }
          })
      },

      updateDisplayedFile() {
        this.selectedFileDisplay = path.basename(FileHandler.selectedFile)
      },

      executeGenerator() {
        if (FileHandler.selectedFile === null) {
          this.$notify({type: 'error', title: 'No file selected !', text: 'No definition file selected. Please load or create one and try again'})
          return
        }

        if (!this.areSettingsValid) {
          this.$notify({type: 'error', title: 'Invalid settings', text: 'Error found in settings: please visit the settings section to fix it'})
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
    margin-top: 22px;
  }

  .white-divider {
    border-left: solid 1px #c4c4c4;
    height: 30px;
    margin-left: 0;
    margin-right: -5px;
  }
</style>
