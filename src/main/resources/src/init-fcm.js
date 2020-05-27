import * as firebase from 'firebase/app'
import 'firebase/messaging'
const initializedFirebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDrKl7_lL_cRf24vR5EHQtIY1sfum1iHM0',
  authDomain: 'crm-test-43d00.firebaseapp.com',
  databaseURL: 'https://crm-test-43d00.firebaseio.com',
  projectId: 'crm-test-43d00',
  storageBucket: 'crm-test-43d00.appspot.com',
  messagingSenderId: '735601754535',
  appId: '1:735601754535:web:7fa59c7e80419294537682',
  measurementId: 'G-NX5EHDN8DM',
})
const messaging = initializedFirebaseApp.messaging()
messaging.usePublicVapidKey(
  // Project Settings => Cloud Messaging => Web Push certificates
  process.env.FIREBASE_MESSAGING_WEB_PUSH_CERTIFICATE,
)
export { messaging }
