<template>
  <router-view />
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          title="IndyCar Drivers"
          icon="mdi-chevron-right"
          nav
        > 
          <template v-slot:append>
            <v-btn
              v-if="rail"
              variant="text"
              icon="mdi-chevron-right"
              @click.stop="rail = !rail"
            ></v-btn>
            <v-btn
              v-if="!rail"
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-cash-multiple" title="Leader's Circle" to="/leaders" color="green"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group" title="Silly Season" to="/silly" color="orange"></v-list-item>
          <!-- <v-list-item prepend-icon="mdi-account-group-outline" title="Hello" to="/hello"></v-list-item> -->
        </v-list>
      </v-navigation-drawer>
      <!-- <v-main style="height: 700px"></v-main> -->
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        rail: true,
      }
    },
  }
</script>