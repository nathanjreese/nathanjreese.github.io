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
    background: #2f589f;
    color: black;
    box-shadow: 2px 2px 20px 1px;
    display: flex;
    flex-direction: column;
    max-height: 95%;
    margin-top: calc(20px + 4vw);
  }

  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .results-header {
    padding: 10px 15px;
    background: rgb(248, 248, 248);
    height: calc(40px + 1vw);
    position: relative;
    border-bottom: 3px solid #3c3c3c;
    color: #2f589f;
    justify-content: space-between;
    font-size: calc(11px + 1.2vw);
    font-weight: bold;
     width: calc(220px + 33vw);
  }
  .fa-xmark {
    color: whitesmoke !important;
    font-size: calc(8px + 1.5vw);
    padding-right:5px;
  }
  .fa-xmark:hover {
    color: rgb(99, 99, 99) !important;
  }
  .results-body {
    background: #2f589f;
    position: relative;
    padding: 15px 10px;
    width: calc(220px + 33vw);
    color: rgb(42, 42, 42);
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
  .name-results{
    font-size: calc(5px + 2vw);
    text-align: center;
    white-space: nowrap;
    font-weight: bold;

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
    position:relative;
    overflow-y: auto;
    text-align: left;
    color: black;
    background: #2f589f;
    width: calc(210px + 28vw);
  }
  .rank{
    float: left;
    background: #2f589f;
    color: whitesmoke;
    font-size: calc(11px + 2vw);
    text-shadow: 2px 2px black;
    padding: calc(30px + 2vw) calc(10px + 1vw);
  }
  .driver-section {
    position:relative;
    overflow-y: auto;
    text-align: left;
    color: black;
    background: whitesmoke;
    border: calc(8px) solid cornflowerblue;
    border-radius: 4px;
    outline-width: 20px;
    box-shadow: 0px 5px 15px 8px;
  }
  .driver-section:hover {
    border: 8px solid #ffbb00;
    box-shadow: -5px 15px 15px 8px;
    cursor: pointer
    

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