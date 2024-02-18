<template>
	<div>
		<div class="title-class" v-if="!isMobile">
      <span style='padding-left: 40px' v-if="this.titleText.includes('ordle')"></span>
      {{ this.titleText }} 
      <font-awesome-icon icon="fa-solid fa-circle-question" 
      v-if="this.titleText.includes('ordle')"
        class="circle-icon"
        @click="this.instructions">
      </font-awesome-icon>
    </div>
    <div class="title-class-mobile" v-if="isMobile">
      {{ this.titleText }} 
      <font-awesome-icon icon="fa-solid fa-circle-question" 
      v-if="this.titleText.includes('ordle')"
        class="circle-icon"
        @click="this.instructions">
      </font-awesome-icon>
    </div>
    <instructions-modal
          v-show="this.showInstructions"
          @close="closeModal"
        />
  </div>
</template>
<script>
import InstructionsModal from "@/components/InstructionsModal"

export default {
  name: 'title-page',
  data () {
	  return {
      showInstructions: null}
    },
  components: {
    InstructionsModal
  },
  props: {
    titleText: String
  },
  computed: {
        isMobile() {
          if( screen.width <= 760 ) {
              return true;
          }
          else {
              return false;
          }
      }
    },
  methods: {
    closeModal() {
      this.showInstructions = false
    },
    instructions(){
      this.showInstructions = true
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
      font-size: calc(10px + 2.3vw) !important;
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
