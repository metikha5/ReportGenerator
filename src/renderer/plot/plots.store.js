/**
 * Created by BREMEC Michael <michael@bremec.fr> on 8/23/17
 */

import Plot from './plot-frame'

export default {
  state: {
    plots: [],
    arePlotsModified: false
  },

  getters: {
    plots: state => state.plots,
    arePlotsModified: state => state.arePlotsModified,
    getByID: (state) => (id) => {
      return state.plots.find(p => p.id === id)
    }
  },

  mutations: {
    addPlot(state) {
      const plotId = state.plots.length + 1
      let p = new Plot(plotId)
      p.title = `Plot ${plotId}`
      state.plots.push(p)
    },

    addCurve(state, payload) {
      payload.plot.addCurve()
    },

    removePlot(state, payload) {
      const plotIndex = state.plots.findIndex((o) => payload.plot.id === o.id)
      if (plotIndex !== -1) {
        state.plots.splice(plotIndex, 1)
      }
    },

    removeCurve(state, payload) {
      const curveIndex = payload.plot.curves.findIndex(payload.curve)
      if (curveIndex !== -1) {
        payload.plot.curves.splice(curveIndex, 1)
      }
    },

    selectCurve(state, payload) {
      payload.plot.selectedCurve = payload.curve
      // state.arePlotsModified = false
    },

    createFromList(state, payload) {
      if (state.plots.length !== 0) {
        this.commit('reset')
      }

      // Create set of Plot based on a list of objects
      for (let v of payload.rawPlots) {
        const plotId = state.plots.length + 1
        // noinspection JSUnfilteredForInLoop
        state.plots.push(new Plot(plotId, v.title, v.date_begin, v.date_end, v.curves))
      }
    },

    reset(state) {
      state.plots = []
      state.arePlotsModified = false
    },

    plotsModified(state) {
      state.arePlotsModified = true
    },

    resetPlotsModified(state) {
      state.arePlotsModified = false
    }
  }
}
