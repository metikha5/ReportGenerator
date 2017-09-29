<template>
  <div id="settings">
    <h3>Paths settings</h3>
    <form id="pathSettings" class="form-horizontale">
      <div class="form-group">
        <label for="pythonPath" class="col-sm-2 control-label">Python</label>
        <input id="pythonPath" type="text" class="form-control" v-model="pythonPath">
      </div>
      
      <div class="form-group">
        <label for="generatorPath" class="col-sm-2 control-label">Generator</label>
        <input id="generatorPath" type="text" class="form-control" v-model="generatorPath">
      </div>
      
      <div class="form-group">
        <label for="databasePath" class="col-sm-2 control-label">Default database</label>
        <input id="databasePath" type="text" class="form-control" v-model="databasePath">
      </div>
    </form>
    <router-link :to="{name: 'base'}" tag="button" class="btn btn-sm btn-default pull-right">Close</router-link>
  </div>
</template>

<script>
  export default {
    name: 'SettingsView',
    data() {
      return {
        pythonPath: null,
        generatorPath: null,
        databasePath: null
      }
    },
    methods: {
      saveChanges() {
        this.$store.commit('updatePythonPath', {pythonPath: this.pythonPath})
        this.$store.commit('updateGeneratorPath', {generatorPath: this.generatorPath})
        this.$store.commit('updateDatabasePath', {databasePath: this.databasePath})
      },

      fetchData() {
        this.pythonPath = this.$store.getters.pythonPath
        this.generatorPath = this.$store.getters.generatorPath
        this.databasePath = this.$store.getters.databasePath
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
    }
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
</style>
