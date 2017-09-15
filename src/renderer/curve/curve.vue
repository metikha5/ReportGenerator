<template>
  <div>
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
          <!--<textarea id="yField" class="form-control" v-model="curve.y" rows="15" cols="50"></textarea>-->
          <autocomplete id="yField" v-model="curve.y"></autocomplete>
          <!--<autocomplete id="yField" v-model="curve.y"></autocomplete>-->
        </div>
      </div>
      <div class="form-group">
        <label for="aggregateField" class="col-sm-2 control-label">Aggregate</label>
        <div class="col-sm-8" style="margin-top: 12px">
          <input type="checkbox" id="aggregateField" v-model="curve.aggregate">
        </div>
      </div>
      <div class="form-group">
        <label for="styleField" class="col-sm-2 control-label">Style</label>
        <div class="col-sm-8">
          <input type="text" id="styleField" class="form-control" v-model="curve.style">
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
      value: Object
    },
    computed: {
      curve() { return this.value }
    },
    components: {autocomplete}
  }
</script>

<style>
  #yField {
    resize: none;
    height: 150px;
    max-height: 200px;
  }
</style>
