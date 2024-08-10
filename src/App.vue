<template>
    <v-card>
      <default-bar v-if="!isMobile"/>
      <v-layout>
        <v-app-bar 
          color="primary"
          class="app-bar-mobile"
          v-if="isMobile"
        >
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <div class="text-no-wrap">
            <div class="mobile-nav-text">IndyCar Drivers App</div>
            <div class="mobile-nav-img">
              <img ref="image" 
                src="@/assets/DriverLogo.png"
                alt="Driver Logo"
                
                contain
                class="mobile-logo-img"
                >
            </div>
          </div>
        </v-app-bar> 
        <v-navigation-drawer
          v-model="drawer"
          color="primary"
          location="top"
          temporary
          class='drawer-menu'
          style="width: 225px; height: 350px"
        >
          <v-list>
            <v-list-item prepend-icon="mdi-heart-box-outline" title="Favorite Driver" to="/selector" color="blue"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group" title="Silly Season" to="/silly" color="blue"></v-list-item>
            <v-list-item prepend-icon="mdi-calendar" title="Schedule" to="/schedule" color="blue"></v-list-item>
            <v-list-item prepend-icon="mdi-cash-multiple" title="Leader's Circle" to="/leaders" color="blue"></v-list-item>
            <v-list-item prepend-icon="mdi-radio" title="Driver Frequencies" to="/frequencies" color="blue"></v-list-item>
            <v-list-item prepend-icon="mdi-ladder" title="Ladder Rankings" to="/ladder" color="blue"></v-list-item>
            <v-list-item prepend-icon="mdi-earth" title="Nation's Cup" to="/nations" color="blue"></v-list-item>
       </v-list>
        </v-navigation-drawer> 
        <router-view />
      </v-layout>
    </v-card>
  </template>

  <script>
    import DefaultBar from './layouts/default/AppBar.vue'

    export default {
      components: {
      DefaultBar
      },
      data: () => ({
        drawer: false,
        group: null,
        items: [
          {
            title: 'Silly Season',
            value: '/silly',
          },
          {
            title: 'Rolex 24 Tracker',
            value: '/rolex',
          },
          {
            title: 'Leaders Circle',
            value: '/leaders',
          }
        ],
      }),
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

<style scoped>
.v-toolbar {
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    position: relative;
    transition: inherit;
    width: 100%;
}
.app-bar {
  padding: 20px 0px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  color: whitesmoke;
  height: 90px;
  overflow-y: auto;
  overflow-x: visible;
  }
  .app-bar-mobile {
  margin-bottom: 110px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  color: whitesmoke;
  }
  .mobile-logo-img{
    height: 40px;
    margin-right: 20px;
  }
  .headline {
    text-align: center;
    align-items: center;
    font-size: 30px;
  }
  .text-no-wrap{
    display: inline-flex;
    margin-bottom: 15px;
    width: 100%;
    flex-direction: row;
    position: relative;
    float: center;
    padding-left: 60px;
  }
  .mobile-nav-text{
    margin-top: 25px;
    padding-right: 20px;
    font-size: calc(15px + 1vw);
  }
  .mobile-nav-img{
    margin-top: 18px;
    padding-right: 20px;
    font-size: 20px;
  }
  .drawer-menu{
    height: 900px;
  }
  </style>