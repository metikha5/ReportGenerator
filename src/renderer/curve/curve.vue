<template>
  <div>
    <button class="btn btn-danger btn-xs center-block" @click="removeCurve" style="width: 100px">Remove curve</button>

    <form class="form-horizontal" style="margin-top: 42px">
      <div class="form-group">
        <label for="curveTitle" class="col-sm-2 control-label">Title</label>
        <div class="col-sm-8">
          <input id="curveTitle" type="text" class="form-control" v-model="curve.title">
        </div>
      </div>
      <div class="form-group">
        <label for="xField" class="col-sm-2 control-label">X axis</label>
        <div class="col-sm-8">
          <input id="xField" type="text" class="form-control" v-model="curve.x" disabled>
        </div>
      </div>
      <div class="form-group">
        <label for="yField" class="col-sm-2 control-label">Y axis</label>
        <div class="col-sm-8">
          <autocomplete id="yField" :val.sync="curve.y"></autocomplete>
        </div>
      </div>
      <div class="form-group">
        <label for="aggregateField" class="col-sm-2 control-label">Aggregate</label>
        <div class="col-sm-8" style="margin: 10px 0 0 0;">
          <input type="checkbox" id="aggregateField" v-model="curve.aggregate">
        </div>
      </div>
      <div class="form-group">
        <label for="styleField" class="col-sm-2 control-label">Style</label>
        <div class="col-sm-8">
          <input type="text" id="styleField" class="form-control" v-model="curve.style">
        </div>
      </div>
      <div class="form-group">
        <label for="ResampleField" class="col-sm-2 control-label">Resample</label>
        <div class="col-sm-8">
          <input type="text" id="ResampleField" class="form-control" v-model="curve.resample">
        </div>
      </div>
      <div class="form-group">
        <label for="resampleHowField" class="col-sm-2 control-label">Resample how</label>
        <div class="col-sm-8">
          <select v-model="curve.resampleHow" id="resampleHowField" :disabled="curve.resample === null || curve.resample.length === 0" class="form-control">
            <option disabled value=""></option>
            <option v-for="option in resampleHowChoices" :key="option" v-bind:value="option">{{ option }}</option>
          </select>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
  import autocomplete from './autocomplete'

  export default {
    name: 'CurveView',
    props: {
      value: Object,
      plot: Object
    },
    data() {
      return {
        resampleHowChoices: ['sum', 'min', 'max', 'mean', 'median', 'var', 'std']
      }
    },
    computed: {
      curve() { return this.value }
    },
    methods: {
      removeCurve() {
        this.$store.commit('removeCurve', {curve: this.curve, plot: this.plot})
      }
    },
    watch: {
      'curve.resample'() {
        if (this.curve.resample.length === 0) {
          this.curve.resampleHow = ''
        }
      }
    },
    components: {autocomplete}
  }
</script>

<style>
/*   #yField {
    resize: none;
    height: 150px;
    max-height: 200px;
  } */
</style>
