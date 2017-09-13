<template>
  <div>
    <!--<textarea class="form-control" v-model="content" rows="15" cols="50" @input="change"></textarea>-->
    <div style="position:relative" v-bind:class="{'open': openSuggestion}">
      {{ cursorPosition }}
      <input class="form-control" type="text" v-model="content"
             @keydown.enter="enter"
             @keydown.left="left"
             @keydown.right="right"
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
        suggestions: ['tony', 'toto', 'tobi', 'john'],
        open: false,
        current: 0,
        matches: [],
        cursorPosition: 0
      }
    },
    computed: {
      openSuggestion() {
        // TODO: Bug autocomplete: https://trello.com/c/A82H4s8L
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

      onChange(event) {
        if (this.open === false) {
          this.open = true
          this.current = 0
        }

        this.cursorPosition = event.target.selectionStart

        this.updateMatches()
        this.$emit('input', this.content)
      },

      enter() {
        this.content = this.matches[this.current]
        this.$emit('input', this.content)
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
        this.content = this.matches[index]
        this.$emit('input', this.content)
        this.open = false
      },

      left(event) {
        if (event.target.selectionStart > 0) {
          this.cursorPosition = event.target.selectionStart - 1
        }
      },

      right(event) {
        if (event.target.value.length !== event.target.selectionStart) {
          this.cursorPosition = event.target.selectionStart + 1
        }
      }
    }
  }
</script>

<style>
</style>
