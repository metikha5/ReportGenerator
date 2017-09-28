<template>
  <div>
    <h3>Paths</h3>
    <form class="form-horizontale">
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
  </div>
</template>

<script>
  export default {
    name: 'SettingsView',
    computed: {
      pythonPath: {
        get() { return this.store.getters.pythonPath() },
        set(newValue) { this.$store.commit('updatePythonPath', {pythonPath: newValue}) }
      },
      generatorPath: {
        get() { return this.store.getters.generatorPath() },
        set(newValue) { this.$store.commit('updateGeneratorPath', {pythonPath: newValue}) }
      },
      databasePath: {
        get() { return this.store.getters.databasePath() },
        set(newValue) { this.$store.commit('updateDatabasePath', {pythonPath: newValue}) }
      }
    }
  }
</script>