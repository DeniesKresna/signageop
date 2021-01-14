<template>
<div id="app">
  <v-app id="inspire">
    <v-app id="inspire">
      <!--
      <v-navigation-drawer
        v-model="drawerRight"
        app
        clipped
        right
      >
      
        <v-list dense>
          <v-list-item @click.stop="right = !right">
            <v-list-item-action>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Open Temporary Drawer</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  -->
      <v-app-bar
        app
        clipped-right
        color="light-blue darken-3"
        dark
      >
        <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
        <v-toolbar-title>Quick Monitoring</v-toolbar-title>
        <v-spacer></v-spacer>
       <!-- <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon> -->
      </v-app-bar>
  <!--
      <v-navigation-drawer
        v-model="drawer"
        app
      >
        <v-list dense>
          <v-list-item @click.stop="left = !left">
            <v-list-item-action>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Open Temporary Drawer</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  -->
      <v-navigation-drawer
        v-model="left"
        fixed
        temporary
      ></v-navigation-drawer>
  
      <v-main>
        <v-overlay :value="overlay"></v-overlay>
        <v-container
          fluid
        >
          <router-view></router-view>
        </v-container>
      </v-main>
  
      <v-navigation-drawer
        v-model="right"
        fixed
        right
        temporary
      ></v-navigation-drawer>
  
      <v-footer
        app
        color="red lighten-2"
        class="white--text"
      >
        <span>Signage Quick Monitoring</span>
        <v-spacer></v-spacer>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </v-app>
</div>
</template>
<script>
export default{
  data(){
    return {
      drawer: null,
      drawerRight: null,
      right: false,
      left: false,
    }
  },
  computed: {
    overlay(){
      return this.$store.getters.overlay;
    }
  }
}
</script>
