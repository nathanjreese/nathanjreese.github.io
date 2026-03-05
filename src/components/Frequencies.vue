<template>
  <div class="main-frequency">
    <title-page
      title-text="Driver Frequencies"
      />
  <div class="table-holder">
  <v-table class="frequency-table" density="compact">
    <thead>
      <tr>
        <th class="text-left" width=10%>
          Number
        </th>
        <th class="text-left" width=35%>
          Name
        </th>
        <th class="text-left" width=45%>
          Team
        </th>
        <th class="text-left" width=10%>
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
        driverChannels: frequencies,
        extraFrequencies: [
          {
      "number": "06",
      "name": "*Helio Castroneves",
      "team": "Meyer Shank Racing",
      "frequency": "460.3375",
      "secondary": "-",
      "series": "IndyCar"
    },
    {
      "number": "17",
      "name": "*Ryan Hunter-Reay",
      "team": "Arrow McLaren",
      "frequency": "460.4500",
      "secondary": "456.1375",
      "series": "IndyCar"
    },
    {
      "number": 23,
      "name": "Conor Daly",
      "team": "DRR / Cusick",
      "frequency": "453.3750",
      "secondary": "-",
      "series": "IndyCar"
    },
    {
      "number": 24,
      "name": "*Jack Harvey",
      "team": "DRR / Cusick",
      "frequency": "461.0125",
      "secondary": "-",
      "series": "IndyCar"
    },
    {
      "number": "33",
      "name": "*Ed Carpenter",
      "team": "Ed Carpenter Racing",
      "frequency": "467.7125",
      "secondary": "-",
      "series": "IndyCar"
    },
    {
      "number": "75",
      "name": "*Takuma Sato",
      "team": "Rahal Letterman Lanigan",
      "frequency": "460.4250",
      "secondary": "-",
      "series": "IndyCar"
    },
    {
      "number": 83,
      "name": "Robert Shwartzman",
      "team": "Prema Racing",
      "frequency": "461.1625",
      "secondary": "461.3375",
      "series": "IndyCar"
    },
    {
      "number": 90,
      "name": "Callum Ilott",
      "team": "Prema Racing",
      "frequency": "462.8375",
      "secondary": "466.1625",
      "series": "IndyCar"
    },
    {
      "number": 98,
      "name": "*Marco Andretti",
      "team": "Andretti Global",
      "frequency": "464.1375",
      "secondary": "-",
      "series": "IndyCar"
    }
        ]
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
    td{
    height: calc(23px + 1.5vw);
    /* border: 2px solid black; */
    padding: calc(.1px + .3vw) calc(.8px + .5vw) calc(.1px + .3vw) calc(.9px + .3vw);
    }
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