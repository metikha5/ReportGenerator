<template>
  <textarea class="form-control" v-model="content" rows="15" cols="50" @input="change"></textarea>
</template>

<script>
  export default {
    name: 'AutocompleteField',
    props: {
      value: String
    },
    data() {
      return {
        // TODO: value not propagated to parent
        content: this.value,
        oldContent: this.value  // TODO: do a content - oldContent to see what word the user is modifying ?
      }
    },
    methods: {
      change(e) {
        console.log(e)
      }
    }
  }
</script>

<style>
</style>
