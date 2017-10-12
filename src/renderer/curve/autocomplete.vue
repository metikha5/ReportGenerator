<template>
  <div>
    <!--<textarea class="form-control" v-model="content" rows="15" cols="50" @input="change"></textarea>-->
    <div style="position:relative" v-bind:class="{'open': openSuggestion}">
      <input class="form-control" type="text" v-model="content"
             @keydown.enter="enter"
             @keydown.left="left"
             @keydown.right="right"
             @keydown.down.prevent="down"
             @keydown.up.prevent="up"
             @keydown.esc="escape"
             @click="jump"
             @input="onChange"
             @blur="escape"/>

      <ul id="suggestions" class="dropdown-menu" style="width:100%">
        <li v-for="(suggestion, index) in matches"
            :key="index"
            v-bind:class="{'active': isActive(index)}"
            @click="onClick(index)"
            @mouseover="overDropdown(index)"
            @mousewheel="dropdownWheel()">
          <a href="#">{{ suggestion }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Suggestions from './suggestions'
  export default {
    name: 'Autocomplete',
    props: {
      val: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        open: false,
        current: 0,
        matches: [],
        context: null,
        cursorPosition: 0,  // TODO: update cursor position when the user click in the input
        scrolling: {
          firstVisible: 0,
          lastVisible: 0,
          visibleSize: 7,
          elementSize: 27,
          target: null
        }
      }
    },
    mounted() {
      console.log(this.dropdown)
      this.scrolling.target = document.getElementById('suggestions')
    },
    computed: {
      openSuggestion() {
        // Having several variables is necessay to have the computed value working correctly
        // https://github.com/vuejs/vue/issues/370
        let isOpen = this.open === true
        let hasMatches = this.matches.length !== 0
        return isOpen && hasMatches
      },
      content: {
        get() { return this.val },
        set(newValue) {
          this.$emit('update:val', newValue)
        }
      }
    },
    methods: {
      updateMatches() {
        this.defineContext()
        let suggestions = Suggestions.getSuggestion(this.context)

        // Set suggestions in dropdown
        if (this.context === null) {
          this.matches = []
        } else {
          this.matches = suggestions.filter((str) => {
            return str.indexOf(this.context.word) >= 0 && this.context.word !== str
          })
        }
        this.setScrollingVisibility()
      },

      defineContext() {
        // Return an object describing the context or null if autocomplete can't be provided
        this.context = null
        let context = {
          start: 0,
          end: this.content.length,
          firstPart: '',
          secondPart: null,
          firstWord: false,
          word: '',
          editedPart: 'first'
        }

        if (this.content.trim().length === 0) {
          context.firstWord = true
          this.context = context
          return
        }

        // Find beginning of the word
        for (let i = this.cursorPosition; i > 0; i--) {
          if (this.content[i] === ' ') {
            context.start = i + 1
            break
          }
        }

        // Find end of the word
        for (let i = this.cursorPosition; i < this.content.length; i++) {
          if (this.content[i] === ' ') {
            context.end = i - 1
            break
          }
        }

        let word = this.content.substr(context.start, context.end)
        let dotPosition = word.indexOf('.')

        context.firstWord = context.start === 0 && dotPosition === -1
        context.word = word

        if (dotPosition !== -1) {
          if (word.split('.').length > 2) {
            return
          }
          [context.firstPart, context.secondPart] = word.split('.')
          const inWordPosition = this.cursorPosition - context.start
          if (inWordPosition <= dotPosition) {
            context.editedPart = 'first'
            context.word = context.firstPart
          } else {
            context.editedPart = 'second'
            context.word = context.secondPart
          }
        }

        this.context = context
      },

      onChange(event) {
        if (this.open === false) {
          this.open = true
          this.current = 0
        }

        this.cursorPosition = event.target.selectionStart

        this.$emit('input', this.content)

        // Add a small delay to updateMatches to be sure that content has correctly
        // been updated before starting its analysis. The other possibility is to
        // listen for the "input" event and call updateMatches with the received
        // content ... Need to think about that ...
        // this.$on('input', (c) => { this.updateMatches(c) })
        setTimeout(() => {
          this.updateMatches()
        }, 10)
      },

      enter() {
        if (this.open) {
          this.complete(this.current)
        }
      },

      escape() {
        this.open = false
      },

      up() {
        if (this.current > 0) {
          this.current--

          // Handle scrolling
          if (this.current < this.scrolling.firstVisible) {
            this.scrolling.firstVisible--
            this.scrolling.lastVisible--
            this.scrollDropdown('top')
          }
        } else {
          // Scrolled to the top
          this.setScrollingVisibility()
        }
      },

      down() {
        if (this.open === false) {
          this.open = true
          this.current = 0
          this.updateMatches()
        } else if (this.matches.length !== 0 && this.current < this.matches.length - 1) {
          this.current++

          // Handle scrolling
          if (this.current > this.scrolling.lastVisible) {
            // We scroll
            // Update first and last visible
            this.scrolling.firstVisible++
            this.scrolling.lastVisible++
            this.scrollDropdown('bottom')
          }
        }
      },

      isActive(index) {
        return index === this.current
      },

      onClick(index) {
        this.complete(index)
      },

      overDropdown(index) {
        this.current = index
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
      },

      jump(event) {
        this.cursorPosition = event.target.selectionStart
      },

      complete(index) {
        if (this.context === null || this.matches.length === 0) { return }
        const toReplace = this.matches[index]

        const beginning =
          this.context.editedPart === 'first'
          ? this.content.slice(0, this.context.start)
          : this.content.slice(0, this.context.start + this.context.firstPart.length + 1)
        const end = this.content.slice(beginning.length + this.context.word.length)
        // Update content
        this.content = beginning + toReplace + end
        // Notify content change
        this.$emit('input', this.content)
        // Close suggestion list
        this.open = false
        // Update input cursor position
        if (this.context.editedPart === 'first' && this.context.secondPart !== null) {
          this.cursorPosition = toReplace.length + this.context.secondPart.length + 1
        } else {
          this.cursorPosition = beginning.length + toReplace.length
        }
      },

      scrollDropdown(direction) {
        if (direction === 'top') {
          this.scrolling.target.scrollTop -= this.scrolling.elementSize
        } else if (direction === 'bottom') {
          this.scrolling.target.scrollTop += this.scrolling.elementSize
        }
      },
      dropdownWheel() {
        // Adding a delay increase accuracy
        setTimeout(() => {
          let first = Math.floor(this.scrolling.target.scrollTop / this.scrolling.elementSize)
          let last = first + this.scrolling.visibleSize - 1

          this.scrolling.firstVisible = first
          this.scrolling.lastVisible = last
        }, 40)
      },

      setScrollingVisibility() {
        // Init "scrolling" data to handle correct content visibility when moving in dropdown
        this.scrolling.firstVisible = 0
        this.scrolling.lastVisible = this.matches.length >= this.scrolling.visibleSize ? this.scrolling.visibleSize - 1 : this.matches.length
      }
    }
  }
</script>

<style>
#suggestions {
  max-height: 200px;
  overflow-y: scroll;
}
#suggestions::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}
</style>
