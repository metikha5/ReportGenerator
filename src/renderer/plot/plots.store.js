/**
 * Created by BREMEC Michael <michael@bremec.fr> on 8/23/17
 */

import Plot from './plot-frame'

export default {
  state: {
    plots: [],
    plotsModified: false
  },

  getters: {
    plots: state => state.plots,
    plotsModified: state => state.plotsModified
  },

  mutations: {
    addPlot(state) {
      let p = new Plot()
      p.title = `Plot ${state.plots.length + 1}`
      state.plots.push(p)
    },

    createFromList(state, rawPlots) {
      if (state.plots.length !== 0) {
        this.reset()
      }

      // Create set of Plot based on a list of objects
      for (let v of rawPlots) {
        // noinspection JSUnfilteredForInLoop
        state.plots.push(new Plot(v.title, v.date_begin, v.date_end, v.curves))
      }
    },

    reset(state) {
      state.plots = []
      state.plotsModified = false
    },

    plotsModified(state) {
      state.plotsModified = true
    }
  }
}
