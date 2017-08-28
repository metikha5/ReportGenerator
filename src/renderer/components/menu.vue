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
          <!--<li><a href="#" @click="saveFile"><span class="glyphicon glyphicon-floppy-disk icon" style="margin-right: 5px; margin-top: 3px;"></span> Save</a></li>-->
          <li class="divider"></li>

          <li><a href="#" @click="executeGenerator"><span class="glyphicon glyphicon-play icon-shift"></span> Run</a></li>
          <!--<li><a href="#" @click="doRun"><span class="glyphicon glyphicon-play icon-shift"></span> Run</a></li>-->
          <!--<li><a href="#" @click="terminateSubProcess"><span class="glyphicon glyphicon-stop icon-shift"></span> Stop</a></li>-->
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

  import EventBus from './eventBus'
  import FileHandler from '../generics/file-handler'
  import Plots from '../stores/plots'
  import Notifications from '../stores/notifications'

  export default {
    name: 'MenuView',
    data() {
      return {
        selectedFileDisplay: '',
        notification: Notifications.state.currentNotification
      }
    },
    methods: {
      // TODO: Test each method in details
      loadFile() {
        if (Plots.state.plots.length !== 0 && Plots.state.plotsModified) {
          if (!confirm('Current file has not been saved, you will loose your changes !\nDo you want to continue ?')) {
            return
          }
        }

        FileHandler
          .readFile()
          .then((data) => {
            // Reset app
            EventBus.$emit('basicReset')

            Plots.createFromList(data)
            this.selectedFileDisplay = path.basename(FileHandler.selectedFile)
          })
          .then(() => {
            Plots.state.plotsModified = false
          })
      },

      newDefinition() {
        if (FileHandler.selectedFile !== null && Plots.state.plotsModified) {
          if (!confirm('Current file has not been saved, you will loose your changes !\nDo you want to continue ?')) {
            return
          }
        }

        FileHandler.selectedFile = null
        Plots.reset()
        EventBus.$emit('basicReset')
      },

      saveFile() {
        // todo: Prevent save if nothing has been loaded ?
        // TODO: TO TEST
        FileHandler
          .saveFile(Plots.state.plots.map((p) => p.toJSON()))
          .then(() => {
            EventBus.$emit('plotsUpdated')
            Plots.state.plotsModified = false
          })
      },

      executeGenerator() {
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
