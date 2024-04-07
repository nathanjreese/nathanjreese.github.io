<template>
  <div class="main-schedule">
    <title-page
      title-text="2024 Schedule"
      />
  <div class="table-holder">
    <div class="schedule-options">
      <input class="checkbox-class" type="checkbox" value="IndyCar" id="checkbox" :checked="true" v-model="checkedEvents"/>
      <label for="checkbox"> IndyCar </label>
      <input class="checkbox-class" type="checkbox"  value="IndyNXT" id="checkbox" :checked="true" v-model="checkedEvents"/>
      <label for="checkbox"> IndyNXT </label>
    </div>
  <v-table class="schedule-table" density="compact">
    <thead>
      <tr>
        <th class="text-left">
          Series
        </th>
        <th class="text-left">
          Date
        </th>
        <th class="text-left">
          Description
        </th>
        <th class="text-left">
          Event
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in filteredEvents"
        :key="item.name"
        :class="{orow: this.uniqueEvents.indexOf(item.event) % 2 === 0, erow: this.uniqueEvents.indexOf(item.event) % 2 !== 0}"
      >
        <td class="text-left">
          <img ref="image" 
          v-if="item.series.includes('IndyCar')"
          :src="IndyNxtLogoPic"
          alt="IndyCar Logo"
          contain
          class="series-words"
          >
          <img ref="image" 
          v-if="item.series.includes('NXT')"
          :src="IndyCarLogoPic"
          alt="IndyCar Logo"
          contain
          class="series-words"
          >
        </td>
        <td class="text-left">{{ item.date }} {{ item.time}}</td>
        <td class="text-left">{{ item.description }}</td>
        <td class="text-left">{{ item.event }}</td>
      </tr>
    </tbody>
  </v-table>
  </div>
</div>
</template>
<script>

import getSeasonSchedule from '@/utils/schedule.js'
import TitlePage from '@/components/Partials/Title'

  export default {
    components: {
    TitlePage
    },
    data () {
      return {
        events: [],
        uniqueEvents: [],
        checkedEvents: ['IndyCar', 'IndyNXT'],
        IndyCarLogoPic: new URL('@/assets/IndycarWords.png', import.meta.url),
        IndyNxtLogoPic: new URL('@/assets/IndyNxtWords.png', import.meta.url),
      }
    },
    // watch: {
    //     checkedEvents () {
    //       alert("CHECKED", checkedEvents[0])
    //     },
    // },
    mounted() {
      getSeasonSchedule()
      .then((results) => { 
        console.log(results)
        this.uniqueEvents = [...new Set(results.map(event => event.event))]
        
        // console.log("111111", this.uniqueEvents)
        // console.log("MMMM: ", this.checkedEvents)

        // this.events = this.events.filter(event => this.checkedEvents.includes(event.series));

        this.events = results
      })
    },
    computed: {
      csvJSON() {
        const csvToJson = require('convert-csv-to-json')

        const jsonData = csvToJson.getJsonFromCsv('@/components/Helpers/scheduleCircle.csv')
        
        return jsonData
      },
      filteredEvents(){
        const events = this.events.filter(event => this.checkedEvents.includes(event.series))
        return events
      }
    },
    methods: {
      filterSeries(series){
        alert(series)
        console.log("lPPPP")
        this.events.filter(event => event.series === 'IndyNXT')
        console.log("3333: ", this.events)
      }
    }
  }
</script>

<style scoped>
.main-schedule {
  text-align: center;
  background-color:rgb(231, 231, 231);
  padding-bottom: 50px;
  }
  .table-holder{
    display: flex;
    float: center;
    flex-direction: column;
    
    .schedule-options{
    display: flex;
    float: center;
    flex-direction: row;
    font-weight: bold;
    margin: auto;
    padding: 10px;
  }
  .checkbox-class{
    margin: 0 5px 0 20px;
  }
  }
  .series-words{
    height:18px;
  }
.schedule-table{
  max-width: 900px;
  height: 80%;
  font-size: calc(8px + .4vw);
  float: center;
  margin-left: auto;
  margin-right: auto;
  background-color: whitesmoke;
  border: 2px solid black;
  box-shadow: 5px 5px 5px #616161;
  color: black;
  thead{
    color: whitesmoke;
    background-color: #323232;
  }
}
.orow{
  background-color: #dbdbdb;
}
/* .erow{
  background-color: whitesmoke;
} */
/* tr:nth-child(even)
{
  background-color: #dbdbdb;
} */

.schedule-title{
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