<template>
  <div class="win-modal-backdrop">
    <div class="win-modal">
      <header class="win-modal-header">
        <div>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
        <font-awesome-icon icon="fa-solid fa-xmark"/>
        </button>
      </div>
      </header>
      <div class="win-modal-body">
          {{ getMessage }}
          <br>
          {{ getDriverKey }}
          <br>
          Play Again?
      </div>
      <div>
          <v-btn
          class="yes-btn"
          @click="this.$emit('replay')"
          dark
        >
          Yes
        </v-btn>
        <v-btn
          class="no-btn"
          @click="close"
          dark
        >
          No
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    data () {
      return {
      answerKey: {'mario': 'Mario Andretti is the GOAT'}
      }
    },
    props: {
      answer: String,
      didWin: Boolean
    },
    methods: {
      close() {
        this.$emit('close')
      },
      submit() {
        this.$emit('submit', this.driverRemove)
      }
    },
    computed: {
      getDriverKey(){
        return this.answerKey[this.answer]
      },
      getMessage(){
        let message = 'HELLO' + this.didWin
        if(this.didWin) {
          message = `Congrats, you guessed ${this.answer}`
        }
        else {
          message = `Sorry, the answer was ${this.answer}`
        }
        return this.answerKey[this.answer]
      }
    }
  }
</script>

<style>
  .win-modal-backdrop {
    padding-top:20px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(97, 116, 141, 0.694) !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .win-modal {
    color: rgba(32, 32, 32, 0.68) !important;
    background-color: whitesmoke;
    box-shadow: 2px 1px 1px 1px !important;
    display: inline-flex;
    flex-direction: column;
    max-height: 90% !important;
    max-width: 92% !important;
  }
  .fa-xmark {
    color: #333333 !important;
    font-size: calc(12px + 1.1vw) !important;
    padding-right:5px;
  }
  .fa-xmark:hover {
    color: rgb(146, 146, 146) !important;
  }
  .win-modal-header {
    padding-left: 10px;
    padding-top: calc(5px + .5vw);
    height: 45px;
    display: flex;
    position: relative;
    border-bottom: 1px solid #000000;
    background-color: #1867c0;
    color: whitesmoke;
    justify-content: space-between;
    font-size: calc(18px + .2vw);
    max-width: 100%;
  }

  .win-modal-body {
    position: relative;
    padding: 10px 10px;
    margin: 20px 10px;
    color: black !important;
    width: calc(200px + 25vw);
    overflow-y:auto;
    font-size: 20px;
  }


  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: calc(13px + 1vw);
    padding: 5px 10px;
    cursor: pointer;
    font-weight: bold;
    color: whitesmoke;
    background: transparent;
    
  }
  .btn-close:hover {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 5px 10px;
    cursor: pointer;
    font-weight: bold;
    color: rgb(192, 192, 192);
    background: transparent;
    
  }
  .silly-img {
    height: 100%;
    border-radius: 8px;
}
.yes-btn {
  margin: 30px;
  height: 60px;
  width: 90px;
  background-color: #288eec;
  box-shadow: -3px 5px 8px #6599ca;
  font-weight: bold;
  color: whitesmoke !important;
}
.yes-btn:hover {
  background-color: #2c75b8;
  box-shadow: -4px 6px 10px #6599ca;
}
.no-btn {
  margin: 30px;
  height: 60px;
  width: 90px;
  background-color: #313132;
  box-shadow: -3px 5px 8px #6599ca;
  font-weight: bold;
  color: whitesmoke !important;
}
.no-btn:hover {
  background-color: #616161;
  box-shadow: -4px 6px 10px #6599ca;
}
</style>