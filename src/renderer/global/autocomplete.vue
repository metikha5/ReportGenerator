<template>
  <div>
    <!--<textarea class="form-control" v-model="content" rows="15" cols="50" @input="change"></textarea>-->
    <div style="position:relative" v-bind:class="{'open': openSuggestion}">
      <input class="form-control" type="text" v-model="content"
             @keydown.enter="enter"
             @keydown.down.prevent="down"
             @keydown.up.prevent="up"
             @keydown.esc="escape"
             @input="onChange"/>

      <ul class="dropdown-menu" style="width:100%">
        <li v-for="(suggestion, index) in matches"
            v-bind:class="{'active': isActive(index)}"
            @click="onClick(index)">
          <a href="#">{{ suggestion }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Autocomplete',
    props: {
      value: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        suggestions: [],
        open: false,
        current: 0,
        matches: []
      }
    },
    computed: {
      openSuggestion() {
        return this.content !== '' && this.matches.length !== 0 && this.open === true
      }
    },
    created: function() {
      this.content = this.value
    },
    methods: {
      updateMatches() {
        this.matches = this.suggestions.filter((str) => {
          return str.indexOf(this.content) >= 0
        })
      },

      onChange() {
        if (this.open === false) {
          this.open = true
          this.current = 0
        }

        this.updateMatches()
        this.$emit('input', this.content)
      },

      enter() {
        this.content = this.matches[this.current]
        this.open = false
      },

      escape() {
        this.open = false
      },

      up() {
        if (this.current > 0) {
          this.current--
        }
      },

      down() {
        if (this.current < this.matches.length - 1) {
          this.current++
        }
      },

      isActive(index) {
        return index === this.current
      },

      onClick(index) {
        this.selection = this.matches[index]
        this.open = false
      }
    }
  }
</script>

<style>
</style>
