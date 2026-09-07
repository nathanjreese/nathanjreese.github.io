<template>
  <section class="sillyseason">
    <div class="silly-header">
      <title-page title-text="2026 Silly Season Predictor" />
      <div class="toolbar">
        <button class="toolbar-btn" type="button" @click="newDriver">Create Driver</button>
        <button class="toolbar-btn" type="button" @click="resetTeams">Reset</button>
      </div>
    </div>

    <div class="board-layout">
      <div class="teams-area">
        <div
          v-for="team in allTeamPools"
          :key="team.name"
          class="team-card"
          :class="{ full: isAtSuggestedLimit(team.name) }"
          @drop="onDrop($event, team.name)"
          @dragenter.prevent
          @dragover.prevent
        >
          <div class="team-card-header">
            <div class="team-header-main">
              <img
                v-if="team.teampic"
                :src="team.teampic"
                :alt="team.title"
                class="team-logo"
              >
              <div v-else class="team-logo-fallback">{{ team.title.charAt(0) }}</div>
              <div>
                <h3 class="team-title">{{ team.title }}</h3>
                <p class="team-count">{{ filledCount(team.name) }}/{{ teamLimit(team.name) }} drivers</p>
              </div>
            </div>
          </div>

          <div class="driver-list">
            <div
              v-for="item in listTeam(team.name)"
              :key="item.uid"
              class="driver-chip"
              draggable="true"
              @dragstart="startDrag($event, item)"
            >
              <img :src="item.pic" :alt="item.name" class="driver-photo">
              <span class="driver-name">{{ shortName(item.name) }}</span>
              <button class="chip-remove" type="button" title="Move to Free Agents" @click="moveToFreeAgents(item)">
                x
              </button>
            </div>

            <div
              v-for="n in emptySlots(team.name)"
              :key="`empty-${team.name}-${n}`"
              class="driver-chip empty-slot"
              @click="openOpenCarModal(team.name)"
            >
              <span class="empty-slot-dot" />
              <span class="empty-slot-text">Add driver</span>
            </div>
          </div>
        </div>
      </div>

      <aside
        class="free-agents"
        @drop="onDrop($event, 'fa')"
        @dragenter.prevent
        @dragover.prevent
      >
        <div class="fa-header-row">
          <h2 class="fa-title">Free Agents</h2>
          <span class="fa-count">{{ listFreeAgents.length }}</span>
        </div>

        <div class="driver-list">
          <div
            v-for="item in listFreeAgents"
            :key="item.uid"
            class="driver-chip"
            :draggable="!isMobileView"
            @dragstart="startDrag($event, item)"
            @click="onFreeAgentClick(item)"
          >
            <img :src="item.pic" :alt="item.name" class="driver-photo">
            <span class="driver-name">{{ shortName(item.name) }}</span>
          </div>

          <p v-if="listFreeAgents.length === 0" class="empty-message">
            No free agents available
          </p>
        </div>
      </aside>
    </div>

    <div v-if="showOpenCarModal" class="open-car-modal-backdrop" @click.self="closeOpenCarModal">
      <div class="open-car-modal">
        <div class="open-car-modal-header">
          <h3 class="open-car-modal-title">Add Driver to {{ selectedTeamTitle() }}</h3>
          <button class="open-car-close" type="button" @click="closeOpenCarModal">x</button>
        </div>

        <div class="open-car-list">
          <button
            v-for="item in listFreeAgents"
            :key="`picker-${item.uid}`"
            type="button"
            class="open-car-option"
            @click="assignFromOpenCar(item)"
          >
            <img :src="item.pic" :alt="item.name" class="driver-photo">
            <span class="driver-name">{{ shortName(item.name) }}</span>
          </button>

          <p v-if="listFreeAgents.length === 0" class="empty-message">No free agents available</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TitlePage from "@/components/Partials/Title"

export default {
  components: {
    TitlePage
  },
  data() {
    return {
      isMobileView: window.innerWidth <= 1020,
      showOpenCarModal: false,
      selectedTeamName: null,
      teamData: [
        { name: "andretti", size: 3, title: "Andretti Global", teampic: new URL("@/assets/Teams/AndrettiGlobal.png", import.meta.url) },
        { name: "penske", size: 3, title: "Team Penske", teampic: new URL("@/assets/Teams/TeamPenske.png", import.meta.url) },
        { name: "ganassi", size: 3, title: "Chip Ganassi Racing", teampic: new URL("@/assets/Teams/ChipGanassiRacing.png", import.meta.url) },
        { name: "mclaren", size: 3, title: "Arrow McLaren", teampic: new URL("@/assets/Teams/ArrowMcLaren.png", import.meta.url) },
        { name: "rahal", size: 2, title: "Rahal Letterman Lanigan", teampic: new URL("@/assets/Teams/RahalLetterman.png", import.meta.url) },
        { name: "ecr", size: 2, title: "Ed Carpenter Racing", teampic: new URL("@/assets/Teams/EdCarpenterRacing.png", import.meta.url) },
        { name: "coyne", size: 2, title: "Dale Coyne Racing", teampic: new URL("@/assets/Teams/DaleCoyneRacing.png", import.meta.url) },
        { name: "msr", size: 2, title: "Meyer Shank Racing", teampic: new URL("@/assets/Teams/MeyerShankRacing.png", import.meta.url) },
        { name: "foyt", size: 2, title: "A.J. Foyt Racing", teampic: new URL("@/assets/Teams/AJFoytRacing.png", import.meta.url) },
        { name: "hollinger", size: 2, title: "Hollinger Racing", teampic: new URL("@/assets/Teams/JuncosHollinger.png", import.meta.url) },
        { name: "dreyer", size: 1, title: "Dreyer & Reinbold Racing", teampic: new URL("@/assets/Teams/DreyerReinboldRacing.png", import.meta.url) },

      ],
      teams: {
        andretti: 3,
        penske: 3,
        ganassi: 3,
        mclaren: 3,
        ecr: 3,
        rahal: 3,
        coyne: 2,
        msr: 2,
        foyt: 2,
        juncos: 2,
        prema: 2
      },
      newProfile: new URL("@/assets/SillyPhotos/NewDriver.jpeg", import.meta.url),
      marioProfile: new URL("@/assets/SillyPhotos/MarioAndretti.jpeg", import.meta.url),
      items: [
        { id: 0, name: "Alex Palou", original: "ganassi", team: "ganassi", pic: new URL("@/assets/SillyPhotos/AlexPalou.jpeg", import.meta.url) },
        { id: 1, name: "Scott Dixon", original: "mclaren", team: "mclaren", pic: new URL("@/assets/SillyPhotos/ScottDixon.jpeg", import.meta.url) },
        { id: 2, name: "Josef Newgarden", original: "penske", team: "penske", pic: new URL("@/assets/SillyPhotos/JosefNewgarden.jpeg", import.meta.url) },
        { id: 3, name: "Pato O'Ward", original: "mclaren", team: "mclaren", pic: new URL("@/assets/SillyPhotos/PatricioOWard.jpeg", import.meta.url) },
        { id: 4, name: "Scott McLaughlin", original: "penske", team: "penske", pic: new URL("@/assets/SillyPhotos/ScottMcLaughlin.jpeg", import.meta.url) },
        { id: 5, name: "Will Power", original: "andretti", team: "andretti", pic: new URL("@/assets/SillyPhotos/WillPower.jpeg", import.meta.url) },
        { id: 6, name: "Colton Herta", original: "na", team: "na", pic: new URL("@/assets/SillyPhotos/ColtonHerta.jpeg", import.meta.url) },
        { id: 7, name: "Christian Lundgaard", original: "ganassi", team: "ganassi", pic: new URL("@/assets/SillyPhotos/ChristianLundgaard.jpeg", import.meta.url) },
        { id: 8, name: "Kyle Kirkwood", original: "andretti", team: "andretti", pic: new URL("@/assets/SillyPhotos/KyleKirkwood.jpeg", import.meta.url) },
        { id: 9, name: "Santino Ferrucci", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/SantinoFerrucci.jpeg", import.meta.url) },
        { id: 10, name: "Alexander Rossi", original: "ecr", team: "ecr", pic: new URL("@/assets/SillyPhotos/AlexanderRossi.jpeg", import.meta.url) },
        { id: 11, name: "Rinus Veekay", original: "hollinger", team: "hollinger", pic: new URL("@/assets/SillyPhotos/RinusVeeKay.jpeg", import.meta.url) },
        { id: 12, name: "Marcus Ericsson", original: "andretti", team: "andretti", pic: new URL("@/assets/SillyPhotos/MarcusEricsson.jpeg", import.meta.url) },
        { id: 13, name: "David Malukas", original: "penske", team: "penske", pic: new URL("@/assets/SillyPhotos/DavidMalukas.jpeg", import.meta.url) },
        { id: 14, name: "Felix Rosenqvist", original: "mclaren", team: "mclaren", pic: new URL("@/assets/SillyPhotos/FelixRosenqvist.jpeg", import.meta.url) },
        { id: 15, name: "Graham Rahal", original: "rahal", team: "rahal", pic: new URL("@/assets/SillyPhotos/GrahamRahal.jpeg", import.meta.url) },
        { id: 16, name: "Louis Foster", original: "rahal", team: "rahal", pic: new URL("@/assets/SillyPhotos/LouisFoster.jpeg", import.meta.url) },
        { id: 17, name: "Marcus Armstrong", original: "msr", team: "msr", pic: new URL("@/assets/SillyPhotos/MarcusArmstrong.jpeg", import.meta.url) },
        { id: 18, name: "Christian Rasmussen", original: "ecr", team: "ecr", pic: new URL("@/assets/SillyPhotos/ChristianRasmussen.jpeg", import.meta.url) },
        { id: 19, name: "Sting Ray Robb", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/StingRayRobb.jpeg", import.meta.url) },
        { id: 20, name: "Kyffin Simpson", original: "ganassi", team: "ganassi", pic: new URL("@/assets/SillyPhotos/KyffinSimpson.jpeg", import.meta.url) },
        { id: 21, name: "Conor Daly", original: "dreyer", team: "dreyer", pic: new URL("@/assets/SillyPhotos/ConorDaly.jpeg", import.meta.url) },
        { id: 22, name: "Nolan Siegel", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/NolanSiegel.jpeg", import.meta.url) },
        { id: 23, name: "Callum Ilott", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/CallumIlott.jpeg", import.meta.url) },
        { id: 24, name: "Jacob Abel", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/JacobAbel.jpeg", import.meta.url) },
        { id: 25, name: "Devlin DeFrancesco", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/DevlinDeFrancesco.jpeg", import.meta.url) },
        { id: 27, name: "Linus Lundqvist", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/LinusLundqvist.jpeg", import.meta.url) },
        { id: 28, name: "Romain Grosjean", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/RomainGrosjean.jpeg", import.meta.url) },
        { id: 28, name: "Caio Collet", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/CaioCollet.jpeg", import.meta.url) },
        { id: 29, name: "Myles Rowe", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/MylesRowe.jpeg", import.meta.url) },
        { id: 30, name: "Dennis Hauger", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/DennisHauger.jpeg", import.meta.url) },
        { id: 31, name: "Max Taylor", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/MaxTaylor.jpeg", import.meta.url) },
        { id: 32, name: "Lochie Hughes", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/LochieHughes.jpeg", import.meta.url) },
        { id: 33, name: "Hunter McElrea", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/HunterMcElrea.jpeg", import.meta.url) },
        { id: 35, name: "Yuki Tsunoda", original: "na", team: "na", pic: new URL("@/assets/SillyPhotos/YukiTsunoda.jpeg", import.meta.url) },
        { id: 36, name: "Pietro Fittipaldi", original: "na", team: "na", pic: new URL("@/assets/SillyPhotos/PietroFittipaldi.jpeg", import.meta.url) },
        { id: 38, name: "Tymek Kucharczyk", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/TymekKucharczyk.jpeg", import.meta.url) },
        { id: 39, name: "Zane Maloney", original: "na", team: "na", pic: new URL("@/assets/SillyPhotos/ZaneMaloney.jpeg", import.meta.url) },
        { id: 41, name: "Allesandro de Tullio", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/AllesandrodeTullio.jpeg", import.meta.url) },
        { id: 44, name: "Enzo Fittipaldi", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/EnzoFittpaldi.jpeg", import.meta.url) },
        { id: 45, name: "Mick Schumacher", original: "msr", team: "msr", pic: new URL("@/assets/SillyPhotos/MickSchumacher.jpeg", import.meta.url) },
        { id: 47, name: "Nikita Johnson", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/NikitaJohnson.jpeg", import.meta.url) },
        { id: 48, name: "Leonardo Fornaroli", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/LeonardoFornaroli.jpeg", import.meta.url) },
        { id: 49, name: "Sebastian Montoya", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/SebastianMontoya.jpeg", import.meta.url) },
        { id: 50, name: "Kakunoshin Ohta", original: "fa", team: "fa", pic: new URL("@/assets/SillyPhotos/KakunoshinOhta.jpeg", import.meta.url) },

      ]
    }
  },
  mounted() {
    window.addEventListener("resize", this.updateViewport)
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateViewport)
  },
  created() {
    this.items = this.items.map((item, index) => ({
      ...item,
      uid: index
    }))
  },
  computed: {
    listFreeAgents() {
      return this.items.filter((item) => item.team === "fa")
    },
    allTeamPools() {
      const namedPools = [...this.teamData]
      const knownNames = new Set(namedPools.map((team) => team.name))
      const dynamicNames = [...new Set(
        this.items
          .map((item) => item.team)
          .filter((team) => team && team !== "fa" && team !== "na" && !knownNames.has(team))
      )]

      const dynamicPools = dynamicNames.map((name) => ({
        name,
        size: this.teams[name] || 99,
        title: this.formatTeamName(name),
        teampic: null
      }))

      return [...namedPools, ...dynamicPools]
    }
  },
  methods: {
    updateViewport() {
      this.isMobileView = window.innerWidth <= 1020
    },
    shortName(fullName) {
      const parts = fullName.trim().split(" ")
      if (parts.length <= 1) return fullName
      return `${parts[0][0]}. ${parts[parts.length - 1]}`
    },
    formatTeamName(name) {
      if (name === "na") return "Unassigned / Other"
      return name
        .split("-")
        .join(" ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    },
    listTeam(teamName) {
      return this.items.filter((item) => item.team === teamName)
    },
    filledCount(teamName) {
      return this.listTeam(teamName).length
    },
    teamLimit(teamName) {
      const pool = this.allTeamPools.find((team) => team.name === teamName)
      const suggestedLimit = pool ? pool.size : (this.teams[teamName] || 3)
      return Math.min(suggestedLimit, 3)
    },
    openSlots(teamName) {
      return Math.max(this.teamLimit(teamName) - this.filledCount(teamName), 0)
    },
    emptySlots(teamName) {
      return Array.from({ length: this.openSlots(teamName) }, (_, index) => index + 1)
    },
    selectedTeamTitle() {
      const selectedTeam = this.allTeamPools.find((team) => team.name === this.selectedTeamName)
      return selectedTeam ? selectedTeam.title : "Team"
    },
    isTeamFull(teamName) {
      return this.filledCount(teamName) >= this.teamLimit(teamName)
    },
    isAtSuggestedLimit(teamName) {
      return this.listTeam(teamName).length >= this.teamLimit(teamName)
    },
    startDrag(event, item) {
      event.dataTransfer.dropEffect = "move"
      event.dataTransfer.effectAllowed = "move"
      event.dataTransfer.setData("itemUID", String(item.uid))
    },
    onDrop(event, targetTeam) {
      const itemUID = event.dataTransfer.getData("itemUID")
      const item = this.items.find((driver) => String(driver.uid) === itemUID)
      if (!item) return

      this.moveDriverToTeam(item, targetTeam)
    },
    moveDriverToTeam(item, targetTeam) {
      if (!item) return false

      if (targetTeam !== "fa") {
        const count = this.items.filter((driver) => driver.team === targetTeam && driver.uid !== item.uid).length
        const suggestedLimit = this.teamLimit(targetTeam)

        if (count >= 3) {
          alert("This team can have a maximum of 3 drivers.")
          return false
        }

        if (count >= suggestedLimit) {
          const accepted = confirm(`This team is projected for ${suggestedLimit} cars. Add another anyway?`)
          if (!accepted) return false
        }
      }

      item.team = targetTeam
      return true
    },
    openOpenCarModal(teamName) {
      if (this.isTeamFull(teamName)) {
        alert("This team is already full.")
        return
      }

      this.selectedTeamName = teamName
      this.showOpenCarModal = true
    },
    closeOpenCarModal() {
      this.showOpenCarModal = false
      this.selectedTeamName = null
    },
    assignFromOpenCar(item) {
      if (!this.selectedTeamName) return
      const success = this.moveDriverToTeam(item, this.selectedTeamName)
      if (success) {
        this.closeOpenCarModal()
      }
    },
    onFreeAgentClick(item) {
      if (!this.isMobileView) return

      const teamChoices = this.allTeamPools
      const menuText = teamChoices
        .map((team, index) => `${index + 1}. ${team.title}`)
        .join("\n")

      const response = prompt(`Add ${item.name} to which team?\n\n${menuText}`)
      if (!response) return

      const selectedIndex = Number.parseInt(response, 10) - 1
      if (Number.isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= teamChoices.length) {
        alert("Please choose a valid team number.")
        return
      }

      this.moveDriverToTeam(item, teamChoices[selectedIndex].name)
    },
    moveToFreeAgents(driver) {
      driver.team = "fa"
    },
    newDriver() {
      const driverName = prompt("Enter a New Driver Name")
      if (!driverName || !driverName.trim()) return

      const cleanName = driverName.trim()
      const nextUid = this.items.length ? Math.max(...this.items.map((item) => item.uid)) + 1 : 0
      this.items.push({
        id: nextUid,
        uid: nextUid,
        name: cleanName,
        original: "fa",
        team: "fa",
        pic: cleanName === "Mario Andretti" ? this.marioProfile : this.newProfile
      })
    },
    resetTeams() {
      this.items = this.items.map((item) => ({
        ...item,
        team: item.original
      }))
    }
  }
}
</script>

<style scoped>
.sillyseason {
  --bg: #edf1f7;
  --panel: #ffffff;
  --panel-soft: #f5f8ff;
  --text: #152135;
  --text-soft: #4a5a7a;
  --accent: #0a5bd3;
  --accent-soft: #dbe9ff;
  --stroke: #c9d7f2;

  min-height: 100vh;
  padding: 16px 12px 28px;
  background:
    radial-gradient(circle at 0% 0%, #cfe0ff 0%, transparent 38%),
    radial-gradient(circle at 100% 100%, #d4ecff 0%, transparent 42%),
    var(--bg);
  color: var(--text);
}

.silly-header {
  background: linear-gradient(135deg, #ffffff, #eef4ff);
  border: 1px solid var(--stroke);
  border-radius: 18px;
  padding: 10px;
  margin-bottom: 14px;
  box-shadow: 0 10px 30px rgba(10, 46, 97, 0.08);
}

.toolbar {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 4px 8px 6px;
}

.toolbar-btn {
  border: 1px solid #bdd0f5;
  background: #ffffff;
  color: var(--accent);
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
}

.toolbar-btn:hover {
  background: var(--accent-soft);
}

.board-layout {
  display: grid;
  grid-template-columns: 1fr 330px;
  gap: 12px;
  align-items: start;
}

.teams-area {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 10px;
  align-content: start;
  grid-auto-rows: 1fr;
}

.team-card,
.free-agents {
  background: var(--panel);
  border: 1px solid var(--stroke);
  border-radius: 14px;
  padding: 8px;
  box-shadow: 0 6px 18px rgba(12, 40, 84, 0.08);
}

.team-card {
  align-self: start;
  min-height: 240px;
  height: 240px;
}

.team-card.full {
  background: #eef8f1;
  border-color: #7fc89a;
  box-shadow: 0 8px 20px rgba(48, 124, 77, 0.2);
}

.team-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-bottom: 1px solid var(--stroke);
  padding-bottom: 6px;
  margin-bottom: 6px;
}

.team-header-main {
  display: flex;
  align-items: center;
  gap: 8px;
}

.team-logo {
  width: 46px;
  height: 32px;
  object-fit: contain;
  border-radius: 7px;
  background: #f3f7ff;
  border: 1px solid #d8e4fb;
}

.team-logo-fallback {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.team-title {
  margin: 0;
  font-size: 14px;
  line-height: 1.2;
}

.team-count {
  margin: 2px 0 0;
  font-size: 11px;
  color: var(--text-soft);
}

.fa-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--stroke);
  padding-bottom: 8px;
}

.fa-title {
  margin: 0;
  font-size: 18px;
}

.fa-count {
  min-width: 26px;
  height: 26px;
  border-radius: 13px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 12px;
  font-weight: 700;
}

.driver-list {
  display: grid;
  gap: 6px;
  min-height: 48px;
}

.driver-chip {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 5px 7px;
  border-radius: 10px;
  border: 1px solid #d5e1f8;
  background: #fbfdff;
  cursor: grab;
}

.driver-chip:hover {
  background: #f0f6ff;
}

.driver-chip.empty-slot {
  cursor: pointer;
  background: #f6f8fd;
  border-style: dashed;
}

.driver-chip.empty-slot:hover {
  background: #f6f8fd;
}

.empty-slot-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #cad5eb;
  display: inline-block;
}

.empty-slot-text {
  font-size: 14px;
  color: #7a8ead;
  font-weight: 600;
}

.driver-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #c7d7f4;
}

.driver-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
}

.chip-remove {
  margin-left: auto;
  border: 0;
  background: transparent;
  color: #6f7da0;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.chip-remove:hover {
  color: #223250;
}

.empty-message {
  margin: 6px 0 0;
  font-size: 12px;
  color: #7082a8;
  font-style: italic;
}

.open-car-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(21, 33, 53, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 12px;
}

.open-car-modal {
  width: min(520px, 94vw);
  max-height: 80vh;
  background: #fff;
  border: 1px solid var(--stroke);
  border-radius: 12px;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

.open-car-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--stroke);
  padding: 10px 12px;
}

.open-car-modal-title {
  margin: 0;
  font-size: 16px;
}

.open-car-close {
  border: 0;
  background: transparent;
  color: #6f7da0;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}

.open-car-list {
  display: grid;
  gap: 8px;
  padding: 12px;
  max-height: calc(80vh - 52px);
  overflow: auto;
}

.open-car-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  text-align: left;
  border: 1px solid #d5e1f8;
  border-radius: 10px;
  background: #fbfdff;
  padding: 6px 8px;
  cursor: pointer;
}

.open-car-option:hover {
  background: #eef4ff;
}

@media (max-width: 1020px) {
  .board-layout {
    grid-template-columns: 1fr;
  }

  .free-agents {
    order: 2;
  }
}
</style>
