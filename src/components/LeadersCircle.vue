<template>
  <div class="main-leaders">
    <title-page
      title-text="2024 Leader's Circle"
      />
      <div class="last-update"><b>Last Updated:</b> September 16th, 2024</div>
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
        {team:"Team Penske",number:2,points:0,races:{stpete:1,longbeach:33,barber:14,indygp:13,indy500:61,detroit:6,roadamerica:41,laguna:12,midohio:5,iowa1:35,iowa2:26,toronto:19,gateway:51,portland:36,milwaukee1:26,milwaukee2:7,nashville:36}},
          {team:"Team Penske",number:3,points:0,races:{stpete:0,longbeach:5,barber:54,indygp:29,indy500:43,detroit:10,roadamerica:38,laguna:9,midohio:36,iowa1:53,iowa2:37,toronto:14,gateway:42,portland:26,milwaukee1:5,milwaukee2:53,nashville:30}},
          {team:"Arrow McLaren",number:5,points:0,races:{stpete:50,longbeach:14,barber:7,indygp:17,indy500:46,detroit:26,roadamerica:24,laguna:24,midohio:51,iowa1:40,iowa2:28,toronto:13,gateway:5,portland:15,milwaukee1:53,milwaukee2:6,nashville:41}},
          {team:"Arrow McLaren",number:6,points:0,races:{stpete:19,longbeach:19,barber:9,indygp:11,indy500:20,detroit:20,roadamerica:17,laguna:18,midohio:10,iowa1:18,iowa2:16,toronto:9,gateway:27,portland:9,milwaukee1:13,milwaukee2:5,nashville:12}},
          {team:"Arrow McLaren",number:7,points:0,races:{stpete:28,longbeach:20,barber:5,indygp:25,indy500:42,detroit:30,roadamerica:12,laguna:36,midohio:28,iowa1:24,iowa2:15,toronto:16,gateway:12,portland:18,milwaukee1:26,milwaukee2:29,nashville:16}},
          {team:"Chip Ganassi Racing",number:8,points:0,races:{stpete:9,longbeach:17,barber:36,indygp:6,indy500:5,detroit:8,roadamerica:19,laguna:13,midohio:15,iowa1:9,iowa2:19,toronto:17,gateway:36,portland:7,milwaukee1:29,milwaukee2:10,nashville:24}},
          {team:"Chip Ganassi Racing",number:9,points:0,races:{stpete:26,longbeach:53,barber:15,indygp:33,indy500:36,detroit:53,roadamerica:9,laguna:28,midohio:5,iowa1:32,iowa2:32,toronto:36,gateway:20,portland:5,milwaukee1:20,milwaukee2:40,nashville:13}},
          {team:"Chip Ganassi Racing",number:10,points:0,races:{stpete:32,longbeach:35,barber:31,indygp:54,indy500:31,detroit:15,roadamerica:33,laguna:54,midohio:44,iowa1:7,iowa2:43,toronto:32,gateway:33,portland:40,milwaukee1:30,milwaukee2:11,nashville:19}},
          {team:"Team Penske",number:12,points:0,races:{stpete:30,longbeach:29,barber:41,indygp:40,indy500:17,detroit:28,roadamerica:51,laguna:26,midohio:19,iowa1:12,iowa2:51,toronto:18,gateway:15,portland:53,milwaukee1:41,milwaukee2:21,nashville:6}},
          {team:"A.J. Foyt Racing",number:14,points:0,races:{stpete:22,longbeach:9,barber:27,indygp:5,indy500:32,detroit:22,roadamerica:15,laguna:22,midohio:20,iowa1:28,iowa2:19,toronto:10,gateway:18,portland:25,milwaukee1:32,milwaukee2:33,nashville:28}},
          {team:"Rahal Letterman Lanigan",number:15,points:0,races:{stpete:16,longbeach:13,barber:19,indygp:23,indy500:15,detroit:15,roadamerica:20,laguna:6,midohio:12,iowa1:14,iowa2:24,toronto:20,gateway:8,portland:22,milwaukee1:10,milwaukee2:7,nashville:7}},
          {team:"Dale Coyne Racing",number:18,points:0,races:{stpete:13,longbeach:5,barber:17,indygp:12,indy500:0,detroit:13,roadamerica:5,laguna:5,midohio:5,iowa1:5,iowa2:5,toronto:6,gateway:10,portland:6,milwaukee1:14,milwaukee2:16,nashville:17}},
          {team:"Ed Carpenter Racing",number:20,points:0,races:{stpete:11,longbeach:5,barber:6,indygp:10,indy500:14,detroit:5,roadamerica:10,laguna:17,midohio:22,iowa1:10,iowa2:8,toronto:5,gateway:13,portland:5,milwaukee1:19,milwaukee2:14,nashville:16}},
          {team:"Ed Carpenter Racing",number:21,points:0,races:{stpete:24,longbeach:16,barber:13,indygp:5,indy500:29,detroit:16,roadamerica:6,laguna:5,midohio:11,iowa1:30,iowa2:22,toronto:24,gateway:20,portland:19,milwaukee1:16,milwaukee2:26,nashville:18}},
          {team:"Andretti Global",number:26,points:0,races:{stpete:36,longbeach:41,barber:24,indygp:26,indy500:7,detroit:13,roadamerica:29,laguna:41,midohio:32,iowa1:21,iowa2:30,toronto:54,gateway:30,portland:33,milwaukee1:9,milwaukee2:36,nashville:51}},
          {team:"Andretti Global",number:27,points:0,races:{stpete:20,longbeach:27,barber:20,indygp:19,indy500:29,detroit:33,roadamerica:31,laguna:31,midohio:24,iowa1:26,iowa2:14,toronto:40,gateway:8,portland:20,milwaukee1:18,milwaukee2:24,nashville:36}},
          {team:"Andretti Global",number:28,points:0,races:{stpete:7,longbeach:30,barber:12,indygp:14,indy500:5,detroit:40,roadamerica:22,laguna:20,midohio:30,iowa1:22,iowa2:7,toronto:13,gateway:7,portland:28,milwaukee1:5,milwaukee2:30,nashville:5}},
          {team:"Rahal Letterman Lanigan",number:30,points:0,races:{stpete:17,longbeach:6,barber:5,indygp:17,indy500:5,detroit:17,roadamerica:14,laguna:16,midohio:6,iowa1:11,iowa2:10,toronto:11,gateway:16,portland:5,milwaukee1:12,milwaukee2:9,nashville:9}},
          {team:"A.J. Foyt Racing",number:41,points:0,races:{stpete:6,longbeach:12,barber:5,indygp:8,indy500:15,detroit:9,roadamerica:13,laguna:10,midohio:14,iowa1:15,iowa2:9,toronto:5,gateway:23,portland:12,milwaukee1:7,milwaukee2:12,nashville:10}},
          {team:"Rahal Letterman Lanigan",number:45,points:0,races:{stpete:13,longbeach:7,barber:28,indygp:36,indy500:18,detroit:20,roadamerica:19,laguna:15,midohio:26,iowa1:8,iowa2:13,toronto:26,gateway:15,portland:17,milwaukee1:22,milwaukee2:18,nashville:11}},
          {team:"Dale Coyne Racing",number:51,points:0,races:{stpete:10,longbeach:10,barber:9,indygp:5,indy500:5,detroit:12,roadamerica:8,laguna:5,midohio:17,iowa1:13,iowa2:6,toronto:15,gateway:5,portland:13,milwaukee1:11,milwaukee2:16,nashville:5}},
          {team:"Meyer Shank Racing",number:60,points:0,races:{stpete:30,longbeach:24,barber:33,indygp:20,indy500:9,detroit:24,roadamerica:17,laguna:19,midohio:16,iowa1:17,iowa2:5,toronto:7,gateway:28,portland:16,milwaukee1:17,milwaukee2:19,nashville:5}},
          {team:"Meyer Shank Racing",number:66,points:0,races:{stpete:15,longbeach:8,barber:11,indygp:7,indy500:5,detroit:5,roadamerica:11,laguna:14,midohio:18,iowa1:5,iowa2:17,toronto:28,gateway:10,portland:10,milwaukee1:15,milwaukee2:8,nashville:23}},
          {team:"Juncos Hollinger Racing",number:77,points:0,races:{stpete:8,longbeach:24,barber:18,indygp:18,indy500:11,detroit:7,roadamerica:26,laguna:32,midohio:7,iowa1:6,iowa2:20,toronto:22,gateway:14,portland:5,milwaukee1:6,milwaukee2:22,nashville:14}},
          {team:"Juncos Hollinger Racing",number:78,points:0,races:{stpete:14,longbeach:15,barber:10,indygp:9,indy500:8,detroit:18,roadamerica:7,laguna:12,midohio:8,iowa1:5,iowa2:5,toronto:5,gateway:17,portland:8,milwaukee1:35,milwaukee2:13,nashville:20}}          
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
        let totalPoints = 0
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