<template>
  <div class="main-leaders">
    <title-page
      title-text="2024 Leader's Circle"
      />
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
        v-for="(item, index) in standings"
        :key="item.name"
      >
        <td>{{ index + 1 }}</td>
        <td class="text-left">{{ item.team }} #{{ item.number }}</td>
        <td>{{ item.points }}</td>
        <td class="points-col" :class="{ out: item.points < standings[21].points}"
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
          {team:"Team Penske",number:2,points:54,previous:0,"Portland":30,"Laguna":""},
          {team:"Arrow McLaren",number:5,points:40,previous:0,"Portland":32,"Laguna":""},
          {team:"Team Penske",number:3,points:35,previous:0,"Portland":22,"Laguna":""},
          {team:"Team Penske",number:12,points:32,previous:0,"Portland":5,"Laguna":""},
          {team:"Andretti Global",number:26,points:31,previous:331,"Portland":17,"Laguna":""},
          {team:"Chip Ganassi Racing",number:10,points:28,previous:0,"Portland":53,"Laguna":""},
          {team:"Meyer Shank Racing",number:60,points:26,previous:160,"Portland":6,"Laguna":""},
          {team:"Arrow McLaren",number:7,points:24,previous:339,"Portland":10,"Laguna":""},
          {team:"Chip Ganassi Racing",number:9,points:22,previous:0,"Portland":36,"Laguna":""},
          {team:"Ed Carpenter Racing",number:21,points:20,previous:237,"Portland":28,"Laguna":""},
          {team:"A.J. Foyt Racing",number:14,points:19,previous:187,"Portland":14,"Laguna":""},
          {team:"Andretti Global",number:27,points:18,previous:327,"Portland":20,"Laguna":""},
          {team:"Arrow McLaren",number:6,points:17,previous:270,"Portland":53,"Laguna":""},
          {team:"Rahal Letterman Lanigan",number:30,points:15,previous:160,"Portland":12,"Laguna":""},
          {team:"Rahal Letterman Lanigan",number:15,points:14,previous:243,"Portland":20,"Laguna":""},
          {team:"Meyer Shank Racing",number:66,points:13,previous:184,"Portland":19,"Laguna":""},
          {team:"Juncos Hollinger Racing",number:78,points:12,previous:159,"Portland":5,"Laguna":""},
          {team:"Dale Coyne Racing",number:18,points:11,previous:230,"Portland":25,"Laguna":""},
          {team:"Rahal Letterman Lanigan",number:45,points:11,previous:343,"Portland":19,"Laguna":""},
          {team:"Ed Carpenter Racing",number:20,points:9,previous:170,"Portland":9,"Laguna":""},
          {team:"Dale Coyne Racing",number:51,points:8,previous:122,"Portland":7,"Laguna":""},
          {team:"Chip Ganassi Racing",number:8,points:7,previous:0,"Portland":26,"Laguna":""},
          {team:"Juncos Hollinger Racing",number:77,points:6,previous:221,"Portland":15,"Laguna":""},
          {team:"Andretti Global",number:28,points:5,previous:271,"Portland":5,"Laguna":""},
          {team:"A.J. Foyt Racing",number:41,points:5,previous:107,"Portland":8,"Laguna":""}
        ]
      }
    },
    computed: {
      csvJSON() {
        const csvToJson = require('convert-csv-to-json')

        const jsonData = csvToJson.getJsonFromCsv('@/components/Helpers/LeadersCircle.csv')
        
        return jsonData
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
  .table-holder{
    display: flex;
    float: center;
    flex-direction: column;
  }
.leaders-table{
  max-width: 900px;
  height: 80%;
  font-size: calc(8px + .8vw);
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
}
tr:nth-child(even)
{
  background-color: #dbdbdb;
}

.leaders-title{
    font-size: calc(10px + 2.5vw) !important;
    padding-bottom: calc(20px + 3vw);
    text-shadow: 2px 1px 1px #000000;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
  }
  .points-col{
    color: darkgreen;
  }
  .points-col.out{
    color: #a30707;
  }
  </style>