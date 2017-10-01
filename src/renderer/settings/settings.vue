<template>
  <div id="settings">
    <h3>Paths settings</h3>
    <form id="pathSettings" class="form-horizontale">
      <select-path v-for="f in fields" :value.sync="f.value" :label="f.label" :key="f.name"></select-path>
    </form>
    <router-link :to="{name: 'base'}" tag="button" class="btn btn-sm btn-default" id="closeBtn">Close</router-link>
  </div>
</template>

<script>
import SelectPath from '../global/select-path.vue'

export default {
  name: 'SettingsView',
  data() {
    return {
      fields: [
        {name: 'pythonPath', label: 'Python', value: null},
        {name: 'generatorPath', label: 'Generator', value: null},
        {name: 'databasePath', label: 'Default database', value: null}
      ]
    }
  },
  methods: {
    saveChanges() {
      this.$store.dispatch('saveSettings', {fields: this.fields})
    },

    fetchData() {
      for (let field of this.fields) {
        field.value = this.$store.getters[field.name]
      }
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  beforeRouteLeave(to, from, next) {
    this.saveChanges()
    next()
  },
  components: {SelectPath}
}
</script>

<style>
#settings {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2%;
}

#pathSettings {
  margin-top: 4%
}

#closeBtn {
  margin-top: 20px
}
</style>
