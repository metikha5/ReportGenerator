<template>
  <notifications animation-type="velocity" :position="'bottom right'" :max="1" :group="'invalidDatabase'">
    <template slot="body" scope="props">
      <div class="notification vue-notification" :class="props.item.type">
        <button type="button" class="close" @click="props.close"><span>&times;</span></button>
        <div class="notification-title" @click="props.close">
          {{props.item.title}}
        </div>
        <div class="notification-content">
          <div v-html="props.item.text"></div>
          <div @click="props.close">
            <slot name="link"></slot>
          </div>
        </div>
      </div>
    </template>
  </notifications>
</template>

<script>
  import Notifications from 'vue-notification'

  export default {
    name: 'databaseNotification',
    mixins: [Notifications]
  }
</script>

<style>
  .close,
  .close:hover,
  .close:focus {
    font-size: 1.1em;
    color: black;
    outline: none;
  }
</style>
