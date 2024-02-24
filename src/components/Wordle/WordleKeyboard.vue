<template>
  <div class="wordle-keyboard">
    <div :class="keyboardClass">
      <div class="key-row">
        <div
        class="key-class" :class="{ miss: (guessedLetters.miss.includes(key)), hint: (guessedLetters.hint.includes(key)), found: (guessedLetters.found.includes(key))}"
        @click="onKeyPress(key)"
        v-for="(key, i) in keyboard1">{{ key }}</div>
    </div>
    <div class="key-row">
        <div
        class="key-class" :class="{ miss: (guessedLetters.miss.includes(key)), hint: (guessedLetters.hint.includes(key)), found: (guessedLetters.found.includes(key))}"
        @click="onKeyPress(key)"
        v-for="(key, i) in keyboard2">{{ key }}</div>
    </div>
    <div class="key-row">
        <div
        class="key-class" :class="{ miss: (guessedLetters.miss.includes(key)), hint: (guessedLetters.hint.includes(key)), found: (guessedLetters.found.includes(key))}"
        @click="onKeyPress(key)"
        v-for="(key, i) in keyboard3">{{ key }}</div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: "WorldeKeyboard",
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
    },
    solution: {
      type: String
    }

  },
  data: () => ({
    keyboard1: [ "q","w","e","r","t","y","u","i","o","p"],
    keyboard2: ["a","s","d","f","g","h","j","k","l"],
    keyboard3: ["enter","z","x","c","v","b","n","m","bksp"],
    currentButton: null,
    miss: [],
    correct: [],
    hint: []
  }),
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
      const input = 
        button === 'bksp'
        ? this.input.slice(0, -1)
        : button === 'enter'
        ? '' 
        : this.input + button 
      this.onChange(input)
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
  },
  mounted() {
	window.addEventListener("keypress", e => {
    console.log("KEYPRESS: ", e)
    if (e.key && e.key.match(/[a-z]/i)){
      this.onKeyPress(e.key.toLowerCase())
    }
    
	})
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.wordle-keyboard{
  max-width: calc(320px + 20vw);
  margin: auto;
  padding-top: 30px;
}

.hg-theme-default{
  background-color: rgba(0, 0, 0, 0.19);
  border-radius:5px;
  box-sizing:border-box;
  font-family:HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;
  padding:2px;
  touch-action:manipulation;
  -webkit-user-select:none;
  -moz-user-select:none;
  user-select:none;
  width:100%;
  float: center;
  display:grid;
}
.key-row{
  display: flex;
  margin: auto;
}
.key-class{
  padding: calc(10px + .1vw) calc(1px + .8vw);
  margin: calc(0px + .2vw) calc(0px + .2vw);
  background-color:whitesmoke;
  border: 1px solid #3e3e3e;
  font-size: calc(9px + .8vw);
  min-width: calc(25px + 2vw);
  min-height: calc(25px + 2vw);
  text-align: center;
  text-transform: uppercase;
  border-radius: 7px;
  cursor: pointer;
  font-weight: bold;
}
.hint{
background-color: yellow;
}
.found{
background-color: rgb(0, 228, 0);
}
.miss{
background-color: rgb(97, 97, 97);
}
</style>
