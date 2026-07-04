<template>
  <div class="main-schedule">
    <title-page title-text="2026 Schedule" />
    <div class="schedule-table-holder">
      <div class="schedule-options">
        <div class="time-label">Time Zone:</div>
        <select class="dropdown-tz" v-model="selectedTime">
          <option value="US/Eastern">US/Eastern</option>
          <option value="US/Central">US/Central</option>
          <option value="US/Mountain">US/Mountain</option>
          <option value="US/Pacific">US/Pacific</option>
          <option value="US/Alaska">US/Alaska</option>
          <option value="US/Hawaii">US/Hawaii</option>
          <option value="UTC">UTC</option>
        </select>
      </div>

      <div class="schedule-options filter-row">
        <div class="filter-group">
          <label class="filter-toggle">
            <input type="checkbox" v-model="showPast" />
            <span class="toggle-label">Past</span>
          </label>
          <label class="filter-toggle">
            <input type="checkbox" v-model="showRaces" />
            <span class="toggle-label">Races Only</span>
          </label>
        </div>

        <div class="filter-group series-filters">
          <label class="filter-toggle">
            <input type="checkbox" value="IndyCar" v-model="checkedEvents" />
            <span class="toggle-label">IndyCar</span>
          </label>
          <label class="filter-toggle">
            <input type="checkbox" value="IndyNXT" v-model="checkedEvents" />
            <span class="toggle-label">IndyNXT</span>
          </label>
          <label class="filter-toggle">
            <input type="checkbox" value="USF" v-model="checkedEvents" />
            <span class="toggle-label">USF</span>
          </label>
        </div>
      </div>

      <v-table class="schedule-table" density="compact">
        <thead>
          <tr>
            <th class="text-center" width="21%" style="background:#162844 !important; color:#eef4ff !important;">Date</th>
            <th class="text-left" width="21%" style="background:#162844 !important; color:#eef4ff !important;">Time</th>
            <th class="text-left" width="22%" style="background:#162844 !important; color:#eef4ff !important;">Series</th>
            <th class="text-left" width="18%" style="background:#162844 !important; color:#eef4ff !important;">Session</th>
            <th class="text-left" width="18%" style="background:#162844 !important; color:#eef4ff !important;">TV (US)</th>
          </tr>
        </thead>
        <tbody v-for="(weekend, i) in getUnique" :key="`${weekend}-${i}`">
          <tr class="weekendheader" :class="{ testheader: weekend.includes('Test') }">
            <td colspan="5">{{ weekend }}</td>
          </tr>
          <tr
            v-for="item in filteredEvents.filter(event => event.event === weekend)"
            :key="item.name"
            :class="{ orow: getDayIndexWithinEvent(weekend, item.date) % 2 === 0, erow: getDayIndexWithinEvent(weekend, item.date) % 2 !== 0 }"
          >
            <td :class="{ isracecenter: item.type === 'Race', notracecenter: item.type !== 'Race' }">
              {{ item.dow }} {{ item.newdate }}
            </td>
            <td :class="{ israce: item.type === 'Race', notrace: item.type !== 'Race' }">{{ item.newtime }}</td>
            <td :class="{ israce: item.type === 'Race', notrace: item.type !== 'Race' }">{{ item.series }}</td>
            <td :class="{ israce: item.type === 'Race', notrace: item.type !== 'Race' }">{{ item.type }}</td>
            <td :class="{ isracecenter: item.type === 'Race', notracecenter: item.type !== 'Race' }">{{ item.airing }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script>
import TitlePage from '@/components/Partials/Title'
import scheduleData from '@/components/Helpers/Schedule.json'
import moment from 'moment-timezone'
import timezones from 'timezones-list'

export default {
  components: {
    TitlePage
  },
  data() {
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

    this.events = sortedByDate.filter(event => event.date.includes('2026'))
  },
  computed: {
    filteredEvents() {
      let events = this.events.filter(
        event => this.checkedEvents.includes(event.series) || (this.checkedEvents.includes('USF') && event.series.includes('USF'))
      )
      events = events.filter(event => this.timeStatus(event) === true)
      events = this.showRaces ? events.filter(event => event.type === 'Race') : events

      // Sort by date, then by time
      events.sort((a, b) => {
        const dateCompare = new Date(a.date) - new Date(b.date)
        if (dateCompare !== 0) return dateCompare
        
        // If same date, sort by time (handle TBD times)
        const timeA = a.time.includes('44') ? '23:59' : a.time
        const timeB = b.time.includes('44') ? '23:59' : b.time
        return moment(timeA, 'hh:mm A').diff(moment(timeB, 'hh:mm A'))
      })

      this.uniqueEvents = [...new Set(events.map(event => event.event))]
      this.uniqueDates = [...new Set(events.map(event => event.date))]

      this.setTimeZone(events)

      return events
    },
    getUnique() {
      return [...new Set(this.filteredEvents.map(event => event.event))]
    }
  },
  methods: {
    getDayIndexWithinEvent(weekend, date) {
      const eventsInWeekend = this.filteredEvents.filter(event => event.event === weekend)
      const uniqueDatesInWeekend = [...new Set(eventsInWeekend.map(e => e.date))]
      return uniqueDatesInWeekend.indexOf(date)
    },
    setTimeZone() {
      const targetTimezone = this.selectedTime
      this.events.forEach(item => {
        const datetimeStr = item.date + ' ' + item.time
        const dtObj = moment.tz(datetimeStr, 'YYYY-MM-DD hh:mm A', 'US/Eastern')
        const convertedDatetime = dtObj.clone().tz(targetTimezone)

        if (targetTimezone === 'UTC') {
          const newDateTime = convertedDatetime.format('YYYY-MM-DD HH:mm')
          const newDateString = newDateTime.toString()
          const [newDate, newtime] = newDateString.split(' ')
          const newDateDay = newDate.split('-')

          item.newdate = `${newDateDay[1].replace(/^0+/, '')}/${newDateDay[2]}`
          item.newtime = datetimeStr.includes('44') ? 'TBD' : newtime + ' UTC'
        } else {
          const newDateTime = convertedDatetime.format('YYYY-MM-DD hh:mm A')
          const newDateString = newDateTime.toString()
          const [newDate, timePart, ampm] = newDateString.split(' ')
          const newDateDay = newDate.split('-')

          const finalTime = timePart.startsWith('0') ? timePart.substring(1) : timePart
          item.newdate = `${newDateDay[1].replace(/^0+/, '')}/${newDateDay[2]}`
          item.newtime = datetimeStr.includes('44') ? 'TBD' : finalTime + ' ' + ampm
        }
      })
    },
    timeStatus(event) {
      let filterPast = false
      if (this.showPast) {
        filterPast = true
      } else {
        const givenDatetime = new Date(event.date)
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() - 1)
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
  background: transparent;
  color: var(--color-text);
  padding-bottom: 50px;
}

.schedule-table-holder {
  display: flex;
  max-width: 900px;
  margin: auto;
  flex-direction: column;
  gap: 6px;
  padding: 10px 10px 14px;
}

.time-label {
  font-size: calc(12px + 0.4vw);
  color: var(--color-heading);
  font-weight: 700;
}

.dropdown-tz {
  min-width: 210px;
  width: calc(210px + 2vw);
  padding: 8px 14px;
  margin-left: calc(2px + 2vw);
  border: 2px solid var(--color-accent);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-accent);
  font-weight: 700;
  outline: none;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(47, 118, 216, 0.15);
  transition: all 0.2s ease;
}

.dropdown-tz:hover {
  background: #e9f1ff;
  box-shadow: 0 3px 10px rgba(47, 118, 216, 0.25);
}

.dropdown-tz:focus {
  border-color: var(--color-accent-strong);
  box-shadow: 0 0 0 3px rgba(47, 118, 216, 0.25);
}

.schedule-options {
  font-size: calc(12px + 0.4vw);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 10px;
  max-width: 95%;
}

.filter-row {
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.series-filters {
  border-left: 1px solid var(--color-border);
  padding-left: 20px;
}

.filter-toggle {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.filter-toggle input[type='checkbox'] {
  display: none;
}

.filter-toggle .toggle-label {
  padding: 6px 14px;
  border-radius: 20px;
  background: #e9f1ff;
  color: #173862;
  font-size: calc(10px + 0.35vw);
  font-weight: 700;
  transition: all 0.2s ease;
  border: 1px solid #b8cced;
}

.filter-toggle input[type='checkbox']:checked + .toggle-label {
  background: #ffbe3d;
  color: #0f2a4d;
  border-color: #d79a1b;
}

.filter-toggle:hover .toggle-label {
  border-color: #2f76d8;
}

.series-words {
  height: calc(11px + 0.8vw);
}

.schedule-table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  font-size: calc(10px + 0.45vw);
  margin-left: auto;
  margin-right: auto;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  overflow: hidden;
  color: var(--color-text);
}

.schedule-table thead {
  color: #eef4ff;
  background: var(--color-nav);
}

.schedule-table thead tr {
  background: var(--color-nav) !important;
}

:deep(.schedule-table .v-table__wrapper > table > thead > tr > th) {
  background: var(--color-nav) !important;
  color: #eef4ff !important;
  font-weight: 700;
  border-bottom: 1px solid #253f66;
}

:deep(.schedule-table .v-table__wrapper > table > tbody > tr > td) {
  color: var(--color-text) !important;
}

.schedule-table .weekendheader {
  color: var(--color-nav);
  font-size: calc(11px + 0.35vw);
  font-family: Verdana;
  text-align: center;
  font-weight: 700;
  font-style: italic;
  letter-spacing: 0.03em;
  background: linear-gradient(90deg, #c8d9f5, #dce9fb) !important;
  border-top: 2px solid var(--color-accent) !important;
  border-bottom: 1px solid var(--color-border) !important;
}

.schedule-table .testheader {
  color: #e8f0ff;
  font-size: calc(11px + 0.35vw);
  font-family: Verdana;
  text-align: center;
  font-weight: 700;
  background: #2b3f62 !important;
}

.schedule-table td,
.schedule-table .isracecenter,
.schedule-table .notracecenter,
.schedule-table .israce,
.schedule-table .notrace,
.schedule-table .text-center,
.schedule-table .text-left,
.schedule-table .erow {
  height: calc(24px + 1.1vw);
  padding: calc(2px + 0.2vw) calc(4px + 0.35vw);
}

.schedule-table .text-left,
.schedule-table .israce,
.schedule-table .notrace {
  text-align: left !important;
}

.schedule-table .text-center,
.schedule-table .isracecenter,
.schedule-table .notracecenter {
  text-align: center;
}

.schedule-table .israce,
.schedule-table .isracecenter {
  font-weight: 700;
}

.schedule-table .orow {
  background: #edf3fc;
}

.schedule-table .erow {
  background: #f8fbff;
}

.schedule-table tr:not(.weekendheader):not(.testheader):nth-child(odd) {
  background: #edf3fc;
}

.schedule-table tr:not(.weekendheader):not(.testheader):nth-child(even) {
  background: #f8fbff;
}

@media (max-width: 600px) {
  .schedule-options {
    gap: 8px;
    padding: 8px;
  }

  .dropdown-tz {
    min-width: 170px;
    width: 100%;
    margin-left: 0;
  }

  .filter-row {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  .filter-group {
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .series-filters {
    border-left: none;
    border-top: 1px solid var(--color-border);
    padding-left: 0;
    padding-top: 10px;
  }

  .filter-toggle .toggle-label {
    padding: 5px 10px;
    font-size: 12px;
  }

  .schedule-table {
    font-size: 12px;
  }
}
</style>
