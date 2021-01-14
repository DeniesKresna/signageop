importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js');
/*
const firebase = require('firebase/app');
require('firebase/messaging');
*/
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