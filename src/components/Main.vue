<template>
  <div>
	<div class="container-main">
		<div class="title-page">
      <router-view />
		</div>
	</div>	
</div>
</template>
  
<script>

  export default {
	name: 'selector',
  components: {
    },
    data () {
	  return {
      isModalVisible: null,
      currentDrivers: null,
      randomNumber: 0
    }
  }
}
  </script>
  
  <style scoped>
.container-main{
  display: grid;
  background-color: rgb(231, 231, 231);
  border-left: 22px solid rgb(57, 118, 216);
  border-right: 22px solid rgb(57, 118, 216);
  min-height: calc(518px + 5vw);
  width: 100%;
  padding: auto;
  float: center;
  align-content: center;
} 
  </style>
  