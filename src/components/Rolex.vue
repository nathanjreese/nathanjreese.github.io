<template>
  <div class="main-leaders">
    <title-page
      title-text="24 Hours of Daytona Tracker"
      />
  <div class="table-holder">
  <v-table theme="dark" class="leaders-table" density="compact">
    <thead>
      <tr>
        <th class="text-left">
          Drivers
        </th>
        <th class="text-left">
          Current Driver
        </th>
        <th class="text-left">
          Car #
        </th>
        <th class="text-left">
          Team
        </th>
        <th class="text-left">
          Class
        </th>
        <th class="text-left">
          Overall Pos
        </th>
        <th class="text-left">
          Class Pos
        </th>
        <th class="text-left">
          Behind Leader
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in standings"
        :key=standings.id
        :class=item.class>
        <td class="text-left" style="padding: 6px">{{item.drivers}}</td>
        <td class="text-left" style="padding: 2px">{{item.current_driver}}</td>
        <td style="padding: 4px">{{item.car_number}}</td>
        <td class="text-left" style="padding: 4px">{{item.team}}</td>
        <td class="text-center" style="padding: 5px">{{item.class}}</td>
        <td class="text-center" style="padding: 1px">{{item.overall_position}}</td>
        <td class="text-center" style="padding: 1px">{{item.class_position}}</td>
        <td class="text-center" style="padding: 1px">{{item.behind_leader}}</td>
      </tr>
    </tbody>
  </v-table>
  </div>
</div>
</template>
<script>

import TitlePage from '@/components/Partials/Title'
import axios from 'axios'
import getAllDrivers from '@/utils/imsadrivers.js'

  export default {
    components: {
    TitlePage
    },
    data () {
      return {
        standings: []
      }
    },
    mounted() {
      getAllDrivers()
      .then((results) => { 
        this.standings = results
      })
    },
    computed: {
      csvJSON() {
        const csvToJson = require('convert-csv-to-json')

        const jsonData = csvToJson.getJsonFromCsv('@/components/Helpers/LeadersCircle.csv')
        
        return jsonData
      }
      
    },
    methods: {
    },
  }
</script>

<style scoped>
.main-leaders {
  text-align: center;
  max-width: 100%;
  background-color:rgb(231, 231, 231);
  margin: auto;
  padding: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  }
  .table-holder{
    width: 100%;
    display: inline-flex;
    float: center;
    flex-direction: column;
    padding: 40px calc(10px + 4vw);
    margin: auto;
    display: inline-flex;
  }
.leaders-table{
  width: 100%;
  height: 80%;
  font-size: calc(7px + .5vw);
  float: center;
  color: #969aff;
  align-items: center;
  display: grid;
}
.v-table tbody tr:nth-child(odd) {
      background-color: #333333;
}
.v-table tbody tr td{
  padding: 0px 1px;
}
.leaders-title{
    font-size: calc(10px + 2.5vw) !important;
    padding-bottom: calc(20px + 3vw);
    text-shadow: 2px 1px 1px #000000;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
  }
  .GTD{
    color: #4af778;
    padding: 31px;
  }
  .Pro{
    color: #ff8282;
    padding: 31px;
  }
  .GTP{
    color: #b5b5b5;
    padding: 31px;
  }
  .LMP2{
    color: #ffd270;
  }
  </style>