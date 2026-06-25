<template>
  <div class="main-frequency">
    <title-page
      title-text="Driver Frequencies"
      />
  <div class="table-holder">
  <v-table class="frequency-table" density="compact">
    <thead>
      <tr>
        <th class="text-left" width="10%" style="background:#162844 !important; color:#eef4ff !important;">
          Number
        </th>
        <th class="text-left" width="35%" style="background:#162844 !important; color:#eef4ff !important;">
          Name
        </th>
        <th class="text-left" width="45%" style="background:#162844 !important; color:#eef4ff !important;">
          Team
        </th>
        <th class="text-left" width="10%" style="background:#162844 !important; color:#eef4ff !important;">
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
  width: 100%;
  text-align: center;
  background: transparent;
  color: var(--color-text);
  padding-bottom: 50px;
}

.table-holder {
  display: flex;
  max-width: 900px;
  margin: auto;
  flex-direction: column;
  gap: 6px;
  padding: 10px 10px 14px;
}

.frequency-table {
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

.frequency-table thead {
  color: #eef4ff;
  background: var(--color-nav);
}

.frequency-table thead tr {
  background: var(--color-nav) !important;
}

:deep(.frequency-table .v-table__wrapper > table > tbody > tr > td) {
  color: var(--color-text) !important;
  height: calc(24px + 1.1vw);
  padding: calc(2px + 0.2vw) calc(4px + 0.35vw);
}

.td-fields {
  text-align: left;
}

.frequency-table tr:nth-child(odd) {
  background: #edf3fc;
}

.frequency-table tr:nth-child(even) {
  background: #f8fbff;
}

.broadcast {
  color: var(--color-accent) !important;
  font-weight: 600;
}

.notes {
  padding-top: 16px;
  font-size: calc(10px + 0.3vw);
  font-style: italic;
  color: var(--color-text-soft);
  text-align: center;
}
</style>