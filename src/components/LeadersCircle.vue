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
        <th class="text-left" style="background:#162844 !important; color:#eef4ff !important;">
          Rank
        </th>
        <th class="text-left" style="background:#162844 !important; color:#eef4ff !important;">
          Entry
        </th>
        <th class="text-left" style="background:#162844 !important; color:#eef4ff !important;">
          Points
        </th>
        <th class="text-left" style="background:#162844 !important; color:#eef4ff !important;">
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
          {team:"Team Penske",number:2,points:126,races:{stpete:0}},
          {team:"Team Penske",number:3,points:164,races:{stpete:0}},
          {team:"A.J. Foyt Racing",number:4,points:126,races:{stpete:0}},
          {team:"Arrow McLaren",number:5,points:221,races:{stpete:0}},
          {team:"Arrow McLaren",number:6,points:93,races:{stpete:0}},
          {team:"Arrow McLaren",number:7,points:205,races:{stpete:0}},
          {team:"Chip Ganassi Racing",number:8,points:97,races:{stpete:0}},
          {team:"Chip Ganassi Racing",number:9,points:173,races:{stpete:0}},
          {team:"Chip Ganassi Racing",number:10,points:311,races:{stpete:0}},
          {team:"Team Penske",number:12,points:175,races:{stpete:0}},
          {team:"A.J. Foyt Racing",number:14,points:118,races:{stpete:0}},
          {team:"Rahal Letterman Lanigan",number:15,points:115,races:{stpete:0}},
          {team:"Dale Coyne Racing",number:18,points:110,races:{stpete:0}},
          {team:"Ed Carpenter Racing",number:20,points:124,races:{stpete:0}},
          {team:"Ed Carpenter Racing",number:21,points:102,races:{stpete:0}},
          {team:"Andretti Global",number:26,points:157,races:{stpete:0}},
          {team:"Andretti Global",number:27,points:209,races:{stpete:0}},
          {team:"Andretti Global",number:28,points:96,races:{stpete:0}},
          {team:"Rahal Letterman Lanigan",number:30,points:71,races:{stpete:0}},
          {team:"Rahal Letterman Lanigan",number:45,points:76,races:{stpete:0}},
          {team:"Dale Coyne Racing",number:51,points:40,races:{stpete:0}},
          {team:"Meyer Shank Racing",number:60,points:175,races:{stpete:0}},
          {team:"Meyer Shank Racing",number:66,points:131,races:{stpete:0}},
          {team:"Juncos Hollinger Racing",number:76,points:96,races:{stpete:0}},
          {team:"Juncos Hollinger Racing",number:77,points:78,races:{stpete:0}}
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
  width: 100%;
  text-align: center;
  background: transparent;
  color: var(--color-text);
  padding-bottom: 50px;
}

.last-update {
  padding-bottom: 20px;
  color: var(--color-text-soft);
  font-size: calc(10px + 0.3vw);
}

.table-holder {
  display: flex;
  max-width: 700px;
  margin: auto;
  flex-direction: column;
  gap: 6px;
  padding: 10px 10px 14px;
}

.leaders-table {
  width: 100%;
  min-width: calc(250px + 25vw);
  font-size: calc(10px + 0.5vw);
  margin-left: auto;
  margin-right: auto;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  overflow: hidden;
  color: var(--color-text);
}

.leaders-table thead {
  background: var(--color-nav);
  color: #eef4ff;
}

:deep(.leaders-table .v-table__wrapper > table > tbody > tr > td) {
  color: var(--color-text) !important;
  height: calc(24px + 1.1vw);
  padding: calc(2px + 0.2vw) calc(4px + 0.35vw);
}

.leaders-table tr:nth-child(odd) {
  background: #edf3fc;
}

.leaders-table tr:nth-child(even) {
  background: #f8fbff;
}

.points-col {
  color: #1a7a3a;
  font-weight: 700;
}

.points-col.out {
  color: #b91c1c;
}
</style>