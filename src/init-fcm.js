// !FIREBASE
import * as firebase from 'firebase/app';
import 'firebase/messaging';

let messaging = null;
if (firebase.messaging.isSupported()) {
  // const initializedFirebaseApp = firebase.initializeApp({
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   authDomain: process.env.FIREBASE_PROJECT_ID + '.firebaseapp.com',
  //   databaseURL:
  //     'https://' + process.env.FIREBASE_PROJECT_ID + '.firebaseio.com',
  //   projectId: process.env.FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.FIREBASE_PROJECT_ID + '.appspot.com',
  //   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.FIREBASE_APP_ID,
  //   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  // });
  // messaging = initializedFirebaseApp.messaging();
  // messaging.usePublicVapidKey(
  //   process.env.FIREBASE_MESSAGING_WEB_PUSH_CERTIFICATE,
  // );
}

export { messaging };
