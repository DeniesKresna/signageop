//firebase.js

import firebase from 'firebase/app'
import 'firebase/firebase-messaging'

var firebaseConfig = {
    apiKey: "AIzaSyAoyRWhzAoIZoXERLxDQugXs0YT7PvmTQY",
    authDomain: "signage-e34d0.firebaseapp.com",
    databaseURL: "https://signage-e34d0.firebaseio.com",
    projectId: "signage-e34d0",
    storageBucket: "signage-e34d0.appspot.com",
    messagingSenderId: "30195697440",
    appId: "1:30195697440:web:c4970d0cb02043703d3945",
    measurementId: "G-7QNLJKVQ7K"
  };

firebase.initializeApp(firebaseConfig)

export default firebase.messaging()