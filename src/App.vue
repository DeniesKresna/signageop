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
        <v-snackbar
          :timeout=-1
          v-model="snackbar"
          absolute
          left
          shaped
          top
        >
          You need update version of this app.
          <template v-slot:action="{ attrs }">
            <v-btn
              color="blue"
              text
              v-bind="attrs"
              @click="hardRefresh"
            >
              Update
            </v-btn>
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
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
        <span>Signage Quick Monitoring V{{version}}</span>
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
      snackbar: false
    }
  },
  mounted: async function(){
    let res = await this.$store.dispatch("operationalVersion");
    let version = res.data;
    if(version != this.$store.state.version){
      this.snackbar = true;
    }
  },
  methods: {
    hardRefresh: function(){
      window.location.reload(true);
    }
  },
  computed: {
    overlay(){
      return this.$store.getters.overlay;
    },
    version(){
      return this.$store.getters.version;
    }
  }
}
</script>
<style scoped>
.cursormode{
	cursor: pointer;
}
</style>
