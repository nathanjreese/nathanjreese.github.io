<template>
  <nav id="vue" v-if="!isMobile">
    <div class="left-nav">
      <router-link class ="routlink" to="/">
      <img ref="image" 
          src="@/assets/DriverLogo.png"
          alt="Driver Logo"
          
          contain
          class="main-logo-img"
          >
        </router-link>
          <div class="logo-title"><b>IndyCar</b> Drivers App</div>
    </div>
    <div class="right-nav">
      <!-- <div class="menu-item"><router-link to="/daytona">Daytona Tracker</router-link></div> -->
      <div class="menu-item"><router-link to="/selector">Driver Selector</router-link></div>
      <div class="menu-item"><router-link to="/silly">Silly Season</router-link></div>
      <!-- <div class="menu-item"><router-link to="/schedule">Schedule</router-link></div> -->
      <div class="menu-item"><router-link to="/frequencies">Frequencies</router-link></div>
        <div class="menu-item"><router-link to="/leaders">Leader's Circle</router-link></div>
        <!-- <div class="menu-item"><router-link to="/ladder">Ladder Rankings</router-link></div> -->
    </div>
  </nav>
</template>
<!-- <template>
  <nav id="vue" v-if="!isMobile">
    <div class="left-nav">
    <router-link class ="routlink" to="/">
      <img ref="image" 
          src="@/assets/DriverLogo.png"
          alt="Driver Logo"
          
          contain
          class="main-logo-img"
          >
        </router-link>
          <div class="logo-title"><b>IndyCar</b> Drivers App</div>
    </div>
    <div class="right-nav">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          class="menu-button"
          color="primary"
          v-bind="props"
        >
          Interactive
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in menuItems.interactive"
          :key="index"
          :value="index"
        >
          <v-list-item-title>
            <router-link :to=item.route>{{ item.title }}</router-link>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
      class="menu-button"
      color="primary"
    >
      Rankings

      <v-menu activator="parent">
        <v-list>
          <v-list-item
            v-for="(item, index) in menuItems.rankings"
            :key="index"
            :value="index"
          >
            <v-list-item-title>
              <router-link :to=item.route>{{ item.title }}</router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>

    <v-btn
    class="menu-button"
      id="menu-activator"
      color="primary"
    >
      Information
    </v-btn>

    <v-menu activator="#menu-activator">
      <v-list>
        <v-list-item
          v-for="(item, index) in menuItems.information"
          :key="index"
          :value="index"
        >
          <v-list-item-title>
            <router-link :to=item.route>{{ item.title }}</router-link>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </div>
  </nav>
</template> -->

<script>

export default {
name: 'appbar',
data () {
      return {
        infoActive: false,
        menuItems: {
          interactive: [
            { title: `Driver Selector`, route: 'selector' },
            { title: `Silly Season`, route: 'silly' }
          ],
          rankings: [
            { title: `Leader's Circle`, route: 'leaders' },
            { title: `Ladder Rankings`, route: 'ladder' },
            // { title: `Nations Cup`, route: 'nations' }
          ],
          information: [
            { title: `Schedule`, route: 'schedule' },
            { title: `Frequencies`, route: 'frequencies' },
          ]
        }
  }
},
components: {
},
methods: {
  showPage() {
    this.$emit('close')
  }
},
computed: {
  isMobile() {
      if( screen.width <= 1000 ) {
          return true;
      }
      else {
          return false;
      }
  },
},
watch: {
        group () {
          this.drawer = false
        },
      }

}
</script>
<style>
nav {
width: 100%;
background-color: #323232;
display: inline-flex;
align-items: center;
justify-content: center;
flex-direction: row;
font-size: 17px;
}
a{
  text-decoration: none;

}
nav .main-logo-img{
  height: 60px;
  margin-right: 20px;
}
nav .left-nav{
  width: 35%;
  padding-left: 30px;
  margin-right: 10px;
  color: white;
  font-size: 25px;
  display: inline-flex;
}
nav .right-nav{
  width: 70%;
  margin: 20px 30px;
  background-color: #323232;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  .menu-button{
    height: 50px;
    margin: 00px 10px;
    .a {
      text-decoration: none;
      color: black;
    }
  }
}
nav .logo-title{
  color: whitesmoke;
  margin-top: 10px;
}
nav .menu-item {
color: rgb(194, 194, 194);
padding: 5px 3px;
height: 50px;
margin: 0px 0px;
width: 145px;
position: relative;
font-size: 16px;
text-align: center;
border-bottom: 5px solid transparent;
display: flex;
transition: 0.4s;
/* border-right: 2px solid #b7b7b7; */
padding-top: 7px;
border-left: 1px solid rgb(99, 99, 99);
border-right: 1px solid rgb(99, 99, 99);
}
nav .menu-item .router-link-active {
 cursor: pointer;
 border-bottom-color: #cd7904 !important;
 font-weight: bold;
 color: whitesmoke;
}

nav .menu-item:hover {
border-bottom-color: #cd7904;
}
nav .menu-item a {
color: inherit;
text-decoration: none;
padding: 0px 3px 0px 4px;
margin: auto;
}

div .right-nav{
  width: 900px;
  margin: 0px 30px;
  padding-top: 50px;
  background-color: #323232;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}
div .logo-title{
  margin-top: 10px;
}
</style>