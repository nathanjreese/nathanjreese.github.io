<template>
  <div class="bio-backdrop">
    <div v-if="!this.isMobile" class="bio-main-desktop">
      <header class="bio-header-desktop">
        <button
          type="button"
          class="btn-close-desktop"
          @click="close"
        >
        <font-awesome-icon icon="fa-solid fa-xmark " />
      </button>
        <slot name="header">
          <div class="driver-intro1-desktop">My IndyCar driver is...</div>
        </slot>
      </header>
      <div class="modal-all-desktop">
        <div class="modal-top-desktop">
          <div class="float-container-desktop">
            <div class="driver-pic-desktop">
              <img
                :src="driverInfo['biopic']"
                contain
                class="bio-img-desktop"
                :title="driverInfo['picref']"
              >
            </div>
            <div>
              <img
                :src="driverInfo['picnum']"
                contain
                class="num-img-desktop">
                <img
                    :src="driverInfo['teampic']"
                    contain
                    class="team-img-bios-desktop">
              </div>
            <div class="driver-name-bios-desktop">
              {{ this.driverInfo["Name"] }}
            <div>
              
            </div>
          </div>
        </div>
        </div>
        <div class="modal-body-desktop"> 
          <div class="driver-bio-top-desktop">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                    <tr>
                    <td class="table-key-desktop">2023 Finish:</td><td class="table-value-desktop">{{ driverInfo["2023 Finish"] }}</td>
                    </tr>
                    <tr>
                    <td class="table-key-desktop">Team:</td><td class="table-value-desktop">{{ driverInfo["Team"] }}</td>
                    </tr>
                    <tr>
                    <td class="table-key-desktop">Country:</td><td class="table-value-desktop">{{ driverInfo["Country"] }}</td>
                    </tr>
                    <tr>
                    <td class="table-key-desktop">Birthdate:</td><td class="table-value-desktop">{{ driverInfo["Birthdate"] }}</td>
                    </tr>
                    <tr v-if="driverInfo.Championships !== '0'">
                    <td class="table-key-desktop">Championships:</td><td class="table-value-desktop">{{ driverInfo["Championships"] }}</td>
                    </tr>
                    <tr v-if="driverInfo.Indy500s !== '0'">
                    <td class="table-key-desktop">Indy 500 Wins:</td><td class="table-value-desktop">{{ driverInfo["Indy500s"] }}</td>
                    </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-simple-table class="summary-table-desktop">
              <template v-slot:default>
                <tbody class="summary-table-desktop">
                    <tr>
                    <div class="summary-desktop">{{ driverInfo["Summary"] }}</div>
                    </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </div>   
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                  <tr>
                  <td v-if="driverInfo.Twitter !== ''"  class="social-class-desktop" title="Twitter"><a :href="driverInfo.Twitter" target="_blank" class="social-link-desktop"><font-awesome-icon icon="fa-brands fa-twitter" /></a></td>
                  <td v-if="driverInfo.Instagram !== ''"  class="social-class-desktop" title="Instagram"><a :href="driverInfo.Instagram" target="_blank" class="social-link-desktop"><font-awesome-icon icon="fa-brands fa-instagram" /></a></td>
                  <td  v-if="driverInfo.Facebook !== ''" class="social-class-desktop" title="Facebook"><a :href="driverInfo.Facebook" target="_blank" class="social-link-desktop"><font-awesome-icon icon="fa-brands fa-facebook" /></a></td>
                  <td  v-if="driverInfo.Twitch !== ''" class="social-class-desktop" title="Twitch"><a :href="driverInfo.Twitch" target="_blank" class="social-link-desktop"><font-awesome-icon icon="fa-brands fa-twitch" /></a></td>
                  <td  v-if="driverInfo.Youtube !== ''" class="social-class-desktop" title="YouTube"><a :href="driverInfo.Youtube" target="_blank" class="social-link-desktop"><font-awesome-icon icon="fa-brands fa-youtube" /></a></td>
                  <td v-if="driverInfo.Shop !== ''" class="social-class-desktop" title="Shop for Driver Merch"><a :href="driverInfo.Shop" target="_blank" class="social-link-desktop"><font-awesome-icon icon="fa-solid fa-cart-shopping" /></a></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="twitter-share-desktop">
          <a :href=tweetText target="_blank">
            <v-btn
            class="btn-tweet-desktop"
              color="primary"
              dark
            >
              Tweet Results
            </v-btn>
          </a>
        </div>
      </div>
    </div>
    <div v-if="this.isMobile" class="bio-main-mobile">
      <header class="bio-header-mobile">
        <button
          type="button"
          class="btn-close-mobile"
          @click="close"
        >
        <font-awesome-icon icon="fa-solid fa-xmark " />
      </button>
        <slot name="header">
          <div class="driver-intro1-mobile">My IndyCar driver is...</div>
        </slot>
      </header>
      <div class="modal-all-mobile">
        <div class="modal-top-mobile">
          <div class="float-container-mobile">
            <div class="driver-pic-mobile">
              <img
                :src="driverInfo['biopic']"
                contain
                class="bio-img-mobile"
                :title="driverInfo['picref']"
              >
            </div>
            <div>
              <img
                :src="driverInfo['picnum']"
                contain
                class="num-img-mobile">
                <img
                    :src="driverInfo['teampic']"
                    contain
                    class="team-img-bios-mobile">
              </div>
            <div class="driver-name-bios-mobile">
              {{ this.driverInfo["Name"] }}
            <div>
              
            </div>
          </div>
        </div>
        </div>
        <div class="modal-body-mobile"> 
          <div class="driver-bio-top-mobile">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                    <tr>
                    <td class="table-key-mobile">2023 Finish:</td><td class="table-value-mobile">{{ driverInfo["2023 Finish"] }}</td>
                    </tr>
                    <tr>
                    <td class="table-key-mobile">Team:</td><td class="table-value-mobile">{{ driverInfo["Team"] }}</td>
                    </tr>
                    <tr>
                    <td class="table-key-mobile">Country:</td><td class="table-value-mobile">{{ driverInfo["Country"] }}</td>
                    </tr>
                    <tr>
                    <td class="table-key-mobile">Birthdate:</td><td class="table-value-mobile">{{ driverInfo["Birthdate"] }}</td>
                    </tr>
                    <tr v-if="driverInfo.Championships !== '0'">
                    <td class="table-key-mobile">Championships:</td><td class="table-value-mobile">{{ driverInfo["Championships"] }}</td>
                    </tr>
                    <tr v-if="driverInfo.Indy500s !== '0'">
                    <td class="table-key-mobile">Indy 500 Wins:</td><td class="table-value-mobile">{{ driverInfo["Indy500s"] }}</td>
                    </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-simple-table class="summary-table-mobile">
              <template v-slot:default>
                <tbody class="summary-table-mobile">
                    <tr>
                    <div class="summary-mobile">{{ driverInfo["Summary"] }}</div>
                    </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </div>   
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                  <tr>
                  <td v-if="driverInfo.Twitter !== ''"  class="social-class-mobile" title="Twitter"><a :href="driverInfo.Twitter" target="_blank" class="social-link-mobile"><font-awesome-icon icon="fa-brands fa-twitter" /></a></td>
                  <td v-if="driverInfo.Instagram !== ''"  class="social-class-mobile" title="Instagram"><a :href="driverInfo.Instagram" target="_blank" class="social-link-mobile"><font-awesome-icon icon="fa-brands fa-instagram" /></a></td>
                  <td  v-if="driverInfo.Facebook !== ''" class="social-class-mobile" title="Facebook"><a :href="driverInfo.Facebook" target="_blank" class="social-link-mobile"><font-awesome-icon icon="fa-brands fa-facebook" /></a></td>
                  <td  v-if="driverInfo.Twitch !== ''" class="social-class-mobile" title="Twitch"><a :href="driverInfo.Twitch" target="_blank" class="social-link-mobile"><font-awesome-icon icon="fa-brands fa-twitch" /></a></td>
                  <td  v-if="driverInfo.Youtube !== ''" class="social-class-mobile" title="YouTube"><a :href="driverInfo.Youtube" target="_blank" class="social-link-mobile"><font-awesome-icon icon="fa-brands fa-youtube" /></a></td>
                  <td v-if="driverInfo.Shop !== ''" class="social-class-mobile" title="Shop for Driver Merch"><a :href="driverInfo.Shop" target="_blank" class="social-link-mobile"><font-awesome-icon icon="fa-solid fa-cart-shopping" /></a></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="twitter-share-mobile">
          <a :href=tweetText target="_blank">
            <v-btn
            class="btn-tweet-mobile"
              color="primary"
              dark
            >
              Tweet Results
            </v-btn>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Bios',
    data () {
	  return {
    }},
    props: {
      highDriver: String,
      driverBios: Object
    },
    computed: {
      driverInfo() {
        const driver = this.driverBios.filter(driver => driver["Name"] === this.highDriver)

        return driver[0]
      },
      isMobile() {
          if( screen.width <= 760 ) {
              return true;
          }
          else {
              return false;
          }
      },
      tweetHandle() {
        const handle = this.driverInfo["Twitter"].split("/")
        return '@' + handle[3]

      },
      tweetText() {
      const tweet = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(`My #Indycar Driver is ${this.tweetHandle}. Who will you get?`) + '%0a' + "&url=indycardrivers.com"
      return tweet
      }
  
    },
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
</script>


<style>
  .bio-backdrop {
    padding-top:10px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y:visible;
  }

  .bio-main-desktop {
    background: whitesmoke;
    color: black;
    box-shadow: 2px 2px 20px 1px;
    display: inline-flex;
    flex-direction: column;
    max-height: 95%;
    width: calc(250px + 30vw);
    max-width: 90%;
  }

  .bio-header-desktop {
    padding: 10px 15px;
    background-color: #2f589f;;
    height: calc(27px + 2vw);
    display: flex;
    position: relative;
    border-bottom: 2px solid #3c3c3c;
    color: white;
    justify-content: space-between;
    font-size: calc(10px + 1.3vw);
  }
  .fa-xmark {
    color: whitesmoke !important;;
    font-size: calc(8px + 1.5vw);
    padding-right:calc(3px + 1.5vw);
    padding-bottom: calc(1px + .5vw);
  }
  .fa-xmark:hover {
    color: rgb(183, 183, 183);
  }
  .modal-all-desktop {
    background-color: transparent;
    overflow-y: auto;
    position:relative !important
  }
  .modal-top-desktop {
    background-color: rgb(213, 213, 213);
    position: relative;
    padding: 10px 10px;
    color: rgb(42, 42, 42);
    border-bottom: 2px solid #3c3c3c;
    text-align: left;
    height: calc(120px + 8vw);
    position: relative;
  }
  .modal-body-desktop {
    float: left;  
    background: whitesmoke;
    position: relative;
    padding: 2px 10px;
    color: rgb(42, 42, 42);
  }
  .driver-intro1-desktop {
    float: left;  
    position: relative;
    padding: 3px 5px;
    color: whitesmoke;
    font-size: calc(6px + 1.5vw) !important;
    display: flex;
    font-weight: bold;
  }
  .float-container-desktop {
    text-align: center !important;
}
  .driver-name-bios-desktop {
    text-align: center !important;
    padding: 20px 10px;
    font-size: calc(14px + 1.5vw);
    font-weight: bold;
  }
  .bio-img-desktop {
    text-align: left !important;
    height: calc(50px + 10vw) !important;
    border: 3px solid whitesmoke;
    box-shadow: 2px 2px 20px 1px;
    align-content: left;
  }
  .num-img-desktop {
    float: center;
    height: calc(28px + 3.8vw);
    padding: 2px 0px 8px 0px;
  }
  .driver-pic-desktop {
    float: left !important;
    padding: 10px 10px;
    color: black;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  .team-img-bios-desktop {
    padding-top: 1px;
    height: calc(28px + 3.8vw);
  }
  .driver-bio-top-desktop {
    position: relative;
    padding: calc(15px + 1vw) 5px;
    color: rgb(42, 42, 42);
    font-size: 18px;
  }
  .table-key-desktop {
    font-weight: bold;
    text-align: right;
    padding-right: calc(6px + .6vw);
    font-size: calc(14px + .6vw);
  }
  .table-value-desktop {
    text-align: left;
    padding-right: 25px;
    font-size: calc(14px + .6vw)
  }
  .summary-table-desktop {
    padding-top: 25px;
  }
  .summary-desktop {
    max-width: calc(170px + 23vw);
    font-size: calc(12px + .5vw);
    text-align: left;
    padding-top: 25px;
  }
  .social-class-desktop {
    font-weight: bold;
    font-size: calc(15px + 1.3vw);
    padding-right: calc(8px + 1.2vw);
    padding-left: calc(8px + 1.2vw);
    padding-top: calc(2px + 1.5vw);
    padding-bottom: 2px;
    background-color: whitesmoke;
  }
  .social-class-desktop:hover {
    font-size: calc(16px + 1.3vw);
  }
  .social-link-desktop{
    color: pink;
    background-color: red;
  }
  .social-link-desktop:hover {
  color: #6693e2;
}

  .modal-question-desktop {
    position: relative;
    padding: 20px 10px;
    color: rgb(4, 4, 4);
    font-size: 24px;
    font-weight: bold;
  }

  .btn-close-desktop {
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
  .btn-close-desktop:hover {
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
  .btn-tweet-desktop {
    color: black;
    border: 2px solid;
    border-radius: 4px !important;
    padding: calc(8px + 1vw) calc(60px + 1.4vw) !important;
    font-size: calc(9px + .5vw) !important;
    width: calc(70px + 6vw) !important;
  }
  .twitter-share-desktop {
    padding: 25px;
  }

  .bio-main-mobile {
    background: whitesmoke;
    color: black;
    box-shadow: 2px 2px 20px 1px;
    display: inline-flex;
    flex-direction: column;
    max-height: 95%;
    width: calc(250px + 30vw);
    max-width: 90%;
  }
  .bio-header-mobile {
    padding: 10px 15px;
    background-color: #2f589f;;
    height: calc(37px + 2vw);
    display: flex;
    position: relative;
    border-bottom: 2px solid #000000;
    color: white;
    justify-content: space-between;
  }
  .modal-all-mobile {
    background-color: transparent;
    overflow-y: auto;
  }
  .modal-top-mobile {
    background-color: rgb(213, 213, 213);
    position: relative;
    padding: 10px 10px;
    color: rgb(42, 42, 42);
    border-bottom: 2px solid #3c3c3c;
    text-align: left;
  }
  .modal-body-mobile {
    float: left;  
    background: whitesmoke;
    position: relative;
    padding: 2px 10px;
    color: rgb(42, 42, 42);
  }
  .driver-intro1-mobile {
    float: left;  
    position: relative;
    padding: 0px 0px 8px 2px;
    color: whitesmoke;
    font-size: calc(12px + 1.5vw) !important;
    display: flex;
    font-weight: bold;
  }
  .float-container-mobile {
    text-align: center !important;
}
  .driver-name-bios-mobile {
    text-align: center !important;
    padding: 10px 5px;
    font-size: calc(27px + 1.5vw);
    font-weight: bold;
  }
  .bio-img-mobile {
    text-align: left !important;
    height: calc(150px + 5vw) !important;
    border: 3px solid whitesmoke;
    box-shadow: 2px 2px 20px 1px;
  }
  .num-img-mobile {
    float: center;
    height: calc(60px + 3vw);
    padding: 9px 0px 8px 0px;
  }
  .driver-pic-mobile {
    float: center !important;
    padding-bottom: 10px;
    color: black;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  .team-img-bios-mobile {
    padding-top: 1px;
    height: calc(60px + 3vw);
  }
  .driver-bio-top-mobile {
    position: relative;
    padding: calc(15px + 1vw) 5px;
    color: rgb(42, 42, 42);
    font-size: 18px;
  }
  .driver-bio-bottom-mobile {
    position: relative;
    padding-top: 0px;
    font-size: 18px;
    background-color: whitesmoke;
  }
  .table-key-mobile {
    font-weight: bold;
    text-align: right;
    padding-right: calc(6px + .2vw);
    font-size: calc(12px + .3vw);
  }
  .table-value-mobile {
    text-align: left;
    padding-right: 25px;
    font-size: calc(12px + .6vw)
  }
  .summary-table-mobile {
    padding-top: 25px;
  }
  .summary-mobile {
    max-width: calc(170px + 23vw);
    font-size: calc(12px + .5vw);
    text-align: left;
    padding-top: 25px;
  }
  .social-class-mobile {
    font-weight: bold;
    font-size: calc(20px + 1.3vw);
    padding-right: calc(5px + 1.2vw);
    padding-left: calc(5px + 1.2vw);
    padding-top: calc(2px + 1.5vw);
    padding-bottom: 2px;
  }
  .social-class-mobile:hover {
    font-size: calc(15px + 1.6vw);
  }
  .social-link-mobile:hover {
  color: #5f8bd6;
}
.btn-close-mobile {
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
  .btn-close-mobile:hover {
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

  .btn-tweet-mobile {
    color: black;
    border: 2px solid;
    border-radius: 4px !important;
    padding: calc(8px + 1vw) calc(60px + 1.4vw) !important;
    font-size: calc(9px + .5vw) !important;
    width: calc(70px + 6vw) !important;
  }
  .twitter-share-mobile {
    padding: 25px;
  }
</style>