<template>
  <div class="main-ladder">
    <title-page
      title-text="Ladder Power Rankings"
      />
      <div class="last-update"><b>Last Updated:</b> May 27, 2025</div>
    <div class="table-holder">
  <v-table class="ladder-table" density="compact">
    <thead>
      <tr>
        <th class="text-left">
          Rank
        </th>
        <th class="text-left">
          Driver
        </th>
        <th class="text-left">
          Series
        </th>
        <th class="text-left">
          Wins
        </th>
        <!-- <th class="text-left">
          Change
        </th> -->
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in driverRanks"
        :key="item.name"
      >
        <td>{{ item.rank }}</td>
        <td class="text-left">{{ item.name }}</td>
        
        <td class="text-left">
          <img ref="image" 
          v-if="item.series.includes('IndyNXT')"
          :src="IndyNxtLogoPic"
          title:="IndyNXT"
          alt="IndyNXT Logo"
          contain
          class="series-words"
          >
          <img ref="image" 
          v-if="item.series.includes('Pro 200')"
          title:="USF Pro 2000"
          :src="USFProLogoPic"
          alt="IndyCar Logo"
          contain
          class="series-words"
          >
          <img ref="image" 
          v-if="item.series.includes('USF 2000')"
          :src="USF2000LogoPic"
          alt="IndyCar Logo"
          contain
          class="series-words"
          >
          <img ref="image" 
          v-if="item.series.includes('USF Juniors')"
          :src="USFJuniorsLogoPic"
          alt="IndyCar Logo"
          contain
          class="series-words"
          >
        </td>

        <td >{{ item.wins }}</td>
        <!-- <td :class="{ moveup: item.previous.includes('↑') || item.previous === 'Unranked', movedown: item.previous.includes('↓')}">{{ item.previous }}</td> -->
      </tr>
    </tbody>
  </v-table>
  <div class="explanation">*The rankings are based off a formula using current standings, wins, and USF championships.</div>
  </div>
  </div>
</template>

<script>
import TitlePage from "@/components/Partials/Title"

export default {
  name: 'home',
  components: {
      TitlePage
  },
  data () {
    return {
      home_msg: 'IndyCar Ladder',
      driverRanks: [
            { rank: 1, name: 'Dennis Hauger', series: 'IndyNXT', wins: 3, titles: 'USF Pro', previous: '-'},
            { rank: 2, name: 'Lochie Hughes', series: 'IndyNXT', wins: 1, titles: 'None', previous: '-'},
            { rank: 3, name: `Myles Rowe`, series: 'IndyNXT', wins: 0, titles: 'None', previous: '-'},
            { rank: 4, name: `Caio Collet`, series: 'IndyNXT', wins: 0, titles: 'None', previous: '-'},
            { rank: 5, name: `Salvador De Alba`, series: 'IndyNXT', wins: 0, titles: 'None', previous: '-'},
            { rank: 6, name: 'Max Garcia', series: 'USF Pro 2000', wins: 2, titles: 'None', previous: '-'},
            { rank: 7, name: 'Ariel Elkin', series: 'USF Pro 2000', wins: 3, titles: 'None', previous: '-'},
            { rank: 8, name: 'Josh Pierson', series: 'IndyNXT', wins: 0, titles: 'USF2000', previous: '↑ 2'},
            { rank: 9, name: 'Alessandro de Tullio', series: 'USF Pro 2000', wins: 3, titles: 'None', previous: '-'},
            { rank: 10, name: `Liam Sceats`, series: 'IndyNXT', wins: 0, titles: 'USF Pro', previous: '↓ 2'},
            { rank: 11, name: 'Thomas Schrage ', series: 'USF 2000', wins: 1, titles: 'None', previous: '-'},
            { rank: 12, name: 'Mac Clark',series: 'USF Pro 2000', wins: 0, titles: 'USF2000', previous: 'Unranked'},
            { rank: 13, name: 'Jack Jeffers', series: 'USF 2000', wins: 1, titles: 'None', previous: '↑ 2'},
            { rank: 14, name: 'Ty Fisher', series: 'USF Juniors', wins: 2, titles: 'None', previous: '↓ 1'},
            { rank: 15, name: 'Liam McNeilly ', series: 'USF 2000', wins: 5, titles: 'None', previous: 'Unranked'},
            { rank: 16, name: 'Leonardo Escorpioni', series: 'USF Juniors', wins: 3, titles: 'None', previous: '-'},
          ],
        IndyNxtLogoPic: new URL('@/assets/IndyNxtWords.png', import.meta.url),
        USFProLogoPic: new URL('@/assets/USFProWords.png', import.meta.url),
        USF2000LogoPic: new URL('@/assets/USF2000Words.png', import.meta.url),
        USFJuniorsLogoPic: new URL('@/assets/USFJuniorsWords.png', import.meta.url),
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
.main-ladder{
  text-align: center;
  background-color:rgb(231, 231, 231);
  padding-bottom: 50px;
  }
.title{
    font-size: calc(8px + 3vw);
    padding-bottom: calc(1px + 1vw);
    text-shadow: 2px 1px 1px #000000;
    font-family: Verdana;    
    font-weight: bold;
    color: whitesmoke;
  }
  .ladder-table{
  max-width: 600px;
  height: 80%;
  font-size: calc(9px + .6vw);
  float: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  background-color: #cfcfcf;
  border: 2px solid black;
  box-shadow: 5px 5px 5px #616161;
  color: black;
  thead{
    color: whitesmoke;
    background-color: #323232;
  }
  tr:nth-child(even)
{
  background-color: #dbdbdb;
}
  td{
    padding: 3px 1px;
  }
}
.main-cards {
/* background-image: url("../assets/Ladder/CardSleeve.png"); */
background-repeat: no-repeat;
background-size: 100%;
 min-height: 1200px;
 float: center;
 max-width: 90%;
 display: inline-gridbox;
 margin: auto;
 padding-left: 39px;
 margin-top: 20px;
}
.last-update{
  padding-bottom: 20px;
}
.card-img {
  position: absolute;
  height: 350px;
  object-fit: contain;

}
.card-img-holder {
  margin: calc(7px + 3vw) calc(2px + 1vw) calc(7px + 3vw) calc(2px + 1vw);
  height: 360px;
  width: 260px;;
  display: inline-flex;
  flex-direction: row;
  object-fit: contain;
}
.card-img:hover {
  cursor: pointer !important;
}
.series-words{
    height: calc(11px + .8vw);
  }
.driver-series{
  position: relative;
  color: red;
  font-family: Verdana;  
  -webkit-text-stroke: 1px black;
  font-weight: bold;
  font-size: 27px;
  text-align: center;
  margin: 10px auto 0px auto;
  

}
.driver-first-name{
  position: absolute;
  padding-top: 326px;
  padding-left: 0px;
  font-size: 15px;
  font-family: Verdana;
  transform: rotate(-43deg);
  width: 140px;
  text-align: center;
}
.driver-last-name{
  position: absolute;
  padding-top: 342px;
  padding-left: 8px;
  margin: auto;
  font-size: 15px;
  font-family: Verdana;
  transform: rotate(-43deg);
  text-align: center;
  width: 140px;
}

.home-route {
  padding: 20px;
  float: center;
  align-items: center;
  text-align: center;
}
.moveup{
  color: green;
}
.movedown{
  color: red;
}

p {
  padding: 10px;
}
.explanation{
  font-style: italic;
  font-size: calc(7px + .7vw);
  margin: auto;
  margin-bottom: 40px;
  width: 80%
}
</style>
