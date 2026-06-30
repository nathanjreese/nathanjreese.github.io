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
          location="left"
          temporary
          class='drawer-menu'
        >
          <v-list class="mobile-menu-list">
            <v-list-item prepend-icon="mdi-heart-box-outline" title="Favorite Driver" to="/selector"></v-list-item>
            <v-list-item prepend-icon="mdi-racing-helmet" title="Silly Season" to="/silly"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group" title="Teams" to="/teams"></v-list-item>
            <v-list-item prepend-icon="mdi-calendar" title="Schedule" to="/schedule"></v-list-item>
            <v-list-item prepend-icon="mdi-radio" title="Driver Frequencies" to="/frequencies"></v-list-item>
            <!-- <v-list-item prepend-icon="mdi-cash-multiple" title="Leader's Circle" to="/leaders" color="blue"></v-list-item> -->
            <!-- <v-list-item prepend-icon="mdi-ladder" title="Ladder Rankings" to="/ladder" color="blue"></v-list-item> -->
            <!-- <v-list-item prepend-icon="mdi-alphabetical-variant" title="Wordle" to="/wordle" color="blue"></v-list-item> -->
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
            title: 'Leaders Circle',
            value: '/leaders',
          }
        ],
        // Route to meta image mapping
        routeImages: {
          'Home': 'https://indycardrivers.com/Preview.png',
          'Selector': 'https://indycardrivers.com/Preview.png',
          'Teams': 'https://indycardrivers.com/TeamsPreview.png',
          'Schedule': 'https://indycardrivers.com/SchedulePreview.png',
          'Frequencies': 'https://indycardrivers.com/FrequenciesPreview.png',
          'Silly': 'https://indycardrivers.com/SillySeasonPreview.png',
        }
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
        $route() {
          this.updateMetaTags();
        }
      },
      mounted() {
        this.updateMetaTags();
      },
      methods: {
        updateMetaTags() {
          const routeName = this.$route.name || 'Home';
          const imageUrl = this.routeImages[routeName] || 'https://indycardrivers.com/Preview.png';
          const pageTitle = routeName || 'IndyCar Drivers App';
          
          // Update OG image meta tags
          this.updateOrCreateMetaTag('property', 'og:image', imageUrl);
          this.updateOrCreateMetaTag('name', 'twitter:image', imageUrl);
          this.updateOrCreateMetaTag('itemprop', 'image', imageUrl);
          
          // Update OG title and description if needed
          this.updateOrCreateMetaTag('property', 'og:title', pageTitle);
          this.updateOrCreateMetaTag('name', 'twitter:title', pageTitle);
        },
        updateOrCreateMetaTag(attrName, attrValue, content) {
          let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
          if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute(attrName, attrValue);
            document.head.appendChild(tag);
          }
          tag.setAttribute('content', content);
        }
      }
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
    margin-bottom: 90px;
  width: 100%;
  text-align: center;
  font-weight: bold;
    color: #f4f8ff;
    background: linear-gradient(120deg, #12233d, #1c355a) !important;
    border-bottom: 1px solid rgba(214, 228, 251, 0.2);
    box-shadow: 0 10px 22px rgba(12, 24, 43, 0.25);
  }
  .mobile-logo-img{
      height: 34px;
      margin-right: 12px;
      margin-top: 5px;
  }
  .headline {
    text-align: center;
    align-items: center;
    font-size: 30px;
  }
  .text-no-wrap{
    display: inline-flex;
    margin-bottom: 4px;
    width: 100%;
    flex-direction: row;
    position: relative;
    align-items: center;
    justify-content: center;
    padding-left: 12px;
  }
  .mobile-nav-text{
    margin-top: 8px;
    padding-right: 10px;
    font-size: calc(14px + .7vw);
    font-weight: 700;
    letter-spacing: 0.01em;
  }
  .mobile-nav-img{
    margin-top: 2px;
    padding-right: 6px;
    font-size: 20px;
  }
  .drawer-menu{
    width: 255px !important;
    height: 100% !important;
  }
  .mobile-menu-list {
    padding: 10px;
  }
  :deep(.mobile-menu-list .v-list-item) {
    border-radius: 10px;
    margin-bottom: 6px;
    color: #d6e4fb;
    background: rgba(214, 228, 251, 0.08);
  }
  :deep(.mobile-menu-list .v-list-item:hover) {
    background: rgba(214, 228, 251, 0.18);
  }
  :deep(.mobile-menu-list .v-list-item--active) {
    background: linear-gradient(120deg, #2f76d8, #1f5ead);
    color: #ffffff;
  }
  </style>