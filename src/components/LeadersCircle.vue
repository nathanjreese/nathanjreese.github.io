<template>
  <div class="main-leaders">
    <title-page
      title-text="2025 Leader's Circle"
      />
      <div class="last-update"><b>Last Updated:</b>May 26th, 2025</div>
  <div class="table-holder">
  <v-table class="leaders-table" density="compact">
    <thead>
      <tr>
        <th class="text-left">
          Rank
        </th>
        <th class="text-left">
          Entry
        </th>
        <th class="text-left">
          Points
        </th>
        <th class="text-left">
          +/-
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in sortedStandings"
        :key="item.name"
      >
        <td>{{ index + 1 }}</td>
        <td class="text-left"> #{{ item.number }} {{ item.team }}</td>
        <td>{{ item.points }}</td>
        <td 
        v-if="item.points >= standings[21].points"
        class="points-col" :class="{ out: item.points < standings[21].points}"
        >+{{ item.points - standings[22].points }}</td>
        <td 
        v-if="item.points < standings[21].points"
        class="points-col" :class="{ out: item.points < standings[21].points}"
        >{{ item.points - standings[21].points }}</td>
      </tr>
    </tbody>
  </v-table>
  </div>
</div>
</template>
<script>

// import leadersData from "@/components/Helpers/LeadersCircle.csv"
import TitlePage from '@/components/Partials/Title'
// import encrypteData from '@/utils/encryption.js'
// import { decryptSymmetric } from '../utils/encryption'

  export default {
    components: {
    TitlePage
    },
    data () {
      return {
        standings: [
          {team:"Team Penske",number:2,points:104,races:{stpete:0}},
          {team:"Team Penske",number:3,points:145,races:{stpete:0}},
          {team:"A.J. Foyt Racing",number:4,points:110,races:{stpete:0}},
          {team:"Arrow McLaren",number:5,points:194,races:{stpete:0}},
          {team:"Arrow McLaren",number:6,points:82,races:{stpete:0}},
          {team:"Arrow McLaren",number:7,points:181,races:{stpete:0}},
          {team:"Chip Ganassi Racing",number:8,points:67,races:{stpete:0}},
          {team:"Chip Ganassi Racing",number:9,points:153,races:{stpete:0}},
          {team:"Chip Ganassi Racing",number:10,points:306,races:{stpete:0}},
          {team:"Team Penske",number:12,points:142,races:{stpete:0}},
          {team:"A.J. Foyt Racing",number:14,points:103,races:{stpete:0}},
          {team:"Rahal Letterman Lanigan",number:15,points:105,races:{stpete:0}},
          {team:"Dale Coyne Racing",number:18,points:105,races:{stpete:0}},
          {team:"Ed Carpenter Racing",number:20,points:104,races:{stpete:0}},
          {team:"Ed Carpenter Racing",number:21,points:95,races:{stpete:0}},
          {team:"Andretti Global",number:26,points:120,races:{stpete:0}},
          {team:"Andretti Global",number:27,points:156,races:{stpete:0}},
          {team:"Andretti Global",number:28,points:79,races:{stpete:0}},
          {team:"Rahal Letterman Lanigan",number:30,points:64,races:{stpete:0}},
          {team:"Rahal Letterman Lanigan",number:45,points:67,races:{stpete:0}},
          {team:"Dale Coyne Racing",number:51,points:28,races:{stpete:0}},
          {team:"Meyer Shank Racing",number:60,points:165,races:{stpete:0}},
          {team:"Meyer Shank Racing",number:66,points:103,races:{stpete:0}},
          {team:"Juncos Hollinger Racing",number:76,points:83,races:{stpete:0}},
          {team:"Juncos Hollinger Racing",number:77,points:63,races:{stpete:0}}
        ]
      }
    },
    computed: {
      csvJSON() {
        const csvToJson = require('convert-csv-to-json')

        const jsonData = csvToJson.getJsonFromCsv('@/components/Helpers/LeadersCircle.csv')
        
        return jsonData
      },
      sortedStandings() {
        this.standings.forEach(team => {
        let totalPoints = team.points
        // Loop through races for each team
        for (const race in team.races) {
              totalPoints += team.races[race] // Add points for the race to totalPoints
        }
        // Update the total points for the team
        team.points = totalPoints;
       })

      // Sort standings array by points in descending order
      const sorted = this.standings.sort((a, b) => b.points - a.points)

      return sorted
  }
  }
  }
</script>

<style scoped>
.main-leaders {
  text-align: center;
  background-color:rgb(231, 231, 231);
  padding-bottom: 50px;
  }
  .last-update{
  padding-bottom: 20px;
}
  .table-holder{
    display: flex;
    float: center;
    flex-direction: column;
  }
.leaders-table{
  max-width: 600px;
  min-width: calc(250px + 25vw);
  height: 80%;
  font-size: calc(10px + .5vw);
  float: center;
  margin-left: auto;
  margin-right: auto;
  background-color: #cfcfcf;
  border: 2px solid black;
  box-shadow: 5px 5px 5px #616161;
  color: black;
  thead{
    color: whitesmoke;
    background-color: #323232;
  }
  td{padding: 4px;}
}
tr:nth-child(even)
{
  background-color: #dbdbdb;
}

.leaders-title{
    font-size: calc(10px + 2.5vw) !important;
    padding-bottom: calc(20px + 3vw);
    text-shadow: 2px 1px 1px #000000;
    font-family: Verdana;
    font-weight: bold;
  }
  .points-col{
    color: darkgreen;
  }
  .points-col.out{
    color: #a30707;
  }
  </style>