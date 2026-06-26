<template>
  <div class="results-backdrop">
    <div class="results-main">
      <header class="results-header">
        My Top 3 Results: Pick One
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
        <font-awesome-icon icon="fa-solid fa-xmark " />
        </button>
      </header>
      <div class="results-body">
        <div class="top-section">
          <div class="rank">1</div>
          <div class="driver-section" @click="submit(threeDrivers[0].Name)">
            <img
            :src="threeDrivers[0]['biopic']"
            :title="threeDrivers.picref"
              contain
              class="bio-img-results">
            <div class="driver-info">
              <div class="float-container2">
                <div class="driver-number">
                  <img
                  :src="threeDrivers[0]['picnum']"
                  contain
                  class="num-img-results">
                </div>
                <div class="team-results">
                  <img
                  :src="threeDrivers[0]['teampic']"
                  contain
                  class="team-img-results">
                </div>
              </div>
              <div class="name-results">{{ this.threeDrivers[0]["Name"] }}</div>
            </div>
         </div>
        </div>
        <div class="top-section">
          <div class="rank">2</div>
          <div class="driver-section" @click="submit(threeDrivers[1].Name)">
            <img
            :src="threeDrivers[1]['biopic']"
              contain
              class="bio-img-results">
            <div class="driver-info">
              <div class="float-container2">
                <div class="driver-number">
                  <img
                  :src="threeDrivers[1]['picnum']"
                  contain
                  class="num-img-results">
                </div>
                <div class="team-results">
                  <img
                  :src="threeDrivers[1]['teampic']"
                  contain
                  class="team-img-results">
                </div>
              </div>
              <div class="name-results">{{ this.threeDrivers[1]["Name"] }}</div>
            </div>
         </div>
        </div>
        <div class="top-section">
          <div class="rank">3</div>
          <div class="driver-section" @click="submit(threeDrivers[2].Name)">
            <img
            :src="threeDrivers[2]['biopic']"
              contain
              class="bio-img-results">
            <div class="driver-info">
              <div class="float-container2">
                <div class="driver-number">
                  <img
                  :src="threeDrivers[2]['picnum']"
                  contain
                  class="num-img-results">
                </div>
                <div class="team-results">
                  <img
                  :src="threeDrivers[2]['teampic']"
                  contain
                  class="team-img-results">
                </div>
              </div>
              <div class="name-results">{{ this.threeDrivers[2]["Name"] }}</div>
            </div>
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Results',
    data: () => ({
      driverBiosOne: []

    }),
    props: {
      threeDrivers: Object
    },
    computed: {
    },
    methods: {
      close() {
        this.$emit('close')
      },
      submit(driverName) {
        this.$emit('end', driverName)
      }
  }
  }
</script>

<style>
  .results-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .results-main {
    background: #ffffff !important;
    color: var(--color-text);
    box-shadow: 0 4px 18px rgba(12, 24, 60, 0.18), 0 1px 3px rgba(12, 24, 60, 0.1);
    display: flex;
    flex-direction: column;
    max-height: 95%;
    margin-top: calc(20px + 4vw);
    border-radius: 8px;
    overflow: hidden;
  }

  .results-header {
    padding: 10px 15px;
    background: #162844;
    height: calc(40px + 1vw);
    position: relative;
    border-bottom: 1px solid #253f66;
    color: #eef4ff;
    justify-content: space-between;
    align-items: center;
    display: flex;
    font-size: calc(11px + 1.2vw);
    font-weight: 700;
    width: calc(250px + 33vw);
  }
  .fa-xmark {
    color: #a0c4f7 !important;
    font-size: calc(8px + 1.5vw);
    padding-right: 5px;
    cursor: pointer;
    transition: color 0.2s;
  }
  .fa-xmark:hover {
    color: #ffffff !important;
  }

  .results-body {
    background: #ffffff !important;
    position: relative;
    padding: 15px 10px;
    width: calc(240px + 33vw);
    color: var(--color-text);
    overflow-y: auto;
  }
  .float-container2 {
    display:inline-flex;
}
.driver-number{
  padding-right: 0px;
  text-align: center;

}
.driver-info {
  font-size: calc(12px + 1.5vw);
  text-align: center;
}
  .name-results {
    font-size: calc(9px + 1.3vw);
    text-align: center;
    white-space: nowrap;
    font-weight: 700;
    color: var(--color-text);
    padding-bottom: 8px;
  }
  .team-results{
    font-size: calc(6px + .7vw);
    text-align: center;
    width: calc(80px + 5vw);
    display: flex;
  }
  .bio-img-results {
    height: calc(45px + 6.7vw);
    float: left;
    padding-right: 1px;
  }
  .num-img-results {
    padding-top: 2px;
    padding-right: 2px;
    height: calc(12px + 3vw);
    text-align: center;
  }
  .team-img-results {
    padding-top: 1px;
    height: calc(25px + 3vw);
  }
  .top-section {
    position: relative;
    overflow-y: auto;
    text-align: left;
    color: var(--color-text);
    background: transparent;
    width: calc(210px + 28vw);
    margin-bottom: 12px;
    display: flex;
    align-items: stretch;
    gap: 12px;
  }
  .rank {
    float: none;
    background: linear-gradient(135deg, #162844, #1f3a5a);
    color: #ffbe3d;
    font-size: calc(11px + 2vw);
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    padding: 0 calc(10px + 1vw);
    border-radius: 6px;
    margin-right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: calc(60px + 2vw);
  }
  .driver-section {
    position: relative;
    overflow-y: auto;
    text-align: left;
    color: var(--color-text);
    background: linear-gradient(to bottom, #f8fbff, #edf3fc);
    border: 1px solid #d4e1f5;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(12, 24, 60, 0.08);
    flex: 1;
    transition: all 0.2s;
  }
  .driver-section:hover {
    border-color: #ffbe3d;
    box-shadow: 0 4px 16px rgba(255, 190, 61, 0.15);
    cursor: pointer;
  }
  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 5px 10px;
    cursor: pointer;
    font-weight: bold;
    color: whitesmoke;
    background: transparent;
    
  }
  .btn-close:hover {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 5px 10px;
    cursor: pointer;
    font-weight: bold;
    color: rgb(192, 192, 192);
    background: transparent;
    
  }
  .btn-primary {
    color: black;
    border: 2px solid;
    border-radius: 4px;
    padding: 0px 20px;
    font-size: 15px;
    background-color: whitesmoke;
  }
</style>