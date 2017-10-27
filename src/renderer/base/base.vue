<template>
<div>
  <div id="content">
    <div class="row">
      <div id="base" class="col-xs-3">
        <button class="btn btn-default btn-xs center-block" @click="addPlot">Add plot</button>
        <div class="list-group element-list">
          <a :href="'#plot' + plot.id" class="list-group-item borderless"
             v-for="plot in plots"
             :class="{'active': selectedPlot === plot}"
             :key="plot.id"
             @click.prevent="selectPlot(plot)">
            {{ plot.title || 'Unnamed plot' }}
          </a>
        </div>
      </div>

      <div id="plotDetail" class="col-xs-3 test" v-if="displayPlotBlock">
        <plot-view v-model="selectedPlot"></plot-view>
      </div>

      <div id="curveDetail" class="col-xs-6" v-if="displayCurveBlock">
        <curve-view v-model="selectedPlot.selectedCurve" :plot="selectedPlot"></curve-view>
      </div>
    </div>
  </div>
  <python-generator></python-generator>
</div>
</template>


<script>
  import Vuex from 'vuex'

  import EventBus from '../global/event-bus'
  import CurveView from '../curve/curve.vue'
  import PlotView from '../plot/plot'
  import PythonGenerator from '../build/python-generator'

  export default {
    name: 'BaseView',
    data() {
      return {
        selectedPlot: null
      }
    },
    computed: {
      ...Vuex.mapGetters(['plots', 'arePlotsModified']),

      displayPlotBlock() {
        return this.selectedPlot !== null && this.plots.findIndex(o => o.id === this.selectedPlot.id) !== -1
      },

      displayCurveBlock() {
        let plotSelected = this.selectedPlot !== null
        let curveSelected = plotSelected && this.selectedPlot.selectedCurve !== null
        let curveInList = curveSelected && this.selectedPlot.curves.findIndex(o => o.id === this.selectedPlot.selectedCurve.id) !== -1
        return curveInList
      }
    },
    watch: {
      'plots': {
        handler: function() {
          this.$store.commit('plotsModified')
        },
        deep: true
      }
    },
    mounted() {
      EventBus.$on('basicReset', this.basicReset)

      // Handle electron context menu actions
      this.$electron.ipcRenderer.on('removePlot', (e, plotId) => {
        this.$store.commit('removePlot', {plotId})
      })
    },
    methods: {
      ...Vuex.mapMutations(['addPlot', 'plotsModified']),

      selectPlot(plot) {
        this.selectedPlot = plot
      },

      basicReset() {
        this.selectedPlot = null
      }
    },
    components: {
      PlotView,
      CurveView,
      PythonGenerator
    }
  }
</script>

<style>
  a.borderless {
    border-left: 0 none;
    border-right: 0 none;
  }

  .element-list {
    margin-top: 20px;
    max-height: 500px;
    overflow-y: scroll;
  }
  .element-list::-webkit-scrollbar {
    display: none;
  }
</style>
