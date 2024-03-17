<template>
    <div class="silly-modal-backdrop">
      <div class="silly-modal">
        <header class="silly-modal-header">
          <slot name="header">
           Pick a driver for {{ teamName }}
          </slot>
          <div>
          <button
            type="button"
            class="btn-close"
            @click="close"
          >
          <font-awesome-icon icon="fa-solid fa-xmark"/>
          </button>
        </div>
        </header>
        <div class="silly-modal-body">
        <section class="drop-zone-fa">
          <slot name="body">
            <div v-for="item in drivers" 
              :key="item.id"
              :title="item.name"
              class="drag-el-silly"
            >
              <div>
                <div class="img-main-modal">
                <img
                :src="item.pic"
                  contain
                  class="silly-img-modal"
                  @click="addDriver(item)">
                  {{ item.name[0] }}. {{ item.name.split(" ")[1]}}
                </div>
              </div>
            </div>
            <div class="drag-el-silly-add">
              <div class="img-main-modal">
                <img
                src='@/assets/SillyPhotos/Nobody.jpeg'
                  contain
                  class="silly-img-modal"
                  @load="onImgLoad"
                  @click="newDriver"/>
                  Add Driver
                </div>
            </div>
            
          </slot>
         </section>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      name: 'Modal',
      data: () => ({
        questionNumber: 0
      }),
      props: {
        drivers: Object,
        questionNumber: Number,
        radioGroup: Number,
        team: String,
        teamName: String
      },
      computed: {
      choices() {
        // `this` points to the component instance
        return this.questions[[this.questionNumber]]["answers"]
        }
      },
      methods: {
        newDriver() {
          const driverName = prompt("Enter a New Driver Name")
          this.$emit('addNewDriver', driverName)
        },
        close() {
          this.$emit('close')
          
        },
        addDriver(driver){
          const confirmed = confirm(`Are you sure you wanna add ${driver['name']} to ${this.teamName}`)
          if (confirmed){
            driver['team'] = this.team
            this.$emit('close')
          }
          
        },
        submit(value) {
          if(value===null){
            alert("You must choose an answer to continue")
          }
            
          const answers = this.questions[this.questionNumber]["answerKey"][value]
          const title = this.questions[this.questionNumber]["title"]
  
          this.driverData.forEach(driver => {
            if (answers.includes(driver[title])){
  
              
              driver["points"] = (title === "age") ? driver["points"] + 2 : driver["points"] + 1
            }
            
            
          });
  
          if(title==="fulltime"){
            this.driverData.sort((a, b) => {
                return b.points - a.points})
  
            }
          
          if(this.questionNumber + 1 === this.questions.length){
            const threeDrivers = this.driverData.slice(0, 3)
            this.$emit('end', threeDrivers)
          }
          else {
            this.questionNumber += 1
          }
          this.radioGroup = null
        },
        skip() {
          this.questionNumber += 1
          this.radioGroup = null
        }
      }
    }
  </script>
  
  <style>
    .silly-modal-backdrop {
      padding-top:calc(40px + 1.5vw) ;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(97, 116, 141, 0.694) !important;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .silly-modal {
      color: rgba(32, 32, 32, 0.68) !important;
      background-color: #a5a5a5;
      box-shadow: 6px 2px 4px 4px !important;
      display: inline-flex;
      flex-direction: column;
      max-height: 90% !important;
      max-width: 92% !important;
    }
    .fa-xmark {
      color: #333333 !important;
      font-size: calc(13px + 1.5vw) !important;
      padding-right:5px;
    }
    .fa-xmark:hover {
      color: rgb(146, 146, 146) !important;
    }
    .silly-modal-header {
      padding-left: 10px;
      padding-top: calc(5px + .5vw);
      height: 45px;
      display: flex;
      position: relative;
      border-bottom: 1px solid #000000;
      background-color: #1867c0;
      color: white;
      justify-content: space-between;
      font-size: calc(13px + .5vw);
      max-width: 100%;
    }
  
    .silly-modal-body {
      position: relative;
      padding: 10px 10px;
      color: rgb(233, 233, 233) !important;
      min-width: calc(200px + 25vw);
      overflow-y:auto;
    }
  
  
    .btn-close {
      position: absolute;
      top: 0;
      right: 0;
      border: none;
      font-size: calc(13px + 1vw);
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
    .drop-zone-fa {
      width: 98%;
      font-size: 15px;
      text-align: center;
      min-height: 790px;
      padding: 3px;
      background-color: #ffbb00;
      margin-bottom: 20px;
      display: flexbox;
      float: center;
      border-top: 1px solid #2e2e2e;
      border-right: 3px solid #2e2e2e;
      border-left: 1px solid #2e2e2e;
      border-bottom: 3px solid #2e2e2e;
      border-radius: 9px;
      box-shadow: 5px 5px 5px #616161;
    }
    .drag-el-silly {
      height: calc(85px + 1.5vw);
      padding-bottom: 17px;
      background-color: black;
      margin-top: 2px;
      margin-bottom: 9px;
      margin-left: 8px;
      margin-right: 8px;
      align-items: left;
      float: center;
      display: inline-flex;
      border: 1px solid #000000;
      border-radius: 3px;
      box-shadow: 1px 1px 2px #000000;
      font-family: Tahoma;
      font-size: 12px;
    }
    .drag-el-silly-add {
      height: calc(85px + 1.5vw);
      padding-bottom: 17px;
      background-color: black;
      margin-top: 2px;
      margin-bottom: 9px;
      margin-left: 8px;
      margin-right: 8px;
      align-items: left;
      float: center;
      display: inline-flex;
      border: 1px solid #000000;
      border-radius: 3px;
      box-shadow: 1px 1px 2px #000000;
      font-family: Tahoma;
      font-size: 12px;
    }
    .img-main-modal{
      background-color: black;
      color: whitesmoke;
      display: inline-flex;
      flex-direction: column;
      font-family: Verdana;
      font-weight: 500;
      font-size: 13px;
    }
    .silly-img-modal {
      border-radius: 3px;
      height: calc(75px + .8vw);
      cursor: pointer !important;
  }
  .bottom-text {
  position: relative;
  margin-top: 10px;
  bottom: 20px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  background-color: black;
  }
  </style>