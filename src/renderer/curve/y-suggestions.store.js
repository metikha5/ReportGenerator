/* global _ */
import databaseHelper from './database-helper'

export default {
  state: {
    initDone: false,
    beginning: ['eval: '],
    firstPart: ['tanks', 'actuators', 'providers'],
    secondPart: {},
    partsLinks: {}
  },

  getters: {
    getFirstPartTarget: state => firstPart => {
      for (const key of Object.keys(state.partsLinks)) {
        if (_.includes(state.partsLinks[key], firstPart)) {
          return key
        }
      }
      return null
    },
    getSuggestions: (state, getters) => context => {
      // Can not provide suggestions
      if (context === null) {
        return []
      }

      if (context.firstWord === true) {
        return [...state.beginning, ...state.firstPart]
      }

      // If we only have the second part, we can't do nothing
      if (context.firstPart === null && context.secondPart !== null) {
        return []
      }

      if (context.editedPart === 'first') {
        return state.firstPart
      } else if (context.editedPart === 'second' && context.firstPart !== '') {
        let target = getters.getFirstPartTarget(context.firstPart)

        if (target !== null) {
          return state.secondPart[target]
        } else {
          return Array.from(new Set(Object.values(state.secondPart).reduce((a, b) => a.concat(b), '')))
        }
      }

      return []
    }
  },

  mutations: {
    initDone: state => { state.initDone = true },

    resetSuggestions: (state) => {
      state.firstPart = ['tanks', 'actuators', 'providers']
      state.secondPart = {tanks: [], actuators: [], providers: []}
      state.partsLinks = {}
      state.initDone = false
    },

    initFirstPart: (state, {data}) => {
      for (const item of data) {
        state.secondPart[item.target] = item.elements
      }
    },

    initSecondPart: (state, {data}) => {
      for (const item of data) {
        // Add to firstPart
        state.firstPart.push.apply(state.firstPart, item.elements)
        // Add to partsLinks
        state.partsLinks[item.target] = [...item.elements, item.target]
      }
    }
  },

  actions: {
    initSuggestions: ({ commit }, { databasePath }) => {
      // Init database
      databaseHelper.initDatabase(databasePath)

      commit('resetSuggestions')

      databaseHelper.getTablesColumns().then(data => { commit('initFirstPart', {data}) })
      databaseHelper.getElementsNames().then(data => { commit('initSecondPart', {data}) })

      commit('initDone')
    }
  }
}
