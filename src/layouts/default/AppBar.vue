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
      <div class="nav-card">
        <router-link class="menu-item" to="/selector">
          <v-icon class="menu-icon">mdi-account-search</v-icon>
          <span>Drivers</span>
        </router-link>
        <router-link class="menu-item" to="/teams">
          <v-icon class="menu-icon">mdi-account-group</v-icon>
          <span>Teams</span>
        </router-link>
        <router-link class="menu-item" to="/silly">
          <v-icon class="menu-icon">mdi-transfer</v-icon>
          <span>Silly Season</span>
        </router-link>
        <router-link class="menu-item" to="/schedule">
          <v-icon class="menu-icon">mdi-calendar-month</v-icon>
          <span>Schedule</span>
        </router-link>
        <router-link class="menu-item" to="/frequencies">
          <v-icon class="menu-icon">mdi-radio-tower</v-icon>
          <span>Frequencies</span>
        </router-link>
      </div>
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
  background: linear-gradient(120deg, #12233d, #1c355a);
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  font-size: 16px;
  padding: 10px 18px;
  border-bottom: 1px solid rgba(214, 228, 251, 0.2);
  box-shadow: 0 10px 22px rgba(12, 24, 43, 0.25);
}
a{
  text-decoration: none;

}
nav .main-logo-img{
  height: 50px;
  margin-right: 12px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
}
nav .left-nav{
  width: auto;
  padding-left: 6px;
  margin-right: 12px;
  color: #ffffff;
  font-size: 24px;
  display: inline-flex;
  align-items: center;
}
nav .logo-title {
  color: #f3f7ff;
  margin-top: 0;
  font-weight: 700;
  letter-spacing: 0.01em;
}

nav .right-nav {
  width: auto;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
}

.nav-card {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: transparent;
  border-radius: 14px;
  padding: 6px 8px;
  border: none;
}

nav .menu-item {
  color: #c8dcf7 !important;
  height: 40px;
  position: relative;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0 14px;
  border-radius: 10px;
  transition: background 0.2s, color 0.2s;
  font-family: Verdana;
  font-weight: 600;
  text-decoration: none;
  text-shadow: none;
  border: none;
  background: transparent;
  white-space: nowrap;
}

nav .menu-item::after {
  content: none;
}

nav .menu-item .menu-icon {
  font-size: 18px;
  color: #8fb4e8;
  transition: color 0.2s;
}

nav .menu-item.router-link-active {
  color: #ffbe3d !important;
  background: rgba(255, 190, 61, 0.15);
  box-shadow: none;
  cursor: default;
}

nav .menu-item.router-link-active .menu-icon {
  color: #ffbe3d;
}

nav .menu-item:hover:not(.router-link-active) {
  background: rgba(214, 228, 251, 0.14);
  color: #ffffff !important;
}

nav .menu-item:hover:not(.router-link-active) .menu-icon {
  color: #ffffff;
}
</style>