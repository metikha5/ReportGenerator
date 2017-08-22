<template>
  <nav class="navbar navbar-default" id="menu">
    <div class="container-fluid">
      <div class="navbar-header">
        <div>
          <span class="navbar-brand" style="cursor: default">Report generator</span>
        </div>
      </div>

      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav main-nav">
          <li><a href="#"><span class="glyphicon glyphicon-file icon" ></span> New</a></li>
          <li class="divider"></li>
          <li><a href="#"><span class="glyphicon glyphicon-folder-open icon"></span> Load</a></li>
          <li class="divider"></li>
          <li><a href="#"><span class="glyphicon glyphicon-floppy-disk icon-shift"></span> Save</a></li>
          <li class="divider"></li>
          <li><a href="#"><span class="glyphicon glyphicon-play icon-shift"></span> Run</a></li>
        </ul>
      </div>


      <!--<div class="collapse navbar-collapse">-->
        <!--<ul class="nav navbar-nav main-nav">-->
          <!--<li><a href="#" @click="newDefinition"><span class="glyphicon glyphicon-file icon" ></span> New</a></li>-->
          <!--<li class="divider"></li>-->
          <!--<li><a href="#" @click="loadFile"><span class="glyphicon glyphicon-folder-open icon"></span> Load</a></li>-->
          <!--<li class="divider"></li>-->
          <!--<li><a href="#" @click="saveFile"><span class="glyphicon glyphicon-floppy-disk icon-shift"></span> Save</a></li>-->
          <!--&lt;!&ndash;<li><a href="#" @click="saveFile"><span class="glyphicon glyphicon-floppy-disk icon" style="margin-right: 5px; margin-top: 3px;"></span> Save</a></li>&ndash;&gt;-->
          <!--<li class="divider"></li>-->
          <!--<li><a href="#" @click="doRun"><span class="glyphicon glyphicon-play icon-shift"></span> Run</a></li>-->
        <!--</ul>-->
        <!--<p class="navbar-text small selected-file" v-if="file_handler.selectedFile !== null">{{ selected_file }}</p>-->

        <!--<div class="nav navbar-nav navbar-right">-->
          <!--<transition name="fade">-->
            <!--<p class="navbar-text" v-if="notification !== null">-->
              <!--{{ notification }}-->
            <!--</p>-->
          <!--</transition>-->
        <!--</div>-->
      <!--</div>-->
      <!---->
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'MenuView'
  }
</script>

<style>
  .main-nav {
    margin-left: 20px;
  }

  .icon {
    margin-right: 8px;
  }

  .icon-shift {
    margin-right: 5px;
    margin-top: 5px;
  }

  .selected-file {
    margin-top: 18px;
  }

  /* Transition for the notifications */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
