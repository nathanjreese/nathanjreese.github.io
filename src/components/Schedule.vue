<template>
  <div class="main-schedule">
    <title-page
      title-text="2024 Schedule"
      />
  <div class="table-holder">
    <div class="schedule-options">
    <div class="time-label">Time Zone: </div>
      <select class="dropdown-tz" v-model="selectedTime">V
        <option value="US/Eastern" >US/Eastern</option>
        <option value="US/Central">US/Central</option>
        <option value="US/Mountain">US/Mountain</option>
        <option value="US/Pacific">US/Pacific</option>
        <option value="US/Alaska">US/Alaska</option>
        <option value="US/Hawaii">US/Hawaii</option>
        <option value="UTC">UTC</option>
        
      </select>
    </div>
    <div class="schedule-options">
      <input class="past-checkbox" type="checkbox" :value=!showPast id="pastCheckbox" :checked="false" v-model="showPast"/>
      <label class="past-label" for="checkbox"> Show Past Events </label>

      <input class="race-checkbox" type="checkbox" :value=!showRaces id="raceCheckbox" :checked="false" v-model="showRaces"/>
      <label class="race-label" for="checkbox"> Races Only </label>

      <input class="type-checkbox" type="checkbox" value="IndyCar" id="IndyCarCheckbox" :checked="true" v-model="checkedEvents"/>
      <label class="type-label" for="checkbox"> IndyCar </label>
      <input class="type-checkbox" type="checkbox"  value="IndyNXT" id="IndyNxtCheckbox" :checked="true" v-model="checkedEvents"/>
      <label class="type-label" for="checkbox"> IndyNXT </label>
    </div>
  <v-table class="schedule-table" density="compact">
    <thead>
      <tr>
        <th class="text-left">
          Series
        </th>
        <th class="text-left">
          Description
        </th>
        <th class="text-left">
          Date
        </th>
        <!-- <th class="text-left">
          Event
        </th> -->
      </tr>
    </thead>
    <tbody
      v-for="(weekend, i) in getUnique"
    >
      <tr class='weekend-header'>
        <td colspan="3">{{weekend}}</td>
        </tr>
      <tr
        v-for="(item, index) in filteredEvents.filter(item => item.event === weekend)"
        :key="item.name"
        :class="{orow: this.uniqueEvents.indexOf(item.event) % 2 === 0, erow: this.uniqueEvents.indexOf(item.event) % 2 !== 0}"
      >
        <td class="text-left">
          <img ref="image" 
          v-if="item.series.includes('IndyCar')"
          :src="IndyCarLogoPic"
          alt="IndyCar Logo"
          contain
          class="series-words"
          >
          <img ref="image" 
          v-if="item.series.includes('NXT')"
          :src="IndyNxtLogoPic"
          alt="IndyCar Logo"
          contain
          class="series-words"
          >
        </td>
        <td :class="{israce: item.type === 'Race', notrace: item.type !== 'Race'}"
        >{{ item.description }}</td>
        <td :class="{israce: item.type === 'Race', notrace: item.type !== 'Race'}"
        >{{ item.datetime }}</td>
        <!-- <td :class="{israce: item.type === 'Race', notrace: item.type !== 'Race'}"
        >{{ item.event }}</td> -->
      </tr>
    </tbody>
  </v-table>
  </div>
</div>
</template>
<script>

import getSeasonSchedule from '@/utils/schedule.js'
import TitlePage from '@/components/Partials/Title'
import scheduleData from "@/components/Helpers/Schedule.json"
import moment from 'moment-timezone'
import timezones from 'timezones-list'
import Dropdown from 'v-dropdown'

  export default {
    components: {
    TitlePage
    },
    data () {
      return {
        uniqueEvents: [],
        checkedEvents: ['IndyCar', 'IndyNXT'],
        IndyCarLogoPic: new URL('@/assets/IndyCarWords.png', import.meta.url),
        IndyNxtLogoPic: new URL('@/assets/IndyNxtWords.png', import.meta.url),
        showPast: false,
        showRaces: false,
        events: scheduleData,
        selectedTime: 'US/Eastern'
      }
    },
    // mounted() {
    //   getSeasonSchedule()
    //   .then((results) => { 
        
    //     this.events = results
    //   })
    // },
    computed: {
      filteredEvents(){
        let events = this.events.filter(event => this.checkedEvents.includes(event.series))
        events = events.filter(event => this.timeStatus(event) === true)
        events = this.showRaces ? events.filter(event => event.type === 'Race') : events
        
        this.uniqueEvents = [...new Set(events.map(event => event.event))]

        this.setTimeZone(events)

        return events
      },
      getUnique(){
        const uniqueEvents = [...new Set(this.filteredEvents.map(event => event.event))]
        return uniqueEvents

      },
    },
    methods: {
      setTimeZone(events){
        const targetTimezone = this.selectedTime;
        this.events.forEach(item => {
          // Combine date and time strings into a single datetime string
          const datetimeStr = item.date + ' ' + item.time
          const dtObj = moment.tz(datetimeStr, 'YYYY-MM-DD hh:mm A', 'US/Eastern')
          const convertedDatetime = dtObj.clone().tz(targetTimezone)
          // item.datetime = convertedDatetime.format('YYYY-MM-DD HH:mm:ss')
        
          item.datetime = targetTimezone === 'UTC' ? convertedDatetime.format('YYYY-MM-DD HH:mm') : convertedDatetime.format('YYYY-MM-DD hh:mm A')
          
      })
      },
      timeStatus(event){
        
        let filterPast = false
        if (this.showPast) {
          filterPast = true
        }
        else{
          const givenDatetime = new Date(event.date)
          const currentTime = new Date()
          filterPast = currentTime < givenDatetime
        }

        return filterPast
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
  .dropdown-tz{
    width: calc(200px + 2vw);;
    padding-left: 10px;
    margin-left: calc(2px + 3vw);
    border: 2px solid rgb(57, 118, 216);
    font-weight: normal;
  }
  .table-holder{
    display: flex;
    float: center;
    flex-direction: column;
    .time-label{
      font-size: calc(12px + .4vw);
      padding-top: 2px;
    }
    .schedule-options{
    font-size: calc(12px + .4vw);
    display: flex;
    float: center;
    flex-direction: row;
    font-weight: bold;
    margin: auto;
    padding: 10px;
  }
  .past-label{
    margin: 0px calc(3px + 1vw) 0px 0px;
    font-size: calc(10px + .4vw);
  }
  .race-label{
    margin: 0px calc(5px + 5vw) 0px 0px;
    font-size: calc(10px + .4vw);
  }
  .type-label{
    margin: 0px calc(3px + .4vw) 0px 0px;
    font-size: calc(10px + .4vw);
  }
  .past-checkbox{
    margin: calc(2px + .2vw) calc(2px + .5vw) 10px calc(2px + .6vw);
  }
  .race-checkbox{
    margin: calc(2px + .2vw) calc(2px + .5vw) 10px calc(2px + .6vw);
  }
  .type-checkbox{
    margin: calc(2px + .2vw) calc(2px + .5vw) 10px calc(2px + .6vw);
  }
  }
  .series-words{
    height: calc(11px + .8vw);
  }
.schedule-table{
  max-width: 900px;
  height: 80%;
  font-size: calc(10px + .4vw);
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
.weekend-header{
    color: whitesmoke;
    font-size: 16px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-align: center;
    background-color: rgb(57, 118, 216);
  }
.orow{
  background-color: #dbdbdb;
}
.israce{
  font-weight: bold;
  text-align: left;
}
.notrace{
  text-align: left;
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
  </style>