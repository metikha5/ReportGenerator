<template>
  <div id="content">
    <div class="row">
      <div id="base" class="col-xs-3">
        <button class="btn btn-default btn-xs center-block" @click="addPlot">Add plot</button>
        <div class="list-group element-list">
          <a href="#" class="list-group-item borderless"
             v-for="plot in plots"
             :class="{'active': selectedPlot === plot}"
             @click.prevent="selectPlot(plot)">
            {{ plot.title }}
          </a>
        </div>
      </div>
      {{arePlotsModified}}
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
  import Vuex from 'vuex'

  import EventBus from '../global/event-bus'
  import CurveView from '../curve/curve.vue'
  import PlotView from '../plot/plot'

  export default {
    name: 'BaseView',
    data() {
      return {
        selectedPlot: null
      }
    },
    computed: Vuex.mapGetters(['plots', 'arePlotsModified']),
    // TODO: still necessary ?
    watch: {
      'plots': {
        handler: function() {
          this.$store.commit('plotsModified')
          // console.log(this.$store)
          // this.plotsModified()
        },
        deep: true
      }
    },
    mounted() {
      EventBus.$on('basicReset', this.basicReset)
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
