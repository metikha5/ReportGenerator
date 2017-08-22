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
