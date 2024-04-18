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
        v-for="(item, index) in sortedStandings"
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
        {team:"Team Penske",number:2,points:0,races:{stpete:54,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Team Penske",number:3,points:0,races:{stpete:35,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Arrow McLaren",number:5,points:0,races:{stpete:40,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Arrow McLaren",number:6,points:0,races:{stpete:17,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Arrow McLaren",number:7,points:0,races:{stpete:24,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Chip Ganassi Racing",number:8,points:0,races:{stpete:7,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Chip Ganassi Racing",number:9,points:0,races:{stpete:22,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Chip Ganassi Racing",number:10,points:0,races:{stpete:28,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Team Penske",number:12,points:0,races:{stpete:32,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"A.J. Foyt Racing",number:14,points:0,races:{stpete:19,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Rahal Letterman Lanigan",number:15,points:0,races:{stpete:14,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Dale Coyne Racing",number:18,points:0,races:{stpete:11,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Ed Carpenter Racing",number:20,points:0,races:{stpete:9,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Ed Carpenter Racing",number:21,points:0,races:{stpete:20,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Andretti Global",number:26,points:0,races:{stpete:31,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Andretti Global",number:27,points:0,races:{stpete:18,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Andretti Global",number:28,points:0,races:{stpete:5,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Rahal Letterman Lanigan",number:30,points:0,races:{stpete:15,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"A.J. Foyt Racing",number:41,points:0,races:{stpete:5,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Rahal Letterman Lanigan",number:45,points:0,races:{stpete:11,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Dale Coyne Racing",number:51,points:0,races:{stpete:8,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Meyer Shank Racing",number:60,points:0,races:{stpete:26,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Meyer Shank Racing",number:66,points:0,races:{stpete:13,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Juncos Hollinger Racing",number:77,points:0,races:{stpete:6,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}},
          {team:"Juncos Hollinger Racing",number:78,points:0,races:{stpete:12,longbeach:0,barber:0,indygp:0,indy500:0,detroit:0,roadamerica:0,laguna:0,midohio:0,iowa1:0,iowa2:0,toronto:0,gateway:0,portland:0,milwaukee1:0,milwaukee2:0,nashville:0}}          
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