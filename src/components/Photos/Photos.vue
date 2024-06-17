<template>
  <div class="main-photos">
    <title-page
      title-text="Photos"
      />
      <div class="photo-options">
    <div class="time-label">Race: </div>
      <select class="dropdown-tz" v-model="selectedRace">
        <option value="stpete">St Pete</option>
        <option value="longbeach" >Long Beach</option>
        <option value="indygp" >Indy GP</option>
        <option value="indy500" >Indy 500</option>
        <option value="roadamerica" >Road America</option>
        
      </select>
    </div>
      <Slider
        :selected-race="this.getRace" 
        />
  </div>
</template>

<script>
import TitlePage from "@/components/Partials/Title"
import Slider from "./Slider.vue"

export default {
  name: 'home',
  components: {
      TitlePage,
      Slider
  },
  data () {
    return {
      home_msg: 'IndyCar Ladder',
      selectedRace: 'stpete'
    }
  },
  computed: {
    getRace(){
      console.log("GET RACE: ", this.selectedRace)
      return this.selectedRace
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: bold;
}
ul {
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.main-photos{
  text-align: center;
  background-color:rgb(231, 231, 231);
  padding-bottom: 50px;
  margin: auto;
  }
.title{
    font-size: calc(8px + 3vw);
    padding-bottom: calc(1px + 1vw);
    text-shadow: 2px 1px 1px #000000;
    font-family: Verdana, Geneva, Tahoma, sans-serif !important;
    font-weight: bold;
    color: whitesmoke;
  }
.photo-options{
    font-size: calc(12px + .4vw);
    display: flex;
    float: center;
    font-weight: bold;
    margin: auto;
    padding: 10px;
    max-width: 90%;
    justify-content: center;
    align-items: center;
  }
  .dropdown-tz{
    width: calc(200px + 2vw);
    padding-left: 10px;
    margin-left: calc(2px + 3vw);
    border: 2px solid rgb(57, 118, 216);
    font-weight: normal;
  }
</style>
