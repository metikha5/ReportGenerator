<template>
  <div id="settings">
    <h3>Paths settings</h3>
    <form id="pathSettings" class="form-horizontale">
      <div class="form-group" :class="{'has-success': ppValid, 'has-error': !ppValid}">
        <label for="pythonPath" class="col-sm-2 control-label">Python</label>
        <input id="pythonPath" type="text" class="form-control" v-model="pythonPath" @input="isppValid">
      </div>
      
      <div class="form-group" :class="{'has-success': gpValid, 'has-error': !gpValid}">
        <label for="generatorPath" class="col-sm-2 control-label">Generator</label>
        <input id="generatorPath" type="text" class="form-control" v-model="generatorPath" @input="isgpValid">
      </div>
      
      <div class="form-group" :class="{'has-success': dpValid, 'has-error': !dpValid}">
        <label for="databasePath" class="col-sm-2 control-label">Default database</label>
        <input id="databasePath" type="text" class="form-control" v-model="databasePath" @input="isdpValid">
      </div>
    </form>
    <router-link :to="{name: 'base'}" tag="button" class="btn btn-sm btn-default pull-right">Close</router-link>
  </div>
</template>

<script>
import { existsSync } from 'fs'

export default {
  name: 'SettingsView',
  data() {
    return {
      ppValid: false,
      gpValid: false,
      dpValid: false,
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
    },
    isppValid() {
      this.ppValid = existsSync(this.pythonPath)
    },
    isgpValid() {
      this.gpValid = existsSync(this.generatorPath)
    },
    isdpValid() {
      this.dpValid = existsSync(this.databasePath)
    }
  },
  created() {
    this.fetchData()
    this.isppValid()
    this.isgpValid()
    this.isdpValid()
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
