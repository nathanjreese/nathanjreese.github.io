<template>
  <div class="main-frequency">
    <title-page
      title-text="Driver Frequencies"
      />
  <div class="table-holder">
  <v-table class="frequency-table" density="compact">
    <thead>
      <tr>
        <th class="text-left">
          Number
        </th>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Team
        </th>
        <th class="text-left">
          Frequency
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in getFrequencies.filter(item => item.series !== 'IndyNXT')"
        :key="item.name"
        :class="{broadcast: item.series === 'Broadcast'}"
      >
        <td>{{ item.number }}</td>
        <td class="td-fields">{{ item.name }}</td>
        <td class="td-fields">{{ item.team }}</td>
        <td class="td-fields">{{ Number(item.frequency).toFixed(4) }}</td>
      </tr>
    </tbody>
  </v-table>
  <div class="notes">
  *Indy 500 Only
  </div>
  </div>
</div>
</template>
<script>

import TitlePage from '@/components/Partials/Title'
import frequencies from "@/components/Helpers/Frequencies.json"

  export default {
    components: {
    TitlePage
    },
    data () {
      return {
        driverChannels: frequencies
      }
    },
    computed: {
      getFrequencies() {
        return this.driverChannels      
    }
  }
  }
</script>

<style scoped>
.main-frequency {
  text-align: center;
  background-color:rgb(231, 231, 231);
  padding-bottom: 50px;
  }
  .v-table{
    td{padding: 4px;}
  }
  .table-holder{
    display: flex;
    float: center;
    flex-direction: column;
  }
  .td-fields{
    text-align: left;
    padding: 0px;
  }
.frequency-table{
  min-width: 60%;
  max-width: 99%;
  height: 80%;
  font-size: calc(9px + .6vw);
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
.broadcast{
  color: blue;
  background-color: whitesmoke !important;
}
tr:nth-child(even)
{
  background-color: #dbdbdb;
}


.frequency-title{
    font-size: calc(10px + 2.5vw) !important;
    padding-bottom: calc(20px + 3vw);
    text-shadow: 2px 1px 1px #000000;
    font-family: Verdana;    
    font-weight: bold;
  }
  .notes{
    padding-top: 30px;
    font-size: 16px;
    font-style: italic;
  }
  </style>