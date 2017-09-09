/**
 * Created by BREMEC Michael <michael@bremec.fr> on 8/23/17
 */

import Vue from 'vue'

/**
 Global event handler
 Existing events:
   - basicReset: Raised when reseting the app to its default state is needed: only reset some basic values
   - plotsUpdated: Raised when plots are updated by any party
 */
const EventBus = new Vue()
export default EventBus
