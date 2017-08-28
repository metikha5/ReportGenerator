<template>
  <textarea class="form-control" v-model="content" rows="15" cols="50"></textarea>
</template>

<script>
  export default {
    name: 'AutocompleteField',
    props: {
      value: String
    },
    data() {
      return {
        content: this.value
      }
    }
  }
</script>

<style>
</style>
