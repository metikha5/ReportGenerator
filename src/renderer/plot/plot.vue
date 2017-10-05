<template>
  <div>
    <div class="center-block row" style="width: 170px">
      <button class="btn btn-default btn-xs" @click="addCurve">Add curve</button>
      <button class="btn btn-danger btn-xs" @click="removePlot" style="margin-left: 5px">Remove plot</button>
    </div>
    <div class="list-group element-list">
      <a href="#" class="list-group-item borderless"
         v-for="curve in plot.curves"
         :key="curve.id"
         :class="{'active': plot.selectedCurve == curve}"
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
          <!-- <input class="form-control" type="text" name="plotTitle" id="plotTitle" v-model="plot.title"> -->
          <input class="form-control" type="text" name="plotTitle" id="plotTitle" :value="plot.title" @keyup.stop="updateField('title', $event.target.value)">
        </div>
      </div>
      <div class="form-group">
        <label for="dateBegin" class="col-sm-3 control-label">Date</label>
        <div class="col-sm-8">
          From <input class="form-control" type="datetime-local" name="dateBegin" id="dateBegin" :value="plot.dateBegin">
          To <input class="form-control" type="datetime-local" name="dateEnd" id="dateEnd" :value="plot.dateEnd">
        </div>
      </div>
      <div class="form-group">
        <label for="xLabel" class="col-sm-3 control-label">X label</label>
        <div class="col-sm-8">
          <input class="form-control" type="text" name="xLabel" id="xLabel" :value="plot.xLabel" @keyup.stop="updateField('xLabel', $event.target.value)">
        </div>
      </div>
      <div class="form-group">
        <label for="yLabel" class="col-sm-3 control-label">Y label</label>
        <div class="col-sm-8">
          <input class="form-control" type="text" name="yLabel" id="yLabel" :value="plot.yLabel" @keyup.stop="updateField('yLabel', $event.target.value)">
        </div>
      </div>
      <div class="form-group">
        <label for="groupInput" class="col-sm-3 control-label">Group</label>
        <div class="col-sm-8">
          <input class="form-control" type="text" name="groupInput" id="groupInput" :value="plot.group" @keyup.stop="updateField('groupInput', $event.target.value)">
        </div>
      </div>
      <div class="form-group">
        <label for="displayLegend" class="col-sm-2 control-label">Display legend</label>
        <div class="col-sm-8" style="margin: 20px 0 0 28px;">
          <input type="checkbox" id="displayLegend" :value="plot.displayLegend" @change="updateField('displayLegend', $event.target.checked)">
        </div>
      </div>
      <div class="form-group">
        <label for="legendPosition" class="col-sm-3 control-label">Legend position</label>
        <div class="col-sm-8">
          <select :value="plot.legendPosition" id="legendPosition" :disabled="plot.displayLegend === false" class="form-control" @change="updateField('legendPosition', $event.target.value)">
            <option v-for="option in legendPositionChoices" :key="option" v-bind:value="option">{{ option }}</option>
          </select>
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
    data() {
      return {
        legendPositionChoices: ['best', 'upper right', 'upper left', 'lower left', 'lower right',
          'right', 'center left', 'center right', 'lower center', 'upper center', 'center']
      }
    },
    computed: {
      plot() { return this.value }
    },
    methods: {
      addCurve() {
        this.$store.commit('addCurve', {plot: this.plot})
      },

      selectCurve(curve) {
        this.$store.commit('selectCurve', {plot: this.plot, curve})

        // Strange behaviour, change the way to detect plots changes
        if (this.$store.state.plot.arePlotsModified === false) {
          setTimeout(() => {
            this.$store.commit('resetPlotsModified')
          }, 5)
        }
      },

      removePlot() {
        this.$store.commit('removePlot', {plot: this.plot})
      },

      updateField(field, value) {
        this.$store.commit('updatePlot', {plot: this.plot, field, value})
      }
    }
  }
</script>
