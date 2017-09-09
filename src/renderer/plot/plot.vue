<template>
  <div>
    <button class="btn btn-default btn-xs center-block" @click="addCurve">Add curve</button>
    <div class="list-group element-list">
      <a href="#" class="list-group-item borderless"
         v-for="curve in localPlot.curves"
         v-bind:class="{'active': localPlot.selectedCurve == curve}"
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
        this.localPlot.addCurve()
      },

      selectCurve(curve) {
        // To modify: copy the previous code here
        this.localPlot.selectedCurve = curve
      }
    }
  }
</script>
