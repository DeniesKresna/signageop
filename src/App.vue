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
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Quick Monitoring</v-toolbar-title>
        <div class="text-center">
              <v-snackbar
                  v-model="notif.active"
                  timeout="3000"
                  :right="true"
                  :top="true"
                  :color="notif.color"
                  :multi-line="true"
              >
                  <strong>{{notif.title}}</strong>{{ notif.text }}
                  <template v-slot:action="{ attrs }">
                      <v-btn
                      text
                      v-bind="attrs"
                      @click="active = false"
                      >
                      Close
                      </v-btn>
                  </template>
              </v-snackbar>
        </div>
        <v-spacer></v-spacer>
       <!-- <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon> -->
      </v-app-bar>
  
      <v-navigation-drawer
        v-model="drawer"
        app
        temporary
      >
        <v-list dense>
          <v-subheader>MENUS</v-subheader>
          <v-list-item-group v-model="selectedMenu">
            <v-list-item @click="goToPage('device-quick-info')">
              <v-list-item-action>
                <v-icon>mdi-cellphone-link</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Devices Quick Info</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="goToPage('device-online-time')">
              <v-list-item-action>
                <v-icon>mdi-bus-clock</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Device Online Time</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
  
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
          You need update version of this app. Hard Refresh your browser to Update.
          <template v-slot:action="{ attrs }">
            <!--<v-btn
              color="blue"
              text
              v-bind="attrs"
              @click="hardRefresh"
            >
              Update
            </v-btn>-->
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
        <span>Signage Quick Monitoring V{{this.$store.state.version}}</span>
        <v-spacer></v-spacer>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </v-app>
</div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/messaging";
export default{
  data(){
    return {
      drawer: false,
      drawerRight: null,
      right: false,
      left: false,
      snackbar: false,
      notif: {
        active: false,
        color: "success",
        title: "Halo ",
        text: "semua"
      }
    }
  },
  mounted: async function(){
    this.receiveMessage();
    let res = await this.$store.dispatch("operationalVersion");
    let version = res.data;
    if(version != this.$store.state.version){
      this.snackbar = true;
    }
  },
  methods: {
    hardRefresh: function(){
      window.location.reload(true);
    },
    goToPage: function(menuName="device-quick-info"){
      this.$store.commit("setActiveMenu",menuName);
      this.$router.push({name:menuName});
    },
    receiveMessage: function() {
      try {
        firebase.messaging().onMessage((payload) => {
          let notf = payload.notification;
          let clr = "success";
          if(notf.title == "Device Offline"){
            clr = "warning";
          }
          this.notif = {
            active: true,
            color: clr,
            title: notf.title+" ",
            text: notf.body
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    overlay(){
      return this.$store.getters.overlay;
    },
    version(){
      return this.$store.getters.version;
    },
    selectedMenu(){
      return this.$store.getters.selectedMenu;
    }
  }
}
</script>
<style scoped>
.cursormode{
	cursor: pointer;
}
</style>
