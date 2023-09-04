importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the config.
firebase.initializeApp({
    apiKey: "AIzaSyCIdliIiCG9ig3b03qx6UzVUFt8AjlNhGo",
    authDomain: "pushnotification-6692b.firebaseapp.com",
    projectId: "pushnotification-6692b",
    storageBucket: "pushnotification-6692b.appspot.com",
    messagingSenderId: "936761762080",
    appId: "1:936761762080:web:5efd2609496916d540b745"
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();