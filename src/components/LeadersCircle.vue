<template>
  <div class="main-leaders">
    <title-page
      title-text="2023 Leader's Circle"
      />
  <div class="table-holder">
  <v-table theme="dark" class="leaders-table" density="compact">
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
        standings: [{team:"Chip Ganassi Racing",number:10,points:618,previous:565,"Portland":53,"Laguna":""},{team:"Chip Ganassi Racing",number:9,points:527,previous:491,"Portland":36,"Laguna":""},{team:"Team Penske",number:2,points:470,previous:440,"Portland":30,"Laguna":""},{team:"Arrow McLaren",number:5,points:461,previous:429,"Portland":32,"Laguna":""},{team:"Team Penske",number:3,points:448,previous:426,"Portland":22,"Laguna":""},{team:"Chip Ganassi Racing",number:8,points:423,previous:397,"Portland":26,"Laguna":""},{team:"Team Penske",number:12,points:393,previous:388,"Portland":5,"Laguna":""},{team:"Rahal Letterman Lanigan",number:45,points:362,previous:343,"Portland":19,"Laguna":""},{team:"Arrow McLaren",number:7,points:349,previous:339,"Portland":10,"Laguna":""},{team:"Andretti Global",number:26,points:348,previous:331,"Portland":17,"Laguna":""},{team:"Andretti Global",number:27,points:347,previous:327,"Portland":20,"Laguna":""},{team:"Arrow McLaren",number:6,points:323,previous:270,"Portland":53,"Laguna":""},{team:"Andretti Global",number:28,points:276,previous:271,"Portland":5,"Laguna":""},{team:"Ed Carpenter Racing",number:21,points:265,previous:237,"Portland":28,"Laguna":""},{team:"Rahal Letterman Lanigan",number:15,points:263,previous:243,"Portland":20,"Laguna":""},{team:"Dale Coyne Racing",number:18,points:255,previous:230,"Portland":25,"Laguna":""},{team:"Juncos Hollinger Racing",number:77,points:236,previous:221,"Portland":15,"Laguna":""},{team:"A.J. Foyt Racing",number:14,points:201,previous:187,"Portland":14,"Laguna":""},{team:"Meyer Shank Racing",number:"06",points:200,previous:184,"Portland":19,"Laguna":""},{team:"Ed Carpenter Racing",number:20,points:179,previous:170,"Portland":9,"Laguna":""},{team:"Rahal Letterman Lanigan",number:30,points:172,previous:160,"Portland":12,"Laguna":""},{team:"Andretti Global",number:29,points:169,previous:156,"Portland":13,"Laguna":""},{team:"Meyer Shank Racing",number:60,points:166,previous:160,"Portland":6,"Laguna":""},{team:"Juncos Hollinger Racing",number:78,points:164,previous:159,"Portland":5,"Laguna":""},{team:"Dale Coyne Racing",number:51,points:129,previous:122,"Portland":7,"Laguna":""},{team:"A.J. Foyt Racing",number:55,points:115,previous:107,"Portland":8,"Laguna":""}]
      }
    },
    // methods: {
    //   callFernet(){
    //     const decryptedValue = decryptSymmetric('')
    //     alert(decryptedValue)

    //   }
    // },
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
  }
  .table-holder{
    display: flex;
    float: center;
    flex-direction: column;
  }
.leaders-table{
  max-width: 900px;
  height: 80%;
  font-size: calc(8px + 1vw);
  float: center;
  margin-left: auto;
  margin-right: auto;
}
.leaders-title{
    font-size: calc(10px + 2.5vw) !important;
    padding-bottom: calc(20px + 3vw);
    text-shadow: 2px 1px 1px #000000;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
  }
  .points-col{
    color: rgb(0, 196, 55);
  }
  .points-col.out{
    color: red;
  }
  </style>