<template>
    <div class="letters" :class="{ max: (letter), close: (color==='yellow'), correct: (color==='green'), miss: (color==='gray' && validate)}">
  {{ letter  }}
</div>
</template>

<script>

export default {
props: {
count: Number,
solution: String,
color: String,
letterIndex: Number,
validate: Boolean,
currentGuess: String,
letter: {
  type: String,
  default: ""
}
},
methods: {
  inWord(letter) {
    let letterColor = ''
    if (this.validate && letter && this.solution.includes(letter)) {
      letterColor = (letter === this.solution[this.letterIndex]) ?  'green' : 'yellow'
    }
    
    return letterColor
  }
}
}

</script>

<style>
.letters{
margin: 4px 4px;
text-align: center;
width: calc(30px + 2.5vw);
height: calc(30px + 2.5vw);
background-color: rgb(243, 243, 243);
border: 2px solid #8b8b8b;
font-size: calc(21px + 1.3vw);
text-transform: uppercase;
}
.max{
border: 2px solid #000000;
}
.close{
background: #ffff03;
}
.correct{
background: rgb(0, 241, 0);
}
.miss{
background: #b8b8b8;
}
</style>

