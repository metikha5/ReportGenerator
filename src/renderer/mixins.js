const globalNotifications = {
  methods: {
    notifyInvalidDatabase() {
      this.$notify({group: 'invalidDatabase', clean: true})
      this.$notify({
        group: 'invalidDatabase',
        type: 'warn',
        duration: 60000,
        title: 'Oh no...',
        text: 'No valid database set, we will not be able to help you building your report !'
      })
    }
  }
}

export {globalNotifications}
