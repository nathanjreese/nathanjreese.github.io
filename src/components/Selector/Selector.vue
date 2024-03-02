<template>
  <div>
	<div class="select-main">
    <title-page
      title-text="Help me find a favorite IndyCar driver"
      />
		<div class="select-page">
      
      <div class="body-img">
        <img ref="image" 
          src="@/assets/IndycarLogo.png"
          alt="IndyCar Logo"
          contain
          class="logo-img"
          >
      </div>
      <div class="button55">
            <button
              class="button-21"
                @click="showModal()"
              >
                Start
            </button>
              <button
                class="button-21"
                @click="showBios(randomDriver)"
              >
                Random
              </button>
      </div>
		</div>
     <select-modal
      v-if="isModalVisible"
      :driver-data="driverData"
      :number-question="this.questionNumber"
      @close="closeModal"
      @end="showResults"
    />
    <bios
      v-if="this.isBiosVisible"
      :high-driver = this.highDriver
      :driver-bios = this.driverBios
      @close="closeBios"
    />
    <results
      v-if="this.isResultsVisible"
      @close="closeResults"
      @end="showBios"
      :three-drivers="this.threeDrivers"
    />	
	</div>	
</div>
</template>
  
<script>

  import SelectModal from './SelectModal'
  import Bios from '@/components/Selector/Bios'
  import Results from './Results'
  import TitlePage from '@/components/Partials/Title'
  import driversAnswers from "@/components/Helpers/driverData.json"
  import axios from 'axios'

  export default {
	name: 'selector',
  components: {
    SelectModal,
    TitlePage,
    Bios,
    Results
    },
    data () {
	  return {
      isModalVisible: null,
      currentDrivers: null,
      isBiosVisible: null,
      isResultsVisible: null,
      randomNumber: 0,
      questionNumber: 0,
      driverData: driversAnswers,
      driverBios: [
      {
          "Name": "Álex Palou",
          "Number": "10",
          "2023 Finish": "Champion",
          "Team": "Chip Ganassi Racing",
          "Country": "Spain",
          "Birthdate": "1997",
          "Championships": "'21, '23",
          "Indy500s": "0",
          "Color": "yellow",
          "Summary": "Alex Palou put together one of the best seasons in recent IndyCar history, winning five races finishing no worse than 8th all season. He also shocked everyone by announcing he would be returning to Chip Ganassi Racing instead of moving to Arrow McLaren as expected. Palou will be sporting the bright yellow DHL sponsorship this season as they move over from Andretti to CGR. Palou will be the favorite to repeat as champion in 2024.",
          "picnum": new URL('@/assets/Numbers/PalouNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/AlexPalou.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/ChipGanassiRacing.png', import.meta.url),
          "picref": "Photo credit: Joe Skibinski | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Alex-Palou",
          "Twitter": "https://www.twitter.com/AlexPalou",
          "Instagram": "https://www.instagram.com/AlexPalou",
          "Facebook": "https://www.facebook.com/AlexPalouOfficial",
          "TikTok": "",
          "Twitch": "https://www.twitch.tv/alexpalou",
          "Youtube":"",
          "Shop": "https://shop.ims.com/collections/indycar-drivers-alex-palou"
        },
        {
          "Name": "Scott Dixon",
          "Number": "9",
          "2023 Finish": "2nd",
          "Team": "Chip Ganassi Racing",
          "Country": "New Zealand",
          "Birthdate": "1980",
          "Championships": "'03, '08, '13, '15, '18, '20",
          "Indy500s": "'08",
          "Color": "orange",
          "Summary": "Scott Dixon had a quiet year in 2023 until winning 3 of the last 4 races. He continues to cement his legacy with numbers surpassing everyone not named AJ Foyt. A 2nd Indy 500 win continues to allude \"The Iceman\" though and he'll look to finally become a two-time winner at Indianapolis this season",
          "picnum": new URL('@/assets/Numbers/DixonNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/ScottDixon.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/ChipGanassiRacing.png', import.meta.url),
          "picref": "Photo credit: Joe Skibinski | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Scott-Dixon",
          "Twitter": "https://www.twitter.com/scottdixon9",
          "Instagram": "https://www.instagram.com/scottdixon9",
          "Facebook": "https://www.facebook.com/scottdixon",
          "TikTok": "",
          "Twitch": "",
          "Youtube":"",
          "Shop": "https://shop.ims.com/collections/scott-dixon"
        },
        {
          "Name": "Scott McLaughlin",
          "Number": "3",
          "2023 Finish": "3rd",
          "Team": "Team Penske",
          "Country": "New Zealand",
          "Birthdate": "1993",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "yellow",
          "Summary": "The Supercars legend has cemented himself as a perreneial IndyCar championship contender. He finished 3rd in 2023, ahead of both of his Penske teammates, Newgarden and Power. McLaughlin has quickly become a fan favorite in IndyCar for his off track personality and his on track performance. He hopes to get a few more wins this season and make a serious run at the title.",
          "picnum": new URL('@/assets/Numbers/MclaughlinNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/ScottMcLaughlin.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/TeamPenske.png', import.meta.url),
          "picref": "Photo credit: James Black | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Scott-McLaughlin",
          "Twitter": "https://www.twitter.com/smclaughlin93",
          "Instagram": "https://www.instagram.com/smclaughlin93",
          "Facebook": "https://www.facebook.com/smclaughlin93",
          "TikTok": "",
          "Twitch": "https://www.twitch.tv/scottmclaughlin93",
          "Youtube":"https://www.youtube.com/playlist?list=PLO_0HVxzyH4MFglLkaUEyiw_om7UkDM_7",
          "Shop": "https://shop.ims.com/collections/scott-mclaughlin"
        },
        {
          "Name": "Pato O'Ward",
          "Number": "5",
          "2023 Finish": "4th",
          "Team": "Arrow McLaren",
          "Country": "Mexico",
          "Birthdate": "1999",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "#f78000",
          "Summary": "The popular Mexican driver has established himself as one of the top young talents in IndyCar and a threat to win on every type of track. Pato wasn't able to secure a win in 2023 in part due to some bad luck, but he was one of the most consistent drivers and the clear leader of Arrow McLaren. Pato hopes this is the year his team can challenge Penske and Ganassi for the championship.",
          "picnum": new URL('@/assets/Numbers/PatoNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/PatricioOWard.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/ArrowMcLaren.png', import.meta.url),
          "picref": "Photo credit: James Black | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Patricio-OWard",
          "Twitter": "https://www.twitter.com/patriciooward",
          "Instagram": "https://www.instagram.com/patriciooward",
          "Facebook": "https://www.facebook.com/PatricioOWard",
          "TikTok": "https://www.tiktok.com/@patriciooward",
          "Twitch": "",
          "Youtube":"https://www.youtube.com/@patricioowardofficial",
          "Shop": "https://shop.ims.com/collections/patricio-oward"
        },
        {
          "Name": "Josef Newgarden",
          "Number": "2",
          "2023 Finish": "5th",
          "Team": "Team Penske",
          "Country": "USA",
          "Birthdate": "1990",
          "Championships": "'17, '19",
          "Indy500s": "'23",
          "Color": "#d21c2a",
          "Summary": "Newgarden was finally able to put his face on the Borg Warner Trophy last May as he made a late race pass to win the Indy 500. Although he won 4 of the 5 ovals, the 2-time IndyCar champion had a season to forget on road and street courses. He's motivated to get back into form this year and win his 3rd championship.",
          "picnum": new URL('@/assets/Numbers/NewgardenNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/JosefNewgarden.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/TeamPenske.png', import.meta.url),
          "picref": "Photo credit: Chris Owens | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Josef-Newgarden",
          "Twitter": "https://www.twitter.com/josefnewgarden",
          "Instagram": "https://www.instagram.com/josefnewgarden",
          "Facebook": "https://www.facebook.com/josefnewgarden",
          "TikTok": "",
          "Twitch": "",
          "Youtube":"https://www.youtube.com/@JosefNewgarden",
          "Shop": "https://shop.ims.com/collections/josef-newgarden"
        },
        {
          "Name": "Marcus Ericsson",
          "Number": "28",
          "2023 Finish": "6th",
          "Team": "Andretti Global",
          "Country": "Sweden",
          "Birthdate": "1990",
          "Championships": "0",
          "Indy500s": "'22",
          "Color": "blue",
          "Summary": "After winning the season opener at St. Pete, Ericsson had an up and down season finishing 6th in the championship. He nearly won his 2nd straight Indy 500 if not for a controversial call by race control to red flag the race so it could finish under green. This season the Swede will move over to the newly rebranded Andretti Global, who hopes Ericsson can bring his recent Indy success with him.",
          "picnum": new URL('@/assets/Numbers/EricssonNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/MarcusEricsson.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/AndrettiGlobal.png', import.meta.url),
          "picref": "Photo credit: Joe Skibinski | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Marcus-Ericsson",
          "Twitter": "https://www.twitter.com/ericsson_marcus",
          "Instagram": "https://www.instagram.com/ericsson_marcus",
          "Facebook": "https://www.facebook.com/MarcusEricssonOfficialF1Page",
          "TikTok": "https://www.tiktok.com/@ericsson_marcus",
          "Twitch": "",
          "Youtube":"https://www.youtube.com/@marcusericsson3800",
          "Shop": "https://shop.ims.com/collections/marcus-ericsson"
        },
        {
          "Name": "Will Power",
          "Number": "12",
          "2023 Finish": "7th",
          "Team": "Team Penske",
          "Country": "Australia",
          "Birthdate": "1981",
          "Championships": "'14, '22",
          "Indy500s": "'18",
          "Color": "red",
          "Summary": "After winning his 2nd championship in 2022, Power dropped to 7th last season. One of the longest tenured drivers in IndyCar, 2024 will be his 17th season in the series and 16 with Team Penske. With his unique personality and legendary ability to put together fast qualifying runs, Power's popularity continues to grow.",
          "picnum": new URL('@/assets/Numbers/PowerNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/WillPower.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/TeamPenske.png', import.meta.url),
          "picref": "Photo credit: Joe Skibinski | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Will-Power",
          "Twitter": "https://www.twitter.com/12WillPower",
          "Instagram": "https://www.instagram.com/12willpower",
          "Facebook": "https://www.facebook.com/willpower12",
          "TikTok": "",
          "Twitch": "",
          "Youtube":"",
          "Shop": "https://shop.ims.com/collections/will-power"
          
        },
        {
          "Name": "Christian Lundgaard",
          "Number": "45",
          "2023 Finish": "8th",
          "Team": "Rahal Letterman Lanigan Racing",
          "Country": "Denmark",
          "Birthdate": "2001",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "orange",
          "Summary": "If IndyCar had an award for the most improved driver, that would have gone to Lundgaard in 2023. After a few close calls, Lundgaard finally broke through with a dominant performance at Toronto. He will need to find a little more consistency to challenge for a title in 2024, and the whole RLL team will look to improve their oval program where they were an afterthought last season.",
          "picnum": new URL('@/assets/Numbers/LundgaardNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/ChristianLundgaard.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/RahalLetterman.png', import.meta.url),
          "picref": "Photo credit: James Black | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Christian-Lundgaard",
          "Twitter": "https://www.twitter.com/lundgaardoff",
          "Instagram": "https://www.instagram.com/lundgaardofficial",
          "Facebook": "https://www.facebook.com/lundgaardofficial",
          "TikTok": "https://www.tiktok.com/@lundgaardofficial",
          "Twitch": "https://www.twitch.tv/clundgaard30",
          "Youtube":"",
          "Shop": "https://shop.ims.com/pages/search-results-page?q=lundgaard"
        },
        {
          "Name": "Alexander Rossi",
          "Number": "7",
          "2023 Finish": "9th",
          "Team": "Arrow McLaren",
          "Country": "USA",
          "Birthdate": "1991",
          "Championships": "0",
          "Indy500s": "'16",
          "Color": "#4ac5f4",
          "Summary": "Alexander Rossi made the move from Andretti to McLaren in 2023, but his position in the final standings stayed at 9. The popular American is hoping to get back into the win column in 2024 and join the two-time Indy 500 win club next May. When he's not in an IndyCar cockpit, as an avid pilot Rossi can be found in the cockpit of an airplane. He also has a popular podcast \"Off Track With Hinch and Rossi\" with fellow racer James Hinchcliffe and some other guy.",
          "picnum": new URL('@/assets/Numbers/RossiNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/AlexanderRossi.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/ArrowMcLaren.png', import.meta.url),
          "picref": "Photo credit: Joe Skibinski | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Alexander-Rossi",
          "Twitter": "https://www.twitter.com/alexanderrossi",
          "Instagram": "https://www.instagram.com/alexanderrossi",
          "Facebook": "https://www.facebook.com/AlexanderRossi",
          "TikTok": "",
          "Twitch": "",
          "Youtube":"https://www.youtube.com/@offtrackwithhinchandrossi6872",
          "Shop": "https://shop.ims.com/collections/indycar-drivers-alexander-rossi"
        },
        {
          "Name": "Colton Herta",
          "Number": "26",
          "2023 Finish": "10th",
          "Team": "Andretti Global",
          "Country": "USA",
          "Birthdate": "2000",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "#fce800",
          "Summary": "Widely considered one of the top talents in the series, Herta went winless in 2023 for the first time in his career. As his name continues to be thrown around for a potential Andretti Global F1 seat, he'll need to fulfill his potential in IndyCar if he wants to secure enough super license points to qualify for F1. With his fast hands and knack for highlight reel qualifying laps, the son of Bryan Herta is one of the most popular young driers in the sport.",
          "picnum": new URL('@/assets/Numbers/HertaNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/ColtonHerta.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/AndrettiGlobal.png', import.meta.url),
          "picref": "Photo credit: Chris Owens | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Colton-Herta",
          "Twitter": "https://www.twitter.com/ColtonHerta",
          "Instagram": "https://www.instagram.com/coltonherta",
          "Facebook": "https://www.facebook.com/ColtonHertaRacing",
          "TikTok": "",
          "Twitch": "https://www.twitch.tv/coltonherta",
          "Youtube":"",
          "Shop": "https://shop.ims.com/collections/driver_colton-herta"
        },
        {
          "Name": "Kyle Kirkwood",
          "Number": "27",
          "2023 Finish": "11th",
          "Team": "Andretti Global",
          "Country": "USA",
          "Birthdate": "1998",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "pink",
          "Summary": "Kirkwood's first year with Andretti included two dominant wins on street courses and an impressive showing at the Indy 500. He will need to find more consistency to challenge for a championship this season, but Kirkwood has all of the signs of being a future IndyCar champion.",
          "picnum": new URL('@/assets/Numbers/KirkwoodNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/KyleKirkwood.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/AndrettiGlobal.png', import.meta.url),
          "picref": "Photo credit: Chris Jones | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Kyle-Kirkwood",
          "Twitter": "https://twitter.com/KKirkwoodRacing",
          "Instagram": "https://www.instagram.com/Kyle_Kirkwood",
          "Facebook": "https://www.facebook.com/KyleKirkwoodRacing",
          "TikTok": "https://www.tiktok.com/@kyle_kirkwood",
          "Twitch": "",
          "Youtube":"",
          "Shop": "https://shop.ims.com/pages/search-results-page?q=Kirkwood"
        },
        {
          "Name": "Felix Rosenqvist",
          "Number": "6",
          "2023 Finish": "12th",
          "Team": "Meyer Shank Racing",
          "Country": "Sweden",
          "Birthdate": "1991",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "#4ac5f4",
          "Summary": "Rosenqvist had another up and down season in 2023, finishing 12th in his 2nd straight lameduck season with McLaren. He moves over to Meyer Shank Racing in 2024 where he'll be the lead veteran everywhere but Indy. Look for Felix to embrace that role and help bring MSR to the next level. Always a fast qualifier, Felix had 2 poles in 2024 but will need to turn those into better finishes if he is to move up the standings.",
          "picnum": new URL('@/assets/Numbers/RosenqvistNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/FelixRosenqvist.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/MeyerShankRacing.png', import.meta.url),
          "picref": "Photo credit: Joe Skibinski | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Felix-Rosenqvist",
          "Twitter": "https://www.twitter.com/FRosenqvist",
          "Instagram": "https://www.instagram.com/frosenqvist",
          "Facebook": "https://www.facebook.com/FelixRosenqvistOfficial",
          "Twitch": "",
          "Youtube":"",
          "Shop": "https://shop.ims.com/collections/indycar-drivers-felix-rosenqvist"
        },
        {
          "Name": "Romain Grosjean",
          "Number": "77",
          "2023 Finish": "13th",
          "Team": "Juncos Hollinger Racing",
          "Country": "France",
          "Birthdate": "1986",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "green",
          "Summary": "After an impressive start in 2023, Grosjean looked like a legit threat to contend for a title. Several potential wins ended in crashes for Grosjean and the season went south. The former F1 star moves over to Juncos Hollinger in 2024 where he'll once again be thrown into an underdog role. Can Romain be the driver to finally put Juncos in IndyCar victory lane? Whatever the result, this will be one of the fun stories to watch in 2024.",
          "picnum": new URL('@/assets/Numbers/GrosjeanNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/RomainGrosjean.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/JuncosHollinger.png', import.meta.url),
          "picref": "Photo credit: Chris Jones | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Romain-Grosjean",
          "Twitter": "https://www.twitter.com/RGrosjean",
          "Instagram": "https://www.instagram.com/grosjeanromain",
          "Facebook": "https://www.facebook.com/grosjeanromain",
          "TikTok": "https://www.tiktok.com/@grosjeanromain8",
          "Twitch": "https://www.twitch.tv/grosjeanromain",
          "Youtube":"https://www.youtube.com/@RomainGrosjean8",
          "Shop": "https://shop.ims.com/collections/romain-grosjean"
        },
        {
          "Name": "Rinus VeeKay",
          "Number": "21",
          "2023 Finish": "14th",
          "Team": "Ed Carpenter Racing",
          "Country": "Netherlands",
          "Birthdate": "2000",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "orange",
          "Summary": "The young Dutchman has an aggressive style on track and unique personality off track that makes him easy to root for. Veekay shines at IMS where he has one career win on the road course, and has started on the front row and led the Indy 500 the last three years.",
          "picnum": new URL('@/assets/Numbers/VeekayNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/RinusVeekay.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/EdCarpenterRacing.png', import.meta.url),
          "picref": "Photo credit: Joe Skibinski | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Rinus-VeeKay",
          "Twitter": "https://www.twitter.com/RinusVeeKay",
          "Instagram": "https://www.instagram.com/RinusVeeKay",
          "Facebook": "https://www.facebook.com/RinusVeeKay",
          "TikTok": "",
          "Twitch": "",
          "Youtube":"https://www.youtube.com/@vankalmthoutauto",
          "Shop": "https://shop.ims.com/collections/rinus-veekay"
        },
        {
          "Name": "Graham Rahal",
          "Number": "15",
          "2023 Finish": "15th",
          "Team": "Rahal Letterman Lanigan Racing",
          "Country": "USA",
          "Birthdate": "1989",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "orange",
          "Summary": "The 2nd generation driver struggled in the first half of 2023, and was bumped from the Indy 500 before filling in for an injured Stef Wilson. Graham bounced back late in the season winning 2 of the last 4 poles, and nearly winning the Gallagher GP if not for Scott Dixon stretching his fuel. He hopes RLL can build off of last season's late success and finally turn around their oval program.",
          "picnum": new URL('@/assets/Numbers/RahalNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/GrahamRahal.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/RahalLetterman.png', import.meta.url),
          "picref": "Photo credit: Chris Jones | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Graham-Rahal",
          "Twitter": "https://www.twitter.com/grahamrahal",
          "Instagram": "https://www.instagram.com/grahamrahal",
          "Facebook": "https://www.facebook.com/GrahamRahal",
          "TikTok": "",
          "Twitch": "",
          "Youtube":"",
          "Shop": "https://shop.ims.com/collections/indycar-drivers-graham-rahal"
        },
        {
          "Name": "David Malukas",
          "Number": "6",
          "2023 Finish": "17th",
          "Team": "Arrow McLaren Racing",
          "Country": "USA",
          "Birthdate": "2001",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "orange",
          "Summary": "Malukas takes a big step up in 2024, moving from Dale Coyne Racing to take the seat expected to be filled by Alex Palou at Arrow McLaren. \"Lil Dave\" as he's jokingly referred to will have a lot higher expectations with McLaren, but don't let his silly social media personality fool you. The kid can flat out drive and may surprise a lot of people this season.",
          "picnum": new URL('@/assets/Numbers/MalukasNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/DavidMalukas.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/ArrowMcLaren.png', import.meta.url),
          "picref": "Photo credit: Travis Hinkle | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/David-Malukas",
          "Twitter": "https://www.twitter.com/malukasdavid",
          "Instagram": "https://www.instagram.com/davidmalukas",
          "Facebook": "",
          "TikTok": "",
          "Twitch": "",
          "Youtube":"https://www.youtube.com/@malukasdavid",
          "Shop": "https://shop.ims.com/collections/david-malukas"
        },
        {
          "Name": "Santino Ferrucci",
          "Number": "14",
          "2023 Finish": "28th",
          "Team": "A.J. Foyt Enterprises",
          "Country": "USA",
          "Birthdate": "1998",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "orange",
          "Summary": "The hightlight for Ferrucci, and AJ Foyt Racing, in 2023 was his incredible month of May. Qualifying 4th and finishing 3rd at the Indy 500 in the famed number 14 helped overshadow an otherwise typical lackluster season for the team. After a technical alliance with Team Penske was announced late in the season, expectations should be higher in 2024. The polarizing young American will look to prove that he deserves to be in the series long term.",
          "picnum": new URL('@/assets/Numbers/FerrucciNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/SantinoFerrucci.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/AJFoytRacing.png', import.meta.url),
          "picref": "Photo credit: Joe Skibinski | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Santino-Ferrucci",
          "Twitter": "https://www.twitter.com/santinoferrucci",
          "Instagram": "https://www.instagram.com/santinoferrucci",
          "Facebook": "https://www.facebook.com/santinof1/",
          "TikTok": "https://www.tiktok.com/@santinoferrucci",
          "Twitch": "https://www.twitch.tv/santinoferrucci",
          "Youtube":"",
          "Shop": "https://santinoferrucci.com/shop/shop/"
        },
        {
          "Name": "Marcus Armstrong",
          "Number": "11",
          "2023 Finish": "20th",
          "Team": "Chip Ganassi Racing",
          "Country": "New Zealand",
          "Birthdate": "2000",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "green",
          "Summary": "After running only the road and street courses in 2023, the reigning rookie of the year will stay in the number 11 and run the full season in 2024. Armstrong will have some decorated champions on his team to learn from, but also a high bar that's been set by Dixon and Palou. The former Ferrari junior driver will hope to establish himself in an increasingly talented IndyCar field.",
          "picnum": new URL('@/assets/Numbers/ArmstrongNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/MarcusArmstrong.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/ChipGanassiRacing.png', import.meta.url),
          "picref": "Photo credit: Joe Skibinski | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Marcus-Armstrong",
          "Twitter": "https://www.twitter.com/MarcusArmstrng",
          "Instagram": "https://www.instagram.com/marcusarmstrong",
          "Facebook": "https://www.facebook.com/MarcusArmstrng",
          "TikTok": "",
          "Twitch": "",
          "Youtube": "https://www.youtube.com/@screamingmeals",
          "Shop": "https://shop.ims.com/pages/search-results-page?q=Ganassi"
        },
        {
          "Name": "Agustín Canapino",
          "Number": "78",
          "2023 Finish": "21st",
          "Team": "Juncos Hollinger Racing",
          "Country": "Argentina",
          "Birthdate": "1990",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "orange",
          "Summary": "Canapino surprised a lot of people jumping into an open wheel car from Argentinan touring cars and staying relatively competitive with the rest of the field. He will be joined in 2024 at Juncos by Romain Grosjean, who will bring a lot of experience to the team. But after a little team drama in 2023 for both drivers, everyone will be watching if the teammates get together on track.",
          "picnum": new URL('@/assets/Numbers/CanapinoNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/AgustinCanapino.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/JuncosHollinger.png', import.meta.url),
          "picref": "Photo credit: Chris Owens | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Agustin-Canapino",
          "Twitter": "https://www.twitter.com/AgustinCanapino",
          "Instagram": "https://www.instagram.com/agustincanapino",
          "Facebook": "https://www.facebook.com/AgustinCanapinoSitioOficial",
          "TikTok": "https://www.tiktok.com/@agustincanapinooficial",
          "Twitch": "https://www.twitch.tv/agustincanapino",
          "Youtube":"",
          "Shop": "https://www.juncoshollinger.com/shop/"
        },
        {
          "Name": "Sting Ray Robb",
          "Number": "41",
          "2023 Finish": "23rd",
          "Team": "A.J. Foyt Enterprises",
          "Country": "USA",
          "Birthdate": "2001",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "orange",
          "Summary": "Sing Ray Robb had a tough rookie year with Dale Coyne racing, but did manage a season best 12th in his last race in 2023. He will move over to the 41 car at AJ Foyt Racing in 2024 where he'll hope to find some of the success he had in the ladder series. Having a great name will only get you so far, but maybe being with the correct manufacturer of his namesake will help as he moves from Honda to Chevy.",
          "picnum": new URL('@/assets/Numbers/RobbNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/StingRayRobb.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/AJFoytRacing.png', import.meta.url),
          "picref": "Photo credit: Travis Hinkle | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Sting-Ray-Robb",
          "Twitter": "https://www.twitter.com/sting_ray_robb",
          "Instagram": "https://www.instagram.com/sting_ray_robb",
          "Facebook": "https://www.facebook.com/stingrayrobbracing",
          "TikTok": "",
          "Twitch": "",
          "YouTube": "https://www.youtube.com/@stingrayrobb51",
          "Shop": "https://shop.ims.com/pages/indycar-homepage"
        },
        {
          "Name": "Ed Carpenter",
          "Number": "20",
          "2023 Finish": "30th",
          "Team": "Ed Carpenter Racing",
          "Country": "USA",
          "Birthdate": "1981",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "blue",
          "Summary": "One of the last throwbacks to the oval only IRL days, Ed is also the only owner/driver left in the series. Ed will run the 20 on ovals, splitting the ride with rookie, Christian Rasmussen, who will run the road and street courses in the car. As an Indy native, an Ed Carpenter Indy 500 win would be a popular one, and he will likely keep trying as long as he's competitive.",
          "picnum": new URL('@/assets/Numbers/CarpenterNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/EdCarpenter.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/EdCarpenterRacing.png', import.meta.url),
          "picref": "Photo credit: Chris Owens | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Ed-Carpenter",
          "Twitter": "https://www.twitter.com/edcarpenter20",
          "Instagram": "",
          "Facebook": "https://www.facebook.com/edcarpenterindy",
          "TikTok": "",
          "Twitch": "",
          "Youtube":"",
          "Shop": "https://shop.ims.com/collections/indycar-drivers-ed-carpenter"
        },
        {
          "Name": "Kyffin Simpson",
          "Number": "20",
          "2023 Finish": "Rookie",
          "Team": "Chip Ganassi Racing",
          "Country": "USA",
          "Birthdate": "1981",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "blue",
          "Summary": "Simpson will move up from IndyNXT, where he showed plenty of speed, earning a pole and a couple of podiums, but with inconsistent results overall. Not many drivers in IndyCar has had the amount of seat time Simpson has had over the last year though as he ran LMP2 all over the world. Kyffin is hoping the hard work pays off by claiming the rookie of the year title this season.",
          "picnum": new URL('@/assets/Numbers/SimpsonNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/KyffinSimpson.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/ChipGanassiRacing.png', import.meta.url),
          "picref": "Photo credit: Joe Skibinski | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Ed-Carpenter",
          "Twitter": "https://www.twitter.com/edcarpenter20",
          "Instagram": "",
          "Facebook": "https://www.facebook.com/edcarpenterindy",
          "TikTok": "https://www.tiktok.com/@kyffinsimpson",
          "Twitch": "",
          "Youtube":"",
          "Shop": "https://shop.ims.com/collections/indycar-drivers-ed-carpenter"
        },
        {
          "Name": "Linus Lundqvist",
          "Number": "8",
          "2023 Finish": "Rookie",
          "Team": "Chip Ganassi Racing",
          "Country": "Sweden",
          "Birthdate": "1999",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "blue",
          "Summary": "The 2022 IndyNXT champion was on the outside looking in when the silly season musical chairs stopped ahead of last season. He eventually got a shot after an injury to Simon Pagenaud and the Swede was so impressive that he was hired by Chip Ganassi to replace his fellow countryman, Marcus Ericsson, in the 8 car for 2024. The expectations will be high considering Lundqvist is a rookie, but not many would be shocked to see him score a victory at some point this season.",
          "picnum": new URL('@/assets/Numbers/LundqvistNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/LinusLundqvist.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/ChipGanassiRacing.png', import.meta.url),
          "picref": "Photo credit: Joe Skibinski | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Ed-Carpenter",
          "Twitter": "https://www.twitter.com/edcarpenter20",
          "Instagram": "",
          "Facebook": "https://www.facebook.com/edcarpenterindy",
          "TikTok": "",
          "Twitch": "",
          "Youtube":"",
          "Shop": "https://shop.ims.com/collections/indycar-drivers-ed-carpenter"
        },
        {
          "Name": "Christian Rasmussen",
          "Number": "20",
          "2023 Finish": "Rookie",
          "Team": "Ed Carpenter Racing",
          "Country": "Denmark",
          "Birthdate": "2000",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "blue",
          "Summary": "The fast Dane dominated the 2024 IndyNXT season, taking home the championship and a scholarship to help fund his IndyCar ride. He will split the 20 car with Ed Carpenter in his rookie year, running the road and street courses plus the most important oval, the Indy 500.",
          "picnum": new URL('@/assets/Numbers/CarpenterNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/ChristianRasmussen.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/EdCarpenterRacing.png', import.meta.url),
          "picref": "Photo credit: Chris Owens | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Ed-Carpenter",
          "Twitter": "https://www.twitter.com/edcarpenter20",
          "Instagram": "",
          "Facebook": "https://www.facebook.com/edcarpenterindy",
          "TikTok": "",
          "Twitch": "",
          "Youtube":"",
          "Shop": "https://shop.ims.com/collections/indycar-drivers-ed-carpenter"
        },
        {
          "Name": "Tom Blomqvist",
          "Number": "66",
          "2023 Finish": "Rookie",
          "Team": "Meyer Shank Racing",
          "Country": "United Kingdom",
          "Birthdate": "1993",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "pink",
          "Summary": "Blomqvist moves over from IMSA's top prototype class where he was a series champion and Daytona 24 winner with Meyer Shank Racing. In 3 IndyCaqr races last season Blomqvist struggled, but he should be better prepared coming into his first full season. Tom did come up through the European open wheel ladder and spent a couple of years in Formula E, so open wheel racing is nothing new to him. He will team up with Felix Rosenqvist and have Helio Castroneves as a mentor as he aims to win rookie of the year in 2024.",
          "picnum": new URL('@/assets/Numbers/BlomqvistNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/TomBlomqvist.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/MeyerShankRacing.png', import.meta.url),
          "picref": "Photo credit: Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Tom-Blomqvist",
          "Twitter": "https://twitter.com/tom_blomqvist",
          "Instagram": "https://www.instagram.com/tom_blomqvist",
          "Facebook": "https://www.facebook.com/tom.blomqvist.racing/",
          "TikTok": "",
          "Twitch": "",
          "Youtube":"",
          "Shop": "https://shop.indycar.com/search?q=Tom+Blomqvist"
        },
        {
          "Name": "Pietro Fittipaldi",
          "Number": "30",
          "2023 Finish": "N/A",
          "Team": "Rahal Letterman Lanigan Racing",
          "Country": "USA/Brazil",
          "Birthdate": "1996",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "red",
          "Summary": "Fittipaldi has taken a wild path to landing a solid full time IndyCar seat. The grandson of F1 and IndyCar legend Emerson Fittipaldi, Pietro has been in the NASCAR Whelen series, multiple stints in IndyCar with Dale Coyne, F1, and Stock Car Brazil among others. While not technically a rookie, this will be Pietro's first full IndyCar season where he'll join Rahal Letterman Lanigan. He should be a fun driver to keep an eye on to see if he can establish himself as a serious long term contender in IndyCar.",
          "picnum": new URL('@/assets/Numbers/FittipaldiNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/PietroFittipaldi.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/RahalLetterman.png', import.meta.url),
          "picref": "Photo credit: James Black | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Pietro-Fittipaldi",
          "Twitter": "https://www.https://twitter.com/PiFitti",
          "Instagram": "https://www.instagram.com/pifitti",
          "Facebook": "",
          "TikTok": "https://www.tiktok.com/@fittibros",
          "Twitch": "https://www.twitch.tv/fittipaldibrothers",
          "Youtube":"https://www.youtube.com/@FittipaldiBrothers",
          "Shop": "https://shop.indycar.com/search?q=fittipaldi"
        },
        {
          "Name": "Dale Coyne TBD",
          "Number": "18",
          "2023 Finish": "N/A",
          "Team": "Dale Coyne Racing",
          "Country": "Parts Unknown",
          "Birthdate": "2000",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "orange",
          "Summary": "This is a driver that everyone can agree will be a big underdog this season and is really looking to establish themselves in IndyCar. With little to no testing this offseason and agreeing to a last minute part-time deal, it won't be easy but everyone loves an underdog and will be hoping to see them make the most of their ride with Dale Coyne.",
          "picnum": new URL('@/assets/Numbers/HarveyNumber.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/UnknownDriver.png', import.meta.url),
          "teampic": new URL('@/assets/Teams/DaleCoyneRacing.png', import.meta.url),
          "picref": "",
          "Profile": "https://www.indycar.com",
          "Twitter": "https://www.twitter.com/Indycar",
          "Instagram": "https://www.instagram.com/Indycar",
          "Facebook": "https://www.facebook.com/Indycar",
          "Twitch": "",
          "Youtube":"https://www.youtube.com/@IndyCar",
          "Shop": "https://shop.ims.com/"
        },
        // {
        //   "Name": "Colin Braun",
        //   "Number": "51",
        //   "2023 Finish": "Rookie",
        //   "Team": "Dale Coyne Racing",
        //   "Country": "USA",
        //   "Birthdate": "1988",
        //   "Championships": "0",
        //   "Indy500s": "0",
        //   "Color": "#4ac5f4",
        //   "Summary": "After a few junior open wheel championships, Colin Braun has spent the majority of his career racing and winning in the IMSA Weathertech series, but he's also competed in NASCAR and Rallycross. Braun will finally realize his dream of driving in IndyCar as he runs a part-time schedule with Dale Coyne. The 35 year old rookie will be a popular underdog as he tries to prove he belongs in the series.",
        //   "picnum": new URL('@/assets/Numbers/BraunNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/ColinBraun.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/CoyneWithRWR.png', import.meta.url),
        //   "picref": "Photo credit: Joe Skibinski | Indycar.com",
        //   "Profile": "https://www.indycar.com/Series/IndyCar-Series/Colin-Braun",
        //   "Twitter": "https://twitter.com/colinbraun",
        //   "Instagram": "https://www.instagram.com/colinbraun",
        //   "Facebook": "https://www.facebook.com/ColinBraun/",
        //   "Twitch": "",
        //   "TikTok": "",
        //   "Youtube":"",
        //   "Shop": "https://shop.indycar.com/search?q=braun"
        // },
        //  {
        //   "Name": "Jack Harvey",
        //   "Number": "18",
        //   "2023 Finish": "24th",
        //   "Team": "Dale Coyne Racing",
        //   "Country": "United Kingdom",
        //   "Birthdate": "1993",
        //   "Championships": "0",
        //   "Indy500s": "0",
        //   "Color": "orange",
        //   "Summary": "After being dropped by RLL late in the 2023 season, Jack Harvey was left without a full-time ride for 2024. He was able to secure a part-time ride with Dale Coyne Racing where he will drive some road and street courses and hope to show some of the promise he did with Meyer Shank Racing to prove he still belongs in the series.",
        //   "picnum": new URL('@/assets/Numbers/HarveyNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/JackHarvey.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/DaleCoyneRacing.png', import.meta.url),
        //   "picref": "Photo credit: James Black | Indycar.com",
        //   "Profile": "https://www.indycar.com/Series/IndyCar-Series/Jack-Harvey",
        //   "Twitter": "https://www.twitter.com/jack_harvey42",
        //   "Instagram": "https://www.instagram.com/jack_harvey42",
        //   "Facebook": "https://www.facebook.com/JackHarveyRacing",
        //   "Twitch": "",
        //   "Youtube":"https://www.youtube.com/@JackHarvey42",
        //   "Shop": "https://shop.ims.com/collections/jack-harvey"
        // },
        // {
        //   "Name": "Hélio Castroneves",
        //   "Number": "06",
        //   "2023 Finish": "18th",
        //   "Team": "Meyer Shank Racing",
        //   "Country": "Brazil",
        //   "Birthdate": "1975",
        //   "Championships": "0",
        //   "Indy500s": "'01, '02, '09, '21",
        //   "Color": "pink",
        //   "Summary": "After four seasons running a part time schedule, the four time Indy 500 champ came back to run a full schedule with MSR last season with disappointing results. Hélio and MSR won the 2021 Indy 500 and won the 24 Hours of Daytona together the last two seasons.",
        //   "picnum": new URL('@/assets/Numbers/HelioNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/HelioCastroneves.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/MeyerShankRacing.png', import.meta.url),
        //   "picref": "Photo credit: Joe Skibinski | Indycar.com",
        //   "Profile": "https://www.indycar.com/Series/IndyCar-Series/Helio-Castroneves",
        //   "Twitter": "https://www.twitter.com/h3lio",
        //   "Instagram": "https://www.instagram.com/heliocastroneves",
        //   "Facebook": "https://www.facebook.com/h3lio",
        //   "Twitch": "",
        //   "Youtube":"",
        //   "Shop": "https://shop.ims.com/collections/indycar-drivers-helio-castroneves"
        // },
        // {
        //   "Name": "Simona De Silvestro",
        //   "Number": "16",
        //   "2023 Finish": "32nd",
        //   "Team": "Paretta Autosport",
        //   "Country": "Switzerland",
        //   "Birthdate": "1988",
        //   "Championships": "0",
        //   "Indy500s": "0",
        //   "Color": "orange",
        //   "Summary": "Simona returned to a part-time IndyCar schedule recently after being out of IndyCar completely for five years. Probably the best female road course racer in IndyCar history, she will be driving for Paretta Autosports with ECR on select road and street courses in 2023.",
        //   "picnum": new URL('@/assets/Numbers/DesilvestroNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/SimonaDeSilvestro.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/ParettaAutosport.png', import.meta.url),
        //   "picref": "Photo credit: Joe Skibinski | Indycar.com",
        //   "Profile": "https://www.indycar.com/Series/IndyCar-Series/Simona-de-Silvestro",
        //   "Twitter": "https://www.twitter.com/simdesilvestro",
        //   "Instagram": "https://www.instagram.com/simonadesilvestro",
        //   "Facebook": "https://www.facebook.com/simdesilvestro",
        //   "Twitch": "",
        //   "Youtube":"",
        //   "Shop": "https://shop.ims.com/collections/simona-de-silvestro"
        // },
        // {
        //   "Name": "Benjamin Pedersen",
        //   "Number": "55",
        //   "2023 Finish": "Rookie",
        //   "Team": "A.J. Foyt Enterprises",
        //   "Country": "Denmark",
        //   "Birthdate": "1999",
        //   "Championships": "0",
        //   "Indy500s": "0",
        //   "Color": "orange",
        //   "Summary": "Pedersen will move up to IndyCar from IndyNXT (former Indy Lights) in 2023, where he scored his first win late in the season at Portland. He will race the #55 alongside Ferrucci at AJ Foyt Racing, and will look to win \"Rookie of the Year\".",
        //   "picnum": new URL('@/assets/Numbers/PedersonNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/BenjaminPedersen.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/AJFoytRacing.png', import.meta.url),
        //   "picref": "Photo credit: Travis Hinkle | Indycar.com",
        //   "Profile": "https://www.indycar.com/Series/IndyCar-Series/Benjamin-Pedersen",
        //   "Twitter": "https://www.twitter.com/BPedersen_55",
        //   "Instagram": "https://www.instagram.com/benjaminpedersen_55/",
        //   "Facebook": "https://www.facebook.com/benjaminpedersen24",
        //   "Twitch": "",
        //   "Youtube":"",
        //   "Shop": "https://shop.ims.com/pages/search-results-page?q=foyt"
        // },
           // {
        //   "Name": "Callum Ilott",
        //   "Number": "77",
        //   "2023 Finish": "20th",
        //   "Team": "Juncos Hollinger Racing",
        //   "Country": "United Kingdom",
        //   "Birthdate": "1998",
        //   "Championships": "0",
        //   "Indy500s": "0",
        //   "Color": "orange",
        //   "Summary": "Ilott showed a lot of promise in his first full-time IndyCar season. As the only single car team, Juncos Hollinger Racing struggled at times but scored a couple of top tens in 2022. Ilott should get some help with Juncos adding a 2nd car in 2023.",
        //   "picnum": new URL('@/assets/Numbers/IlotNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/CallumIlott.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/JuncosHollinger.png', import.meta.url),
        //   "picref": "Photo credit: Joe Skibinski | Indycar.com",
        //   "Profile": "https://www.indycar.com/Series/IndyCar-Series/Callum-Ilott",
        //   "Twitter": "https://www.twitter.com/Callum_Ilott",
        //   "Instagram": "https://www.instagram.com/Callum_Ilott",
        //   "Facebook": "https://www.facebook.com/Callumilottracing",
        //   "Twitch": "https://www.twitch.tv/callum_ilott",
        //   "Youtube":"",
        //   "Shop": "https://www.juncoshollinger.com/shop/"
        // },
        // {
        //   "Name": "Simon Pagenaud",
        //   "Number": "60",
        //   "2023 Finish": "15th",
        //   "Team": "Meyer Shank Racing",
        //   "Country": "France",
        //   "Birthdate": "1984",
        //   "Championships": "'16",
        //   "Indy500s": "'19",
        //   "Color": "",
        //   "Summary": "In his first season at Meyer Shank Racing, the former IndyCar champ had a decent first half before struggling the last seven races. Pagenaud and MSR have won the 24 Hours of Daytona together the last two seasons, and hope to bring the same success to the IndyCar side in 2023.",
        //   "picnum": new URL('@/assets/Numbers/PagenaudNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/SimonPagenaud.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/MeyerShankRacing.png', import.meta.url),
        //   "picref": "Photo credit: Joe Skibinski | Indycar.com",
        //   "Profile": "https://www.indycar.com/Series/IndyCar-Series/Simon-Pagenaud",
        //   "Twitter": "https://www.twitter.com/simonpagenaud",
        //   "Instagram": "https://www.instagram.com/simonpagenaud",
        //   "Facebook": "https://www.facebook.com/simonpagenaud",
        //   "Twitch": "",
        //   "Youtube":"",
        //   "Shop": "https://shop.ims.com/collections/simon-pagenaud"
        // },
        // {
        //   "Name": "Takuma Sato",
        //   "Number": "11",
        //   "2023 Finish": "19th",
        //   "Team": "Chip Ganassi Racing",
        //   "Country": "Japan",
        //   "Birthdate": "1977",
        //   "Championships": "0",
        //   "Indy500s": "'17, '20",
        //   "Color": "orange",
        //   "Summary": "The two-time Indy 500 Champion will scale back his schedule in 2023, running the ovals for Chip Ganassi in the #11. Known for his motto \"No Attack, No Chance\", Sato's aggressive style has made him a polarizing figure in IndyCar but also earned him some big wins.",
        //   "picnum": new URL('@/assets/Numbers/SatoNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/TakumaSato.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/ChipGanassiRacing.png', import.meta.url),
        //   "picref": "Photo credit: Joe Skibinski | Indycar.com",
        //   "Profile": "https://www.indycar.com/Series/IndyCar-Series/Takuma-Sato",
        //   "Twitter": "https://www.twitter.com/TakumaSatoRacer",
        //   "Instagram": "https://www.instagram.com/takumasato_official",
        //   "Facebook": "",
        //   "Twitch": "",
        //   "Youtube":"",
        //   "Shop": "https://shop.ims.com/collections/takuma-sato"
        // },
         // {
        //   "Name": "Devlin DeFrancesco",
        //   "Number": "29",
        //   "2023 Finish": "22nd",
        //   "Team": "Andretti w/ Steinbrenner Racing",
        //   "Country": "Canada",
        //   "Birthdate": "2000",
        //   "Championships": "0",
        //   "Indy500s": "0",
        //   "Color": "orange",
        //   "Summary": "As a rookie last season, DeFrancesco showed speed at times but couldn't get the results to match it. Devlin, who already has a 24 Hours of Daytona class win on his resume, hopes to consistently fight for top 10s in his sophomore season.",
        //   "picnum": new URL('@/assets/Numbers/DefrancescoNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/DevlinDeFrancesco.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/AndrettiSteinbrenner.png', import.meta.url),
        //   "picref": "Photo credit: Joe Skibinski | Indycar.com",
        //   "Profile": "https://www.indycar.com/Series/IndyCar-Series/Devlin-DeFrancesco",
        //   "Twitter": "https://www.twitter.com/DevlinDeFran",
        //   "Instagram": "https://www.instagram.com/devlindefran",
        //   "Facebook": "https://www.facebook.com/devlindefran",
        //   "Twitch": "",
        //   "Youtube":"",
        //   "Shop": "https://shop.ims.com/pages/search-results-page?q=Devlin"
        // },
      ]
    }
  },
  computed: {
      randomDriver() {
        this.randomNumber = Math.floor(Math.random() * this.driverData.length)
        const item = this.driverData[this.randomNumber]
        return item["name"]
      }
  },
  methods: {
    showModal() {
      this.driverData.forEach(driver => {
        driver["points"] = 0
      })
      this.questionNumber = 0 
      this.isModalVisible = true
      // this.currentDrivers = driverData
    },
    closeResults() {
      this.isResultsVisible = false
      this.driverData.forEach(driver => {
        driver["points"] = 0
      })
      this.questionNumber = 0      
    },
    showBios(highDriver) {
      this.isModalVisible = false;
      this.highDriver = highDriver
      this.isBiosVisible = true
      this.isResultsVisible = false
    },
    showResults(threeDrivers){
        this.isModalVisible = false
        let driverNames = []

        threeDrivers.forEach( driver => (driverNames.push(driver["name"])))

        for (const key in threeDrivers) {  
          for (const key2 in this.driverBios) {
            if (threeDrivers[key]["name"] === this.driverBios[key2]["Name"]){
              this.driverBios[key2]["points"] = threeDrivers[key]["points"]
            }
          }
        }

        const finalDrivers = this.driverBios.filter(bio => driverNames.includes(bio["Name"]))
        finalDrivers.sort((a, b) => {
              return b.points - a.points})
        this.threeDrivers = finalDrivers
        this.isResultsVisible = true
      },
    closeModal() {
      this.isModalVisible = false
      this.randomNumber = null
      this.currentDrivers = driverData
      driverData.forEach(driver => {
        driver["points"] = 0
      })

    },
    closeBios() {
        this.isBiosVisible = false
        this.randomNumber = null
        this.currentDrivers = driverData
        driverData.forEach(driver => {
          driver["points"] = 0
        })
      },
  },
    // mounted(){
    //     axios
    //         .get('driverData.json')
    //         .then(response => (driverData = response.data))
    //    }
}
  </script>
  
  <style>
.select-main{
  text-align: center;
  min-height: 700px;;
}
.body-img{
  padding: auto;
  display: inline-flex;
  margin-top: 60px;
  margin-bottom: 30px;
  width: 100%
}
.select-page{
  width: 100% !important;
  display: flex;
  float: center;
  flex-direction: column;
}
.logo-img{
  height: calc(95px + 9vw);
  margin: auto;
}
.button55{
  padding: auto;
  margin: auto;
  display: inline-flex;
  padding: 30px 0px;

  }
  .button-21{ 
    width: calc(90px + 4vw);
    padding: 1rem 1.5rem;
    text-align: center;
    font-size: calc(8px + .4vw);
    margin: calc(16px + 2vw) calc(16px + 2vw);
    text-transform: uppercase;
    cursor: pointer;
    background: #288eec;
    box-shadow: -2px 4px 16px #8bc3f6;
    border-radius: 2px;
    border: none;
    color: whitesmoke;
    font-weight: bold;
  }
  .button-21:hover{ 
    background: #356a9c;
    box-shadow: -5px 8px 18px #6599ca;
    font-weight: bold;
  }
        
        
        
        
  
  
  </style>
  