/**
 * Created by BREMEC Michael <michael@bremec.fr> on 8/23/17
 */

import Plot from '../generics/plot'
import EventBus from '../components/eventBus'

export default {
  state: {
    plots: [],
    plotsModified: false
  },

  addPlot() {
    let p = new Plot()
    p.title = `Plot ${this.state.plots.length + 1}`
    this.state.plots.push(p)
  },

  createFromList(rawPlots) {
    if (this.state.plots.length !== 0) {
      this.reset()
    }

    // Create set of Plot based on a list of objects
    for (let v of rawPlots) {
      // noinspection JSUnfilteredForInLoop
      this.state.plots.push(new Plot(v.title, v.date_begin, v.date_end, v.curves))
    }
  },

  reset() {
    this.state.plots = []
    this.state.plotsModified = false
    EventBus.$emit('plotsUpdated')
  }
}
