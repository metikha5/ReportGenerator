<template>
  <div id="settings">
    <h3>Paths settings</h3>
    <form id="pathSettings" class="form-horizontale">
      <select-path v-for="f in fields" :value.sync="f.value" :label="f.label" :key="f.name" :kind="f.kind"></select-path>
    </form>
    <router-link :to="{name: 'base'}" tag="button" class="btn btn-sm btn-default" id="closeBtn">Close</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SelectPath from '../global/select-path.vue'
import { globalNotifications } from '../mixins'

export default {
  name: 'SettingsView',
  mixins: [globalNotifications],
  computed: mapGetters(['isDatabaseValid', 'databasePath']),
  data() {
    return {
      fields: [
        {name: 'pythonPath', label: 'Python', value: null},
        {name: 'generatorPath', label: 'Generator', value: null},
        {name: 'databasePath', label: 'Default database', value: null, kind: 'database'}  // TODO: Check if kind need to be added to all the elements
      ]
    }
  },
  methods: {
    saveChanges() {
      this.$store.dispatch('saveSettings', {fields: this.fields})

      if (this.isDatabaseValid()) {
        this.$store.dispatch('initSuggestions', {databasePath: this.databasePath})
        this.$notify({group: 'invalidDatabase', clean: true})
      } else {
        this.$store.commit('resetSuggestions')
        this.notifyInvalidDatabase()
      }
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
