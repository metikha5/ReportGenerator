<template>
  <div class="form-group" :class="{'has-success': isValid, 'has-error': !isValid}">
    <label :for="label" class="col-sm-2 control-label">{{ label }}</label>
    <input :id="label" type="text" class="form-control" v-model="path">
  </div>
</template>

<script>
import { existsSync } from 'fs'

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
  }
}
</script>
