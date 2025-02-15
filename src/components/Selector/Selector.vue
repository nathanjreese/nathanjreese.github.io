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
        <Btn @click="showModal()">Start</Btn>
        <Btn @click="showBios(randomDriver)">Random</Btn>
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
  import Btn from '@/components/Partials/Btn'


  export default {
	name: 'selector',
  components: {
    SelectModal,
    TitlePage,
    Bios,
    Results,
    Btn
    },
    data () {
	  return {
      isModalVisible: null,
      resultsTrack: [],
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
          "2024 Finish": "Champion",
          "Team": "Chip Ganassi Racing",
          "Country": "Spain",
          "Birthdate": "1997",
          "Championships": "'21, '23, '24",
          "Indy500s": "0",
          "Color": "yellow",
          "Summary": "Alex Palou won his 3rd IndyCar championship in 4 years last season, cementing himself as one the all-time best with a long career still ahead of him. Off the track Palou became a first time dad in 2024. One thing Palou has yet to do is win on an oval, and he'd love nothing more than to get his first at the Indy 500 where he's came close a few times including a pole in 2023.",
          "picnum": new URL('@/assets/Numbers/10Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/AlexPalouProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/ChipGanassiRacing.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | Indianapolis Motor Speedway 2024",
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
          "Name": "Colton Herta",
          "Number": "26",
          "2024 Finish": "2nd",
          "Team": "Andretti Global",
          "Country": "USA",
          "Birthdate": "2000",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "#fce800",
          "Summary": "Colton Herta fell one spot short of winning an IndyCar championship in 2024, but he finished the season strong winning on an oval for the first time at Nashville Super Speedway. With his fast hands and knack for highlight reel qualifying laps, the son of Bryan Herta is one of the most popular young drivers in the sport. This could be Herta's last season in IndyCar for now as he's rumored to be in line for one of the Cadillac F1 seats in 2026.",
          "picnum": new URL('@/assets/Numbers/26Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/ColtonHertaProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/AndrettiGlobal.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | Nashville Super Speedway 2024",
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
          "Name": "Scott McLaughlin",
          "Number": "3",
          "2024 Finish": "3rd",
          "Team": "Team Penske",
          "Country": "New Zealand",
          "Birthdate": "1993",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "yellow",
          "Summary": "The Supercars legend has established himself as a perennial IndyCar championship contender. He finished 3rd for the 2nd straight year last season, ahead of both of his Penske teammates, Newgarden and Power. McLaughlin has quickly become a fan favorite in IndyCar for his off track personality and his on track performance. He hopes to make another run at the title, and is itching to win the Indy 500 as his teammate, Josef Newgarden, has done the last two years.",
          "picnum": new URL('@/assets/Numbers/3Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/ScottMcLaughlinProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/TeamPenske.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | Indianapolis Motor Speedway 2024",
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
          "Name": "Will Power",
          "Number": "12",
          "2024 Finish": "4th",
          "Team": "Team Penske",
          "Country": "Australia",
          "Birthdate": "1981",
          "Championships": "'14, '22",
          "Indy500s": "'18",
          "Color": "red",
          "Summary": "Will Power bounced back from a disappointing 2023 to finish 4th in 2024, winning races at Road Ameria and Iowa. He had a real shot to win his 3rd IndyCar championship heading into the season finale before a loose seatbelt spoiled his plans. Already one of the all-time greats, Power looks to add to his legacy in 2025 as he shows no signs of slowing down in his mid 40s.",
          "picnum": new URL('@/assets/Numbers/12Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/WillPowerProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/TeamPenske.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | Mid-Ohio 2024",
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
          "Name": "Pato O'Ward",
          "Number": "5",
          "2024 Finish": "5th",
          "Team": "Arrow McLaren",
          "Country": "Mexico",
          "Birthdate": "1999",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "#f78000",
          "Summary": "The popular Mexican driver has established himself as one of the top young talents in IndyCar and a threat to win on every type of track. O'Ward won 3 races in 2024, but lost a heartbreaking Indy 500 on the last lap. Pato hopes this is the year his team can challenge Penske and Ganassi for the championship, and hopes to finally taste the milk in May after several close calls.",
          "picnum": new URL('@/assets/Numbers/5Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/PatricioOwardProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/ArrowMcLaren.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | Indianapolis Motor Speedway 2024",
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
          "Name": "Scott Dixon",
          "Number": "9",
          "2024 Finish": "6th",
          "Team": "Chip Ganassi Racing",
          "Country": "New Zealand",
          "Birthdate": "1980",
          "Championships": "'03, '08, '13, '15, '18, '20",
          "Indy500s": "'08",
          "Color": "orange",
          "Summary": "Scott Dixon won 2 races and finished 6th in 2024. It was a good season overall, but some bad luck in a few races hurt his title chances in the end. The legendary Kiwi has six IndyCar championships and one Indy 500 win. With so many near wins at Indy, the all-time lap leader would love nothing more than put his face on the Borg Warner Trophy a 2nd time.",
          "picnum": new URL('@/assets/Numbers/9Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/ScottDixonProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/ChipGanassiRacing.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | St Pete 2024",
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
          "Name": "Kyle Kirkwood",
          "Number": "27",
          "2024 Finish": "7th",
          "Team": "Andretti Global",
          "Country": "USA",
          "Birthdate": "1998",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "pink",
          "Summary": "After getting 2 wins in his first season with Andretti, Kirkwood went winless in 2024 but he did have a very consistent season and moved from 11th to 7th in the overall standings. Kirkwood, who had one of the most successful IndyCar ladder careers ever, is expected to eventually be a championship contender and has looked fast at the Indy 500 the last 2 years.",
          "picnum": new URL('@/assets/Numbers/27Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/KyleKirkwoodProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/AndrettiGlobal.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | Indianapolis Motor Speedway 2024",
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
          "Name": "Josef Newgarden",
          "Number": "2",
          "2024 Finish": "8th",
          "Team": "Team Penske",
          "Country": "USA",
          "Birthdate": "1990",
          "Championships": "'17, '19",
          "Indy500s": "'23, '24'",
          "Color": "#d21c2a",
          "Summary": "After going winless at the Indy 500 for so many years, Newgarden became the first back to back Indy winner in over 20 years. Outside of Indy though, the season didn't go as planned for the Nashville native as he finished 8th after an up and down season that included a DQ at St Pete and several bad finishes down the stretch. Newgarden will try to be the first driver to ever win 3 in a row at Indy this season, but will need to be more consistent everywhere else to challenge for his 3rd championship.",
          "picnum": new URL('@/assets/Numbers/2Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/JosefNewgardenProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/TeamPenske.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | Indianapolis Motor Speedway 2024",
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
          "Name": "Santino Ferrucci",
          "Number": "14",
          "2024 Finish": "9th",
          "Team": "A.J. Foyt Enterprises",
          "Country": "USA",
          "Birthdate": "1998",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "orange",
          "Summary": "Santino had the best season of his career in 2024 and the best for any Foyt driver in a long time. After getting his first pole at Portland and a season best 4th in both Milwaukee races, he will have some confidence heading into 2025. Will this be the year Ferrucci finally gets a win and puts legendary owner, AJ Foyt, back in victory lane? The divisive young driver isn't for everyone, but he's not one to back down which has endeared him to his fans.",
          "picnum": new URL('@/assets/Numbers/14Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/SantinoFerrucciProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/AJFoytRacing.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | Indianapolis Motor Speedway 2024",
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
          "Name": "Alexander Rossi",
          "Number": "20",
          "2024 Finish": "10th",
          "Team": "Ed Carpenter Racing",
          "Country": "USA",
          "Birthdate": "1991",
          "Championships": "0",
          "Indy500s": "'16",
          "Color": "#4ac5f4",
          "Summary": "After 2 years with McLaren, Rossi moves over to a new look Ed Carpenter Racing, looking to find some of the magic he had early in his career. Rossi would love nothing more than to get a 2nd Indy 500 victory this season, and though they are underdogs most places, ECR always brings fast cars to Indy where they've sat on the pole multiple times. Don't expect Rossi to compete for a championship this season, but the driver/team combination could surprise some people if you're looking for a fun underdog to cheer for.",
          "picnum": new URL('@/assets/Numbers/20Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/AlexanderRossiProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/EdCarpenterRacing.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | Indianapolis Motor Speedway 2024",
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
          "Name": "Christian Lundgaard",
          "Number": "7",
          "2024 Finish": "11th",
          "Team": "Rahal Letterman Lanigan",
          "Country": "Denmark",
          "Birthdate": "2001",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "orange",
          "Summary": "Christian Lundgaard will join McLaren in 2025, as he looks to be the first driver not named Pato to get a win in Papaya orange. After Lundgaard got his first win in 2023, he probably had higher expectations in 2024 but RLL wasn't able to continue the momentum they had in 2023. With a fresh start this season, the young Dane will be one of the more intriguing stories of 2025 as he looks to prove he can consistently fight up front.",
          "picnum": new URL('@/assets/Numbers/7Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/ChristianLundgaardProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/ArrowMcLaren.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | St Pete 2024",
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
          "Name": "Felix Rosenqvist",
          "Number": "60",
          "2024 Finish": "12th",
          "Team": "Meyer Shank Racing",
          "Country": "Sweden",
          "Birthdate": "1991",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "Pink",
          "Summary": "Felix Rosenqvist came out fast in 2024 and looked like he would be challenging for wins all season. The 2nd half of the season was disappointing, but for an MSR team that was struggling to finish in the top 20 in 2023, 12th in the champioship was a big improvement. Felix hopes to build on the positives from last season as MSR begins a technical alliance with Chip Ganassi Racing, and Marcus Armstrong steps into the 66 as Felix's new teammate.",
          "picnum": new URL('@/assets/Numbers/60Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/FelixRosenqvistProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/MeyerShankRacing.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | Indianapolis Motor Speedway 2024",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Felix-Rosenqvist",
          "Twitter": "https://www.twitter.com/FRosenqvist",
          "Instagram": "https://www.instagram.com/frosenqvist",
          "Facebook": "https://www.facebook.com/FelixRosenqvistOfficial",
          "Twitch": "",
          "Youtube":"",
          "Shop": "https://shop.ims.com/collections/indycar-drivers-felix-rosenqvist"
        },
        {
          "Name": "Rinus VeeKay",
          "Number": "18",
          "2024 Finish": "13th",
          "Team": "Dale Coyne Racing",
          "Country": "Netherlands",
          "Birthdate": "2000",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "orange",
          "Summary": "The young Dutchman has an aggressive style on track and unique personality off track that makes him easy to root for. After spending the first 5 years of his career with Ed Carpenter Racing, Veekay moves over to Daly Coyne Racing in 2025. Dale Coyne cycled through several drivers in 2024, but they hope Veekay can provide them a little bit of stability this season, especially at the Indy 500 where Veekay has been one of the best qualifiers on the grid since coming into the series.",
          "picnum": new URL('@/assets/Numbers/18Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/RinusVeekayProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/DaleCoyneRacing.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | St Pete 2024",
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
          "Name": "Marcus Armstrong",
          "Number": "66",
          "2024 Finish": "14th",
          "Team": "Meyer Shank Racing",
          "Country": "New Zealand",
          "Birthdate": "2000",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "pink",
          "Summary": "Marcus Armstrong's first full season in IndyCar had a lot of highs and lows. He scored his first podium at a messy Detroit race and had five top 5s overall but also had 6 finishes outside the top 20. Armstrong will move over to Meyer Shank Racing in 2025, but should have some familiarity with the cars as the team begins to work with Armstrong's former team, Chip Ganassi Racing.",
          "picnum": new URL('@/assets/Numbers/66Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/MarcusArmstrongProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/MeyerShankRacing.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | World Wide Technology Raceway 2024",
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
          "Name": "Marcus Ericsson",
          "Number": "28",
          "2024 Finish": "15th",
          "Team": "Andretti Global",
          "Country": "Sweden",
          "Birthdate": "1990",
          "Championships": "0",
          "Indy500s": "'22",
          "Color": "blue",
          "Summary": "Marcus Ericsson had somewhat of a nighmare season in 2024 after moving from Chip Ganassi Racing to Andretti Global. After finishing 1st and 2nd in the previous 2 Indy 500s, Ericsson finished 33rd last year when another driver spun and collected him on the opening lap. 2025 will be an important one for the Swede as he looks to show 2024 was a fluke and he belongs among the top tier of the series.",
          "picnum": new URL('@/assets/Numbers/28Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/MarcusEricssonProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/AndrettiGlobal.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | St Pete 2024",
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
          "Name": "Graham Rahal",
          "Number": "15",
          "2024 Finish": "18th",
          "Team": "Rahal Letterman Lanigan",
          "Country": "USA",
          "Birthdate": "1989",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "orange",
          "Summary": "Graham Rahal had a season to forget in 2024. The 2nd generation driver's team struggled to ever really find speed at most tracks as RLL seemed to take a step back. At the Indy 500, Graham found himself fighting just to qualify for the 2nd year in a row, but fortunately came out on the right side of it this time. One of the fan friendliest drivers in the paddock, the veteran has a big following that would love to see him turn things around in 2025, especially when the month of May rolls around.",
          "picnum": new URL('@/assets/Numbers/15Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/GrahamRahalProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/RahalLetterman.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | Indianapolis Motor Speedway 2024",
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
          "Name": "Sting Ray Robb",
          "Number": "77",
          "2024 Finish": "20th",
          "Team": "Juncos Hollinger Racing",
          "Country": "USA",
          "Birthdate": "2001",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "orange",
          "Summary": "Sting Ray moves over to Juncos Hollinger Racing in 2025, his 3rd different team in 3 seasons. The highlights of his season were a 9th at Gateway and leading 23 laps at the Indy 500, but struggled to find consistency throughout the season. He likely won't be challenging for wins this year, but Robb hopes to make small improvements and find enough speed to consistently fight for top 10s or 15s. If you like the underdog teams and drivers, this is a good combination for you.",
          "picnum": new URL('@/assets/Numbers/77Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/StingRayRobbProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/JuncosHollinger.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | World Wide Technology Raceway 2024",
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
          "Name": "Kyffin Simpson",
          "Number": "8",
          "2024 Finish": "21st",
          "Team": "Chip Ganassi Racing",
          "Country": "Cayman Islands",
          "Birthdate": "2004",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "blue",
          "Summary": "2024 was a big learning year for Kyffin, who was able to find some consistent clean runs early in the season but never could best his opening race finish of 12th at St Pete. The young driver from the Cayman Islands will look to build upon last season and learn from his teammates, Scott Dixon and Alex Palou, who have 9 championships between them. Simpson likely won't be challenging for wins in 2025, but he has been working hard and racking up seat time in sportscars, and should be an intriguing driver to watch progress this season.",
          "picnum": new URL('@/assets/Numbers/8Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/KyffinSimpsonProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/ChipGanassiRacing.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | Indianapolis Motor Speedway 2024",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Ed-Carpenter",
          "Twitter": "https://www.twitter.com/kyffin_simpson",
          "Instagram": "",
          "Facebook": "https://www.facebook.com/edcarpenterindy",
          "TikTok": "https://www.tiktok.com/@kyffinsimpson",
          "Twitch": "",
          "Youtube":"",
          "Shop": "https://shop.ims.com/collections/indycar-drivers-ed-carpenter"
        },
        {
          "Name": "Christian Rasmussen",
          "Number": "21",
          "2024 Finish": "22nd",
          "Team": "Ed Carpenter Racing",
          "Country": "Denmark",
          "Birthdate": "2000",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "blue",
          "Summary": "Christian Rasmussen showed a lot of speed in 2024, but also made a lot of rookie mistakes. Team owner, Ed Carpenter, recognized the potential Rasmussen showed and rewarded him with an additional season. As the talent depth continues to grow in IndyCar, this will be a pivotal season for Christian to show he can turn the flashes of brilliance into a consistent full season. New teammate, Alexander Rossi, should be a good measuring stick for the young Dane and a good mentor to help make the next step.",
          "picnum": new URL('@/assets/Numbers/21Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/ChristianRasmussenProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/EdCarpenterRacing.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | St Pete 2024",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Ed-Carpenter",
          "Twitter": "https://www.twitter.com/ChristianR_DK",
          "Instagram": "",
          "Facebook": "https://www.facebook.com/edcarpenterindy",
          "TikTok": "",
          "Twitch": "",
          "Youtube":"",
          "Shop": "https://shop.ims.com/collections/indycar-drivers-ed-carpenter"
        },
        {
          "Name": "Nolan Siegel",
          "Number": "6",
          "2024 Finish": "23rd",
          "Team": "Arrow McClaren",
          "Country": "USA",
          "Birthdate": "2004",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "#4ac5f4",
          "Summary": "Nolan Siegel had a bit of a rollercoaster 2024. He began the season in IndyNXT with the plan to run a few IndyCar races with Dale Coyne Racing, but midway through the season Arrow McLaren made a shocking decision to sign the young American to a contract in the number 6 car, hoping Siegel was an untapped talent that could grow with the team. He only managed one top 10 in his shortened IndyCar season but did get a class win at the 24 Hours of Le Mans. At only 20 years old and with a more stable situation coming into 2025, expect Siegel to be much improved this year.",
          "picnum": new URL('@/assets/Numbers/6Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/NolanSiegelProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/ArrowMclaren.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | Long Beach 2024",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Nolan-Siegel",
          "Twitter": "https://twitter.com/nolan_siegel",
          "Instagram": "https://www.instagram.com/nolansiegel",
          "Facebook": "https://www.facebook.com/NolanSiegelOfficial",
          "Twitch": "",
          "TikTok": "",
          "Youtube":"https://www.youtube.com/channel/UC03XUPVw0P9N4qZsO-UNDBw",
          "Shop": "https://shop.indycar.com/search?q=siegel"
        },
        {
          "Name": "David Malukas",
          "Number": "4",
          "2024 Finish": "24th",
          "Team": "AJ Foyt Enterprises",
          "Country": "USA",
          "Birthdate": "2001",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "pink",
          "Summary": "One of IndyCar's most popular young drivers, David Malukas had high hopes heading into 2024 after signing a dream contract with McLaren. A biking accident dashed his hopes though and he was released before ever competing in a race for the team. Malukas was quickly signed as a replacement driver by Meyer Shank Racing though and was instanstly fast. 2025 will be a fresh start for Malukas as he moves over to the much improved AJ Foyt Racing after they formed a partnership with Team Penske. Malukas will be one of the more intriguing drivers to watch this season as rumors swirl about him potentially being next in line for a ride with Team Penske.",
          "picnum": new URL('@/assets/Numbers/4Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/DavidMalukasProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/AJFoytRacing.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | Mid-Ohio 2024",
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
          "Name": "Conor Daly",
          "Number": "78",
          "2024 Finish": "26th",
          "Team": "Juncos Hollinger Racing",
          "Country": "USA",
          "Birthdate": "1991",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "green",
          "Summary": "Conor Daly will drive for Juncos Hollinger Racing in 2025, the team he filled in for last year to help secure a top 22 position in the standings and the team he won a Star Mazda championship with way back in 2010. The popular Hoosier has become one the most vocal proponents of IndyCar, using his Speed Street podcast as his platform. Daly hopes to prove he's more than just a serviceable fill-in and oval specialist this season. Any win would help him stay in the series but a win at the Indy 500, a short distance from where he grew up, would be life changing. It may seem unlikely, but Daly is coming off 3 top 10 finishes there with a lot of laps led over the last 4 years.",
          "picnum": new URL('@/assets/Numbers/78Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/ConorDalyProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/JuncosHollinger.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | World Wide Technology Raceway 2024",
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
          "Name": "Callum Ilott",
          "Number": "90",
          "2024 Finish": "33rd",
          "Team": "Prema Racing",
          "Country": "United Kingdom",
          "Birthdate": "1998",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "orange",
          "Summary": "After spending most of the 2024 IndyCar season on the sidelines outside of a few fill-in appearances with McLaren, Callum Ilott returns full-time with the new Prema Racing team. Prema, a highly successful F1 ladder team, is placing a lot of trust in Ilott to lead their new team alongside rookie, Robert Shwartzman. Ilott showed a lot of promise in previous seasons with Juncos and should be a fun story to watch in 2025, but a little patience might be needed before the team starts competing for wins.",
          "picnum": new URL('@/assets/Numbers/90Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/CallumIlottProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/PremaRacing.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | St Pete 2024",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Callum-Ilott",
          "Twitter": "https://www.twitter.com/Callum_Ilott",
          "Instagram": "https://www.instagram.com/Callum_Ilott",
          "Facebook": "https://www.facebook.com/Callumilottracing",
          "Twitch": "https://www.twitch.tv/callum_ilott",
          "Youtube":"",
          "Shop": "https://www.juncoshollinger.com/shop/"
        },
        {
          "Name": "Robert Shwartzman",
          "Number": "83",
          "2024 Finish": "Rookie",
          "Team": "Prema Racing",
          "Country": "Russia/Israel",
          "Birthdate": "1999",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "green",
          "Summary": "The Ferrari reserve driver is making the switch to IndyCar this season after spending a year in the top class of WEC with Ferrari. Shwartzman aims to secure Rookie of the Year honors with Prema Racing, a team he knows well from his three years competing with them in F3 and F2. However, with ovals being completely new to Schwartzman and driving for a new team in the series, the challenge will not be easy.",
          "picnum": new URL('@/assets/Numbers/83Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/RobertShwartzmanProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/PremaRacing.png', import.meta.url),
          "picref": "Photo credit: Prema Racing",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Callum-Ilott",
          "Twitter": "https://www.twitter.com/ShwartzmanRob",
          "Instagram": "https://www.instagram.com/Callum_Ilott",
          "Facebook": "https://www.facebook.com/Callumilottracing",
          "Twitch": "https://www.twitch.tv/callum_ilott",
          "Youtube":"",
          "Shop": "https://www.juncoshollinger.com/shop/"
        },
        {
          "Name": "Louis Foster",
          "Number": "45",
          "2024 Finish": "Rookie",
          "Team": "Rahal Letterman Lanigan",
          "Country": "United Kingdom",
          "Birthdate": "2003",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "red",
          "Summary": "After dominating the IndyNXT championship, Louis Foster makes the jump to IndyCar in 2025 with Rahal Letterman Lanigan. The young Brit has shown a calm demeanor and precision of a veteran in his driving while coming up the IndyCar ladder. He starts his IndyCar career with an RLL team that has struggled, but it's a veteran team with the resources to bounce back. IndyCar wins should be in Foster's future eventually, but top 10s and rookie of the year might be a more realistic goal for Foster in year one. He is a good choice for fans looking to start fresh with a new driver for the long term.",
          "picnum": new URL('@/assets/Numbers/45Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/LouisFosterProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/RahalLetterman.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | World Wide Technology Raceway 2024",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Callum-Ilott",
          "Twitter": "https://www.twitter.com/_LouisFoster",
          "Instagram": "https://www.instagram.com/Callum_Ilott",
          "Facebook": "https://www.facebook.com/Callumilottracing",
          "Twitch": "https://www.twitch.tv/callum_ilott",
          "Youtube":"",
          "Shop": "https://www.juncoshollinger.com/shop/"
        },
         {
          "Name": "Devlin DeFrancesco",
          "Number": "30",
          "2024 Finish": "N/A",
          "Team": "Rahal Letterman Lanigan",
          "Country": "Canada",
          "Birthdate": "2000",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "orange",
          "Summary": "After spending a year on the sidelines, DeFrancesco returns to IndyCar with RLL in 2025. The young Canadian had a couple of forgettable seasons with Andretti, but hopes to make some strides this season and prove he deserves to stick around. Don't expect DeFrancesco to contend for any wins this season, but if you like an underdog he certainly fits that criteria. A realistic goal for Devlin will be a top 20 finish in the season standings.",
          "picnum": new URL('@/assets/Numbers/30Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/DevlinDeFrancescoBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/RahalLetterman.png', import.meta.url),
          "picref": "Photo credit: Joe Skibinski | Indycar.com",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Devlin-DeFrancesco",
          "Twitter": "https://www.twitter.com/DevlinDeFran",
          "Instagram": "https://www.instagram.com/devlindefran",
          "Facebook": "https://www.facebook.com/devlindefran",
          "Twitch": "",
          "Youtube":"",
          "Shop": "https://shop.ims.com/pages/search-results-page?q=Devlin"
        },
        {
          "Name": "Jacob Abel",
          "Number": "51",
          "2024 Finish": "Rookie",
          "Team": "Dale Coyne Racing",
          "Country": "USA",
          "Birthdate": "2001",
          "Championships": "0",
          "Indy500s": "0",
          "Color": "red",
          "Summary": "Jacob Abel joins Dale Coyne Racing for his rookie season in IndyCar. The 2024 IndyNXT runner-up won 3 races but couldn't hold off a dominant Louis Foster, with whom he will continue his rivalry with in IndyCar as they both battle for rookie of the year. The Louisville, Kentucky native showed a lot of promise scoring 10 podiums last season in IndyNXT but might be in for a challenging rookie season with the underdog Dale Coyne Racing. A good season for Abel will include consistent clean runs with some top 10-15 finishes that he can build on for the future.",
          "picnum": new URL('@/assets/Numbers/51Number.png', import.meta.url),
          "biopic": new URL('@/assets/Drivers/JacobAbelProfileBlur.jpeg', import.meta.url),
          "teampic": new URL('@/assets/Teams/DaleCoyneRacing.png', import.meta.url),
          "picref": "Photo credit: Nathan Reese | Road America 2024",
          "Profile": "https://www.indycar.com/Series/IndyCar-Series/Rinus-VeeKay",
          "Twitter": "https://www.twitter.com/RinusVeeKay",
          "Instagram": "https://www.instagram.com/RinusVeeKay",
          "Facebook": "https://www.facebook.com/RinusVeeKay",
          "TikTok": "",
          "Twitch": "",
          "Youtube":"https://www.youtube.com/@vankalmthoutauto",
          "Shop": "https://shop.ims.com/collections/rinus-veekay"
        },
        // {
        //   "Name": "Toby Sowery",
        //   "Number": "51",
        //   "2024 Finish": "32nd",
        //   "Team": "Dale Coyne Racing",
        //   "Country": "United Kingdom",
        //   "Birthdate": "1996",
        //   "Championships": "0",
        //   "Indy500s": "0",
        //   "Color": "orange",
        //   "Summary": "Toby Sowery made his long awaited debut ",
        //   "picnum": new URL('@/assets/Numbers/51Number.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/TobySoweryProfileBlur.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/DaleCoyneRacing.png', import.meta.url),
        //   "picref": "Photo credit: Nathan Reese | St Pete 2024",
        //   "Profile": "https://www.indycar.com/Series/IndyCar-Series/Rinus-VeeKay",
        //   "Twitter": "https://www.twitter.com/RinusVeeKay",
        //   "Instagram": "https://www.instagram.com/RinusVeeKay",
        //   "Facebook": "https://www.facebook.com/RinusVeeKay",
        //   "TikTok": "",
        //   "Twitch": "",
        //   "Youtube":"https://www.youtube.com/@vankalmthoutauto",
        //   "Shop": "https://shop.ims.com/collections/rinus-veekay"
        // },
        // {
        //   "Name": "Romain Grosjean",
        //   "Number": "77",
        //   "2024 Finish": "13th",
        //   "Team": "Juncos Hollinger Racing",
        //   "Country": "France",
        //   "Birthdate": "1986",
        //   "Championships": "0",
        //   "Indy500s": "0",
        //   "Color": "green",
        //   "Summary": "After an impressive start in 2023, Grosjean looked like a legit threat to contend for a title. Several potential wins ended in crashes for Grosjean and the season went south. The former F1 star moves over to Juncos Hollinger in 2024 where he'll once again be thrown into an underdog role. Can Romain be the driver to finally put Juncos in IndyCar victory lane? Whatever the result, this will be one of the fun stories to watch in 2024.",
        //   "picnum": new URL('@/assets/Numbers/77Number.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/RomainGrosjeanProfile.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/JuncosHollinger.png', import.meta.url),
        //   "picref": "Photo credit: Chris Jones | Indycar.com",
        //   "Profile": "https://www.indycar.com/Series/IndyCar-Series/Romain-Grosjean",
        //   "Twitter": "https://www.twitter.com/RGrosjean",
        //   "Instagram": "https://www.instagram.com/grosjeanromain",
        //   "Facebook": "https://www.facebook.com/grosjeanromain",
        //   "TikTok": "https://www.tiktok.com/@grosjeanromain8",
        //   "Twitch": "https://www.twitch.tv/grosjeanromain",
        //   "Youtube":"https://www.youtube.com/@RomainGrosjean8",
        //   "Shop": "https://shop.ims.com/collections/romain-grosjean"
        // },
        // {
        //   "Name": "Agustín Canapino",
        //   "Number": "78",
        //   "2024 Finish": "21st",
        //   "Team": "Juncos Hollinger Racing",
        //   "Country": "Argentina",
        //   "Birthdate": "1990",
        //   "Championships": "0",
        //   "Indy500s": "0",
        //   "Color": "orange",
        //   "Summary": "Canapino surprised a lot of people jumping into an open wheel car from Argentinan touring cars and staying relatively competitive with the rest of the field. He will be joined in 2024 at Juncos by Romain Grosjean, who will bring a lot of experience to the team. But after some team drama in 2023 for both drivers, everyone will be watching if the teammates get together on track.",
        //   "picnum": new URL('@/assets/Numbers/CanapinoNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/AgustinCanapinoProfile.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/JuncosHollinger.png', import.meta.url),
        //   "picref": "Photo credit: Nathan Reese | St Pete 2024",
        //   "Profile": "https://www.indycar.com/Series/IndyCar-Series/Agustin-Canapino",
        //   "Twitter": "https://www.twitter.com/AgustinCanapino",
        //   "Instagram": "https://www.instagram.com/agustincanapino",
        //   "Facebook": "https://www.facebook.com/AgustinCanapinoSitioOficial",
        //   "TikTok": "https://www.tiktok.com/@agustincanapinooficial",
        //   "Twitch": "https://www.twitch.tv/agustincanapino",
        //   "Youtube":"",
        //   "Shop": "https://www.juncoshollinger.com/shop/"
        // },
        // {
        //   "Name": "Ed Carpenter",
        //   "Number": "20",
        //   "2024 Finish": "30th",
        //   "Team": "Ed Carpenter Racing",
        //   "Country": "USA",
        //   "Birthdate": "1981",
        //   "Championships": "0",
        //   "Indy500s": "0",
        //   "Color": "blue",
        //   "Summary": "One of the last throwbacks to the oval only IRL days, Ed is also the only owner/driver left in the series. Ed will run the #20 on ovals, splitting the ride with rookie Christian Rasmussen who will run the road and street courses in the car. As an Indy native, an Ed Carpenter Indy 500 win would be a popular one, and he will likely keep trying as long as he's competitive.",
        //   "picnum": new URL('@/assets/Numbers/CarpenterNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/EdCarpenterProfile.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/EdCarpenterRacing.png', import.meta.url),
        //   "picref": "Photo credit: Chris Owens | Indycar.com",
        //   "Profile": "https://www.indycar.com/Series/IndyCar-Series/Ed-Carpenter",
        //   "Twitter": "https://www.twitter.com/edcarpenter20",
        //   "Instagram": "",
        //   "Facebook": "https://www.facebook.com/edcarpenterindy",
        //   "TikTok": "",
        //   "Twitch": "",
        //   "Youtube":"",
        //   "Shop": "https://shop.ims.com/collections/indycar-drivers-ed-carpenter"
        // },
        // {
        //   "Name": "Linus Lundqvist",
        //   "Number": "8",
        //   "2024 Finish": "Rookie",
        //   "Team": "Chip Ganassi Racing",
        //   "Country": "Sweden",
        //   "Birthdate": "1999",
        //   "Championships": "0",
        //   "Indy500s": "0",
        //   "Color": "blue",
        //   "Summary": "The 2022 IndyNXT champion was on the outside looking in when the silly season musical chairs stopped ahead of last season. He eventually got a shot after an injury to Simon Pagenaud and the Swede was so impressive that he was hired by Chip Ganassi to replace his fellow countryman, Marcus Ericsson, in the #8 car for 2024. The expectations will be high considering Lundqvist is a rookie, but not many would be shocked to see him score a victory at some point this season.",
        //   "picnum": new URL('@/assets/Numbers/LundqvistNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/LinusLundqvistProfile.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/ChipGanassiRacing.png', import.meta.url),
        //   "picref": "Photo credit: Nathan Reese | indycardrivers.com",
        //   "Profile": "https://www.indycar.com/Series/IndyCar-Series/Ed-Carpenter",
        //   "Twitter": "https://www.twitter.com/edcarpenter20",
        //   "Instagram": "",
        //   "Facebook": "https://www.facebook.com/edcarpenterindy",
        //   "TikTok": "",
        //   "Twitch": "",
        //   "Youtube":"",
        //   "Shop": "https://shop.ims.com/collections/indycar-drivers-ed-carpenter"
        // },
        // {
        // {
        //   "Name": "Pietro Fittipaldi",
        //   "Number": "30",
        //   "2024 Finish": "N/A",
        //   "Team": "Rahal Letterman Lanigan",
        //   "Country": "USA/Brazil",
        //   "Birthdate": "1996",
        //   "Championships": "0",
        //   "Indy500s": "0",
        //   "Color": "red",
        //   "Summary": "Fittipaldi has taken a wild path to landing a solid full time IndyCar seat. The grandson of F1 and IndyCar legend Emerson Fittipaldi, Pietro has been in the NASCAR Whelen series, multiple stints in IndyCar with Dale Coyne, F1, and Stock Car Brazil among others. While not technically a rookie, this will be Pietro's first full IndyCar season where he'll join Rahal Letterman Lanigan. He should be a fun driver to keep an eye on to see if he can establish himself as a serious long term contender in IndyCar.",
        //   "picnum": new URL('@/assets/Numbers/FittipaldiNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/PietroFittipaldiProfile.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/RahalLetterman.png', import.meta.url),
        //   "picref": "Photo credit: James Black | Indycar.com",
        //   "Profile": "https://www.indycar.com/Series/IndyCar-Series/Pietro-Fittipaldi",
        //   "Twitter": "https://www.https://twitter.com/PiFitti",
        //   "Instagram": "https://www.instagram.com/pifitti",
        //   "Facebook": "",
        //   "TikTok": "https://www.tiktok.com/@fittibros",
        //   "Twitch": "https://www.twitch.tv/fittipaldibrothers",
        //   "Youtube":"https://www.youtube.com/@FittipaldiBrothers",
        //   "Shop": "https://shop.indycar.com/search?q=fittipaldi"
        // },
        // {
        //   "Name": "Dale Coyne TBD",
        //   "Number": "18",
        //   "2024 Finish": "N/A",
        //   "Team": "Dale Coyne Racing",
        //   "Country": "Parts Unknown",
        //   "Birthdate": "2000",
        //   "Championships": "0",
        //   "Indy500s": "0",
        //   "Color": "orange",
        //   "Summary": "This is a driver that everyone can agree will be a big underdog this season and is really looking to establish themselves in IndyCar. With little to no testing this offseason and agreeing to a last minute part-time deal, it won't be easy but everyone loves an underdog and will be hoping to see them make the most of their ride with Dale Coyne.",
        //   "picnum": new URL('@/assets/Numbers/HarveyNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/UnknownDriver.png', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/DaleCoyneRacing.png', import.meta.url),
        //   "picref": "",
        //   "Profile": "https://www.indycar.com",
        //   "Twitter": "https://www.twitter.com/Indycar",
        //   "Instagram": "https://www.instagram.com/Indycar",
        //   "Facebook": "https://www.facebook.com/Indycar",
        //   "Twitch": "",
        //   "Youtube":"https://www.youtube.com/@IndyCar",
        //   "Shop": "https://shop.ims.com/"
        // },
        // {
        //   "Name": "Colin Braun",
        //   "Number": "51",
        //   "2024 Finish": "Rookie",
        //   "Team": "Dale Coyne Racing",
        //   "Country": "USA",
        //   "Birthdate": "1988",
        //   "Championships": "0",
        //   "Indy500s": "0",
        //   "Color": "#4ac5f4",
        //   "Summary": "After a few junior open wheel championships, Colin Braun has spent the majority of his career racing and winning in the IMSA Weathertech series, but he's also competed in NASCAR and Rallycross. Braun will finally realize his dream of driving in IndyCar as he runs a part-time schedule with Dale Coyne. The 35 year old rookie will be a popular underdog as he tries to prove he belongs in the series.",
        //   "picnum": new URL('@/assets/Numbers/BraunNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/ColinBraun.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/CoynewithRWR.png', import.meta.url),
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
        //   "2024 Finish": "24th",
        //   "Team": "Dale Coyne Racing",
        //   "Country": "United Kingdom",
        //   "Birthdate": "1993",
        //   "Championships": "0",
        //   "Indy500s": "0",
        //   "Color": "orange",
        //   "Summary": "After being dropped by RLL late in the 2023 season, Jack Harvey was left without a full-time ride for 2024. He was able to secure a part-time ride with Dale Coyne Racing where he will drive 14 races and hope to show some of the promise he did with Meyer Shank Racing to prove he still belongs in the series.",
        //   "picnum": new URL('@/assets/Numbers/HarveyNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/JackHarveyProfile.jpeg', import.meta.url),
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
        //   "Name": "Théo Pourchaire",
        //   "Number": "6",
        //   "2024 Finish": "Rookie",
        //   "Team": "Arrow McLaren Racing",
        //   "Country": "France",
        //   "Birthdate": "2003",
        //   "Championships": "0",
        //   "Indy500s": "0",
        //   "Color": "orange",
        //   "Summary": "The reigning F2 champion steps into the #6 Arrow McLaren ride after David Malukas was released drom the team due to injury. Other than the Indy 500, the Frenchman will finish out the season for the team and hope to impress enough to get an offer beyond this season. Théo may still have an eye on F1 though as he remains a reserve driver for Alfa Romeo.",
        //   "picnum": new URL('@/assets/Numbers/PourchaireNumber.png', import.meta.url),
        //   "biopic": new URL('@/assets/Drivers/TheoPourchaireProfile.jpeg', import.meta.url),
        //   "teampic": new URL('@/assets/Teams/ArrowMcLaren.png', import.meta.url),
        //   "picref": "Photo credit: Nathan Reese | indycardrivers.com",
        //   "Profile": "https://www.indycar.com/Series/IndyCar-Series/Theo-Pourchaire",
        //   "Twitter": "https://twitter.com/TPourchaire",
        //   "Instagram": "https://www.instagram.com/theopourchaire21/?hl=en",
        //   "Facebook": "https://www.facebook.com/TheoPourchaire/",
        //   "TikTok": "https://www.tiktok.com/@theopourchaire21?",
        //   "Twitch": "",
        //   "Youtube":"",
        //   "Shop": "https://shop.ims.com/collections/theo-pourchaire"
        // },
        // {
        //   "Name": "Hélio Castroneves",
        //   "Number": "06",
        //   "2024 Finish": "18th",
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
        //   "2024 Finish": "32nd",
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
        //   "2024 Finish": "Rookie",
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
        //   "Name": "Simon Pagenaud",
        //   "Number": "60",
        //   "2024 Finish": "15th",
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
        //   "2024 Finish": "19th",
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
        // }
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
      console.log("THREE: ", threeDrivers)
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
  </style>
  