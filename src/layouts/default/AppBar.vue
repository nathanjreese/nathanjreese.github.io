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
      <div class="menu-item"><router-link to="/schedule">Schedule</router-link></div>
      <div class="menu-item"><router-link to="/frequencies">Frequencies</router-link></div>
        <div class="menu-item"><router-link to="/leaders">Leader's Circle</router-link></div>
        <div class="menu-item"><router-link to="/ladder">Ladder Rankings</router-link></div>
    </div>
  </nav>
</template>

<script>

export default {
name: 'appbar',
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
      },

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
nav .main-logo-img{
  height: 70px;
  margin-right: 20px;
}
nav .left-nav{
  width: 40%;
  padding-left: 30px;
  margin-right: 10px;
  color: white;
  font-size: 25px;
  display: inline-flex;
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
nav .menu-item {
color: rgb(194, 194, 194);
padding: 0px 30px;
margin: 0px 0px;
position: relative;
text-align: center;
border-bottom: 5px solid transparent;
display: flex;
transition: 0.4s;
padding-bottom: 20px;
}
nav .menu-item .router-link-active {
 cursor: pointer;
 border-bottom-color: #cd7904 !important;
 font-weight: bold;
 color: whitesmoke
}

nav .menu-item:hover {
border-bottom-color: #cd7904;
}
nav .menu-item a {
color: inherit;
text-decoration: none;
}


nav-mobile {
width: 100%;
background-color: #323232;
display: inline-flex;
align-items: center;
justify-content: center;
flex-direction: row;
}
nav-mobile .main-logo-img{
  height: 70px;
  margin-right: 20px;
}
nav-mobile .left-nav{
  width: 40%;
  padding-left: 30px;
  margin-right: 10px;
  color: white;
  font-size: 25px;
  display: inline-flex;
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
nav-mobile .menu-item {
color: rgb(194, 194, 194);
padding: 0px 30px;
margin: 0px 0px;
position: relative;
text-align: center;
border-bottom: 5px solid transparent;
display: flex;
transition: 0.4s;
padding-bottom: 20px;
}
nav-mobile .menu-item .router-link-active {
 cursor: pointer;
 border-bottom-color: #cd7904 !important;
 font-weight: bold;
 color: whitesmoke
}

nav-mobile .menu-item:hover {
border-bottom-color: #cd7904;
}
nav-mobile .menu-item a {
color: inherit;
text-decoration: none;
}
</style>