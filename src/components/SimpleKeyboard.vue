<template>
  <div class="wordle-keyboard">
    <div :class="keyboardClass"></div>
  </div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default {
  name: "SimpleKeyboard",
  props: {
    keyboardClass: {
      default: "hg-theme-default",
      type: String
    },
    input: {
      type: String
    },
    guessedLetters: {
      type: Object
    }

  },
  data: () => ({
    keyboard: null,
    currentButton: null
  }),
  mounted() {
    this.keyboard = new Keyboard(this.keyboardClass, {
      layout: {
      default: [
        "q w e r t y u i o p",
        "a s d f g h j k l m",
        "{enter} z x c v b n m {bksp}"
      ]
    },
    onChange: this.onChange,
    onKeyPress: this.onKeyPress
    });
  },
  methods: {
    onChange(input) {
      if (input.length <= 5){
        this.$emit("onChange", input);
      }
      else if(input.length > 5 && this.currentButton === '{bksp}'){
        const newInput = input.substring(0,4)
        this.$emit("onChange", newInput)
        
      }
    },
    onKeyPress(button) {
      this.currentButton = button
      this.$emit("onKeyPress", button)

      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === "{shift}" || button === "{lock}") this.handleShift();
    },
    handleShift() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";

      this.keyboard.setOptions({
        layoutName: shiftToggle
      });
    }
  },
  watch: {
    input(input) {
      if (input.length <= 5 || input === '{bksp}'){
      this.keyboard.setInput(input);
      }
      else if(input.length > 5 && input === '{bksp}'){
        const newInput = input.substring(0,4)
        this.$emit("onChange", newInput)
        
      }
    },
    guessedLetters(guessedLetters){
      this.keyboard.addButtonTheme(
        guessedLetters.miss.join(" "),
        "miss"
      )
      this.keyboard.addButtonTheme(
        guessedLetters.found.join(" "),
        "found"
      )
      this.keyboard.addButtonTheme(
        guessedLetters.hint.join(" "),
        "hint"
      )
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.wordle-keyboard{
  max-width: 600px;
  margin: auto;
  padding-top: 30px;
}

.hg-theme-default{
  background-color:#ececec;
  border-radius:5px;
  box-sizing:border-box;
  font-family:HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;
  overflow:hidden;
  padding:5px;
  touch-action:manipulation;
  -webkit-user-select:none;
  -moz-user-select:none;
  user-select:none;
  width:100%;
}
.hg-theme-default.miss{
  background-color: rgba(204, 71, 14, 0.935);
  color:pink;
 }
 .hg-theme-default.hint{
  background-color: rgba(229, 255, 0, 0.935);
}
.hg-theme-found{
  background-color: rgb(0, 255, 21);
}
</style>
