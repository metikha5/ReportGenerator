/**
 * Created by BREMEC Michael <michael@bremec.fr> on 8/23/17
 */

import Plot from './plot-frame'
import Curve from '../curve/curve-frame'
import EventBus from '../global/event-bus'

export default {
  state: {
    plots: [],
    savedPlots: '[]',
    arePlotsModified: false
  },

  getters: {
    plots: state => state.plots,
    arePlotsModified: state => state.arePlotsModified,
    getByID: (state) => (id) => {
      return state.plots.find(p => p.id === id)
    },
    plotsEmpty: (state) => state.plots.length === 0
  },

  mutations: {
    addPlot(state) {
      const plotId = Plot.defineId(state.plots)
      let p = new Plot(plotId)
      p.title = 'Unnamed plot'
      state.plots.push(p)
    },

    addCurve(state, { plot }) {
      let curves = state.plots.find(p => p.id === plot.id).curves
      let newCurve = new Curve(Curve.defineId(curves))

      curves.push(newCurve)
    },

    removePlot(state, payload) {
      const plotIndex = state.plots.findIndex(o => payload.plot.id === o.id)
      if (plotIndex !== -1) {
        state.plots.splice(plotIndex, 1)
      }
      EventBus.$emit('basicReset')
    },

    removeCurve(state, payload) {
      const curveIndex = payload.plot.curves.findIndex(c => payload.curve.id === c.id)
      if (curveIndex !== -1) {
        payload.plot.curves.splice(curveIndex, 1)
      }
    },

    updatePlot(state, { plot, field, value }) {
      let target = state.plots.find(p => p.id === plot.id)
      Object.assign(target, {[field]: value})
    },

    updateCurve(state, { plot, curve, field, value }) {
      let targetPlot = state.plots.find(p => p.id === plot.id)
      let targetCurve = targetPlot.curves.find(c => c.id === curve.id)
      Object.assign(targetCurve, {[field]: value})
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
        const plotId = Plot.defineId(state.plots)
        state.plots.push(new Plot(plotId, v.title, v.dateBegin, v.dateEnd, v.curves, v.group, v.displayLegend, v.legendPosition))
      }
    },

    reset(state) {
      state.plots = []
    },

    plotsModified(state) {
      state.arePlotsModified = JSON.stringify(state.plots) !== state.savedPlots
    },

    resetPlotsModified(state) {
      state.arePlotsModified = false
      state.savedPlots = JSON.stringify(state.plots)
    }
  }
}
