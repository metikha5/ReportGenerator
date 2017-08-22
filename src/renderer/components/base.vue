<template>
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
</template>


<script>
  import PlotView from './plot'
  import CurveView from './curve'
  import Plot from '../elements/plot'

  export default {
    name: 'BaseView',
    data() {
      return {
        plots: [],
        modified: false,  // To implement
        selectedPlot: null
      }
    },
    methods: {
      addPlot() {
        let p = new Plot()
        p.title = `Plot ${this.plots.length + 1}`
        this.plots.push(p)
      },

      selectPlot(plot) {
        this.selectedPlot = plot
      }
    },
    components: {
      PlotView,
      CurveView
    }
  }
</script>
