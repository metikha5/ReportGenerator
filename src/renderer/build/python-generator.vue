<template>
  <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <button class="btn btn-default btn-sm" @click="stop">Stop execution</button>
              <button type="button" class="close" @click="closeModal"><span>&times;</span></button>
            </div>

            <div class="modal-body">
                <div id="output-countainer">
                  <div v-for="item in output" :class="`output-${item.type}`">{{ item.message }}</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { spawn } from 'child_process'

  import EventBus from '../global/event-bus'
  import Settings from '../settings/settings.store'
  import FileHandler from '../global/file-handler'

  export default {
    name: 'pythonGenerator',
    data() {
      return {
        childProccess: null,
        showModal: false,
        output: []
      }
    },
    mounted() {
      EventBus.$on('runGeneratorScript', this.openModal)
    },
    methods: {
      openModal() {
        try {
          this.run()
          this.showModal = true
        } catch (e) {}
      },

      closeModal() {
        this.stop()
        this.showModal = false
      },

      run() {
        //
        // TODO: Important run does not work with current py file
        //

        // TODO: detached mode ? https://trello.com/c/1TLsNd5K
        this.childProccess = spawn(Settings.state.pythonPath, ['-u', Settings.state.generatorPath, FileHandler.selectedFile, Settings.state.databasePath])
        this.childProccess.stdout.setEncoding('utf8')

        const scrollDown = () => {
          const el = document.getElementById('output-countainer')
          el.scrollTop = el.scrollHeight
        }

        this.output.push({
          type: 'info',
          message: `Execute: ${Settings.state.pythonPath} ${Settings.state.generatorPath} ${FileHandler.selectedFile} ${Settings.state.databasePath}`
        })

        this.childProccess.stdout.on('data', (data) => {
          this.output.push({type: 'out', message: data})
          scrollDown()
        })

        this.childProccess.stderr.on('data', (data) => {
          // TODO log message function https://trello.com/c/X92QXXQ0
          let message
          if (typeof data === 'object') {
            message = new TextDecoder('utf-8').decode(data)
          } else {
            message = data
          }

          if (message.indexOf('\n') !== -1) {
            const splt = message.split('\n')
            for (const chunk of splt) {
              this.output.push({type: 'err', message: chunk})
            }
          } else {
            this.output.push({type: 'err', message: message})
          }

          scrollDown()
        })

        this.childProccess.on('close', (code) => {
          let message
          if (code === null) {
            message = 'Proccess stopped'
          } else {
            message = `Process exited with code ${code}`
          }
          this.output.push({type: 'info', message: message})
          scrollDown()
        })
      },

      stop() {
        if (this.childProccess !== null) {
          this.childProccess.kill()
          this.childProccess = null
        }
      }
    }
  }
</script>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: bottom;
  }

  .modal-container {
    width: 100%;
    height: 33%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }

  .close,
  .close:hover,
  .close:focus {
    color: black;
    outline: none;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  #output-countainer {
    overflow-y: auto;
    height: 180px;
  }

  .output-err {
    color: #f51300;
  }
  .output-info {
    color: #3d76f5
  }
</style>
