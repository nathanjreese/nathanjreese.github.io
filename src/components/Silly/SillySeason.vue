<template>
  <div>
  <div class="sillyseason">
    <div class="silly-title">	
      <title-page
      title-text="2024 Silly Season Predictor
"
      />
    </div>
      <font-awesome-icon icon="fa-solid fa-retweet " 
        class="float-icon"
        @click="resetTeams()"/>
    <div v-if="!this.isMobile" class="float-container">

      <!-- Left container -->
      <div class="float-child-1">

        <div v-for="team in teamData.slice(0,5)">
        <div class="drop-team">{{ team.title }}</div>
      <div class="drop-zone"
      :class="{ full: (listTeam(team.name).length >= team.size)}"
        @drop="onDrop($event, team.name)"
        @dragenter.prevent
        @dragover.prevent
        >
        <div v-for="item in listTeam(team.name)" 
            :key="item.id"
            :title="item.name"
            class="drag-el"
            draggable="true"
            @dragstart="startDrag($event, item)"
          >
            <div>
            <img
            :src="isLoaded ? item.pic : nobodyLoading"
              contain
              class="silly-img"
              @click="removeDriver(item)"
              @load="onImgLoad"/>
            </div>
          </div>
          <div v-for="n in (team.size - listTeam(team.name).length )" class="drag-el"
          v-if="listTeam(team.name).length < team.size">
          <img
          :src="isLoaded ? nobodyProfile : nobodyLoading"
              contain
              class="silly-img"
              @click="addDriver(team.name, team.title)">
            </div>
      </div>
      </div>

      <div class="drop-team"> {{ this.newTeamName }} 
        <font-awesome-icon icon="fa-solid fa-xmark " 
        v-if="this.newTeamName"
        @click="removeNewTeam()"/>
      </div>
      <div class="add-new"
        v-if="!this.newTeamName">
        <font-awesome-icon 
        icon="fa-solid fa-plus"
        title="Add New Team"
        @click="newTeam"/>
      </div>

      <div class="drop-zone"
      :class="{ full: (listNew.length > 1)}"
      v-if="this.newTeamName"
        @drop="onDrop($event, 'new')"
        @dragenter.prevent
        @dragover.prevent
        >
          <div v-for="item in listNew" 
            :key="item.id"
            :title="item.name"
            class="drag-el"
            draggable="true"
            @dragstart="startDrag($event, item)"
          >
          <div>
          <img
            :src="isLoaded ? item.pic : nobodyLoading"
              contain
              class="silly-img"
              @load="onImgLoad"
              @click="removeDriver(item)"/>
          </div>
          </div>
          <div class="drag-el"
          v-if="listNew.length < 2">
          <img
          :src="isLoaded ? nobodyProfile : nobodyLoading"
              contain
              class="silly-img"
              @click="addNew">
        </div>
        <div class="drag-el"
          v-if="listNew.length < 1">
          <img
          :src="isLoaded ? nobodyProfile : nobodyLoading"
              contain
              class="silly-img"
              @click="addNew">
        </div>
      </div>
    </div>

    <!-- Right Container -->
    <div class="float-child-2">

      <div v-for="team in teamData.slice(5,10)">
        <div class="drop-team">{{ team.title }}</div>
      <div class="drop-zone"
      :class="{ full: (listTeam(team.name).length >= team.size)}"
        @drop="onDrop($event, team.name)"
        @dragenter.prevent
        @dragover.prevent
        >
        <div v-for="item in listTeam(team.name)" 
            :key="item.id"
            :title="item.name"
            class="drag-el"
            draggable="true"
            @dragstart="startDrag($event, item)"
          >
          <div>
            <img
            :src="isLoaded ? item.pic : nobodyLoading"
              contain
              class="silly-img"
              @load="onImgLoad"
              @click="removeDriver(item)">
          </div>
          </div>
          <div v-for="n in (team.size - listTeam(team.name).length )" class="drag-el"
          v-if="listTeam(team.name).length < team.size">
          <img
          :src="isLoaded ? nobodyProfile : nobodyLoading"
              contain
              class="silly-img"
              @click="addDriver(team.name, team.title)">
            </div>
      </div>
      </div>

    </div>
    <div class="float-child-fa">
      <div class="drop-team">Free Agents</div>
      <div class="drop-zone-fa"
        @drop="onDrop($event, 'fa')"
        @dragenter.prevent
        @dragover.prevent
        >
          <div v-for="item in listFreeAgents" 
            :key="item.id"
            :title="item.name"
            class="drag-el"
            draggable="true"
            @dragstart="startDrag($event, item)"
          >
          <div>
            <img
            :src="isLoaded ? item.pic : nobodyLoading"
              contain
              class="silly-img"
              @load="onImgLoad"/>
          </div>
          </div>
      </div>
    </div>
  </div>
  <div v-if="this.isMobile" class="float-container-mobile">
      <div class="float-child-mobile">

        <div v-for="team in teamData.slice(0,10)">
        <div class="drop-team-mobile">{{ team.title }}</div>
      <div class="drop-zone-mobile"
      :class="{ full: (listTeam(team.name).length >= team.size)}"
        @drop="onDrop($event, team.name)"
        @dragenter.prevent
        @dragover.prevent
        >
        <div v-for="item in listTeam(team.name)" 
            :key="item.id"
            :title="item.name"
            class="drag-el-mobile"
            draggable="true"
            @dragstart="startDrag($event, item)"
          >
            <img
            :src="isLoaded ? item.pic : nobodyLoading"
              contain
              class="silly-img-mobile"
              @load="onImgLoad"
              @click="removeDriver(item)"/>
          </div>
          <div v-for="n in (team.size - listTeam(team.name).length )" class="drag-el-mobile"
          v-if="listTeam(team.name).length < team.size">
          <img
          :src="isLoaded ? nobodyProfile : nobodyLoading"
              contain
              class="silly-img-mobile"
              @click="addDriver(team.name, team.title)">
            </div>
      </div>
      </div>    

      <div class="drop-team-mobile"> {{ this.newTeamName }} 
        <font-awesome-icon icon="fa-solid fa-xmark " 
        v-if="this.newTeamName"
        @click="removeNewTeam()"/></div>
      <div class="add-new-mobile"
        v-if="!this.newTeamName">
        <font-awesome-icon 
        icon="fa-solid fa-plus"
        title="Add New Team"
        @click="newTeam"/>
      </div>
      <div class="drop-zone-mobile"
      :class="{ full: (listNew.length > 1)}"
      v-if="this.newTeamName"
        >
          <div v-for="item in listNew" 
            :key="item.id"
            :title="item.name"
            class="drag-el-mobile"
            draggable="true"
            @dragstart="startDrag($event, item)"
          >
            <img
            :src="item.pic"
              contain
              class="silly-img-mobile"
              @click="removeDriver(item)">
          </div>
          <div class="drag-el-mobile"
          v-if="listNew.length < 2">
          <img
            :src="isLoaded ? nobodyProfile : nobodyLoading"
              contain
              class="silly-img-mobile"
              @click="addNew">
            </div>
            <div class="drag-el-mobile"
          v-if="listNew.length < 1">
          <img
            :src="isLoaded ? nobodyProfile : nobodyLoading"
              contain
              class="silly-img-mobile"
              @click="addNew">
            </div>
      </div>
    </div>
  </div>
  <silly-modal
      v-show="isSillyModalVisible"
      @close="closeModal"
      @end="showResults"
      :drivers="listFreeAgents"
      :team="teamAdd"
      :team-name="teamName"
      :question-number=0
      :radio-group=null
    />
    <remove-modal
      :driver-remove="this.driverRemove"
      :driver-name="this.driverName"
      :team-remove="this.teamRemove"
      v-show="isRemoveModalVisible"
      @submit="confirmRemoval"
      @close="closeRemoveModal"
      />
  </div>
</div>
</template>

<script>

import SillyModal from './SillyModal'
import driverData from "@/components/Helpers/driverData.json"
import TitlePage from "@/components/Partials/Title"
import RemoveModal from "./RemoveModal"

export default {
  components: {
      SillyModal,
      TitlePage,
      RemoveModal
  },
  data () {
    return {
      msg: '2024 Silly Season Predictor',
      isSillyModalVisible: false,
      isRemoveModalVisible: false,
      activeTeam: '',
      isLoaded: false,
      driverRemove: null,
      driverName: null,
      teamRemove: null,
      teamData: [ 
      { name:'andretti', size: 3, title: 'Andretti Global'},
      { name:'penske', size: 3, title: 'Team Penske'},
      { name:'ganassi', size: 5, title: 'Chip Ganassi Racing'},
      { name:'mclaren', size: 3, title: 'Arrow McLaren'},
      { name:'ecr', size: 3, title: 'Ed Carpenter Racing'},
      { name:'rahal', size: 3, title: 'Rahal Letterman Lanigan'},
      { name:'coyne', size: 2, title: 'Dale Coyne Racing'},
      { name:'msr', size: 2, title: 'Meyer Shank Racing'},
      { name:'foyt', size: 2, title: 'A.J. Foyt Racing'},
      { name:'juncos', size: 2, title: 'Juncos Hollinger Racing'}
      ],
      teams: {
        andretti: 3,
        penske: 3,
        ganassi: 5,
        mclaren: 3,
        ecr: 3,
        rahal: 3,
        coyne: 2,
        msr: 2,
        foyt: 2,
        juncos: 2,
      },
      newTeamName: null,
      fieldSize: 0,
      teamName: null,
      teamAdd: null,
      nobodyLoading: new URL('@/assets/SillyPhotos/NobodyLoading.jpeg', import.meta.url),
      nobodyProfile: new URL('@/assets/SillyPhotos/Nobody.jpeg', import.meta.url),
      items: [
        {id: 0, name: "Alex Palou", original: 'ganassi', team: 'ganassi', pic: new URL('@/assets/SillyPhotos/AlexPalou.jpeg', import.meta.url)},
        {id: 1, name: "Scott Dixon", original: 'ganassi', team: 'ganassi', pic: new URL('@/assets/SillyPhotos/ScottDixon.jpeg', import.meta.url)},
        {id: 2, name: "Josef Newgarden", original: 'penske', team: 'penske', pic: new URL('@/assets/SillyPhotos/JosefNewgarden.jpeg', import.meta.url)},
        {id: 3, name: "Pato O'Ward", original: 'mclaren', team: 'mclaren', pic: new URL('@/assets/SillyPhotos/PatricioOWard.jpeg', import.meta.url)},
        {id: 4, name: "Scott McLaughlin", original: 'penske', team: 'penske', pic: new URL('@/assets/SillyPhotos/ScottMcLaughlin.jpeg', import.meta.url)},
        {id: 5, name: "Will Power", original: 'penske', team: 'penske', pic: new URL('@/assets/SillyPhotos/WillPower.jpeg', import.meta.url)},
        {id: 6, name: "Alexander Rossi", original: 'mclaren', team: 'mclaren', pic: new URL('@/assets/SillyPhotos/AlexanderRossi.jpeg', import.meta.url)},
        {id: 7, name: "Colton Herta", original: 'andretti', team: 'andretti', pic: new URL('@/assets/SillyPhotos/ColtonHerta.jpeg', import.meta.url)},
        {id: 8, name: "Christian Lundgaard", original: 'rahal', team: 'rahal', pic: new URL('@/assets/SillyPhotos/ChristianLundgaard.jpeg', import.meta.url)},
        {id: 9, name: "Kyle Kirkwood", original: 'andretti', team: 'andretti', pic: new URL('@/assets/SillyPhotos/KyleKirkwood.jpeg', import.meta.url)},
        {id: 10, name: "Rinus Veekay", original: 'ecr', team: 'ecr', pic: new URL('@/assets/SillyPhotos/RinusVeeKay.jpeg', import.meta.url)},
        {id: 11, name: "Ed Carpenter", original: 'ecr', team: 'ecr', pic: new URL('@/assets/SillyPhotos/EdCarpenter.jpeg', import.meta.url)},
        {id: 12, name: "Benjamin Pedersen", original: 'fa', team: 'fa', pic: new URL('@/assets/SillyPhotos/BenjaminPedersen.jpeg', import.meta.url)},
        {id: 13, name: "Marcus Ericsson", original: 'andretti', team: 'andretti', pic: new URL('@/assets/SillyPhotos/MarcusEricsson.jpeg', import.meta.url)},
        {id: 14, name: "Tom Blomqvist (IMSA)", original: 'msr', team: 'msr', pic: new URL('@/assets/SillyPhotos/TomBlomqvist.jpeg', import.meta.url)},
        {id: 15, name: "Linus Lundqvist (IndyNXT)", original: 'ganassi', team: 'ganassi', pic: new URL('@/assets/SillyPhotos/LinusLundqvist.jpeg', import.meta.url)},
        {id: 16, name: "Romain Grosjean", original: 'juncos', team: 'juncos', pic: new URL('@/assets/SillyPhotos/RomainGrosjean.jpeg', import.meta.url)},
        {id: 17, name: "Santino Ferrucci", original: 'foyt', team: 'foyt', pic: new URL('@/assets/SillyPhotos/SantinoFerrucci.jpeg', import.meta.url)},
        {id: 18, name: "Felix Rosenqvist", original: 'msr', team: 'msr', pic: new URL('@/assets/SillyPhotos/FelixRosenqvist.jpeg', import.meta.url)},
        {id: 19, name: "Graham Rahal", original: 'rahal', team: 'rahal', pic: new URL('@/assets/SillyPhotos/GrahamRahal.jpeg', import.meta.url)},
        {id: 20, name: "Callum Ilott", original: 'fa', team: 'fa', pic: new URL('@/assets/SillyPhotos/CallumIlott.jpeg', import.meta.url)},
        {id: 21, name: "Marcus Armstrong", original: 'ganassi', team: 'ganassi', pic: new URL('@/assets/SillyPhotos/MarcusArmstrong.jpeg', import.meta.url)},
        {id: 22, name: "David Malukas", original: 'mclaren', team: 'mclaren', pic: new URL('@/assets/SillyPhotos/DavidMalukas.jpeg', import.meta.url)},
        {id: 23, name: "Devlin DeFrancesco", original: 'fa', team: 'fa', pic: new URL('@/assets/SillyPhotos/DevlinDeFrancesco.jpeg', import.meta.url)},
        {id: 24, name: "Conor Daly", original: 'fa', team: 'fa', pic: new URL('@/assets/SillyPhotos/ConorDaly.jpeg', import.meta.url)},
        {id: 25, name: "Jack Harvey", original: 'fa', team: 'fa', pic: new URL('@/assets/SillyPhotos/JackHarvey.jpeg', import.meta.url)},
        {id: 26, name: "Agustín Canapino", original: 'juncos', team: 'juncos', pic: new URL('@/assets/SillyPhotos/AgustinCanapino.jpeg', import.meta.url)},
        {id: 27, name: "Simon Pagenaud", original: 'fa', team: 'fa', pic: new URL('@/assets/SillyPhotos/SimonPagenaud.jpeg', import.meta.url)},
        {id: 28, name: "Sting Ray Robb", original: 'foyt', team: 'foyt', pic: new URL('@/assets/SillyPhotos/StingRayRobb.jpeg', import.meta.url)},
        {id: 29, name: "Takuma Sato", original: 'fa', team: 'fa', pic: new URL('@/assets/SillyPhotos/TakumaSato.jpeg', import.meta.url)},
        {id: 30, name: "Ryan Hunter-Reay", original: 'fa', team: 'fa', pic: new URL('@/assets/SillyPhotos/RyanHunterReay.jpeg', import.meta.url)},
        {id: 31, name: "Nolan Siegel (IndyNXT)", original: 'fa', team: 'fa', pic: new URL('@/assets/SillyPhotos/NolanSiegel.jpeg', import.meta.url)},
        {id: 32, name: "Christian Rasmussen (IndyNXT)", original: 'ecr', team: 'ecr', pic: new URL('@/assets/SillyPhotos/ChristianRasmussen.jpeg', import.meta.url)},
        {id: 33, name: "Hunter McElrea (IndyNXT)", original: 'fa', team: 'fa', pic: new URL('@/assets/SillyPhotos/HunterMcElrea.jpeg', import.meta.url)},
        {id: 34, name: "Louis Foster (IndyNXT)", original: 'na', team: 'na', pic: new URL('@/assets/SillyPhotos/LouisFoster.jpeg', import.meta.url)},
        {id: 35, name: "Danial Frost (IndyNXT)", original: 'na', team: 'na', pic: new URL('@/assets/SillyPhotos/DanialFrost.jpeg', import.meta.url)},
        {id: 36, name: "Juri Vips (F2)", original: 'fa', team: 'fa', pic: new URL('@/assets/SillyPhotos/JuriVips.jpeg', import.meta.url)},
        {id: 37, name: "Robert Shartzman (F2)", original: 'fa', team: 'fa', pic: new URL('@/assets/SillyPhotos/RobertShwartzman.jpeg', import.meta.url)},
        {id: 38, name: "Nyck de Vries (F1)", original: 'na', team: 'na', pic: new URL('@/assets/SillyPhotos/NyckdeVries.jpeg', import.meta.url)},
        {id: 39, name: "Oliver Askew (FE)", original: 'fa', team: 'fa', pic: new URL('@/assets/SillyPhotos/OliverAskew.jpeg', import.meta.url)},
        {id: 40, name: "Felipe Drugovich (F2)", original: 'na', team: 'na', pic: new URL('@/assets/SillyPhotos/FelipeDrugovich.jpeg', import.meta.url)},
        {id: 41, name: "Tatiana Colderón", original: 'fa', team: 'fa', pic: new URL('@/assets/SillyPhotos/TatianaCalderon.jpeg', import.meta.url)},
        {id: 41, name: "Kyffin Simpson", original: 'ganassi', team: 'ganassi', pic: new URL('@/assets/SillyPhotos/KyffinSimpson.jpeg', import.meta.url)},
        {id: 42, name: "Pietro Fittipaldi", original: 'rahal', team: 'rahal', pic: new URL('@/assets/SillyPhotos/PietroFittipaldi.jpeg', import.meta.url)}


      ]
    }
  },
  computed: {
    lockedDrivers() {
      const lockedIn = this.items.filter((item) => item.original != 'fa')
      return lockedIn.length - 1
    },
    listNew() {
      return this.items.filter((item) => item.team === 'new')
    },
    getName() {
      // const nameArray = fullName.split(" ")
      return "Fittipalid"
    },
    listFreeAgents() {
      return this.items.filter((item) => item.team === 'fa')
    },
    getFieldSize() {
      const nonFreeAgents = this.items.filter((item) => item.team != 'fa') 
      return nonFreeAgents.length
    },
    isMobile() {
          if( screen.width <= 760 ) {
              return true;
          }
          else {
              return false;
          }
      },
  },
  methods: {
    listTeam(teamName) {
      return this.items.filter((item) => item.team === teamName)
    },
    addDriver(team, title) {
      this.isSillyModalVisible = true
      this.teamAdd = team,
      this.teamName = title
    },
    showSillyModal() {
        this.isSillyModalVisible = true
        this.currentDrivers = driverData
    },
    onImgLoad () {
         this.isLoaded = true
      },
    resetTeams() {
      const freeAgents =  this.items
      for (const freeAgent in freeAgents){
        freeAgents[freeAgent]['team'] = freeAgents[freeAgent]['original']
      }
    },
    closeModal() {
      this.isSillyModalVisible = false
    },
    confirmRemoval(driver) {
      driver.team = 'fa'
      this.isRemoveModalVisible = false
    },
    closeRemoveModal() {
      this.isRemoveModalVisible = false
    },
    startDrag(event, item) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemID', item.id)
    },
    newTeam() {
      const teamName = prompt("Enter a New Team Name")
      this.newTeamName = teamName
    },
    removeDriver(driver) {    
      this.driverRemove = driver
      this.driverName = driver.name
      const team = this.teamData.filter((team) => team.name === driver.team)
      this.teamRemove = team[0].title

      this.isRemoveModalVisible = true 
    },
    addAndretti() {
      this.isSillyModalVisible = true
      this.teamAdd = 'andretti',
      this.teamName = 'Andretti Global'    
    },
    addPenske() {
      this.isSillyModalVisible = true
      this.teamAdd = 'penske',
      this.teamName = 'Team Penske'      
    },
    addGanassi() {
      this.isSillyModalVisible = true
      this.teamAdd = 'ganassi'
      this.teamName = 'Chip Ganassi Racing'  
    },
    addMclaren() {
      this.isSillyModalVisible = true
      this.teamAdd = 'mclaren'
      this.teamName = 'Arrow McLaren'
    },
    addRahal() {
      this.isSillyModalVisible = true
      this.teamAdd = 'rahal'
      this.teamName = 'Rahal Letterman Lanigan' 
    },
    addCarpenter() {
      this.isSillyModalVisible = true
      this.teamAdd = 'ecr'
      this.teamName = 'Ed Carpenter Racing'
    },
    addJuncos() {
      this.isSillyModalVisible = true
      this.teamAdd = 'juncos'
      this.teamName = 'Juncos Hollinger Racing'  
    },
    addFoyt() {
      this.isSillyModalVisible = true
      this.teamAdd = 'foyt'
      this.teamName = 'A.J. Foyt Racing'
    },
    addShank() {
      this.isSillyModalVisible = true
      this.teamAdd = 'msr'
      this.teamName = 'Meyer Shank Racing'
    },
    addCoyne() {
      this.isSillyModalVisible = true
      this.teamAdd = 'coyne'
      this.teamName = 'Dale Coyne Racing'
    },
    addNew() {
      this.isSillyModalVisible = true
      this.teamAdd = 'new'
      this.teamName = this.newTeamName
    },
    removeNewTeam() {
      this.newTeamName= null
      this.items.find(value => value.team == 'new').team = 'fa'
      

    },
    onDrop(event, team) {
      const itemID = event.dataTransfer.getData('itemID')
      const item = this.items.find((item) => item.id == itemID)
      const count = this.items.filter((obj) => obj.team === team).length;
      if(count >= 5 && team !='fa'){
        alert("This team is full. You will need to remove someone else to add this driver.")
      }
      else if(count >= this.teams[team]){
        const response = confirm(`This team is only projected to have ${this.teams[team]} cars. Are you sure you wanna add another?`)
        if (response) {
          item.team = team
        }
      }
      else{
        item.team = team
      }
      
    }
  }
  
}
</script>

<style scoped>
.sillyseason {
  text-align: center;
  background-color:rgb(231, 231, 231);
  }
  .silly-title{
    background-color:rgb(231, 231, 231);
  }
  .float-icon{
    position:fixed;
    width:25px;
    height:25px;
    bottom:30px;
    right:30px;
    background-color:whitesmoke;
    color:#240000;
    border-radius:50px;
    text-align:center;
    box-shadow: 2px 2px 3px #3b3b3b;
  }
  .float-container {
    padding: 35px 2px;
    min-height: 1000px;
    display: inline-flex;
    background-color:rgb(231, 231, 231);
}
  .drop-zone {
    align-items: center;
    width: 98%;
    font-size: 15px;
    text-align: center;
    min-height: calc(65px + 2.2vw);
    padding: 5px;
    background-color: #929292;
    margin-bottom: 10px;
    border-top: 1px solid #2e2e2e;
    border-right: 3px solid #2e2e2e;
    border-left: 1px solid #2e2e2e;
    border-bottom: 3px solid #2e2e2e;
    display: flexbox;
    border-radius: 11px;
    box-shadow: 3px 3px 3px gray;
  }
  .drop-zone.full{
    background-color:#ffbb00;
  }
  .drop-zone-fa {
    width: 99%;
    font-size: 15px;
    text-align: center;
    min-height: 790px;
    padding: 1px;
    background-color: rgb(136, 136, 136);
    margin-bottom: 20px;
    display: flexbox;
    border-top: 1px solid #2e2e2e;
    border-right: 2px solid #2e2e2e;
    border-left: 1px solid #2e2e2e;
    border-bottom: 2px solid #2e2e2e;
    display: inline-block;
    box-shadow: 3px 3px 3px gray;
  }
  .fa-retweet {
    color:  whitesmoke !important;
    font-size: calc(2px + 1.3vw) !important;
    padding: 10px;
    cursor: pointer;
    background-color: rgb(57, 118, 216);
  }
  .fa-retweet:hover {
    color:  white !important;
    background-color: rgb(65, 129, 200);
  }
  .fa-plus {
    color: rgb(167, 167, 167) !important;
    font-size: calc(21px + 4.8vw);
    padding:calc(1px + 2.5vw) calc(4px + 4.5vw);

  }
  .fa-plus:hover {
    color: rgb(107, 107, 107);
    cursor: pointer;
  }
  .fa-xmark {
    color: rgb(64, 64, 64) !important;;
    font-size: calc(12px + 1vw) !important;
    padding-top:calc(19px + .7vw);
    padding-right:calc(10px + 1vw);
    float: right;
  }
  .fa-xmark:hover {
    color: rgb(119, 119, 119) !important;
    cursor: pointer !important;
  }
  .add-new{
    float: left;
    align-items: center;
    width: 95%;
    font-size: 15px;
    text-align: left;
    height: calc(138px + 2.2vw);
    padding: 5px;
    margin-bottom: 10px;
  }
  .drop-team{
    font-size: 19px;
    font-weight: Bold;
    text-align: left;
    height: 18px;
    padding-bottom: 8px;
    color: black;
    text-shadow: 1px 1px 1px #gray;
    font-family: Verdana;
    margin-bottom: 8px;
  }
  .drag-el {
    height: calc(50px + 2.5vw);
    margin-top: 2px;
    margin-bottom: 2px;
    margin-left: 8px;
    margin-right: 8px;
    align-items: left;
    float: center;
    display: inline-flex;
    border: 1px solid #000000;
    border-radius: 11px;
    box-shadow: 1px 1px 2px #000000;
  }
  .drag-el:hover{
    box-shadow: 1px 1px 5px 2px #000000;
    cursor:grab;
  }
.float-child-fa {
    width: 30%;
    float: left;
    padding: 2px 8px;
    text-align: center;
}
.float-child-1 {
    width: 40%;
    float: left;
    padding: 2px;
    height: calc(800px + .8vw);
}
.float-child-2 {
    width: 30%;
    float: left;
    padding: 2px;
    height: calc(800px + .8vw);
}
.silly-img {
  height: 100%;
  border-radius: 8px;
}
.bottom-text {
  position: relative;
  bottom: 20px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  background-color: black;
  }

  hr.solid {
  border-top: 8px solid rgb(76, 110, 177);
  width: 100%;
  margin: auto;
  margin-bottom: 30px;
}

.drop-zone-mobile {
    align-items: center;
    width: 98%;
    font-size: 15px;
    text-align: center;
    min-height: calc(65px + 2.2vw);
    padding: 4px;
    background-color: #929292;
    margin-bottom: 8px;
    border-top: .7px solid #2e2e2e;
    border-right: 2px solid #2e2e2e;
    border-left: .7px solid #2e2e2e;
    border-bottom: 2px solid #2e2e2e;
    display: flexbox;
    border-radius: 11px;
    box-shadow: 5px 3px 3px #0943a7;
  }
  .drop-zone-mobile.full{
    background-color:#ffbb00;
  }
  /* .drop-zone-mobile-2 {
    float: center;
    width: 100%;
    font-size: 15px;
    text-align: center;
    min-height: calc(67px + 3.5vw);
    padding: 1px;
    background-color: #ffbb00;
    margin-bottom: 8px;
    border-top: .7px solid #2e2e2e;
    border-right: 2px solid #2e2e2e;
    border-left: .7px solid #2e2e2e;
    border-bottom: 2px solid #2e2e2e;
    display: flexbox;
    box-shadow: 5px 3px 3px rgb(74, 66, 66);
    border-radius: 11px;
  }  */
  .add-new-mobile{
    float: center;
    align-items: center;
    width: 99%;
    font-size: 35px !important;
    text-align: center;
    height: calc(118px + 3.2vw) !important;
    padding: 2px;
    margin-bottom: 1px;
  }
  .drop-team-mobile{
    font-size: 14px;
    font-weight: Bold;
    text-align: left;
    height: 18px;
    padding-bottom: 8px;
    color: #240000;
    text-shadow: 1px 1px 1px whitesmoke;
    font-family: Verdana;
    margin-bottom: 1px;
  }
  .drag-el-mobile {
    height: calc(58px + 3vw);
    margin-top: 2px;
    margin-bottom: 2px;
    margin-left: 3px;
    margin-right: 3px;
    float: center;
    display: inline-flex;
    flex-direction: row;
    border: 1px solid #000000;
    border-radius: 11px;
    box-shadow: 3px 3px 4px #3a3a3ab8;
    align-items: left;
  }
  .float-container-mobile {
    margin-top: 20px;
    padding: 2px 0px;
    display: inline-flex;
    float: center;
    width: 100%;
    min-height: 1500px;
}
.float-child-mobile {
    min-width: 100%;
    float: center;
    padding: 0px;
}
.silly-img-mobile {
  border-radius: 8px;
  display: grid;
  flex-direction: column;

}


</style>
