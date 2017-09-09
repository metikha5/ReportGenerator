/**
 * Created by BREMEC Michael <michael@bremec.fr> on 8/23/17
 */

export default {
  state: {
    currentNotification: null
  },
  notify(message) {
    // TODO Create components ?
    // TODO if notification is not null, update message and increase time
    // TODO add red style if notification error
    if (this.state.currentNotification === null) {
      this.state.currentNotification = message
      setTimeout(() => { this.state.currentNotification = null }, 3000)
    }
  }
}
