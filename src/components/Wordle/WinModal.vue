<template>
  <div class="win-modal-backdrop">
    <div class="win-modal">
      <header class="win-modal-header">
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
      <div class="win-modal-body">
          <b>{{ getMessage }}</b>
          <br><br>
          {{ getDriverKey }}
          <br><br>
          Play Again?
      </div>
      <div>
          <v-btn
          class="yes-btn"
          @click="this.$emit('replay')"
          dark
        >
          Yes
        </v-btn>
        <v-btn
          class="no-btn"
          @click="close"
          dark
        >
          No
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    data () {
      return {
      answerKey: {
          'apron':'An apron is a paved or concrete area between the racing surface and the pit road on oval tracks.',
          'arrow':'ARROW Electronics is a sponsor and part team owner of the Arrow McLaren Racing Team.',
          'askew':'Oliver Askew is a former IndyNXT champion and current free agent in the IndyCar series.',
          'bobby':'Pick your favorite, Bobby Unser and Bobby Rahal have both won the Indy 500 at least once.',
          'boles':'Doug Boles is the beloved track president of the Indianapolis Motor Speedway.',
          'brack':'Kenny Brack is a former Swedish Indycar driver and the last Indy 500 Champion for AJ Foyt Racing.',
          'brake':'A brake is a mechanical device that is used for slowing or stopping a racecar.',
          'bruno':'Bruno Junqueira is a former Brazilian IndyCar/Champ Car driver who last raced in 2012',
          'buddy':'Both Buddy Lazier and Buddy Rice won the Indy 500 during the IRL era.',
          'buick':'Buick made powerful engines for IndyCar racing for many years, winning a pole at Indy but never the big race.',
          'champ':'Champ is a term that is short for Champion, and Champ Car was the open wheel series opposing the IRL before the merger.',
          'chevy':'Short for Chevrolet, Chevy is a current IndyCar manufacture who has won many Indy 500s and Championships.',
          'clark':'Jim Clark is a two-time Formula One world champion from Scotland and the 1965 Indy 500 Champion',
          'cogan':'Kevin Cogan was a talented IndyCar driver during the 1980s who last raced in 1993.',
          'conor':'Conor Daly is a popular American driver who has raced in the IndyCar series since 2013 and occasionally races in NASCAR.',
          'coyne':'Dale Coyne is a former IndyCar driver, but better known as the current team owner Dale Coyne Racing.',
          'danny':'Danny Sullivan is a former IndyCar driver and the winner of the 1985 Indy 500.',
          'dario':'Dario Franchitti is a former Scottish IndyCar driver with multiple championships and Indy 500 wins.',
          'davey':'Davey Hamilton is a former IndyCar driver and current IndyCar Radio broadcaster.',
          'delta':'Delta is a term used to describe the time difference between two different laps or two different cars.',
          'dixon':'Scott Dixon is a current IndyCar driver who has six championships and an Indy 500 win.',
          'eagle':'The Eagle cars were championship and Indy 500 winning IndyCars made famous by Dan Gurney and the All American Racers.',
          'eddie':'Eddie Cheever Jr is a former IndyCar driver and winner of the 1998 Indy 500.',
          'felix':'Felix Rosenqvist is a current IndyCar driver who drives for Meyer Shank Racing.',
          'field':'Field is the term often used to refer to all of the cars competing in an event.',
          'gabby':'Gabby Chaves is a former IndyCar driver who currently competes in the IMSA Weathertech Series',
          'garza':'Josele Garza is a former IndyCar driver from Mexico and 1981 Indy 500 Rookie of the Year.',
          'geoff':'Geoff Brabham is a former IndyCar driver and son of Jack Brabham.',
          'gordy':'Gordy is the nickname of Two-Time Indy 500 Champion Gordon Johncock.',
          'greco':'Marco Greco is a former IndyCar driver from Brazil who raced in the 1990s.',
          'groff':'Mike Groff is the 1989 Indy Lights champion who had a 10 year IndyCar career during the 1990s.',
          'helio':'Helio Castroneves is the most recent 4 time Indy 500 Champion, now part owner of Meyer Shank Racing.',
          'herta':'Bryan and Colton Herta are a talented father/son duo, both who have won races in the IndyCar series.',
          'hinch':'James Hinchcliffe, often referred to as Hinch, is a former IndyCar driver and current commentator for NBC.',
          'hogan':'Carl Hogan was a businessman and IndyCar owner for several years during the 1990s.',
          'honda':'Honda is a current IndyCar manufacture who has won many Indy 500s and Championships.',
          'howdy':'Howdy Holmes is a former IndyCar driver during the 70s and 80s and active business sponsor of Chip Ganassi Racing.',
          'huski':'Huski Chocolote is a Swedish company that are most known for sponsoring Marcus Ericsson when he won the 2022 Indy 500.',
          'hyvee':'Hy-Vee is a Midwest grocery chain and sponsor for RLL and Iowa Speedway.',
          'ilott':'Callum Ilott is a current IndyCar free agent, most recently driving for Juncos Hollinger Racing',
          'jimmy':'Jimmy Bryan is the 1958 Indy 500 Champion and Jimmy Vasser is a former IndyCar Champion and team owner.',
          'jones':'There have been several IndyCar drivers with the last name Jones, none more famous than the great Parnelli Jones.',
          'josef':'Josef Newgarden is the defending Indy 500 champion and multi-time IndyCar champion.',
          'jules':'Jules Goux is the winner of the 1913 Indy 500 known for drinking champagne during the race.',
          'karam':'Sage Karam is a former IndyCar driver and current NASCAR Xfinity driver.',
          'legge':'Katherine Legge has been an IndyCar driver off and on since 2006 and a successful IMSA Sportscar driver.',
          'leigh':'Leigh Diffey is the current lead broadcaster for IndyCar on NBC.',
          'leist':'Matheus Leist is a former IndyCar driver from Brazil who last raced in 2019 for AJ Foyt Racing.',
          'linus':'Linus Lundqvist is the 2022 IndyNXT Champion who will be starting his rookie season with CGR this season.',
          'loose':'Loose is a term when the rear of the car is unstable because of a lack of rear-tire grip.',
          'lotus':'Lotus is a car manufacture that has raced in the IndyCar series and won the 1965 Indy 500.',
          'march':'March Engineering was an IndyCar chassis supplier during the 80s and 90s.',
          'marco':'Marco Andretti of the famous Andretti family is a multi-time IndyCar winner and Indy 500 polesitter.',
          'mario':'Considered by some to be the greatest driver ever, Mario Andretti is a decorated fomer IndyCar, F1, and NASCAR driver.',
          'matos':'Raphael Matos is the 2008 Indy Lights champion and former IndyCar driver from Brazil.',
          'mauri':'Mauri Rose is a three-time Indy 500 champion who competed from the 30s to the 50s.',
          'mears':'Rick Mears is a three-time IndyCar champion and four-time Indy 500 Champion who retired in 1992.',
          'meira': 'Vitor Meira is a Brazilian racing driver known for his consistency and speed in IndyCar racing.',
          'meyer': 'Louis Meyer was a renowned American racecar driver, three-time winner of the Indianapolis 500 in the 1920s and 1930s.',
          'milka': 'Milka Duno is a Venezuelan former professional racecar driver and aerospace engineer, known for her participation in the Indianapolis 500 and other major races.',
          'moore': 'Greg Moore was a Canadian racing driver who competed in the CART series and showed great promise before his untimely death in a racing accident.',
          'munoz': 'Carlos Munoz is a Colombian racing driver who has competed in the IndyCar Series, including the Indianapolis 500, with notable performances as a rookie.',
          'mutoh': 'Hideki Mutoh is a Japanese racing driver who has competed in various motorsport series, including the IndyCar Series and the Indianapolis 500.',
          'nigel': 'Nigel Mansell is a former Formula One World Champion who also competed in the CART series, known for his aggressive driving style.',
          'oriol': 'Oriol Servia is a Spanish racing driver with extensive experience in IndyCar racing, known for his versatility and adaptability.',
          'oward': 'Pato O\'Ward is a talented Mexican racing driver who races for the Arrow McLaren Racing team.',
          'palou': 'Alex Palou is a Spanish racing driver who has won two IndyCar championships in his young career.',
          'papis': 'Max Papis is an Italian racing driver known for his versatility in various motorsport disciplines, including IndyCar and sports car racing.',
          'pigot': 'Spencer Pigot is a former IndyNXT champion who last competed in IndyCar in the 2020 Indy 500.',
          'pippa': 'Pippa Mann is a British racing driver known for her participation in the Indianapolis 500 and advocacy for women in motorsports.',
          'posey': 'Sam Posey is a former racing driver turned motorsport commentator and journalist.',
          'power': 'Will Power is an Australian driver with two IndyCar championships, an Indy 500 championship, and the all-time pole record holder.',
          'rahal': 'Graham Rahal is an American racing driver, son of racing legend Bobby Rahal, with multiple wins in the IndyCar Series.',
          'ratio': 'Gear Ratio is a critical aspect of racecar setup, determining the relationship between engine speed and wheel speed.',
          'renna': 'Tony Renna was a promising American racing driver whose career was tragically cut short in a testing accident.',
          'ribbs': 'Willy T. Ribbs is a trailblazing African American racing driver who competed in various motorsport series, including IndyCar and NASCAR.',
          'rinus': 'Rinus VeeKay is a young Dutch racing driver currently driving for Ed Carpenter Racing.',
          'robby': 'Robby Gordon is a versatile American racing driver who has competed in various motorsport disciplines, including IndyCar, NASCAR, and off-road racing.',
          'robin': 'Robin Miller was a respected motorsport journalist and commentator known for his candid reporting and deep knowledge of the sport.',
          'roger': 'Roger Penske is a legendary team owner and businessman, founder of Team Penske, one of the most successful teams in motorsport history.',
          'rossi': 'Alexander Rossi is an American racing driver who competed in F1 and  winner of the 100th running of the Indianapolis 500 as a rookie.',
          'rufus': 'Rufus Parnell "Parnelli" Jones is an American former racing driver who won the Indianapolis 500 in 1963 and was a dominant force in motorsports during the 1960s.',
          'sachs': 'Eddie Sachs, the Clown Prince of Motorsports, was a popular American racing driver who tragically lost his life in in the 1964 race.',
          'safer': 'SAFER Barrier is a steel and foam energy reduction barrier used in motorsport to enhance safety by absorbing impact energy in crashes.',
          'sarah': 'Sarah Fisher is a former racing driver and team owner, known for her participation in the IndyCar Series and work with young talent.',
          'scrub': 'Tire Scrubbing is a technique used to heat up tires before a race or qualifying session, optimizing grip and performance.',
          'scuff': 'Scuffed Tires are tires that have been lightly worn or abraded to improve grip and performance, commonly used in racing.',
          'setup': 'Racecar Setup is the configuration of various components and parameters of a racecar, including suspension, aerodynamics, and tire pressures, tailored to suit specific track conditions and driver preferences.',
          'shank': 'Michael Shank is a motorsport team owner and former racing driver, founder of Meyer Shank Racing.',
          'sharp': 'Scott Sharp is a former racing driver who competed in various motorsport series, including the IndyCar Series and sports car racing.',
          'shunt': 'Racing Shunt is a slang term for a crash or collision in motorsport, often resulting in significant damage to the vehicles involved.',
          'simon': 'Simon Pagenaud is a French racing driver and who won an IndyCar Championship and the 2019 Indy 500.',
          'sneva': 'Tom Sneva is a former racing driver known for his success in the Indianapolis 500, including a win in 1983.',
          'speed': 'Speed is defined as the rate at which someone or something is able to move or operate.',
          'stint': 'Driving Stint is the period of time a driver spends behind the wheel during a race before pitting for fuel, tires, or driver changes.',
          'swede': 'Swede Savage was a talented American IndyCar driver who tragically lost his life after a crash in the 1973 Indy 500.',
          'texas': 'Texas Motor Speedway is a 1.5-mile oval racetrack located in Fort Worth, Texas, known for hosting IndyCar and NASCAR races.',
          'tight': 'Tight Handling is a condition where a racecar tends to understeer, making it difficult to turn, often caused by excessive front-end grip or lack of rear-end stability.',
          'tires': 'Race Tires are specially designed tires used in motorsport, optimized for performance, durability, and grip under extreme conditions.',
          'tomas': 'Tomas Scheckter is a South African racing driver known for his aggressive driving style and performances in the IndyCar Series.',
          'track': 'Race Track is the circuit or course where motorsport events take place, featuring various turns, straights, and elevation changes.',
          'tracy': 'Paul Tracy is a Canadian racing driver and former IndyCar Series champion known for his aggressive driving style.',
          'turbo': 'Turbocharger is a device used in racecar engines to increase power'
          }
      }
    },
    props: {
      answer: String,
      didWin: Boolean
    },
    methods: {
      close() {
        this.$emit('close')
      },
      submit() {
        this.$emit('submit', this.driverRemove)
      }
    },
    computed: {
      getDriverKey(){
        return this.answerKey[this.answer.toLowerCase()]
      },
      getMessage(){
        let message = 'HELLO' + this.didWin
        if(this.didWin) {
          message = `Congrats, you guessed ${this.answer}`
        }
        else {
          message = `Sorry, the answer was ${this.answer}`
        }
        return message
      }
    }
  }
</script>

<style>
  .win-modal-backdrop {
    padding-top:20px;
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
  .win-modal {
    color: rgba(32, 32, 32, 0.68) !important;
    background-color: whitesmoke;
    box-shadow: 2px 1px 1px 1px !important;
    display: inline-flex;
    flex-direction: column;
    max-height: 90% !important;
    max-width: 92% !important;
  }
  .fa-xmark {
    color: #333333 !important;
    font-size: calc(12px + 1.1vw) !important;
    padding-right:5px;
  }
  .fa-xmark:hover {
    color: rgb(146, 146, 146) !important;
  }
  .win-modal-header {
    padding-left: 10px;
    padding-top: calc(5px + .5vw);
    height: 45px;
    display: flex;
    position: relative;
    border-bottom: 1px solid #000000;
    background-color: #1867c0;
    color: whitesmoke;
    justify-content: space-between;
    font-size: calc(18px + .2vw);
    max-width: 100%;
  }

  .win-modal-body {
    position: relative;
    padding: 10px 10px;
    margin: 20px 10px;
    color: black !important;
    width: calc(200px + 25vw);
    overflow-y:auto;
    font-size: 20px;
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
  .silly-img {
    height: 100%;
    border-radius: 8px;
}
.yes-btn {
  margin: 30px;
  height: 60px;
  width: 90px;
  background-color: #288eec;
  box-shadow: -3px 5px 8px #6599ca;
  font-weight: bold;
  color: whitesmoke !important;
}
.yes-btn:hover {
  background-color: #2c75b8;
  box-shadow: -4px 6px 10px #6599ca;
}
.no-btn {
  margin: 30px;
  height: 60px;
  width: 90px;
  background-color: #313132;
  box-shadow: -3px 5px 8px #6599ca;
  font-weight: bold;
  color: whitesmoke !important;
}
.no-btn:hover {
  background-color: #616161;
  box-shadow: -4px 6px 10px #6599ca;
}
</style>