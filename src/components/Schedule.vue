<template>
  <div class="main-schedule">
    <title-page
      title-text="2025 Schedule"
      />
  <div class="schedule-table-holder">
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
      <label class="past-label" for="checkbox">Past </label>

      <input class="race-checkbox" type="checkbox" :value=!showRaces id="raceCheckbox" :checked="false" v-model="showRaces"/>
      <label class="race-label" for="checkbox"> Races </label>

      <input class="type-checkbox" type="checkbox" value="IndyCar" id="IndyCarCheckbox" :checked="true" v-model="checkedEvents"/>
      <label class="type-label" for="checkbox"> IndyCar </label>
      <input class="type-checkbox" type="checkbox"  value="IndyNXT" id="IndyNxtCheckbox" :checked="true" v-model="checkedEvents"/>
      <label class="type-label" for="checkbox"> IndyNXT </label>
      <input class="type-checkbox" type="checkbox"  value="USF" id="USFCheckbox" :checked="false" v-model="checkedEvents"/>
      <label class="type-label" for="checkbox">USF</label>
    </div>
  <v-table class="schedule-table" density="compact">
    <thead>
      <tr>
        <th class="text-center" width=22%>
          Date
        </th>
        <th class="text-left" width="24%">
          Time
        </th>
        <th class="text-left" width="19%">
          Series
        </th>
        <th class="text-left" width="19%">
          Session
        </th>
        <th class="text-left  " width="16%">
          TV (US)
        </th>
        <!-- <th class="text-left">
          Event
        </th> -->
      </tr>
    </thead>
    <tbody
      v-for="(weekend, i) in getUnique"
    >
      <tr class="weekendheader" :class="{testheader:(weekend.includes('Test'))}">
        <td colspan="5" @click="">{{weekend}}</td>
        </tr>
      <tr
        v-for="(item, index) in filteredEvents.filter(item => item.event === weekend)"
        :key="item.name"
        :class="{orow: this.uniqueDates.indexOf(item.date) % 2 === 0, erow: this.uniqueDates.indexOf(item.date) % 2 !== 0}"
      >
      <td :class="{isracecenter: item.type === 'Race', notracecenter: item.type !== 'Race'}"
        >{{ item.dow }} {{ item.newdate }}</td>
      <td :class="{israce: item.type === 'Race', notrace: item.type !== 'Race'}"
        >{{ item.newtime }}</td>
        <td :class="{israce: item.type === 'Race', notrace: item.type !== 'Race'}">
          {{item.series}}
          <!-- <img ref="image" 
          v-if="item.series.includes('IndyCar')"
          :src="IndyCarLogoPic"
          title="IndyCar"
          alt="IndyCar Logo"
          contain
          class="series-words"
          >
          <img ref="image" 
          v-if="item.series.includes('NXT')"
          :src="IndyNxtLogoPic"
          title="IndyNXT"
          alt="IndyNXT Logo"
          contain
          class="series-words"
          >
          <img ref="image" 
          v-if="item.series.includes('Pro200')"
          :src="USFProLogoPic"
          title="USF Pro 2000"
          alt="USF Pro 2000 Logo"
          contain
          class="series-words"
          >
          <img ref="image" 
          v-if="item.series.includes('USF2000')"
          :src="USF2000LogoPic"
          title="USF2000"
          alt="USF2000 Logo"
          contain
          class="series-words"
          >
          <img ref="image" 
          v-if="item.series.includes('USFJuniors')"
          :src="USFJuniorsLogoPic"
          title="USF Jniors"
          alt="USF Juniors Logo"
          contain
          class="series-words"
          > -->
        </td>
        <!-- <td :class="{israce: item.type === 'Race', notrace: item.type !== 'Race'}"
        >{{ item.series }}</td> -->
        <td :class="{israce: item.type === 'Race', notrace: item.type !== 'Race'}"
        >{{ item.type }}</td>
        <td :class="{isracecenter: item.type === 'Race', notracecenter: item.type !== 'Race'}"
        >{{ item.airing }}</td>
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
        uniqueDates: [],
        checkedEvents: ['IndyCar', 'IndyNXT'],
        IndyCarLogoPic: new URL('@/assets/IndyCarWords.png', import.meta.url),
        IndyNxtLogoPic: new URL('@/assets/IndyNxtWords.png', import.meta.url),
        USFProLogoPic: new URL('@/assets/USFProWords.png', import.meta.url),
        USF2000LogoPic: new URL('@/assets/USF2000Words.png', import.meta.url),
        USFJuniorsLogoPic: new URL('@/assets/USFJuniorsWords.png', import.meta.url),
        showPast: false,
        showRaces: false,
        events: [],
        selectedTime: 'US/Eastern'
      }
    },
    mounted() {
        const sortedByDate = scheduleData.sort((a, b) => new Date(a.date) - new Date(b.date))

        this.events = sortedByDate.filter(event =>
          event.date.includes('2025')
        )
      
    },
    computed: {
      filteredEvents(){
        let events = this.events.filter(event => 
          this.checkedEvents.includes(event.series) || 
          (this.checkedEvents.includes('USF') && event.series.includes('USF'))

          )
        events = events.filter(event => this.timeStatus(event) === true)
        events = this.showRaces ? events.filter(event => event.type === 'Race') : events
        
        this.uniqueEvents = [...new Set(events.map(event => event.event))]
        this.uniqueDates = [...new Set(events.map(event => event.date))]

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
          
          if(targetTimezone === 'UTC'){
            const newDateTime = convertedDatetime.format('YYYY-MM-DD HH:mm')
            const newDateString = newDateTime.toString()
            const [newDate, newtime] = newDateString.split(' ')
            const newDateDay = newDate.split('-')

            // Parse the date string
            const finalDate = new Date(newDateString)

            // Get the month and day
            const month = finalDate.toLocaleString('default', { month: 'long' })
            const day = finalDate.getDate();
            const formattedDate = `${month} ${day}`
            item.newdate = `${newDateDay[1].replace(/^0+/, '')}/${newDateDay[2]}`
            item.newtime = datetimeStr.includes('44') ? 'TBD' : newtime + ' UTC'
          }
          else{
            const newDateTime = convertedDatetime.format('YYYY-MM-DD hh:mm A')
            const newDateString = newDateTime.toString()
            const [newDate, timePart, ampm] = newDateString.split(' ')
            const newDateDay = newDate.split('-')
          
            const finalTime = timePart.startsWith('0') ? timePart.substring(1): timePart
            // Parse the date string
            const finalDate = new Date(newDateString);

            // Get the month and day
            const month = finalDate.toLocaleString('default', { month: 'long' })
            const day = finalDate.getDate();

            const formattedDate = `${month} ${day}`
            item.newdate = `${newDateDay[1].replace(/^0+/, '')}/${newDateDay[2]}`
            item.newtime = datetimeStr.includes('44') ? 'TBD' : finalTime + ' ' + ampm
          }
          
      })
      },
      timeStatus(event){
        
        let filterPast = false
        if (this.showPast) {
          filterPast = true
        }
        else{
          const givenDatetime = new Date(event.date)
          // Get today's date
          const today = new Date();

          // Subtract one day
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() - 1);
          filterPast = tomorrow < givenDatetime
        }

        return filterPast
      }
    }
  }
</script>

<style scoped>
.main-schedule {
  width: 100%;
  text-align: center;
  background-color:rgb(231, 231, 231);
  padding-bottom: 50px;
  }
  .dropdown-tz{
    width: calc(200px + 2vw);
    padding-left: 10px;
    margin-left: calc(2px + 3vw);
    border: 2px solid rgb(57, 118, 216);
    font-weight: normal;
  }
  .schedule-table-holder{
    display: flex;
    max-width: 800px;
    margin: auto;
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
    max-width: 90%;
  }
  .past-label{
    margin: 0px calc(2px + 1vw) 0px 0px;
    font-size: calc(10px + .4vw);
  }
  .race-label{
    margin: 0px calc(3px + 5vw) 0px 0px;
    font-size: calc(10px + .4vw);
  }
  .type-label{
    margin: 0px calc(2px + .4vw) 0px 0px;
    font-size: calc(10px + .4vw);
  }
  .past-checkbox{
    margin: calc(1px + .2vw) calc(2px + .5vw) 10px calc(2px + .6vw);
  }
  .race-checkbox{
    margin: calc(1px + .2vw) calc(2px + .5vw) 10px calc(2px + .6vw);
  }
  .type-checkbox{
    margin: calc(1px + .2vw) calc(2px + .5vw) 10px calc(2px + .6vw);
  }
  }
  .series-words{
    height: calc(11px + .8vw);
  }
.schedule-table{
  width: 99%;
  height: 80%;
  font-size: calc(8px + .6vw);
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
  .weekendheader{
    color: whitesmoke;
    font-size: calc(10px + .5vw);
    font-family: Verdana;
    text-align: center;
    font-weight: 520;
    background-color: rgb(57, 118, 216);
    padding-top: 100px !important;
  }
  .testheader{
    color: whitesmoke;
    font-size: calc(10px + .5vw);
    font-family: Verdana;
    text-align: center;
    font-weight: bold;
    background-color: rgb(88, 88, 88);
  }
  .orow{
  background-color: #dbdbdb;
  height: calc(16px + 1.5vw);
}
  td{
    height: calc(16px + 1.5vw);
    /* border: 2px solid black; */
    padding: calc(.1px + .3vw) calc(.1px + .5vw) calc(.1px + .3vw) calc(.2px + .3vw);
    }
    .isracecenter{
      font-weight: bold;
      text-align: center;
      padding: calc(.1px + .3vw) calc(.1px + .5vw) calc(.1px + .3vw) calc(.2px + .3vw);

    }
    .notracecenter{
      text-align: center;
      padding: calc(.1px + .3vw) calc(.1px + .5vw) calc(.1px + .3vw) calc(.2px + .3vw);

    }
    .israce{
      font-weight: bold;
      text-align: left;
      padding: calc(.1px + .3vw) calc(.1px + .5vw) calc(.1px + .3vw) calc(.2px + .3vw);

    }
    .notrace{
      text-align: left;
      padding: calc(.1px + .3vw) calc(.1px + .5vw) calc(.1px + .3vw) calc(.2px + .3vw);

    }
    .text-center{
      text-align: center;
      padding: calc(.1px + .3vw) calc(.1px + .5vw) calc(.1px + .3vw) calc(.2px + .3vw);

    }
    .text-left{
      text-align: left !important;
      padding: calc(.1px + .3vw) calc(.1px + .5vw) calc(.1px + .3vw) calc(.2px + .3vw);

    }
    .erow{
      background-color: whitesmoke;
    }
    /* tr:nth-child(even)
    {
      background-color: #dbdbdb;
    } */
  }



  </style>