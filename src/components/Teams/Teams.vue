<template>
  <div class="main-teams">
    <title-page
      title-text="2025 Teams"
      />
      <div class="blue-container">
      <div :class="{allteams: !isMobile, allteamsmobile: isMobile}" v-if="!isTeamShown">
        <div
        v-for="team in teamData"
        class="team-holder" @click="showTeam(team)">
        <img
                :src=team.teampic
                  contain
                  class="team-pic"
                  @load="onImgLoad"
                  /> 
      </div>
      </div>
      <div class="team-view" v-if="isTeamShown && !isMobile">
        
        <div class="team-info">
          <div class="team-info2">
          <div>
            <img ref="image" 
              :src="this.currentTeam.manuf"
              alt="Driver Logo"
              contain
              class="mfg-img"
              >
          </div>
          <div>
            {{ this.currentTeam.title }}
          </div>
        </div>
          <div class="back-to-teams" @click="isTeamShown = false">
            Back to Teams
          </div>

        </div>
        <div 
          v-for="(driver, index) in items.filter(item => item.team === currentTeam.name)"
        >
        <div class="driver-box" :style="{ border: `3px solid ${driver.color}` }">
          <div class="driver-top">
            <div class="driver-top-left" :style="{ border: `3px solid ${driver.color}` }">
              <div class="top-left-segs"> <img
                :src="driver['flag']"
                contain
                class="driver-flag"
              ></div>
              <div class="top-left-segs">{{ driver.id }}</div>
              <div class="top-left-segs">{{ driver.name }}</div>
            </div>
            <!-- <div class="driver-top-right">{{ driver.status }}</div> -->
          </div>
          <div class="driver-bottom">
              <img
                :src=driver.pic
                  contain
                  class="driver-picture"
                  @load="onImgLoad"
                  /> 
            <div class="driver-stats">
              <div class="stats-box">
                <div class="stats-title">Wins</div> 
                <div class="stats-value">{{driver.wins}}</div> 
              </div>
              <div class="stats-box">
                <div class="stats-title">Podiums</div> 
                <div class="stats-value">{{driver.podiums}}</div> 
              </div>
              <div class="stats-box">
                <div class="stats-title">Championships</div> 
                <div class="stats-value">{{driver.champs}}</div> 
              </div>
              <div class="stats-box">
                <div class="stats-title">Poles</div> 
                <div class="stats-value">{{driver.poles}}</div> 
              </div>
            </div>
          </div>
          

        </div>
          </div><b>*Indianapolis 500 Only</b>
          
        </div>



        <div class="team-view-mobile" v-if="isTeamShown && isMobile">
        
        <div class="team-info-mobile">
          <div class="back-to-teams-mobile" @click="isTeamShown = false">
            Back to Teams
          </div>
          <div class="team-info2-mobile">
          <div>
            <img ref="image" 
              :src="this.currentTeam.manuf"
              alt="Driver Logo"
              contain
              class="mfg-img-mobile"
              >
          </div>
          <div>
            {{ this.currentTeam.title }}
          </div>
        </div>
        </div>
        <div 
          v-for="(driver, index) in items.filter(item => item.team === currentTeam.name)"
        >
        <div class="driver-box-mobile" :style="{ border: `3px solid ${driver.color}` }">
          <div class="driver-top-mobile">
            <div class="driver-top-left-mobile" :style="{ border: `3px solid ${driver.color}` }">
              <div class="top-left-segs"> <img
                :src="driver['flag']"
                contain
                class="driver-flag-mobile"
              ></div>
              <div class="top-left-segs">{{ driver.id }}</div>
              <div class="top-left-segs">{{ driver.name }}</div>
            </div>
            <!-- <div class="driver-top-right-mobile">{{ driver.statusmobile }}</div> -->
          </div>
          <div class="driver-bottom-mobile">
              <img
                :src=driver.pic
                  contain
                  class="driver-picture-mobile"
                  @load="onImgLoad"
                  /> 
            <div class="driver-stats-mobile">
              <div class="stats-box-mobile">
                <div class="stats-title-mobile">Wins</div> 
                <div class="stats-value-mobile">{{driver.wins}}</div> 
              </div>
              <div class="stats-box-mobile">
                <div class="stats-title-mobile">Podiums</div> 
                <div class="stats-value-mobile">{{driver.podiums}}</div> 
              </div>
              <div class="stats-box-mobile">
                <div class="stats-title-mobile">Titles</div> 
                <div class="stats-value-mobile">{{driver.champs}}</div> 
              </div>
              <div class="stats-box-mobile">
                <div class="stats-title-mobile">Poles</div> 
                <div class="stats-value-mobile">{{driver.poles}}</div> 
              </div>
            </div>
          </div>
        </div>
          </div>
          <b>*Indianapolis 500 Only</b>
        </div>
      </div>
</div>
</template>

<script>
import TitlePage from "@/components/Partials/Title"

export default {
  name: 'home',
  components: {
      TitlePage
  },
  data () {
    return {
      home_msg: 'Teams',
      isTeamShown: false,
      colorset: "blue",
      currentTeam: {},
      items: [
        {id: '10', name: "Alex Palou", team: 'ganassi', statusmobile: 'Fulltime', status: 'Fulltime - 5th year with CGR', color: '#ffcb01', color2: "#dc1433", wins: 13, podiums: 32, champs: 3, poles: 8, pic: new URL('@/assets/TeamDrivers/AlexPalou.png', import.meta.url), flag: new URL('@/assets/Flags/Spain.png', import.meta.url)},
        {id: '9', name: "Scott Dixon", team: 'ganassi', statusmobile: 'Fulltime', status: 'Fulltime - 24th year with CGR', color: '#084c8d', color2: "#fc7406", wins: 58, podiums: 142, champs: 6, poles: 28, pic: new URL('@/assets/TeamDrivers/ScottDixon.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '2', name: "Josef Newgarden", team: 'penske', statusmobile: 'Fulltime', status: 'Fulltime - 9th year with Penske', color: '#b20010', color2: "whitesmoke", wins: 31, podiums: 58, champs: 2, poles: 18, pic: new URL('@/assets/TeamDrivers/JosefNewgarden.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '5', name: "Pato O'Ward", team: 'mclaren', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with McLaren', color: '#F57634', color2: "black", wins: 7, podiums: 26, champs: 0, poles: 5, pic: new URL('@/assets/TeamDrivers/PatoOward.png', import.meta.url), flag: new URL('@/assets/Flags/Mexico.png', import.meta.url)},
        {id: '3', name: "Scott McLaughlin", team: 'penske', statusmobile: 'Fulltime', status: 'Fulltime - 5th year with Penske', color: '#f5af05', color2: "black", wins: 7, podiums: 19, champs: 0, poles: 10, pic: new URL('@/assets/TeamDrivers/ScottMcLaughlin.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '12', name: "Will Power", team: 'penske', statusmobile: 'Fulltime', status: 'Fulltime - 16th year with Penske', color: '#ed2e38', color2: "whitesmoke", wins: 44, podiums: 105, champs: 2, poles: 70, pic: new URL('@/assets/TeamDrivers/WillPower.png', import.meta.url), flag: new URL('@/assets/Flags/Australia.png', import.meta.url)},
        {id: '26', name: "Colton Herta", team: 'andretti', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with Andretti', color: '#ffe303', color2: "black", wins: 9, podiums: 18, champs: 0, poles: 14, pic: new URL('@/assets/TeamDrivers/ColtonHerta.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '7', name: "Christian Lundgaard", team: 'mclaren', statusmobile: 'Fulltime', status: 'Fulltime - Raced for RLL in 2024', color: '#F57634', color2: "black", wins: 1, podiums: 3, champs: 0, poles: 2, pic: new URL('@/assets/TeamDrivers/ChristianLundgaard.png', import.meta.url), flag: new URL('@/assets/Flags/Denmark.png', import.meta.url)},
        {id: '27', name: "Kyle Kirkwood", team: 'andretti', statusmobile: 'Fulltime', status: 'Fulltime - 3rd year with Andretti', color: '#ec2424', color2: 'whitesmoke', wins: 2, podiums: 3, champs: 0, poles: 2, pic: new URL('@/assets/TeamDrivers/KyleKirkwood.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '20', name: "Alexander Rossi", team: 'ecr', statusmobile: 'Fulltime', status: 'Fulltime - Raced for McLaren in 2024', color: '#b5cfd5', color2: "black", wins: 8, podiums: 30, champs: 0, poles: 7, pic: new URL('@/assets/TeamDrivers/AlexanderRossi.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '18', name: "Rinus Veekay", team: 'coyne', statusmobile: 'Fulltime', status: 'Fulltime - Raced for ECR in 2024', color: '#00abe8', color2: "black", wins: 1, podiums: 4, champs: 0, poles: 2, pic: new URL('@/assets/TeamDrivers/RinusVeekay.png', import.meta.url), flag: new URL('@/assets/Flags/Netherlands.png', import.meta.url)},
        {id: '28', name: "Marcus Ericsson", team: 'andretti', statusmobile: 'Fulltime', status: 'Fulltime - 2nd year with Andretti', color: '#ed1b2e', color2: "whitesmoke", wins: 4, podiums: 11, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/MarcusEricsson.png', import.meta.url), flag: new URL('@/assets/Flags/Sweden.png', import.meta.url)},
        {id: '14', name: "Santino Ferrucci", team: 'foyt', statusmobile: 'Fulltime', status: 'Fulltime - 3rd year with Foyt', color: '#fe0100', color2: "black", wins: 0, podiums: 1, champs: 0, poles: 1, pic: new URL('@/assets/TeamDrivers/SantinoFerrucci.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '4', name: "David Malukas", team: 'foyt', statusmobile: 'Fulltime', status: 'Fulltime - Finished 2024 with MSR', color: '#fe0100', color2: "black", wins: 0, podiums: 2, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/DavidMalukas.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '66', name: "Felix Rosenqvist", team: 'msr', statusmobile: 'Fulltime', status: 'Fulltime - 2nd year with MSR', color: '#0000eb', color2: "black", wins: 1, podiums: 6, champs: 0, poles: 6, pic: new URL('@/assets/TeamDrivers/FelixRosenqvist.png', import.meta.url), flag: new URL('@/assets/Flags/Sweden.png', import.meta.url)},
        {id: '15', name: "Graham Rahal", team: 'rahal', statusmobile: 'Fulltime', status: 'Fulltime - 13th year with RLL', color: '#1e4393', color2: "black", wins: 6, podiums: 33, champs: 0, poles: 5, pic: new URL('@/assets/TeamDrivers/GrahamRahal.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '90', name: "Callum Ilott", team: 'prema', statusmobile: 'Fulltime', status: 'Fulltime - Part time with McLaren in 2024', color: '#ef0000', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/CallumIlott.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedKingdom.png', import.meta.url)},
        {id: '60', name: "Marcus Armstrong", team: 'msr', statusmobile: 'Fulltime', status: 'Fulltime - Raced for CGR 2024', color: '#0000eb', color2: "black", wins: 0, podiums: 1, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/MarcusArmstrong.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '30', name: "Devlin DeFrancesco", team: 'rahal', statusmobile: 'Fulltime', status: 'Fulltime - Did not race IndyCar in 2024', color: '#009fdf', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/DevlinDefrancesco.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '76', name: "Conor Daly", team: 'juncos', statusmobile: 'Fulltime', status: 'Fulltime - Joined Juncos midseason in 2024', color: '#02ff4f', color2: "black", wins: 0, podiums: 2, champs: 0, poles: 1, pic: new URL('@/assets/TeamDrivers/ConorDaly.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '8', name: "Kyffin Simpson", team: 'ganassi', statusmobile: 'Fulltime', status: 'Fulltime - 2nd year with CGR', color: '#FF007A', color2: "#00023C", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/KyffinSimpson.png', import.meta.url), flag: new URL('@/assets/Flags/CaymanIslands.png', import.meta.url)},
        {id: '45', name: "Louis Foster", team: 'rahal', statusmobile: 'Fulltime', status: 'Fulltime - IndyNXT champion in 2024', color: '#ec232c', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/LouisFoster.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedKingdom.png', import.meta.url)},
        {id: '77', name: "Sting Ray Robb", team: 'juncos', statusmobile: 'Fulltime', status: 'Fulltime - Raced for Foyt in 2024', color: '#02ff4f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/StingRayRobb.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '6', name: "Nolan Siegel", team: 'mclaren', statusmobile: 'Fulltime', status: 'Fulltime - Joined McLarent midseason in 2024', color: '#F57634', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/NolanSiegel.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '21', name: "Christian Rasmussen", team: 'ecr', statusmobile: 'Fulltime', status: 'Fulltime - 2nd year with ECR', color: '#fbe44c', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/ChristianRasmussen.png', import.meta.url), flag: new URL('@/assets/Flags/Denmark.png', import.meta.url)},
        {id: '51', name: "Jacob Abel", team: 'coyne', statusmobile: 'Fulltime', status: 'Fulltime - IndyNXT runner-up in 2024', color: '#cf171f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/JacobAbel.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '33', name: "Ed Carpenter   *", team: 'ecr', statusmobile: 'Indy', status: 'Indy Only - 22nd Indy 500 Start', color: '#fbe44c', color2: "black", wins: 3, podiums: 9, champs: 0, poles: 4, pic: new URL('@/assets/TeamDrivers/EdCarpenter.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '83', name: "Robert Shwartzman", team: 'prema', statusmobile: 'Fulltime', status: 'Fulltime - Ferrari F1 reserve driver in 2024', color: '#ef0000', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/RobertShwartzman.png', import.meta.url), flag: new URL('@/assets/Flags/Israel.png', import.meta.url)},
        {id: '17', name: "Kyle Larson   *", team: 'mclaren', statusmobile: 'Indy', status: 'Indy Only - Returns for a 2nd Indy 500 with McLaren', color: '#F57634', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/KyleLarson.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '28', name: "Marco Andretti   *", team: 'andretti', statusmobile: 'Indy', status: 'Indy Only - 20th Indy 500 Start', color: '#0c7cc4', color2: "whitesmoke", wins: 2, podiums: 20, champs: 0, poles: 6, pic: new URL('@/assets/TeamDrivers/MarcoAndretti.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '06', name: "Helio Castroneves   *", team: 'msr', statusmobile: 'Indy', status: 'Indy Only - 25th Indy 500 Start', color: '#155196', color2: "black", wins: 31, podiums: 94, champs: 0, poles: 50, pic: new URL('@/assets/TeamDrivers/HelioCastroneves.png', import.meta.url), flag: new URL('@/assets/Flags/Sweden.png', import.meta.url)},
        {id: '23', name: "Ryan Hunter-Reay   *", team: 'drr', statusmobile: 'Indy', status: 'Indy Only - 17th Indy 500 Start', color: '#00235d', color2: "black", wins: 18, podiums: 47, champs: 1, poles: 7, pic: new URL('@/assets/TeamDrivers/RyanHunterReay.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '24', name: "Jack Harvey   *", team: 'drr', statusmobile: 'Indy', status: 'Indy Only - 8th Indy 500 Start', color: '#afcf4d', color2: "black", wins: 0, podiums: 1, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/JackHarvey.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedKingdom.png', import.meta.url)},
        // {id: '75', name: "Takuma Sato", team: 'rahal', statusmobile: 'Indy', status: 'Indy Only - 17th Indy 500 Start', color: '#007b84', color2: "black", wins: 6, podiums: 14, champs: 0, poles: 10, pic: new URL('@/assets/TeamDrivers/TakumaSato.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '101', name: "Romain Grosjean", team: 'na', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/RomainGrosjean.png', import.meta.url), flag: new URL('@/assets/Flags/France.png', import.meta.url)},
        {id: '102', name: "Linus Lundqvist", team: 'fa', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/LinusLundqvist.png', import.meta.url), flag: new URL('@/assets/Flags/Sweden.png', import.meta.url)},
        {id: '104', name: "Pietro Fittipaldi", team: 'fa', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/PietroFittipaldi.png', import.meta.url), flag: new URL('@/assets/Flags/UnitedStates.png', import.meta.url)},
        {id: '131', name: "Théo Pourchaire", team: 'fa', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/TheoPourchaire.png', import.meta.url), flag: new URL('@/assets/Flags/France.png', import.meta.url)},
        {id: '132', name: "Juri Vips", team: 'fa', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/JuriVips.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '133', name: "Zane Maloney", team: 'na', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/ZaneMaloney.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '134', name: "Katherine Legge", team: 'fa', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/KatherineLegge.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '135', name: "Jamie Chadwick", team: 'na', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/JamieChadwick.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '137', name: "Simon Pagenaud", team: 'na', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/SimonPagenaud.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '138', name: "Takuma Sato   *", team: 'na', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/TakumaSato.png', import.meta.url), flag: new URL('@/assets/Flags/Japan.png', import.meta.url)},
        {id: '140', name: "Hunter McElrea", team: 'fa', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/HunterMcElrea.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '141', name: "Danial Frost", team: 'na', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/DanialFrost.png', import.meta.url), flag: new URL('@/assets/Flags/Singapore.png', import.meta.url)},
        {id: '145', name: "Felipe Drugovich", team: 'fa', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/FelipeDrugovich.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '147', name: "Myles Rowe", team: 'na', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/MylesRowe.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '149', name: "Michael d'Orlando", team: 'na', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/MichaeldOrlando.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '150', name: "Callum Hedge", team: 'na', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/CallumHedge.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '151', name: "Caio Collet", team: 'na', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/CaioCollet.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '152', name: "Enzo Fittipaldi", team: 'fa', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/EnzoFittpaldi.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '153', name: "Mick Schumacher", team: 'fa', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/MickSchumacher.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '154', name: "Logan Sargeant", team: 'fa', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/LoganSargeant.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '155', name: "Lochie Hughes", team: 'na', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/LochieHughes.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '156', name: "Nikita Johnson", team: 'na', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/NikitaJohnson.png', import.meta.url), flag: new URL('@/assets/Flags/NewZealand.png', import.meta.url)},
        {id: '157', name: "Dennis Hauger", team: 'na', statusmobile: 'Fulltime', status: 'Fulltime - 6th year with RLL', color: '#2f589f', color2: "black", wins: 0, podiums: 0, champs: 0, poles: 0, pic: new URL('@/assets/TeamDrivers/DennisHauger.png', import.meta.url)}
      ],
      teamData: [ 
      { name:'andretti', manuf: new URL('@/assets/Teams/Honda.png', import.meta.url), size: 3, title: 'Andretti Global', teampic: new URL('@/assets/Teams/AndrettiGlobal.png', import.meta.url)},
      { name:'penske', manuf: new URL('@/assets/Teams/Chevy.png', import.meta.url), size: 3, title: 'Team Penske', teampic: new URL('@/assets/Teams/TeamPenske.png', import.meta.url)},
      { name:'ganassi', manuf: new URL('@/assets/Teams/Honda.png', import.meta.url), size: 3, title: 'Chip Ganassi Racing', teampic: new URL('@/assets/Teams/ChipGanassiRacing.png', import.meta.url)},
      { name:'mclaren', manuf: new URL('@/assets/Teams/Chevy.png', import.meta.url), size: 3, title: 'Arrow McLaren', teampic: new URL('@/assets/Teams/ArrowMcLaren.png', import.meta.url)},
      { name:'rahal', manuf: new URL('@/assets/Teams/Honda.png', import.meta.url), size: 3, title: 'Rahal Letterman Lanigan', teampic: new URL('@/assets/Teams/RahalLetterman.png', import.meta.url)},
      { name:'ecr', manuf: new URL('@/assets/Teams/Chevy.png', import.meta.url), size: 2, title: 'Ed Carpenter Racing', teampic: new URL('@/assets/Teams/EdCarpenterRacing.png', import.meta.url)},
      { name:'coyne', manuf: new URL('@/assets/Teams/Honda.png', import.meta.url), size: 2, title: 'Dale Coyne Racing', teampic: new URL('@/assets/Teams/DaleCoyneRacing.png', import.meta.url)},
      { name:'msr', manuf: new URL('@/assets/Teams/Honda.png', import.meta.url), size: 2, title: 'Meyer Shank Racing', teampic: new URL('@/assets/Teams/MeyerShankRacing.png', import.meta.url)},
      { name:'foyt', manuf: new URL('@/assets/Teams/Chevy.png', import.meta.url), size: 2, title: 'A.J. Foyt Racing', teampic: new URL('@/assets/Teams/AJFoytRacing.png', import.meta.url)},
      { name:'juncos', manuf: new URL('@/assets/Teams/Chevy.png', import.meta.url), size: 2, title: 'Juncos Hollinger Racing', teampic: new URL('@/assets/Teams/JuncosHollinger.png', import.meta.url)},
      { name:'prema', manuf: new URL('@/assets/Teams/Chevy.png', import.meta.url), size: 2, title: 'Prema Racing', teampic: new URL('@/assets/Teams/PremaRacing.png', import.meta.url)},
      { name:'drr', manuf: new URL('@/assets/Teams/Chevy.png', import.meta.url), size: 2, title: 'Dreyer Reinbold/Cusick Motorsports', teampic: new URL('@/assets/Teams/DRRCusick.png', import.meta.url)},
      ],
    }
  },
  methods: {
    showTeam(teamName){
      this.isTeamShown=true
      this.currentTeam = teamName

    }
  },
  computed: {
        isMobile() {
          if( screen.width <= 1000 ) {
              return true;
          }
          else {
              return false;
          }
      },
      },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-teams{
  text-align: center;
  background-color:rgb(231, 231, 231);
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  }
.title{
    font-size: calc(8px + 3vw);
    padding-bottom: calc(1px + 1vw);
    text-shadow: 2px 1px 1px #000000;
    font-family: Verdana;    
    font-weight: bold;
    color: whitesmoke;
  }
  .blue-container{
    background-color: rgb(57, 118, 216);
    min-height: 900px;
    padding-top: calc(10px + 2vw);
  }
  .allteams{
    max-width: 100%;
    height: 700px;
    align-items: center;
    margin: 10px auto 10px auto;
    padding: 0px 2% 92px 2%;
    /* padding-bottom: 500px; */
    background-color: rgb(57, 118, 216);
    display:grid;
    grid-template-columns: 33% 33% 33%;
  }
  .allteamsmobile{
    max-width: 95%;
    align-items: center;
    min-height: 600px;
    margin: 0px auto 10px auto;
    padding: 0px 2% 2px 2%;
    background-color: rgb(57, 118, 216);
    display: grid;
    grid-template-columns: 50% 50%;
  }
  .team-holder{
  /* text-align: left; */
  height: calc(79px + 2vw);
  width: 94%;
  border-radius: 6px;
  border: 2px solid black;
  margin: auto;
  /* margin-bottom: calc(2px + .3vw); */
  background-color:rgb(231, 231, 231);
  flex-direction: row;
  align-items: center;
  display: flex;
  cursor: pointer;

}
.team-view{
  padding-top: 40px;
  background-color:rgb(231, 231, 231);
  width: 100%;
  padding-bottom: 60px;
}
.team-info{
  text-align: left;
  font-size: calc(8px + 1.5vw);
  padding-bottom: 20px;
  font-weight: bold;
  grid-template-columns: 60% 50%;
  width: 60%;
  display: inline-flex;
  flex-direction: row;
}
.team-info2{
  display: flex;
  text-align: left;
  width: 65%;
}
.back-to-teams{
  text-decoration: underline;
  font-size: 20px;
  float: right;
  text-align: right;
  cursor: pointer;
  width: 35%;
}
.mfg-img{
  height: 45px;
}
.driver-box{
  background-color:rgb(56, 56, 56);
  width: 65%;
  margin: auto;
  margin-bottom: 20px;
  padding-top: 20px;
  /* border: 5px solid rgb(57, 118, 216); */
  box-shadow: 5px 5px 5px #616161;
  display: inline-block;
}
.driver-top{
  flex-direction: row;
  display: flex;
  margin-bottom: 28px;
}
.driver-top-left{
  color: rgb(29, 29, 29);
  background-color:rgb(199, 199, 199);
  width: 55%;
  padding: 6px 0px;
  border-radius: 0 50px 50px 0;
  font-size: 24px;
  font-weight: bold;
  flex-direction: row;
  display: inline-flex;
  grid-template-columns: 50% 15% 30%;
}
.driver-flag{
  height: 20px;
}
.top-left-segs{
  padding-right: calc(.5px + 1vw);
  padding-left: calc(.5px + 1vw);
}
.driver-top-right{
  width: 40%;
  color: whitesmoke;
  font-size: 18px;
  align-items: center;
  display: inline-flex;
  padding-left: 40px;
}
.driver-bottom{
  height: 120px;
  display: flex;
  grid-template-columns: 33% 66%;
  align-items: flex-end;
}
.driver-picture{
  height: 140px;
  margin: 0px 100px 0px 20px;

}
.driver-stats{
  color: whitesmoke;
  width: 65%;
  display: grid;
  grid-template-columns: 21% 24% 27% 27%;
  padding-bottom: 30px;
}
.stats-title{
  font-size: 17px;
}
.stats-value{
  font-weight: bold;
  font-size: 23px;
}

.team-title{
  font-weight: bold;
  font-size: 20px;
}
.team-pic{
  width: calc(110px + 6vw);
  display: block;
  margin-left: auto;
  margin-right: auto;
}


.team-view-mobile{
  padding-top: 20px;
  background-color:rgb(231, 231, 231);
  width: 100%;
  padding-bottom: 60px;
}
.team-info-mobile{
  text-align: left;
  font-size: calc(8px + 2vw);
  padding-bottom: 20px;
  font-weight: bold;
  width: 90%;
  display:flexbox;
  margin: auto;
}
.team-info2-mobile{
  display: flex;
  text-align: center;
  margin-left: 40px;
  width: 100%;
}
.back-to-teams-mobile{
  text-decoration: underline;
  font-size: calc(8px + 1vw);
  margin-bottom: 20px;
  float: right;
  text-align: right;
  cursor: pointer;
  width: 100%;
}
.mfg-img-mobile{
  height: calc(19px + 1.5vw);
  padding-right: 12px;
}
.driver-box-mobile{
  background-color:rgb(56, 56, 56);
  width: 98%;
  margin: auto;
  margin-bottom: 20px;
  padding-top: 20px;
  border: 5px solid rgb(57, 118, 216);
  display: inline-block;
}
.driver-top-mobile{
  flex-direction: row;
  display: flex;
  margin-bottom: 12px;
}
.driver-top-left-mobile{
  color: rgb(29, 29, 29);
  background-color:rgb(199, 199, 199);
  width: 70%;
  padding: 6px 0px;
  border-radius: 0 50px 50px 0;
  font-size: 14px;
  font-weight: bold;
  flex-direction: row;
  display: inline-flex;
  grid-template-columns: 50% 15% 30%;
}
.driver-flag-mobile{
  height: 12px;
  padding-right: 10px;
}
.driver-top-right-mobile{
  width: 20%;
  color: whitesmoke;
  font-size: 12px;
  align-items: center;
  display: inline-flex;
  padding-left: 20px;
}
.driver-bottom-mobile{
  height: 100px;
  display: flex;
  grid-template-columns: 30% 70%;
  align-items: flex-end;
}
.driver-picture-mobile{
  /* height: 100px; */
  margin: 0px 10px 0px 0px;
  max-width: 40%;
  max-height: 130px;
}
.driver-stats-mobile{
  color: whitesmoke;
  width: calc(338px + 1vw);
  margin-left: -20px;
  display: grid;
  grid-template-columns: 24% 25% 24% 27%;
  padding-bottom: 15px;
  margin-bottom: 30px;
}
.stats-title-mobile{
  font-size: 12px;
}
.stats-value-mobile{
  font-weight: bold;
  font-size: 14px;
}

</style>
