<template>
	<div>
		<div class="title-class" v-if="!isMobile">
      <span style='padding-left: 40px'></span>
      {{ this.titleText }} 
      <div v-if="this.titleText.includes('ordle')">
      <font-awesome-icon icon="fa-solid fa-circle-question"
        class="circle-icon"
        @click="this.showWordleInstructions = true">
      </font-awesome-icon>
      </div>
      <div v-if="this.titleText.includes('Silly')">
      <font-awesome-icon icon="fa-solid fa-circle-question"
        class="circle-icon"
        @click="this.showSillyInstructions = true">
      </font-awesome-icon>
      </div>
      
    </div>
    <div class="title-class-mobile" v-if="isMobile">
      {{ this.titleText }} 
      <font-awesome-icon icon="fa-solid fa-circle-question" 
      v-if="this.titleText.includes('ordle')"
        class="circle-icon"
        @click="this.showSillyInstructions = true">
      </font-awesome-icon>
    </div>
    <WordleInstructionsModal
          v-show="this.showWordleInstructions"
          @close="closeModal"
        />
      <SillyInstructionsModal
          v-show="this.showSillyInstructions"
          @close="closeModal"
        />
  </div>
</template>
<script>
import WordleInstructionsModal from "@/components/Wordle/InstructionsModal"
import SillyInstructionsModal from "@/components/Silly/InstructionsModal"

export default {
  name: 'title-page',
  data () {
	  return {
      showWordleInstructions: null,
      showSillyInstructions: null
    }
    },
  components: {
    WordleInstructionsModal,
    SillyInstructionsModal
  },
  props: {
    titleText: String
  },
  computed: {
        isMobile() {
          if( screen.width <= 1000 ) {
              return true;
          }
          else {
              return false;
          }
      }
    },
  methods: {
    closeModal() {
      this.showWordleInstructions = false
      this.showSillyInstructions = false
    },
    wordleInstructions(){
      this.showWordleInstructions = true
    },
    sillyInstructions(){
      this.showSillyInstructions = true
    },
  }
}
</script>

<style>
  .title-class {
    font-size: calc(10px + 2.3vw) !important;
    font-weight:bold;
    font-family: Verdana;
    padding: 50px 10px;
    margin: auto;
    display: inline-flex;
    flex-direction: row;
    background-color:rgb(231, 231, 231);
    color: rgb(57, 118, 216);
    text-shadow: 1px 1px 2px whitesmoke;
    }
    .title-class-mobile {
      font-size: calc(16px + 2.3vw) !important;
      font-weight:bold;
      font-family: Verdana;
      padding: 20px 10px;
      padding-top: 100px;
      margin: auto;
      display: inline-flex;
      flex-direction: row;
      background-color:rgb(231, 231, 231);
      color: rgb(57, 118, 216);
      text-shadow: 1px 1px 2px whitesmoke;
      }
</style>
