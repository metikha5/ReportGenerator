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

export default {
  name: 'SelectPath',
//  props: ['value', 'label'],
  props: {
    value: String,
    label: String,
    kind: {
      type: String,
      default: 'file'
    }
  },
  computed: {
    path: {
      get() { return this.value },
      set(newValue) {
        this.$emit('update:value', newValue)
      }
    },
    isValid() {
      if (this.kind === 'file') {
        return existsSync(this.path)
      } else if (this.kind === 'database') {
        return this.$store.getters.isDatabaseValid(this.path)
      }
      return false
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
