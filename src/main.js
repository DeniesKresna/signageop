import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import api from './plugins/api';
import './registerServiceWorker'

import 'leaflet/dist/leaflet.css';
/*
import firebase from "firebase/app";
import 'firebase/messaging';

firebase.initializeApp({
	apiKey: "AIzaSyAoyRWhzAoIZoXERLxDQugXs0YT7PvmTQY",
    authDomain: "signage-e34d0.firebaseapp.com",
    databaseURL: "https://signage-e34d0.firebaseio.com",
    projectId: "signage-e34d0",
    storageBucket: "signage-e34d0.appspot.com",
    messagingSenderId: "30195697440",
    appId: "1:30195697440:web:c4970d0cb02043703d3945",
    measurementId: "G-7QNLJKVQ7K"
});

const messaging = firebase.messaging();

messaging.usePublicVapidKey("BOY5UBH9dbCVDVhZN1qno8OxGHb4FQjwae5Zr5Dire4Q8aZ2CAeCdYGl7abW1fz8jG5OV2W5Q7hH-CY9PGIxaa8"); // 1. Generate a new key pair

// Request Permission of Notifications
messaging.requestPermission().then(() => {
  console.log('Notification permission granted.');

  // Get Token
  messaging.getToken().then((token) => {
    console.log(token)
  })
}).catch((err) => {
  console.log('Unable to get permission to notify.', err);
});
*/

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  api,
  render: h => h(App)
}).$mount('#app')
