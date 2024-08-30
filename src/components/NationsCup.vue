<template>
  <div class="main-nations">
    <title-page
      title-text="2024 Nations Cup"
      />
      <div class="last-update"><b>Last Updated:</b> August 29, 2024</div>
  <div class="table-holder">
  <v-table class="nations-table" density="compact">
    <thead>
      <tr>
        <th class="text-left">
          Rank
        </th>
        <th class="text-left">
          
        </th>
        <th class="text-left">
          Country
        </th>
        <th class="text-left">
          Points
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in this.calculateCountryPoints"
      >
        <td class="text-rank">{{ index + 1 }}</td>
        <td class="text-rank">
          <img ref="image" 
          :src="countryFlags[item.country]"
          alt="New Zealand Flag"
          contain
          class="flag-images"
          >
        </td>
        <td class="text-country">{{ item.country }}</td>
        <td class="text-points">{{ item.points }}</td>
       
      </tr>
    </tbody>
  </v-table>
  </div>
</div>
</template>
<script>

import TitlePage from '@/components/Partials/Title'
// import encrypteData from '@/utils/encryption.js'
// import { decryptSymmetric } from '../utils/encryption'

  export default {
    components: {
    TitlePage
    },
    data () {
      return {
        countryFlags: {
          "New Zealand": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
          "United States": new URL('@/assets/Flags/UnitedStates.png', import.meta.url),
          "Spain": new URL('@/assets/Flags/Spain.png', import.meta.url),
          "Australia": new URL('@/assets/Flags/Australia.png', import.meta.url),
          "Mexico": new URL('@/assets/Flags/Mexico.png', import.meta.url),
          "Sweden": new URL('@/assets/Flags/Sweden.png', import.meta.url),
          "Denmark": new URL('@/assets/Flags/Denmark.png', import.meta.url),
          "France": new URL('@/assets/Flags/France.png', import.meta.url),
          "Netherlands": new URL('@/assets/Flags/Netherlands.png', import.meta.url),
          "United Kingdom": new URL('@/assets/Flags/UnitedKingdom.png', import.meta.url),
          "Brazil": new URL('@/assets/Flags/Brazil.png', import.meta.url),
          "Cayman Islands": new URL('@/assets/Flags/CaymanIslands.png', import.meta.url),
          "Argentina": new URL('@/assets/Flags/Argentina.png', import.meta.url),
          "Italy": new URL('@/assets/Flags/Italy.png', import.meta.url),
          "Japan": new URL('@/assets/Flags/Japan.png', import.meta.url),
          "Estonia": new URL('@/assets/Flags/Estonia.png', import.meta.url)
        },
        races:  ["stpete",
            "longbeach",
            "barber",
            "indygp",
            "indy500",
            "detroit",
            "roadamerica",
            "laguna",
            "midohio",
            "iowa1",
            "iowa2",
            "toronto",
            "gateway",
            "portland",
            "milwaukee1",
            "milwaukee2",
            "nashville"],
        drivers: [
  {
    "Driver": "Josef Newgarden",
    "number": 2,
    "Country": "United States",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 1,
    "longbeach": 33,
    "barber": 14,
    "indygp": 13,
    "indy500": 61,
    "detroit": 6,
    "roadamerica": 41,
    "laguna": 12,
    "midohio": 5,
    "iowa1": 35,
    "iowa2": 26,
    "toronto": 19,
    "gateway": 51,
    "portland": 36,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Scott McLaughlin",
    "number": 3,
    "Country": "New Zealand",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 5,
    "barber": 54,
    "indygp": 29,
    "indy500": 43,
    "detroit": 10,
    "roadamerica": 38,
    "laguna": 9,
    "midohio": 36,
    "iowa1": 53,
    "iowa2": 37,
    "toronto": 14,
    "gateway": 42,
    "portland": 26,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Pato O'Ward",
    "number": 5,
    "Country": "Mexico",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 50,
    "longbeach": 14,
    "barber": 7,
    "indygp": 17,
    "indy500": 46,
    "detroit": 26,
    "roadamerica": 24,
    "laguna": 24,
    "midohio": 51,
    "iowa1": 40,
    "iowa2": 28,
    "toronto": 13,
    "gateway": 5,
    "portland": 15,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Nolan Siegel",
    "number": 6,
    "Country": "United States",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 0,
    "barber": 0,
    "indygp": 0,
    "indy500": 0,
    "detroit": 0,
    "roadamerica": 0,
    "laguna": 18,
    "midohio": 10,
    "iowa1": 18,
    "iowa2": 16,
    "toronto": 9,
    "gateway": 27,
    "portland": 9,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Alexander Rossi",
    "number": 7,
    "Country": "United States",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 28,
    "longbeach": 20,
    "barber": 5,
    "indygp": 25,
    "indy500": 42,
    "detroit": 30,
    "roadamerica": 12,
    "laguna": 36,
    "midohio": 28,
    "iowa1": 24,
    "iowa2": 15,
    "toronto": 0,
    "gateway": 12,
    "portland": 18,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Linus Lundqvist",
    "number": 8,
    "Country": "Sweden",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 9,
    "longbeach": 17,
    "barber": 36,
    "indygp": 6,
    "indy500": 5,
    "detroit": 8,
    "roadamerica": 19,
    "laguna": 13,
    "midohio": 15,
    "iowa1": 9,
    "iowa2": 19,
    "toronto": 17,
    "gateway": 36,
    "portland": 7,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Scott Dixon",
    "number": 9,
    "Country": "New Zealand",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 26,
    "longbeach": 53,
    "barber": 15,
    "indygp": 33,
    "indy500": 36,
    "detroit": 53,
    "roadamerica": 9,
    "laguna": 28,
    "midohio": 5,
    "iowa1": 32,
    "iowa2": 32,
    "toronto": 36,
    "gateway": 20,
    "portland": 5,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Alex Palou",
    "number": 10,
    "Country": "Spain",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 32,
    "longbeach": 35,
    "barber": 31,
    "indygp": 54,
    "indy500": 31,
    "detroit": 15,
    "roadamerica": 33,
    "laguna": 54,
    "midohio": 44,
    "iowa1": 7,
    "iowa2": 43,
    "toronto": 32,
    "gateway": 32,
    "portland": 41,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Will Power",
    "number": 12,
    "Country": "Australia",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 30,
    "longbeach": 29,
    "barber": 41,
    "indygp": 40,
    "indy500": 17,
    "detroit": 28,
    "roadamerica": 51,
    "laguna": 26,
    "midohio": 19,
    "iowa1": 12,
    "iowa2": 51,
    "toronto": 18,
    "gateway": 15,
    "portland": 53,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Santino Ferrucci",
    "number": 14,
    "Country": "United States",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 22,
    "longbeach": 9,
    "barber": 27,
    "indygp": 5,
    "indy500": 32,
    "detroit": 22,
    "roadamerica": 15,
    "laguna": 22,
    "midohio": 20,
    "iowa1": 28,
    "iowa2": 19,
    "toronto": 10,
    "gateway": 18,
    "portland": 25,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Graham Rahal",
    "number": 15,
    "Country": "United States",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 16,
    "longbeach": 13,
    "barber": 19,
    "indygp": 23,
    "indy500": 15,
    "detroit": 15,
    "roadamerica": 20,
    "laguna": 6,
    "midohio": 12,
    "iowa1": 14,
    "iowa2": 24,
    "toronto": 20,
    "gateway": 8,
    "portland": 22,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Jack Harvey",
    "number": 18,
    "Country": "United Kingdom",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 13,
    "longbeach": 5,
    "barber": 17,
    "indygp": 12,
    "indy500": 0,
    "detroit": 13,
    "roadamerica": 5,
    "laguna": 5,
    "midohio": 5,
    "iowa1": 5,
    "iowa2": 0,
    "toronto": 0,
    "gateway": 10,
    "portland": 6,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Christian Rasmussen",
    "number": 20,
    "Country": "Denmark",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 11,
    "longbeach": 5,
    "barber": 6,
    "indygp": 10,
    "indy500": 18,
    "detroit": 5,
    "roadamerica": 10,
    "laguna": 17,
    "midohio": 22,
    "iowa1": 0,
    "iowa2": 0,
    "toronto": 5,
    "gateway": 0,
    "portland": 5,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Ed Carpenter",
    "number": 20,
    "Country": "United States",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 0,
    "barber": 0,
    "indygp": 0,
    "indy500": 14,
    "detroit": 0,
    "roadamerica": 0,
    "laguna": 0,
    "midohio": 0,
    "iowa1": 10,
    "iowa2": 8,
    "toronto": 0,
    "gateway": 13,
    "portland": 0,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Rinus Veekay",
    "number": 21,
    "Country": "Netherlands",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 24,
    "longbeach": 16,
    "barber": 13,
    "indygp": 5,
    "indy500": 29,
    "detroit": 16,
    "roadamerica": 6,
    "laguna": 5,
    "midohio": 11,
    "iowa1": 30,
    "iowa2": 22,
    "toronto": 24,
    "gateway": 20,
    "portland": 19,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Colton Herta",
    "number": 26,
    "Country": "United States",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 36,
    "longbeach": 41,
    "barber": 24,
    "indygp": 26,
    "indy500": 7,
    "detroit": 13,
    "roadamerica": 29,
    "laguna": 41,
    "midohio": 32,
    "iowa1": 21,
    "iowa2": 30,
    "toronto": 54,
    "gateway": 30,
    "portland": 33,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Kyle Kirkwood",
    "number": 27,
    "Country": "United States",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 20,
    "longbeach": 27,
    "barber": 20,
    "indygp": 19,
    "indy500": 29,
    "detroit": 33,
    "roadamerica": 31,
    "laguna": 31,
    "midohio": 24,
    "iowa1": 26,
    "iowa2": 14,
    "toronto": 40,
    "gateway": 8,
    "portland": 20,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Marcus Ericsson",
    "number": 28,
    "Country": "Sweden",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 7,
    "longbeach": 30,
    "barber": 12,
    "indygp": 14,
    "indy500": 5,
    "detroit": 40,
    "roadamerica": 22,
    "laguna": 20,
    "midohio": 30,
    "iowa1": 22,
    "iowa2": 7,
    "toronto": 13,
    "gateway": 7,
    "portland": 28,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Pietro Fittipaldi",
    "number": 30,
    "Country": "Brazil",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 17,
    "longbeach": 6,
    "barber": 5,
    "indygp": 17,
    "indy500": 5,
    "detroit": 17,
    "roadamerica": 14,
    "laguna": 16,
    "midohio": 6,
    "iowa1": 12,
    "iowa2": 10,
    "toronto": 11,
    "gateway": 16,
    "portland": 5,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Sting Ray Robb",
    "number": 41,
    "Country": "United States",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 6,
    "longbeach": 12,
    "barber": 5,
    "indygp": 8,
    "indy500": 15,
    "detroit": 9,
    "roadamerica": 13,
    "laguna": 10,
    "midohio": 14,
    "iowa1": 15,
    "iowa2": 9,
    "toronto": 5,
    "gateway": 23,
    "portland": 12,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Christian Lundgaard",
    "number": 45,
    "Country": "Denmark",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 13,
    "longbeach": 7,
    "barber": 28,
    "indygp": 36,
    "indy500": 18,
    "detroit": 20,
    "roadamerica": 19,
    "laguna": 15,
    "midohio": 26,
    "iowa1": 8,
    "iowa2": 13,
    "toronto": 26,
    "gateway": 15,
    "portland": 17,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Katherine Legge",
    "number": 51,
    "Country": "United Kingdom",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 0,
    "barber": 0,
    "indygp": 0,
    "indy500": 5,
    "detroit": 0,
    "roadamerica": 0,
    "laguna": 0,
    "midohio": 0,
    "iowa1": 13,
    "iowa2": 6,
    "toronto": 0,
    "gateway": 5,
    "portland": 0,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Felix Rosenqvist",
    "number": 60,
    "Country": "Sweden",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 30,
    "longbeach": 24,
    "barber": 33,
    "indygp": 20,
    "indy500": 9,
    "detroit": 24,
    "roadamerica": 17,
    "laguna": 19,
    "midohio": 16,
    "iowa1": 17,
    "iowa2": 5,
    "toronto": 7,
    "gateway": 28,
    "portland": 16,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "David Malukas",
    "number": 66,
    "Country": "United States",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 0,
    "barber": 0,
    "indygp": 0,
    "indy500": 0,
    "detroit": 0,
    "roadamerica": 0,
    "laguna": 14,
    "midohio": 18,
    "iowa1": 5,
    "iowa2": 17,
    "toronto": 28,
    "gateway": 10,
    "portland": 10,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Romain Grosjean",
    "number": 77,
    "Country": "France",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 8,
    "longbeach": 24,
    "barber": 18,
    "indygp": 18,
    "indy500": 11,
    "detroit": 7,
    "roadamerica": 26,
    "laguna": 32,
    "midohio": 7,
    "iowa1": 6,
    "iowa2": 20,
    "toronto": 22,
    "gateway": 14,
    "portland": 5,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Agustin Canapino",
    "number": 78,
    "Country": "Argentina",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 14,
    "longbeach": 15,
    "barber": 10,
    "indygp": 9,
    "indy500": 8,
    "detroit": 18,
    "roadamerica": 7,
    "laguna": 12,
    "midohio": 8,
    "iowa1": 5,
    "iowa2": 5,
    "toronto": 5,
    "gateway": 0,
    "portland": 0,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Marcus Armstrong",
    "number": 11,
    "Country": "New Zealand",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 5,
    "longbeach": 18,
    "barber": 22,
    "indygp": 31,
    "indy500": 5,
    "detroit": 35,
    "roadamerica": 5,
    "laguna": 8,
    "midohio": 13,
    "iowa1": 20,
    "iowa2": 11,
    "toronto": 30,
    "gateway": 24,
    "portland": 31,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Kyffin Simpson",
    "number": 4,
    "Country": "Cayman Islands",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 18,
    "longbeach": 11,
    "barber": 16,
    "indygp": 15,
    "indy500": 10,
    "detroit": 6,
    "roadamerica": 5,
    "laguna": 7,
    "midohio": 9,
    "iowa1": 16,
    "iowa2": 12,
    "toronto": 8,
    "gateway": 5,
    "portland": 14,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Theo Pourchaire",
    "number": 6,
    "Country": "France",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 19,
    "barber": 8,
    "indygp": 11,
    "indy500": 0,
    "detroit": 20,
    "roadamerica": 17,
    "laguna": 0,
    "midohio": 0,
    "iowa1": 0,
    "iowa2": 0,
    "toronto": 16,
    "gateway": 0,
    "portland": 0,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Tom Blomqvist",
    "number": 66,
    "Country": "United Kingdom",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 15,
    "longbeach": 8,
    "barber": 11,
    "indygp": 7,
    "indy500": 5,
    "detroit": 0,
    "roadamerica": 0,
    "laguna": 0,
    "midohio": 0,
    "iowa1": 0,
    "iowa2": 0,
    "toronto": 0,
    "gateway": 0,
    "portland": 0,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Calum Ilott",
    "number": 6,
    "Country": "United Kingdom",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 19,
    "longbeach": 0,
    "barber": 0,
    "indygp": 0,
    "indy500": 20,
    "detroit": 0,
    "roadamerica": 0,
    "laguna": 0,
    "midohio": 0,
    "iowa1": 0,
    "iowa2": 0,
    "toronto": 0,
    "gateway": 0,
    "portland": 0,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Toby Sowery",
    "number": 51,
    "Country": "United Kingdom",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 0,
    "barber": 0,
    "indygp": 0,
    "indy500": 0,
    "detroit": 0,
    "roadamerica": 0,
    "laguna": 0,
    "midohio": 17,
    "iowa1": 0,
    "iowa2": 0,
    "toronto": 15,
    "gateway": 0,
    "portland": 13,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Luca Ghiotto",
    "number": 51,
    "Country": "Italy",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 0,
    "barber": 9,
    "indygp": 5,
    "indy500": 0,
    "detroit": 0,
    "roadamerica": 8,
    "laguna": 5,
    "midohio": 0,
    "iowa1": 0,
    "iowa2": 0,
    "toronto": 0,
    "gateway": 0,
    "portland": 0,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Conor Daly",
    "number": 24,
    "Country": "United States",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 0,
    "barber": 0,
    "indygp": 0,
    "indy500": 21,
    "detroit": 0,
    "roadamerica": 0,
    "laguna": 0,
    "midohio": 0,
    "iowa1": 0,
    "iowa2": 5,
    "toronto": 0,
    "gateway": 17,
    "portland": 8,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Helio Castroneves",
    "number": "06",
    "Country": "Brazil",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 0,
    "barber": 0,
    "indygp": 0,
    "indy500": 10,
    "detroit": 5,
    "roadamerica": 11,
    "laguna": 0,
    "midohio": 0,
    "iowa1": 0,
    "iowa2": 0,
    "toronto": 0,
    "gateway": 0,
    "portland": 0,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Kyle Larson",
    "number": 17,
    "Country": "United States",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 0,
    "barber": 0,
    "indygp": 0,
    "indy500": 21,
    "detroit": 0,
    "roadamerica": 0,
    "laguna": 0,
    "midohio": 0,
    "iowa1": 0,
    "iowa2": 0,
    "toronto": 0,
    "gateway": 0,
    "portland": 0,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Takuma Sato",
    "number": 75,
    "Country": "Japan",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 0,
    "barber": 0,
    "indygp": 0,
    "indy500": 19,
    "detroit": 0,
    "roadamerica": 0,
    "laguna": 0,
    "midohio": 0,
    "iowa1": 0,
    "iowa2": 0,
    "toronto": 0,
    "gateway": 0,
    "portland": 0,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Tristan Vautier",
    "number": 51,
    "Country": "France",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 0,
    "barber": 0,
    "indygp": 0,
    "indy500": 0,
    "detroit": 12,
    "roadamerica": 0,
    "laguna": 0,
    "midohio": 0,
    "iowa1": 0,
    "iowa2": 0,
    "toronto": 0,
    "gateway": 0,
    "portland": 0,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Colin Braun",
    "number": 51,
    "Country": "United States",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 10,
    "longbeach": 0,
    "barber": 0,
    "indygp": 0,
    "indy500": 0,
    "detroit": 0,
    "roadamerica": 0,
    "laguna": 0,
    "midohio": 0,
    "iowa1": 0,
    "iowa2": 0,
    "toronto": 0,
    "gateway": 0,
    "portland": 0,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Hunter McElrea",
    "number": 51,
    "Country": "New Zealand",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 0,
    "barber": 0,
    "indygp": 0,
    "indy500": 0,
    "detroit": 0,
    "roadamerica": 0,
    "laguna": 0,
    "midohio": 0,
    "iowa1": 0,
    "iowa2": 0,
    "toronto": 6,
    "gateway": 0,
    "portland": 0,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Ryan Hunter-Reay",
    "number": 23,
    "Country": "United States",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 0,
    "barber": 0,
    "indygp": 0,
    "indy500": 6,
    "detroit": 0,
    "roadamerica": 0,
    "laguna": 0,
    "midohio": 0,
    "iowa1": 0,
    "iowa2": 0,
    "toronto": 0,
    "gateway": 0,
    "portland": 0,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Marco Andretti",
    "number": 98,
    "Country": "United States",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 0,
    "barber": 0,
    "indygp": 0,
    "indy500": 5,
    "detroit": 0,
    "roadamerica": 0,
    "laguna": 0,
    "midohio": 0,
    "iowa1": 0,
    "iowa2": 0,
    "toronto": 0,
    "gateway": 0,
    "portland": 0,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  },
  {
    "Driver": "Juri Vips",
    "number": 75,
    "Country": "Estonia",
    "flag": new URL('@/assets/Flags/NewZealand.png', import.meta.url),
    "points": 0,
    "stpete": 0,
    "longbeach": 0,
    "barber": 0,
    "indygp": 0,
    "indy500": 0,
    "detroit": 0,
    "roadamerica": 0,
    "laguna": 0,
    "midohio": 0,
    "iowa1": 0,
    "iowa2": 0,
    "toronto": 0,
    "gateway": 0,
    "portland": 11,
    "milwaukee1": 0,
    "milwaukee2": 0,
    "nashville": 0
  }
]
      }
    },
    computed: {
      calculateCountryPoints() {
        const countryPoints = {};

  this.drivers.forEach(driver => {
    const { Country, flag, ...races } = driver;
    if (!countryPoints[Country]) {
      countryPoints[Country] = {};
    }

    for (const race in races) {
      if (race !== "Driver" && race !== "number" && race !== "flag" && race !== "Country" && race !== "points") {
        const points = races[race];
        if (!countryPoints[Country][race] || points > countryPoints[Country][race]) {
          countryPoints[Country][race] = points;
        }
      }
    }
  });

  const totalCountryPoints = [];
  for (const country in countryPoints) {
    const flag = country.toLowerCase()
    const totalPoints = Object.values(countryPoints[country]).reduce((a, b) => a + b, 0);
    totalCountryPoints.push({ country, points: totalPoints });
  }

  totalCountryPoints.sort((a, b) => b.points - a.points);

  return totalCountryPoints;
  }
  }
  }
</script>

<style scoped>
.main-nations {
  text-align: center;
  background-color:rgb(231, 231, 231);
  padding-bottom: 50px;
  }
  .last-update{
  padding-bottom: 20px;
}
  .table-holder{
    display: flex;
    float: center;
    flex-direction: column;
  }
.nations-table{
  max-width: 600px;
  min-width: calc(250px + 20vw);
  height: 80%;
  font-size: calc(10px + .5vw);
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
  tr{
    height: 38px;
  }
  td{padding: 4px;}
  td.text-country{
    padding-left: 20px;
    text-align: left;
  }
  td.text-points{
    padding-right: 40px;
    text-align: right;
  }
}
tr:nth-child(even)
{
  background-color: #dbdbdb;
}
.flag-images{
  width: 30px;
}

.nations-title{
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