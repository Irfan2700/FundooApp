importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
// import { environment } from './environments/environment'

firebase.initializeApp({
    'messagingSenderId': '263147610417'
  });

const messaging = firebase.messaging();