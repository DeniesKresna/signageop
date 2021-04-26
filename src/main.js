import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import api from './plugins/api';
import './registerServiceWorker'

import 'leaflet/dist/leaflet.css';


//for notification
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then(reg => {
      console.log(`Service Worker Registration (Scope: ${reg.scope})`);
    })
    .catch(error => {
      const msg = `Service Worker Error (${error})`;
      console.error(msg);
    });
} else {
  // happens when the app isn't served over HTTPS or if the browser doesn't support service workers
  console.warn('Service Worker not available');
}

import firebaseMessaging from './firebase'

firebaseMessaging.getToken({vapidKey:"BOY5UBH9dbCVDVhZN1qno8OxGHb4FQjwae5Zr5Dire4Q8aZ2CAeCdYGl7abW1fz8jG5OV2W5Q7hH-CY9PGIxaa8"}).then((token) => {
  store.dispatch('device/operationalFcmRegistration',{token: token}).then((data)=>{
    //console.log(data.message);
  });
  console.log(token);
})

Vue.prototype.$messaging = firebaseMessaging

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  api,
  render: h => h(App)
}).$mount('#app')
