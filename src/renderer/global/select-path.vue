<template>
  <div class="form-group" :class="{'has-success': isValid, 'has-error': !isValid}">
    <label :for="label" class="col-sm-2 control-label">{{ label }}</label>
    <input :id="label" type="text" class="form-control" v-model="path">
    <button @click.prevent="selectFile" class="btn btn-default btn-xs pull-right">...</button>
  </div>
</template>

<script>
import { existsSync } from 'fs'
import { remote } from 'electron'

// const dialog = remote.dialog

export default {
  name: 'SelectPath',
  props: ['value', 'label'],
  computed: {
    path: {
      get() { return this.value },
      set(newValue) {
        this.$emit('update:value', newValue)
      }
    },
    isValid() {
      return existsSync(this.path)
    }
  },
  methods: {
    selectFile() {
      remote.dialog.showOpenDialog((fileNames) => {
        if (fileNames !== undefined) {
          this.path = fileNames[0]
        }
      })
    }
  }
}
</script>
