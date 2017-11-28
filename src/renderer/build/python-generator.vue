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
                <div v-for="(item, index) in output" :key="index">
                  <span :class="[`output-${item.type}`, {'old-message': index <= oldLimit}]">{{ item.message }}</span>
                </div>
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
  import { mapGetters } from 'vuex'

  import EventBus from '../global/event-bus'
  import FileHandler from '../global/file-handler'
  import logger from '../logging'

  export default {
    name: 'pythonGenerator',
    data() {
      return {
        childProccess: null,
        showModal: false,
        output: [],
        oldLimit: -1
      }
    },
    computed: mapGetters(['pythonPath', 'generatorPath', 'databasePath']),
    mounted() {
      EventBus.$on('runGeneratorScript', this.openModal)
    },
    methods: {
      openModal() {
        if (this.childProccess !== null) {
          return
        }

        try {
          this.run()
          this.showModal = true
        } catch (e) {
          logger.error(`Unknown error openModal python-generator: ${e}`)
        }
      },

      closeModal() {
        this.stop()
        this.showModal = false
        this.oldLimit = this.output.length - 1
      },

      run() {
        this.$notify({group: 'default', title: 'Generator started', text: 'Python generator execution started'})
        logger.info('Python generator execution started')
        this.childProccess = spawn(this.pythonPath, ['-u', this.generatorPath, FileHandler.selectedFile, this.databasePath], {detached: true})
        this.childProccess.stdout.setEncoding('utf8')

        this.output.push({
          type: 'info',
          message: `Execute: ${this.pythonPath} ${this.generatorPath} ${FileHandler.selectedFile} ${this.databasePath}`
        })

        this.childProccess.stdout.on('data', (data) => { this.displayChildMessage('out', data) })

        this.childProccess.stderr.on('data', (data) => { this.displayChildMessage('err', data) })

        this.childProccess.on('close', (code) => {
          let message = code === null ? 'Proccess stopped' : `Process exited with code ${code}`
          this.displayChildMessage('info', message)
          logger.info(`Script execution stopped: ${message}`)
          if (code === 0) {
            this.closeModal()
          }
        })
      },

      stop() {
        if (this.childProccess !== null) {
          this.childProccess.kill()
          this.childProccess = null
        }
      },

      displayChildMessage(type, data) {
        let message = typeof data === 'object' ? new TextDecoder('utf-8').decode(data) : data
        if (type === 'err') {
          logger.error(`Failure during python script execution: ${message}`)
        }

        if (message.indexOf('\n') !== -1) {
          const splt = message.split('\n')
          for (const chunk of splt) {
            this.output.push({type, message: chunk})
          }
        } else {
          this.output.push({type, message})
        }
        const el = document.getElementById('output-countainer')
        el.scrollTop = el.scrollHeight
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
    height: 250px;
  }

  .output-err {
    color: #f51300;
  }
  .output-info {
    color: #3d76f5
  }

  .old-message {
    color: rgb(178, 178, 178);
  }
</style>
