<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
         Question {{ questionNumber + 1 }} of {{ questions.length }}
        </slot>
        <button @click="$emit('close')">
        <font-awesome-icon icon="fa-solid fa-xmark"/>
        </button>
      </header>
      
      <section class="modal-body">
        <slot name="body">
          <div class="modal-question">
            {{questions[questionNumber]["question"]}}
          </div>
          <v-container fluid>
            <v-radio-group v-model="radioGroup">
              <div class="radio"
                v-for="(option,index) in choices" :key="option">
                <v-radio 
                :label="option" 
                :value="index"></v-radio>
            </div>
          </v-radio-group>
            
          </v-container>
          <!-- <v-btn
            class="v-btn"
            @click="submit(radioGroup)"
            color="primary"
            dark
          >
            Skip
          </v-btn>
          <v-btn
            class="v-btn"
            @click="submit(radioGroup)"
            color="primary"
            dark
          >
            Submit
          </v-btn> -->
          <v-btn
            class="v-btn"
            @click="submit(radioGroup)"
            color="primary"
            dark
          >
            Submit
          </v-btn>
        </slot>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    data () {
    return {
      radioGroup: [],
      questionNumber: this.numberQuestion,
      questions: [
        {
          "title": "age",
          "question": "What age range are you looking for in a driver?",
          "answers": ['Young Gun (18-25)', 'Just hitting their stride (26-34)', 'Not old, just experienced (35 and over)',`No preference`],
          "answerKey": {
          0: [18,19,20,21,22,23,24,25],
          1: [26,27,28,29,30,31,32,33,34],
          2: [35,36,37,38,39,40,41,42,43,45,46,47,48,49,50],
          3: ['No preference']
          },
        },
        {
          "title": "team",
          "question": "What are you looking for in a race team?",
          "answers": ['Front Runners', 'Next Best Thing', 'Promising Future', 'Underdogs',`No preference`],
          "answerKey": {
          0: ['Front Runner'],
          1: ['Next Best Thing'],
          2: ['Promising Future'],
          3: ['Underdog'],
          4: ['No preference']
          },
        },
        {
        "title": "manufacturer",
          "question": "Do you have a manufacturer preference?",
          "answers": ['Chevy', 'Honda', `No preference`],
          "answerKey": {
          0: ['Chevy'],
          1: ['Honda'],
          2: ['No preference']
          },
        },
        {
          "title": "nationality",
          "question": "Do you prefer American Drivers?",
          "answers": ['Yes, I prefer to root for an American', 'No, I prefer international drivers',`No preference`],
          "answerKey": {
            0: ["USA","USA/Brazil"],
            1: ["Denmark","France","Canada","Mexico","Sweden","New Zealand","Spain","Japan","Netherlands","United Kingdom","Argentina","Brazil","Australia","Switzerland"],
            2: ['No preference']
          },
        },
        {
          "title": "livery",
          "question": "Do you like a car with consistent liveries or do you like a variety?",
          "answers": ['same', 'different','No Preference'],
          "answerKey": {
          0: ['same'],
          1: ['different'],
          2: ['No preference']
          },
        },
        {
          "title": "f1",
          "question": "What is your opinion on F1 drivers in IndyCar?",
          "answers": ['I like drivers with F1 experience.', 'I am not a fan of F1 drivers in IndyCar.',`No preference`],
          "answerKey": {
            0: ["yes"],
            1: ["no"],
            2: ['No preference']
          },
        },
        {
          "title": "aggressiveness",
          "question": "How much aggressiveness do you prefer in your driver?",
          "answers": ['Send it every time', 'Occasionaly aggressive','Patience is a virtue',`No preference`],
          "answerKey": {
          0: [3],
          1: [2],
          2: [1],
          3: ['No preference']
        },
        },
        {
          "title": "personality",
          "question": "What kind of off track personality to you like?",
          "answers": ['Feisty', 'Laid Back', 'Friendly',`No preference`],
          "answerKey": {
          0: ['feisty'],
          1: ['laid back'],
          2: ['friendly'],
          3: ['No preference']
        },
        },
        {
          "title": "success",
          "question": "What kind of past success are you looking for in a driver?",
          "answers": ['Past Champion', 'Won Last Season', 'Last win over a year ago', 'Searching for first win', 'Rookie',`No preference`],
          "answerKey": {
          0: ['champion'],
          1: ['won last season'],
          2: ['last win over a year ago'],
          3: ['no wins'],
          4: ['rookie'],
          5: ['No preference']
          },
        },
        {
          "title": "social",
          "question": "How big of a social media presence would you like your driver to have?",
          "answers": ['Social Media Influencer','Kind of a Big Deal', 'Respectable Following',`There are drivers' pets with more followers`,`No preference`],
          "answerKey": {
          0: [1000000,1000000000],
          1: [200000,999999],
          2: [60000,199999],
          3: [0,59999],
          4: ['No preference']
          }
        },
        {
          "title": "content",
          "question": "How do you feel about driver content? (videos, podcasts, twitch streams, etc)",
          "answers": ['I love driver produced content','The actual races are the only content I care about', `No preference`],
          "answerKey": {
          0: ["yes"],
          1: ["no"],
          2: ['No preference']
          }
        },
        {
          "title": "fulltime",
          "question": "How do you feel about part time drivers?",
          "answers": ['I wanna cheer for them every race','Part time is cool too',`No preference`],
          "answerKey": {
          0: ["yes"],
          1: ["no"],
          2: ['No preference']
        }
        }
      ]
      }
    },
    props: {
      driverData: Object,
      numberQuestion: Number,
    },
    computed: {
      choices() {
        // `this` points to the component instance
        return this.questions[[this.questionNumber]]["answers"]
        },
    },
    methods: {
      close() {
        this.$emit('close')
        
      },
      submit(value) {
        if(value===null){
          alert("You must choose an answer to continue")
        }

          
        const answers = this.questions[this.questionNumber]["answerKey"][value]
        const title = this.questions[this.questionNumber]["title"]
        
        this.driverData.forEach(driver => {
          if (title === 'social'){
            if (driver[title] > answers[0] && driver[title] < answers[1]){
            driver["points"] += 1
          }
          }
          else if (answers.includes(driver[title])){
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
  .modal-backdrop {
    padding-top:20px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    min-height: 400px;
    max-width: 100%;
    box-shadow: 2px 2px 20px 1px;
    display: inline-flex;
    flex-direction: column;
    max-height: 90%;
  }
  .fa-xmark {
    padding-left: 0px;
    color: whitesmoke !important;
    font-size: calc(12px + 1vw) !important;
    margin-bottom: 300px;
    float: right;
  }
  .fa-xmark:hover {
    color: rgb(119, 119, 119) !important;
    cursor: pointer !important;
  }

  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    padding-left: 10px;
    padding-top: calc(2px + .5vw);
    height: 45px;
    display: flex;
    position: relative;
    border-bottom: 1px solid #000000;
    background-color: #1867c0;
    color: white;
    justify-content: space-between;
    font-size: calc(13px + .5vw);
  }

  .modal-body {
    position: relative;
    padding: 10px 10px;
    color: rgb(42, 42, 42);
    min-width: calc(200px + 25vw);
  }

  .modal-question {
    position: relative;
    padding: 0px 10px !important;
    padding-top: 10px !important;;
    color: rgb(30, 3, 3);
    font-size: calc(15px + .8vw) !important;
    font-weight: bold;
  }
  .radio {
    padding-bottom: calc(1px + .5vw) !important;
  }
  .radio .v-label {
    font-size: calc(12px + .4vw);
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

  .btn-green {
    color: white;
    background: #1a10a3;
    border: 1px solid #1a10a3;
    border-radius: 2px;
    padding: 10px 10px;
    width: 40%;
    justify-content: center;
    align-items: center;
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