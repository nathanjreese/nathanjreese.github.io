<template>
  <div class="select-modal-backdrop">
    <div class="select-modal">
      <header class="select-modal-header">
        <div class="header-text">
         Question {{ questionNumber + 1 }} of {{ questions.length }}
        </div>
        <button @click="$emit('close')">
        <font-awesome-icon icon="fa-solid fa-xmark"/>
        </button>
      </header>
      
      <section class="select-modal-body">
        <slot name="body">
          <div class="select-modal-question">
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
            <div class="importance-class">
            How Important is this to you?
            </div>
          </v-container>
          <Btn @click="submit(radioGroup, 2)">Very</Btn>
          <Btn @click="submit(radioGroup, 1)">Somewhat</Btn>
          <Btn @click="submit(0, 0)" button-type="secondary">Not at all</Btn>
        </slot>
      </section>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/Partials/Btn'

  export default {
    components: {
      Btn
    },
    name: 'Modal',
    data () {
    return {
      radioGroup: [],
      questionNumber: this.numberQuestion,
      questions: [
      {
        "title": "manufacturer",
          "question": "Do you have a manufacturer preference?",
          "answers": ['Chevy', 'Honda'],
          "answerKey": {
          0: ['Chevy'],
          1: ['Honda']
          },
        },
        {
          "title": "age",
          "question": "What age range are you looking for in a driver?",
          "answers": ['Young Gun (18-25)', 'Just hitting their stride (26-34)', 'Not old, just experienced (35 and over)'],
          "answerKey": {
          0: [2006,2005,2004,2003,2002,2001,2000,1999],
          1: [1998,1997,1996,1995,1994,1993,1992,1991,1990],
          2: [1989,1988,1987,1986,1985,1984,1983,1982,1981,1980,1979,1978,1977,1976,1975,1974]
          },
        },
        {
          "title": "team",
          "question": "What are you looking for in a race team?",
          "answers": ['Front Runner', 'Next Best Thing', 'Solid', 'Underdog'],
          "answerKey": {
          0: ['Front Runner'],
          1: ['Next Best Thing'],
          2: ['Solid'],
          3: ['Underdog']
          },
        },
        {
          "title": "success",
          "question": "What kind of past success are you looking for in a driver?",
          "answers": ['Past Champion', 'Race Winner', 'Searching for first win', 'Rookie'],
          "answerKey": {
          0: ['champion'],
          1: ['winner'],
          2: ['no wins'],
          3: ['rookie']
          },
        },
        {
          "title": "nationality",
          "question": "Do you have a Nationality preference?",
          "answers": ['USA', 'North or South America (excluding USA)', 'Europe','Other'],
          "answerKey": {
            0: ["USA","USA/Brazil"],
            1: ["Canada","Mexico","Cayman Islands","Brazil"],
            2: ["Denmark","France","Sweden","Spain","Netherlands","United Kingdom","Switzerland","Denmark"],
            3: ["Australia","New Zealand","Israel"]
          },
        },
        // {
        //   "title": "livery",
        //   "question": "Do you like a car with consistent liveries or do you like a variety?",
        //   "answers": ['Consistent', 'Variety'],
        //   "answerKey": {
        //   0: ['same'],
        //   1: ['different']
        //   },
        // },
        {
          "title": "crossover",
          "question": "Do you prefer drivers who race in other series?",
          "answers": ['Yes, sportscar', 'Yes, NASCAR', 'Yes, dirt racing', 'I only care about IndyCar'],
          "answerKey": {
            0: ["sportscar"],
            1: ["nascar"],
            2: ["dirt"],
            3: ['none']
          },
        },
        {
          "title": "aggressiveness",
          "question": "How much aggressiveness do you prefer in your driver?",
          "answers": ['Send it every time', 'Occasionaly aggressive','Patience is a virtue'],
          "answerKey": {
          0: [3],
          1: [2],
          2: [1]
        },
        },
        {
          "title": "personality",
          "question": "What kind of off track personality to you like?",
          "answers": ['Feisty', 'Laid Back', 'Friendly'],
          "answerKey": {
          0: ['feisty'],
          1: ['laid back'],
          2: ['friendly']
        },
        },
        {
          "title": "social",
          "question": "How big of a social media presence would you like your driver to have?",
          "answers": ['Social Media Influencer','Kind of a Big Deal', 'Respectable Following',`I don't care about social media anyway`],
          "answerKey": {
          0: [1000000,1000000000],
          1: [200000,999999],
          2: [60000,199999],
          3: [0,59999]
          }
        },
        {
          "title": "content",
          "question": "How do you feel about driver content? (videos, podcasts, twitch streams, etc)",
          "answers": ['I love driver produced content','Just focus on racing'],
          "answerKey": {
          0: ["yes"],
          1: ["no"]
          }
        },
        // {
        //   "title": "fulltime",
        //   "question": "How do you feel about part time drivers?",
        //   "answers": ['I wanna cheer for them every race','Part time is cool too'],
        //   "answerKey": {
        //   0: ["yes"],
        //   1: ["no"]
        // }
        // }
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
      submit(value, points) {
        if(value===null && points > 0){
          alert("You must choose an answer to continue")
        }
          
        const answers = this.questions[this.questionNumber]["answerKey"][value]
        const title = this.questions[this.questionNumber]["title"]
        
        this.driverData.forEach(driver => {
          console.log("ANSWERS: ", answers)
          console.log("DDDD: ", driver[title])
          if (title === 'social'){
            if (driver[title] > answers[0] && driver[title] < answers[1]){
            driver["points"] += points
          }
          }
          else if (title === 'crossover'){
            if (driver[title].includes(answers[0])){
              console.log("DRIVER: ", driver.name)

            driver["points"] += points
          }
          }
          else if (answers.includes(driver[title])){
            console.log("NAME: ", driver.name)
            console.log(this.driverData)
            driver["points"] += points
          }
          
          
        });

        if(title==="content"){
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
  .select-modal-backdrop {
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

  .select-modal {
    background: #FFFFFF;
    min-height: 400px;
    width: calc(380px + 17vw) !important;
    box-shadow: 2px 2px 20px 1px;
    display: inline-flex;
    flex-direction: column;
    max-height: 90%;
  }

  .select-modal-footer {
    padding: 15px;
    display: flex;
  }

  .select-modal-header {
    padding-left: 10px;
    height: 45px;
    display: flex;
    position: relative;
    border-bottom: 1px solid #000000;
    background-color: #1867c0;
    color: white;
    justify-content: space-between;
    font-size: calc(13px + .5vw);

    .header-text{
      padding-top: 10px;
    }

    .fa-xmark {
    color: lightgray !important;
    font-size: calc(10px + 1vw) !important;
    float: right;
  }
  .fa-xmark:hover {
    color: rgb(119, 119, 119) !important;
    cursor: pointer !important;
  }
  }

  .select-modal-body {
    position: relative;
    padding: 10px 10px;
    color: rgb(42, 42, 42);
    min-width: calc(200px + 25vw);
  }

  .select-modal-question {
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
    color: rgb(0, 0, 0);
  }
  .importance-class{
    font-size: calc(12px + .4vw);
    font-weight: bold;
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
  .btn-primary {
    color: black;
    border: 2px solid;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 15px;
    background-color: whitesmoke;
    width: calc(80px + 3vw);
    font-weight: bold;
  }
  .v-btn-submit {
    margin: 20px 10px !important;
    color: whitesmoke !important;
    background: #288eec;
    width: calc(80px + 3vw);
    font-size: calc(8px + .5vw);
    font-weight: bold;
    height: calc(30px + 1vw) !important;
  }
  .v-btn-skip {
    margin: 20px 10px;
    width: calc(80px + 3vw);
    font-weight: bold;
    font-size: calc(8px + .5vw);
    height: calc(30px + 1vw) !important;
  }
</style>