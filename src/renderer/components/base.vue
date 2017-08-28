<template>
  <div id="content">
    <div class="row">
      <div id="base" class="col-xs-3">
        <button class="btn btn-default btn-xs center-block" @click="addPlot">Add plot</button>
        <div class="list-group element-list">
          <a href="#" class="list-group-item borderless"
             v-for="plot in plots"
             v-bind:class="{'active': selectedPlot === plot}"
             @click.prevent="selectPlot(plot)">
            {{ plot.title }}
          </a>
        </div>
      </div>

      <div id="plotDetail" class="col-xs-3" v-if="selectedPlot !== null">
        <plot-view v-model="selectedPlot"></plot-view>
      </div>

      <div id="curveDetail" class="col-xs-6" v-if="selectedPlot !== null && selectedPlot.selectedCurve !== null">
        <curve-view v-model="selectedPlot.selectedCurve"></curve-view>
      </div>
    </div>
  </div>
</template>


<script>
  import EventBus from './eventBus'
  import PlotView from './plot'
  import CurveView from './curve'
  import PlotStore from '../stores/plots'

  export default {
    name: 'BaseView',
    data() {
      return {
        plots: PlotStore.state.plots,
//        modified: PlotStore.state.plotsModified, TODO: Not used ?
        selectedPlot: null
      }
    },
    watch: {
      'plots': {
        handler: function() {
          PlotStore.state.plotsModified = true
        },
        deep: true
      }
    },
    mounted() {
      EventBus.$on('basicReset', this.basicReset)
      EventBus.$on('plotsUpdated', this.syncPlots)  // TODO: find a better way
    },
    methods: {
      addPlot() {
        PlotStore.addPlot()
      },

      selectPlot(plot) {
        this.selectedPlot = plot
      },

      basicReset() {
        this.selectedPlot = null
      },

      syncPlots() {
        this.plots = PlotStore.state.plots
      }
    },
    components: {
      PlotView,
      CurveView
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
