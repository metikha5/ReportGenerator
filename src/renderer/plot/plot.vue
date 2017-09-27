<template>
  <div>
    <div class="center-block row" style="width: 170px">
      <button class="btn btn-default btn-xs" @click="addCurve">Add curve</button>
      <button class="btn btn-danger btn-xs" @click="removePlot" style="margin-left: 5px">Remove plot</button>
    </div>
    <div class="list-group element-list">
      <a href="#" class="list-group-item borderless"
         v-for="curve in localPlot.curves"
         :class="{'active': localPlot.selectedCurve == curve}"
         @click="selectCurve(curve)">
        {{ curve.title }}
      </a>
    </div>
    <div style="margin-top: 30px; margin-bottom: -15px">
      <h3>Plot configuration</h3>
    </div>
    <form class="form-horizontal" style="margin-top: 42px">
      <div class="form-group">
        <label for="plotTitle" class="col-sm-3 control-label">Title</label>
        <div class="col-sm-8">
          <input type="text" name="plotTitle" id="plotTitle" v-model="localPlot.title">
        </div>
      </div>
      <div class="form-group">
        <label for="dateBegin" class="col-sm-3 control-label">Date</label>
        <div class="col-sm-8">
          From <input type="datetime-local" name="dateBegin" id="dateBegin" v-model="localPlot.dateBegin">
          To <input type="datetime-local" name="dateEnd" id="dateEnd" v-model="localPlot.dateEnd">
        </div>
      </div>
      <div class="form-group">
        <label for="xLabel" class="col-sm-3 control-label">X label</label>
        <div class="col-sm-8">
          <input type="text" name="xLabel" id="xLabel" v-model="localPlot.xLabel">
        </div>
      </div>
      <div class="form-group">
        <label for="yLabel" class="col-sm-3 control-label">Y label</label>
        <div class="col-sm-8">
          <input type="text" name="yLabel" id="yLabel" v-model="localPlot.yLabel">
        </div>
      </div>
    </form>

  </div>
</template>

<script>
  export default {
    name: 'PlotView',
    props: {
      value: Object
    },
    computed: {
      localPlot() {
        return this.value
      }
    },
    methods: {
      addCurve() {
        this.$store.commit('addCurve', {plot: this.localPlot})
      },

      selectCurve(curve) {
        this.$store.commit('selectCurve', {plot: this.localPlot, curve})

        // Strange behaviour, change the way to detect plots changes
        if (this.$store.state.plot.arePlotsModified === false) {
          setTimeout(() => {
            this.$store.commit('resetPlotsModified')
          }, 5)
        }
      },

      removePlot() {
        this.$store.commit('removePlot', {plot: this.localPlot})
      }
    }
  }
</script>
