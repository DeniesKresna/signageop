//importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js');
//importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js');

importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')
/*
const firebase = require('firebase/app');
require('firebase/messaging');
*/
const app = firebase.initializeApp({
  	apiKey: "AIzaSyAoyRWhzAoIZoXERLxDQugXs0YT7PvmTQY",
    authDomain: "signage-e34d0.firebaseapp.com",
    databaseURL: "https://signage-e34d0.firebaseio.com",
    projectId: "signage-e34d0",
    storageBucket: "signage-e34d0.appspot.com",
    messagingSenderId: "30195697440",
    appId: "1:30195697440:web:c4970d0cb02043703d3945",
    measurementId: "G-7QNLJKVQ7K"
});

app.messaging().getToken({ vapidKey: "BOY5UBH9dbCVDVhZN1qno8OxGHb4FQjwae5Zr5Dire4Q8aZ2CAeCdYGl7abW1fz8jG5OV2W5Q7hH-CY9PGIxaa8" })
.then((currentToken) => {
  if (currentToken) {
    console.log('client token', currentToken)
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
})

app.messaging().onBackgroundMessage((payload) => {
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/favicon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});