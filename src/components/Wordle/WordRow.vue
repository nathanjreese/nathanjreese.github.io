<template>
      <div class="words">
        <letter-box
        v-for="i in 5"
        :key="i"
        :letter="value[i-1]"
        :color="colors[i-1]"
        :count="value.length"
        :solution="solution"
        :validate="validation(guesses)"
        :letterIndex="i-1"
        :currentGuess="value"
        />
    </div>
</template>

<script>
import LetterBox from "./LetterBox"

export default {
  components: {
      LetterBox
  },
  data () {
    return {
      rowNumber: this.rowNum,
      colors: ["gray","gray","gray","gray","gray"]
    }
  },
  props: {
    value: String,
    solution: String,
    submitted: Boolean,
    rowNum: Number,
    guesses: Number
  },
  methods: {
    validation(guesses) {
      return (this.rowNumber < guesses)
    }
  },
  watch: {
    submitted(submitted, prevSubmitted) {
      let temp = ["gray","gray","gray","gray","gray"]
      if (submitted) {
        const s = this.solution
        const v = this.value

        const letterPool = []
        for (let i = 0; i  < 5; i++)
        {
          if (s.charAt(i) === v.charAt(i)){
            temp[i]='green'
          }
          else {
            letterPool.push(s.charAt(i))
          }
        }
        for (let i = 0; i  < 5; i++){
          if(temp[i] == "gray"){
            if (letterPool.indexOf(v.charAt(i)) != -1) {
              letterPool.splice(letterPool.indexOf(v.charAt(i)), 1)
              temp[i]='yellow'
            }
          }
          this.colors[i] = temp[i]
        }
      }
    }
  }
}  

</script>

<style>
.words{
  display: flex;
  margin: auto;
  width: 18px;
  float: center;
  width: max-content

}

</style>
